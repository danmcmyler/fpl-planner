import React from "react";

export function Home(): JSX.Element {
  return (
    <section aria-labelledby="home-heading">
      <h3 id="home-heading" className="text-xl font-medium">
        Overview
      </h3>
      <p className="mt-2 text-sm text-gray-700">
        Fixture difficulty grid coming soon.
      </p>
    </section>
  );
}
