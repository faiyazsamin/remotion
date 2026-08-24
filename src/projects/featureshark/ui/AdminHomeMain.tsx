import { Interactive } from "remotion";
import type { PartProps } from "./tokens";

/**
 * Main pane to the right of the rail. A flex column so the hero can centre
 * itself the way `flex min-h-0 flex-1 flex-col items-center justify-center`
 * does on the real page.
 */
export const AdminHomeMain: React.FC<
  PartProps & { children?: React.ReactNode }
> = ({ style, children }) => (
  <Interactive.Main
    name="Main"
    style={{
      flex: 1,
      minWidth: 0,
      backgroundColor: "#ffffff",
      display: "flex",
      flexDirection: "column",
      ...style,
    }}
  >
    {children}
  </Interactive.Main>
);
