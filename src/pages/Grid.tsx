import React from "react";
import { loadFixtures } from "../data/loadFixtures";
import { FixtureGrid } from "../components/FixtureGrid";

export function Grid(): JSX.Element {
  const [state, setState] = React.useState<
    { kind: "loading" } | { kind: "error"; msg: string } | { kind: "ok" }
  >({ kind: "loading" });

  const [teams, setTeams] = React.useState<string[]>([]);
  const [gws, setGws] = React.useState<number[]>([]);
  const [values, setValues] = React.useState<Record<string, number | undefined>>({});

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await loadFixtures();
        if (cancelled) { return; }
        setTeams(data.teams);
        setGws(data.gameweeks);
        // Build map "team|gw" -> value
        const map: Record<string, number | undefined> = {};
        for (const d of data.difficulty) {
          map[`${d.team}|${d.gw}`] = d.value;
        }
        setValues(map);
        setState({ kind: "ok" });
      } catch (e) {
        setState({ kind: "error", msg: e instanceof Error ? e.message : "Failed to load fixtures" });
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (state.kind === "loading") {
    return <p role="status" className="text-sm">Loading fixture grid…</p>;
  }
  if (state.kind === "error") {
    return <p role="status" className="text-sm text-red-700">{state.msg}</p>;
  }

  return (
    <section aria-labelledby="grid-heading">
      <h3 id="grid-heading" className="text-xl font-medium">Fixture difficulty</h3>
      <FixtureGrid teams={teams} gameweeks={gws} values={values} />
      <div className="mt-4 text-sm">
        <p className="font-medium">Legend</p>
        <ul className="mt-1 flex flex-wrap gap-2">
          <li className="px-2 py-1 rounded bg-green-100 text-green-900">1 (easiest)</li>
          <li className="px-2 py-1 rounded bg-lime-100 text-lime-900">2</li>
          <li className="px-2 py-1 rounded bg-yellow-100 text-yellow-900">3</li>
          <li className="px-2 py-1 rounded bg-orange-100 text-orange-900">4</li>
          <li className="px-2 py-1 rounded bg-red-100 text-red-900">5 (hardest)</li>
          <li className="px-2 py-1 rounded bg-gray-50 text-gray-500">— (no data)</li>
        </ul>
      </div>
    </section>
  );
}
