import FleetTable from "@/components/tables/vehicles";
import { Button } from "@/components/ui/button";

export default function PhysicalFitness() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <FleetTable />
    </main>
  );
}