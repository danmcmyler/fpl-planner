import React from "react";

type Props = {
  teams: string[];
  gameweeks: number[];
  values: Record<string, number | undefined>; // key = `${team}|${gw}`
};

export function FixtureGrid({ teams, gameweeks, values }: Props): JSX.Element {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-sm">
        <caption className="sr-only">
          Team fixture difficulty by gameweek (1 to 5)
        </caption>
        <thead>
          <tr>
            <th scope="col" className="sticky left-0 bg-white border px-2 py-2 text-left">
              Team
            </th>
            {gameweeks.map((gw) => (
              <th key={gw} scope="col" className="border px-2 py-2 text-left">
                GW {gw}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team}>
              <th
                scope="row"
                className="sticky left-0 bg-white border px-2 py-2 font-medium"
              >
                {team}
              </th>
              {gameweeks.map((gw) => {
                const v = values[`${team}|${gw}`];
                const { bg, fg, label } = colourFor(v);
                return (
                  <td
                    key={gw}
                    tabIndex={0}
                    aria-label={`GW ${gw}, ${team}: ${label}`}
                    className={[
                      "border px-2 py-2 text-center align-middle outline-none focus-visible:ring-2 focus-visible:ring-black",
                      bg,
                      fg
                    ].join(" ")}
                  >
                    {v ?? "—"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function colourFor(v: number | undefined): { bg: string; fg: string; label: string } {
  switch (v) {
    case 1:
      return { bg: "bg-green-100", fg: "text-green-900", label: "1 (easiest)" };
    case 2:
      return { bg: "bg-lime-100", fg: "text-lime-900", label: "2" };
    case 3:
      return { bg: "bg-yellow-100", fg: "text-yellow-900", label: "3" };
    case 4:
      return { bg: "bg-orange-100", fg: "text-orange-900", label: "4" };
    case 5:
      return { bg: "bg-red-100", fg: "text-red-900", label: "5 (hardest)" };
    default:
      return { bg: "bg-gray-50", fg: "text-gray-500", label: "no data" };
  }
}
