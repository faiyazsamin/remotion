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
  IconChip,
  IconClipboard,
  IconFeedbackRail,
  IconHomeRail,
  IconMap,
  IconSettings,
  IconSurveys,
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
  <IconHomeRail key="home" />,
  <IconUploadInbox key="support" />,
  <IconFeedbackRail key="feedback" />,
  <IconMap key="roadmap" />,
  <IconCalendar key="changelog" />,
  <IconBook key="help" />,
  <IconClipboard key="surveys" />,
  <IconUsers key="users" />,
  <IconUserPlus key="team" />,
  <IconSurveys key="integrations" />,
  <IconSettings key="settings" />,
  <IconChip key="agents" />,
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
    railPreviousActiveIndex?: number;
    railPreviousAccent?: string;
    railActiveProgress?: number;
    railActiveIndicatorOpacity?: number;
    showNewBadge?: boolean;
    logoStyle?: React.CSSProperties;
    panelStyle?: React.CSSProperties;
    topBarStyle?: React.CSSProperties;
    contentStyle?: React.CSSProperties;
  }
> = ({
  style,
  releases,
  railPreviousActiveIndex,
  railPreviousAccent,
  railActiveProgress,
  railActiveIndicatorOpacity,
  showNewBadge,
  logoStyle,
  panelStyle,
  topBarStyle,
  contentStyle,
}) => (
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
      previousActiveIndex={railPreviousActiveIndex}
      previousActiveAccent={railPreviousAccent}
      activeProgress={railActiveProgress}
      activeIndicatorOpacity={railActiveIndicatorOpacity}
      showNewBadge={showNewBadge}
      logoStyle={logoStyle}
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
        ...contentStyle,
      }}
    >
      <FeedbackBoardTopBar style={topBarStyle} />
      <ChangelogTable releases={releases} />
    </Interactive.Div>
  </Interactive.Div>
);

export { RAIL_ICONS as CHANGELOG_RAIL_ICONS };
