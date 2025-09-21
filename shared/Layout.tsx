import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Root as VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function Layout(): JSX.Element {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white text-black px-3 py-2 rounded"
      >
        Skip to content
      </a>

      <header className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div>
            <VisuallyHidden asChild>
              <h1>FPL Planner</h1>
            </VisuallyHidden>
            <h2 className="text-2xl font-semibold">FPL Planner</h2>
          </div>

          <nav aria-label="Primary" className="ml-6">
            <ul className="flex gap-4">
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `px-2 py-1 rounded ${
                      isActive ? "underline underline-offset-4" : ""
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/grid"
                  className={({ isActive }) =>
                    `px-2 py-1 rounded ${
                      isActive ? "underline underline-offset-4" : ""
                    }`
                  }
                >
                  Fixture grid
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </>
  );
}
