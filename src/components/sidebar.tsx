"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  Activity,
  Bell,
  BicepsFlexed,
  Brain,
  CarFront,
  ClipboardPlus,
  HandHeart,
  Home,
  LineChart,
  LogOut,
  Package,
  Settings,
  SquareLibrary,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    label: "Vehicles",
    href: "/dashboard/physical-fitness",
    icon: <CarFront className="h-4 w-4" />,
  },
  {
    label: "Drivers",
    href: "/dashboard/mental-health",
    icon: <Users className="h-4 w-4" />,
  },
  {
    label: "Bookings",
    href: "/dashboard/motivation",
    icon: <SquareLibrary className="h-4 w-4" />,
  },
  {
    label: "Reports",
    href: "/dashboard/health-analysis",
    icon: <ClipboardPlus className="h-4 w-4" />,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-4 w-4" />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              src="/biust.svg"
              alt="BIUST Logo"
              width={120}
              height={30}
              priority
            />
          </Link>
          <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((navItem) => (
              <Link
                key={navItem.label}
                href={navItem.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname === navItem.href ? "bg-muted text-primary" : ""
                }`}
              >
                {navItem.icon}
                {navItem.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4 mb-5">
          <Button className="w-full">
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}
