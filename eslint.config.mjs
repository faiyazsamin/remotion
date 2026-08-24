import { config } from "@remotion/eslint-config-flat";

export default [
  // Captured pages kept for reference — third-party bundles, not our source.
  { ignores: ["**/raw_html/**"] },
  ...config,
];
