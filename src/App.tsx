import React from "react";
import { Root as VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function App(): JSX.Element {
  return (
    <main className="min-h-screen p-6">
      <VisuallyHidden asChild>
        <h1>FPL Planner</h1>
      </VisuallyHidden>

      <h2 className="text-2xl font-semibold">FPL Planner</h2>
      <p className="mt-2 text-sm text-gray-600">
        Fixture Planner coming soon.
      </p>
    </main>
  );
}
