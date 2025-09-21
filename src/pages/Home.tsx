import React from "react";
import { loadFixtures } from "../data/loadFixtures";

export function Home(): JSX.Element {
  const [status, setStatus] = React.useState<string>("Loading fixtures…");

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await loadFixtures();
        if (!cancelled) {
          setStatus(
            `Loaded: ${data.teams.length} teams, ${data.gameweeks.length} GWs, ${data.difficulty.length} entries`
          );
        }
      } catch (err) {
        if (!cancelled) {
          setStatus(err instanceof Error ? err.message : "Failed to load fixtures");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section aria-labelledby="home-heading">
      <h3 id="home-heading" className="text-xl font-medium">
        Overview
      </h3>
      <p className="mt-2 text-sm text-gray-700">Fixture difficulty grid coming soon.</p>
      <p className="mt-4 text-sm" role="status">{status}</p>
    </section>
  );
}
