import { Interactive } from "remotion";
import { AdminRail } from "./AdminRail";
import {
  BOARD_TOP_BAR_HEIGHT,
  FeedbackBoardTopBar,
} from "./FeedbackBoardTopBar";
import {
  IconBook,
  IconCalendar,
  IconChart,
  IconChat,
  IconChip,
  IconClipboard,
  IconHome,
  IconKanban,
  IconList,
  IconMap,
  IconSettings,
  IconSurveys,
  IconSwitchWorkspace,
  IconUploadInbox,
  IconUserPlus,
  IconUsers,
} from "./icons";
import { RoadmapColumn, type RoadmapStage } from "./RoadmapColumn";
import { STATUS_META } from "./statuses";
import { ROADMAP_PANEL_WIDTH, RoadmapPanel } from "./RoadmapPanel";
import {
  ADMIN_CARD_RADIUS,
  ADMIN_GROUND,
  ADMIN_GUTTER,
  BRAND_PURPLE,
  FONT_STACK,
  scaled,
  type PartProps,
} from "./tokens";

const GUTTER = ADMIN_GUTTER;
const RAIL_WIDTH = scaled(46);

/** The rail is the same on every admin page; Roadmap is the fourth slot. */
const RAIL_ICONS = [
  <IconHome key="home" />,
  <IconUploadInbox key="upload" />,
  <IconChat key="chat" />,
  <IconMap key="map" />,
  <IconCalendar key="calendar" />,
  <IconBook key="book" />,
  <IconClipboard key="clipboard" />,
  <IconUsers key="users" />,
  <IconUserPlus key="user-plus" />,
  <IconSurveys key="surveys" />,
  <IconChart key="chart" />,
  <IconSettings key="settings" />,
  <IconChip key="chip" />,
];

export const ROADMAP_RAIL_ACTIVE = 3;

/**
 * The stages a request moves through. Drawn from the shared status list, minus
 * Closed — a closed request is off the roadmap rather than a stage on it.
 */
export const ROADMAP_STAGE_META = STATUS_META.filter(
  (status) => status.label !== "Closed",
).map((status) => ({
  label: status.label,
  icon: <status.Icon size={20} />,
  tint: status.tint,
}));

const ViewToggle: React.FC<PartProps> = ({ style }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 4,
      height: 40,
      borderRadius: 11,
      backgroundColor: "#f4f4f8",
      padding: 4,
      boxSizing: "border-box",
      ...style,
    }}
  >
    <span
      style={{
        height: 32,
        borderRadius: 8,
        backgroundColor: "#ffffff",
        color: "#20242f",
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "0 13px",
        fontSize: 15.5,
        fontWeight: 600,
        boxShadow: "0 1px 2px rgba(24, 28, 45, 0.08)",
      }}
    >
      <IconKanban />
      Kanban
    </span>
    <span
      style={{
        height: 32,
        borderRadius: 8,
        color: "#6b7280",
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "0 13px",
        fontSize: 15.5,
        fontWeight: 600,
      }}
    >
      <IconList />
      List
    </span>
  </div>
);

/**
 * The Roadmap page: the same rail and ground as the feedback board, with the
 * roadmap list where the filter column sits and a kanban of stages in the main
 * card.
 */
export const RoadmapBoard: React.FC<
  PartProps & {
    stages: RoadmapStage[];
    panelStyle?: React.CSSProperties;
    topBarStyle?: React.CSSProperties;
    toggleStyle?: React.CSSProperties;
  }
> = ({ style, stages, panelStyle, topBarStyle, toggleStyle }) => (
  <Interactive.Div
    name="Roadmap board"
    style={{
      position: "absolute",
      inset: 0,
      background: ADMIN_GROUND,
      fontFamily: FONT_STACK,
      display: "flex",
      gap: GUTTER,
      padding: GUTTER,
      boxSizing: "border-box",
      ...style,
    }}
  >
    <AdminRail
      icons={RAIL_ICONS}
      activeIndex={ROADMAP_RAIL_ACTIVE}
      activeAccent={BRAND_PURPLE}
      footer={<IconSwitchWorkspace />}
      style={{ background: "transparent" }}
    />

    <RoadmapPanel style={panelStyle} />

    <Interactive.Div
      name="Roadmap main"
      style={{
        flex: 1,
        minWidth: 0,
        backgroundColor: "#ffffff",
        borderRadius: ADMIN_CARD_RADIUS,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <FeedbackBoardTopBar style={topBarStyle} />

      <div
        style={{
          flexShrink: 0,
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 18px",
          boxSizing: "border-box",
        }}
      >
        <ViewToggle style={toggleStyle} />
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          gap: 17,
          padding: "0 14px 14px",
          boxSizing: "border-box",
        }}
      >
        {stages.map((stage) => (
          <RoadmapColumn key={stage.label} stage={stage} />
        ))}
      </div>
    </Interactive.Div>
  </Interactive.Div>
);

/** Centre of the panel's own width, for callers that need to measure past it. */
export const ROADMAP_MAIN_LEFT =
  GUTTER + RAIL_WIDTH + GUTTER + ROADMAP_PANEL_WIDTH + GUTTER;
/** Where the kanban starts vertically, under the top bar and the view toggle. */
export const ROADMAP_COLUMNS_TOP = GUTTER + BOARD_TOP_BAR_HEIGHT + 56;
