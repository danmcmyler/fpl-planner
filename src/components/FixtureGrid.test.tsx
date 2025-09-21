import React from "react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { FixtureGrid } from "./FixtureGrid";

describe("FixtureGrid", () => {
  const teams = ["ARS", "CHE", "LIV", "MCI"];
  const gameweeks = [1, 2, 3];
  const values: Record<string, number | undefined> = {
    "ARS|1": 2,
    "CHE|1": 4
  };

  it("renders correct header columns and team rows", () => {
    const { container } = render(
      <FixtureGrid teams={teams} gameweeks={gameweeks} values={values} />
    );

    expect(screen.getByRole("columnheader", { name: /team/i })).toBeInTheDocument();
    gameweeks.forEach((gw) => {
      expect(
        screen.getByRole("columnheader", { name: new RegExp(`GW ${gw}`) })
      ).toBeInTheDocument();
    });

    teams.forEach((t) => {
      expect(screen.getByRole("rowheader", { name: t })).toBeInTheDocument();
    });

    const cells = container.querySelectorAll("tbody td");
    expect(cells.length).toBe(teams.length * gameweeks.length);
  });

  it("has no obvious accessibility violations", async () => {
    const { container } = render(
      <FixtureGrid teams={teams} gameweeks={gameweeks} values={values} />
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
