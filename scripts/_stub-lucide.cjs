// Stub for lucide-react during data extraction (no React runtime).
const handler = { get: () => () => null };
module.exports = new Proxy({}, handler);
