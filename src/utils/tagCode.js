// Generates a stable, human-readable "accession tag" code from an entity's
// real database id. Same id always produces the same code, so it stays
// consistent across reloads without needing a field in the database.

const PREFIXES = {
  property: "PR",
  space: "SP",
  container: "CN",
  item: "IT",
};

export function tagCode(type, id) {
  if (!id) return "";
  const prefix = PREFIXES[type] || "XX";
  const suffix = String(id).replace(/-/g, "").slice(-4).toUpperCase();
  return `${prefix}-${suffix}`;
}