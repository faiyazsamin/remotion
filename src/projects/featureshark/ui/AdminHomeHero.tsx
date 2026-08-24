import { Interactive } from "remotion";
import { HERO_MAX_WIDTH, REM, type PartProps } from "./tokens";

/**
 * The centred hero column: headline, composer, suggestion grid. Mirrors
 * `flex min-h-0 flex-1 flex-col items-center justify-center px-4 pb-16` with an
 * inner `mx-auto w-full max-w-2xl`, so the column is 618px wide and vertically
 * centred in whatever height is left under the top bar.
 */
export const AdminHomeHero: React.FC<
  PartProps & { children?: React.ReactNode }
> = ({ style, children }) => (
  <Interactive.Section
    name="Hero"
    style={{
      flex: 1,
      minHeight: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      paddingLeft: 1 * REM,
      paddingRight: 1 * REM,
      paddingBottom: 4 * REM,
      boxSizing: "border-box",
      ...style,
    }}
  >
    <div style={{ width: "100%", maxWidth: HERO_MAX_WIDTH }}>{children}</div>
  </Interactive.Section>
);
