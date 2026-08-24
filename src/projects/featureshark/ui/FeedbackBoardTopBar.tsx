import { Interactive } from "remotion";
import {
  IconBell,
  IconGrid,
  IconPanelCollapse,
  IconSearch,
  IconShareSquare,
  IconSparkle,
} from "./icons";
import { BRAND_PURPLE, type PartProps } from "./tokens";

export const BOARD_TOP_BAR_HEIGHT = 78;

/*
  The right-hand cluster, laid out with explicit boxes so a scene can aim at one
  of its icons without measuring the DOM.
*/
const RIGHT_PAD = 26;
const RIGHT_GAP = 22;
const GRID_WIDTH = 21;
const AVATAR_SIZE = 34;
const ICON_BOX = 26;

/**
 * How far the visit-public-site icon's centre sits from the bar's right edge.
 * It is the leftmost of the cluster: share, bell, avatar, grid.
 */
export const VISIT_SITE_FROM_RIGHT =
  RIGHT_PAD +
  GRID_WIDTH +
  RIGHT_GAP +
  AVATAR_SIZE +
  RIGHT_GAP +
  ICON_BOX +
  RIGHT_GAP +
  ICON_BOX / 2;

/**
 * The board's top bar. Unlike Admin Home's, there is no command-palette field —
 * search is an icon, and the Shark AI pill takes the centre-left.
 *
 * `sharkStyle` is where a scene presses the pill, so its target has to be
 * derived from the same numbers this lays out with — see `sharkCentre`.
 */
export const FeedbackBoardTopBar: React.FC<
  PartProps & { sharkStyle?: React.CSSProperties }
> = ({ style, sharkStyle }) => (
  <Interactive.Header
    name="Board top bar"
    style={{
      height: BOARD_TOP_BAR_HEIGHT,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      gap: 18,
      padding: `0 ${RIGHT_PAD}px`,
      boxSizing: "border-box",
      ...style,
    }}
  >
    <span style={{ color: "#5b6172", display: "flex" }}>
      <IconPanelCollapse size={21} />
    </span>
    <span style={{ color: "#5b6172", scale: 1.45, display: "flex" }}>
      <IconSearch />
    </span>

    <Interactive.Div
      name="Shark AI"
      style={{
        height: 40,
        borderRadius: 999,
        border: `1.5px solid #cfc6f7`,
        backgroundColor: "#ffffff",
        color: BRAND_PURPLE,
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "0 19px",
        fontSize: 16,
        fontWeight: 700,
        ...sharkStyle,
      }}
    >
      <IconSparkle size={18} />
      Shark AI
    </Interactive.Div>

    <div
      style={{
        marginLeft: "auto",
        display: "flex",
        alignItems: "center",
        gap: RIGHT_GAP,
        color: "#5b6172",
      }}
    >
      <span
        style={{
          width: ICON_BOX,
          scale: 1.45,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <IconShareSquare />
      </span>
      <span
        style={{
          width: ICON_BOX,
          scale: 1.45,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <IconBell />
      </span>
      <span
        style={{
          width: AVATAR_SIZE,
          height: AVATAR_SIZE,
          borderRadius: "50%",
          backgroundColor: "#eceafb",
          color: "#4b3fbe",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13.5,
          fontWeight: 700,
        }}
      >
        AA
      </span>
      <IconGrid size={GRID_WIDTH} />
    </div>
  </Interactive.Header>
);
