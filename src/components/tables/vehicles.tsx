"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Trash2, Edit, Plus, Download } from "lucide-react";

// Interfaces
interface Vehicle {
  vehicleId: string;
  make: string;
  model: string;
  plateNumber: string;
  status: "Available" | "Unavailable" | "On Trip";
  year: number;
  type: string;
  unavailableReason?: string;
  maintenanceHistory: MaintenanceEvent[];
}

interface MaintenanceEvent {
  eventId: string;
  date: string;
  type: string;
  description: string;
  mechanic: string;
  duration: string; // e.g., "2 hours" or "1 day"
}

// Simulated data
const initialFleetData: Vehicle[] = [
  { vehicleId: "V001", make: "Toyota", model: "Prius", plateNumber: "ABC-123", status: "Available", year: 2020, type: "Sedan", maintenanceHistory: [{ eventId: "M001", date: "2025-03-15", type: "Maintenance", description: "Oil change", mechanic: "John Doe", duration: "2 hours" }] },
  { vehicleId: "V002", make: "Ford", model: "Transit", plateNumber: "XYZ-789", status: "On Trip", year: 2019, type: "Van", maintenanceHistory: [{ eventId: "M002", date: "2025-03-10", type: "Breakdown", description: "Transmission failure", mechanic: "Jane Smith", duration: "3 days" }] },
  { vehicleId: "V003", make: "Honda", model: "Civic", plateNumber: "DEF-456", status: "Available", year: 2021, type: "Sedan", maintenanceHistory: [] },
  { vehicleId: "V004", make: "Tesla", model: "Model 3", plateNumber: "GHI-789", status: "Unavailable", year: 2022, type: "Sedan", unavailableReason: "Battery replacement", maintenanceHistory: [] },
  { vehicleId: "V005", make: "Chevrolet", model: "Silverado", plateNumber: "JKL-012", status: "Available", year: 2020, type: "Truck", maintenanceHistory: [] },
];

// Vehicle List Component
function VehicleList({ 
  vehicles, 
  onDelete, 
  onEditStatus, 
  onAddVehicle 
}: { 
  vehicles: Vehicle[]; 
  onDelete: (id: string) => void;
  onEditStatus: (id: string, status: Vehicle["status"], reason?: string) => void;
  onAddVehicle: (vehicle: Vehicle) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [newVehicle, setNewVehicle] = useState({ make: "", model: "", plateNumber: "", year: "", type: "" });
  const [unavailableReason, setUnavailableReason] = useState("");

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddVehicle = () => {
    const vehicle: Vehicle = {
      vehicleId: `V${(vehicles.length + 1).toString().padStart(3, "0")}`,
      make: newVehicle.make,
      model: newVehicle.model,
      plateNumber: newVehicle.plateNumber,
      status: "Available",
      year: parseInt(newVehicle.year),
      type: newVehicle.type,
      maintenanceHistory: [],
    };
    onAddVehicle(vehicle);
    setNewVehicle({ make: "", model: "", plateNumber: "", year: "", type: "" });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search vehicles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Add Vehicle</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Vehicle</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Make" value={newVehicle.make} onChange={(e) => setNewVehicle({...newVehicle, make: e.target.value})} />
              <Input placeholder="Model" value={newVehicle.model} onChange={(e) => setNewVehicle({...newVehicle, model: e.target.value})} />
              <Input placeholder="Plate Number" value={newVehicle.plateNumber} onChange={(e) => setNewVehicle({...newVehicle, plateNumber: e.target.value})} />
              <Input placeholder="Year" type="number" value={newVehicle.year} onChange={(e) => setNewVehicle({...newVehicle, year: e.target.value})} />
              <Input placeholder="Type" value={newVehicle.type} onChange={(e) => setNewVehicle({...newVehicle, type: e.target.value})} />
            </div>
            <DialogFooter>
              <Button onClick={handleAddVehicle} disabled={!newVehicle.make || !newVehicle.model || !newVehicle.plateNumber || !newVehicle.year || !newVehicle.type}>
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vehicle ID</TableHead>
            <TableHead>Make</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Plate Number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredVehicles.map((vehicle) => (
            <TableRow key={vehicle.vehicleId}>
              <TableCell>{vehicle.vehicleId}</TableCell>
              <TableCell>{vehicle.make}</TableCell>
              <TableCell>{vehicle.model}</TableCell>
              <TableCell>{vehicle.plateNumber}</TableCell>
              <TableCell>
                <span className={
                  vehicle.status === "Available" ? "text-green-500" : 
                  vehicle.status === "On Trip" ? "text-yellow-500" : 
                  "text-red-500"
                }>
                  {vehicle.status}
                </span>
              </TableCell>
              <TableCell>{vehicle.type}</TableCell>
              <TableCell>{vehicle.year}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {vehicle.status !== "On Trip" && (
                    <>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Status</DialogTitle>
                          </DialogHeader>
                          <Select onValueChange={(value) => {
                            if (value === "Unavailable") {
                              setUnavailableReason("");
                            } else {
                              onEditStatus(vehicle.vehicleId, value as Vehicle["status"]);
                            }
                          }}>
                            <SelectTrigger>
                              <SelectValue placeholder={vehicle.status} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Available">Available</SelectItem>
                              <SelectItem value="Unavailable">Unavailable</SelectItem>
                            </SelectContent>
                          </Select>
                          {vehicle.status === "Unavailable" && (
                            <Input
                              placeholder="Reason for unavailability"
                              value={unavailableReason}
                              onChange={(e) => setUnavailableReason(e.target.value)}
                            />
                          )}
                          {vehicle.status === "Unavailable" && (
                            <Button 
                              onClick={() => onEditStatus(vehicle.vehicleId, "Unavailable", unavailableReason)}
                              disabled={!unavailableReason}
                            >
                              Save
                            </Button>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete {vehicle.make} {vehicle.model} ({vehicle.vehicleId})?
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="destructive" onClick={() => onDelete(vehicle.vehicleId)}>
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// Maintenance History Component
function MaintenanceHistory({ vehicles }: { vehicles: Vehicle[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const allMaintenance = vehicles.flatMap((vehicle) => 
    vehicle.maintenanceHistory.map((event) => ({ ...event, vehicleId: vehicle.vehicleId }))
  );

  const filteredMaintenance = allMaintenance.filter(
    (event) =>
      event.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    const headers = ["Vehicle ID,Event ID,Date,Type,Description,Mechanic,Duration\n"];
    const rows = filteredMaintenance.map(event => 
      `${event.vehicleId},${event.eventId},${event.date},${event.type},${event.description},${event.mechanic},${event.duration}`
    ).join("\n");
    const csvContent = headers + rows;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "maintenance_history.csv";
    link.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search maintenance history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={exportToCSV}>
          <Download className="mr-2 h-4 w-4" /> Export to CSV
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vehicle ID</TableHead>
            <TableHead>Event ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Mechanic</TableHead>
            <TableHead>Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMaintenance.map((event) => (
            <TableRow key={event.eventId}>
              <TableCell>{event.vehicleId}</TableCell>
              <TableCell>{event.eventId}</TableCell>
              <TableCell>{event.date}</TableCell>
              <TableCell>{event.type}</TableCell>
              <TableCell>{event.description}</TableCell>
              <TableCell>{event.mechanic}</TableCell>
              <TableCell>{event.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// Main Component
export default function FleetDashboard() {
  const [vehicles, setVehicles] = useState(initialFleetData);

  const handleDelete = (vehicleId: string) => {
    setVehicles(vehicles.filter((vehicle) => vehicle.vehicleId !== vehicleId));
  };

  const handleEditStatus = (vehicleId: string, status: Vehicle["status"], reason?: string) => {
    setVehicles(vehicles.map((vehicle) => 
      vehicle.vehicleId === vehicleId ? { ...vehicle, status, unavailableReason: status === "Unavailable" ? reason : undefined } : vehicle
    ));
  };

  const handleAddVehicle = (vehicle: Vehicle) => {
    setVehicles([...vehicles, vehicle]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Vehicles</h1>
      <Tabs defaultValue="vehicles" className="w-full">
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="vehicles">Vehicle List</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance History</TabsTrigger>
        </TabsList>
        <TabsContent value="vehicles">
          <VehicleList 
            vehicles={vehicles} 
            onDelete={handleDelete} 
            onEditStatus={handleEditStatus}
            onAddVehicle={handleAddVehicle}
          />
        </TabsContent>
        <TabsContent value="maintenance">
          <MaintenanceHistory vehicles={vehicles} />
        </TabsContent>
      </Tabs>
    </div>
  );
}