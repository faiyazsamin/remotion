import { Interactive } from "remotion";
import { AcmeSiteFooter } from "./AcmeSiteFooter";
import { AcmeSiteHeader } from "./AcmeSiteHeader";
import { AcmeSitePostCard } from "./AcmeSitePostCard";
import { FONT_STACK, type PartProps } from "./tokens";

/**
 * The host site the widget is embedded on. It is scenery, not the subject, so
 * it renders as one settled page — the widget and the cursor carry the motion.
 */
export const AcmeSite: React.FC<
  PartProps & {
    headerStyle?: React.CSSProperties;
    postStyle?: React.CSSProperties;
    footerStyle?: React.CSSProperties;
  }
> = ({ style, headerStyle, postStyle, footerStyle }) => (
  <Interactive.Div
    name="Host site"
    style={{
      position: "absolute",
      inset: 0,
      backgroundColor: "#ffffff",
      fontFamily: FONT_STACK,
      display: "flex",
      flexDirection: "column",
      ...style,
    }}
  >
    <AcmeSiteHeader style={headerStyle} />

    <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
      <AcmeSitePostCard style={{ position: "absolute", left: 72, top: 96, ...postStyle }} />
    </div>

    <AcmeSiteFooter style={footerStyle} />
  </Interactive.Div>
);
