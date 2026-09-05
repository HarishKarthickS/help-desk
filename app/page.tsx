"use client";

import { DeskProvider } from "@/data";
import { ConsoleShell } from "@/ui/ConsoleShell";

export default function HomePage() {
  return (
    <DeskProvider>
      <ConsoleShell />
    </DeskProvider>
  );
}
