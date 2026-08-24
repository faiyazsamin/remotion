import { Interactive } from "remotion";
import { AdminRail } from "./AdminRail";
import { ChangelogPanel, CHANGELOG_PANEL_WIDTH } from "./ChangelogPanel";
import { ChangelogTable, type Release } from "./ChangelogTable";
import {
  BOARD_TOP_BAR_HEIGHT,
  FeedbackBoardTopBar,
  VISIT_SITE_FROM_RIGHT,
} from "./FeedbackBoardTopBar";
import {
  IconBook,
  IconCalendar,
  IconChart,
  IconChat,
  IconChip,
  IconClipboard,
  IconHome,
  IconMap,
  IconSettings,
  IconSurveys,
  IconSwitchWorkspace,
  IconUploadInbox,
  IconUserPlus,
  IconUsers,
} from "./icons";
import {
  ADMIN_CARD_RADIUS,
  ADMIN_GROUND,
  ADMIN_GUTTER,
  FONT_STACK,
  scaled,
  type PartProps,
} from "./tokens";

const GUTTER = ADMIN_GUTTER;
const RAIL_WIDTH = scaled(46);

/** The rail is the same everywhere; Changelog is the fifth slot. */
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

export const CHANGELOG_RAIL_ACTIVE = 4;
/** Changelog's own accent, which the rail and the panel both wear. */
export const CHANGELOG_ACCENT = "#e8752f";

/** Left edge of the main card, which the table is measured from. */
export const CHANGELOG_MAIN_LEFT =
  GUTTER + RAIL_WIDTH + GUTTER + CHANGELOG_PANEL_WIDTH + GUTTER;
/** Top of the table, under the top bar. */
export const CHANGELOG_TABLE_TOP = GUTTER + BOARD_TOP_BAR_HEIGHT;

/** Centre of the visit-public-site icon, which opens the customer-facing page. */
export const visitSiteCentre = (frameWidth: number) => ({
  x: frameWidth - GUTTER - VISIT_SITE_FROM_RIGHT,
  y: GUTTER + BOARD_TOP_BAR_HEIGHT / 2,
});

/** The Changelog list: releases and the filters over them. */
export const ChangelogBoard: React.FC<
  PartProps & {
    releases: Release[];
    panelStyle?: React.CSSProperties;
    topBarStyle?: React.CSSProperties;
  }
> = ({ style, releases, panelStyle, topBarStyle }) => (
  <Interactive.Div
    name="Changelog board"
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
      activeIndex={CHANGELOG_RAIL_ACTIVE}
      activeAccent={CHANGELOG_ACCENT}
      footer={<IconSwitchWorkspace />}
      style={{ background: "transparent" }}
    />

    <ChangelogPanel style={panelStyle} />

    <Interactive.Div
      name="Changelog main"
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
      <ChangelogTable releases={releases} />
    </Interactive.Div>
  </Interactive.Div>
);

export { RAIL_ICONS as CHANGELOG_RAIL_ICONS };
