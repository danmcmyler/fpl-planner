import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Grid } from "./Grid";

jest.mock("../data/loadFixtures", () => ({
  loadFixtures: async () => ({
    season: "2025-26",
    gameweeks: [1, 2, 3],
    teams: ["ARS", "CHE", "LIV", "MCI"],
    difficulty: [
      { gw: 1, team: "ARS", value: 2 },
      { gw: 1, team: "CHE", value: 4 }
    ]
  })
}));

describe("Grid page", () => {
  it("renders table with 4 teams and 3 gameweeks", async () => {
    render(<Grid />);

    expect(screen.getByRole("status")).toHaveTextContent(/loading/i);

    await waitFor(() => {
      expect(screen.getByRole("columnheader", { name: /team/i })).toBeInTheDocument();
    });

    ["ARS", "CHE", "LIV", "MCI"].forEach((t) => {
      expect(screen.getByRole("rowheader", { name: t })).toBeInTheDocument();
    });
    [1, 2, 3].forEach((gw) => {
      expect(
        screen.getByRole("columnheader", { name: new RegExp(`GW ${gw}`) })
      ).toBeInTheDocument();
    });
  });
});
