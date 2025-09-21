import { FixtureDifficultySchema, type FixtureDifficulty } from "./schema";

export async function loadFixtures(): Promise<FixtureDifficulty> {
  const resp = await fetch("data/fixtures.json", { cache: "no-cache" });
  if (!resp.ok) {
    throw new Error(`Failed to load fixtures.json (${resp.status})`);
  }
  const json = (await resp.json()) as unknown;
  const parsed = FixtureDifficultySchema.safeParse(json);
  if (!parsed.success) {
    const msg = parsed.error.issues.map(i => `${i.path.join(".")}: ${i.message}`).join("; ");
    throw new Error(`fixtures.json invalid: ${msg}`);
  }
  return parsed.data;
}
