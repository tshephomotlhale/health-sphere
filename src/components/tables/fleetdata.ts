const fleetData = [
    {
      vehicleId: "V001",
      make: "Toyota",
      model: "Prius",
      description: "Hybrid sedan, fuel-efficient",
      plateNumber: "ABC-123",
      status: "Available",
      year: 2020,
      mileage: 52000,
      lastUpdated: "2025-03-22 10:15:00",
      tripHistory: [
        { tripId: "T001", start: "2025-03-20 08:00", end: "2025-03-20 12:00", destination: "Warehouse A", distance: "150 km" },
        { tripId: "T002", start: "2025-03-21 14:00", end: "2025-03-21 16:30", destination: "Depot B", distance: "80 km" },
      ],
      maintenanceHistory: [
        { eventId: "M001", type: "Maintenance", date: "2025-03-15", description: "Oil change", cost: "$50" },
      ],
    },
    {
      vehicleId: "V002",
      make: "Ford",
      model: "Transit",
      description: "White cargo van",
      plateNumber: "XYZ-789",
      status: "Unavailable",
      year: 2019,
      mileage: 78000,
      lastUpdated: "2025-03-23 09:00:00",
      tripHistory: [
        { tripId: "T003", start: "2025-03-23 07:00", end: null, destination: "Site C", distance: "200 km" },
      ],
      maintenanceHistory: [
        { eventId: "M002", type: "Breakdown", date: "2025-03-10", description: "Transmission failure", cost: "$1200" },
      ],
    },
  ];