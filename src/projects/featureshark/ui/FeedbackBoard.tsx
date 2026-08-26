import { Interactive } from "remotion";
import { AdminRail } from "./AdminRail";
import {
  BOARD_TOP_BAR_HEIGHT,
  FeedbackBoardTopBar,
} from "./FeedbackBoardTopBar";
import {
  FeedbackFilterPanel,
  FILTER_PANEL_WIDTH,
  type FilterCounts,
} from "./FeedbackFilterPanel";
import { DETAIL_PANEL_WIDTH } from "./FeedbackDetailPanel";
import {
  FeedbackTable,
  TABLE_CHECKBOX,
  TABLE_GAP,
  TABLE_HEADER_HEIGHT,
  TABLE_PADDING,
  TABLE_ROW_HEIGHT,
  TABLE_VOTES_WIDTH,
  type FeedbackRow,
} from "./FeedbackTable";
import { SHARK_PANEL_WIDTH } from "./SharkAiPanel";
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
  SITE_WIDTH,
  type PartProps,
} from "./tokens";

/** Gap between the purple ground and the cards that float on it. */
const GUTTER = ADMIN_GUTTER;
const RAIL_WIDTH = scaled(46);

/**
 * The board's rail lists the same destinations as Admin Home, but Feedback is
 * the page you are on, so the third slot is active and tinted green.
 */
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

/** Index of the rail slot for this page. */
export const BOARD_RAIL_ACTIVE = 2;

/**
 * Centre of the Shark AI pill in frame coordinates, for a scene to aim a cursor
 * at. Walked across the top bar's own box: rail, gutter, filter panel, gutter,
 * then the bar's padding and the two icons before the pill.
 */
export const sharkCentre = () => {
  const mainLeft = GUTTER + RAIL_WIDTH + GUTTER + FILTER_PANEL_WIDTH + GUTTER;

  return { x: mainLeft + 26 + 21 + 18 + 22 + 18 + 62, y: GUTTER + 39 };
};

/**
 * Centres of the detail pane's header controls, walked in from the pane's right
 * edge past the ones after them, so they track the header's own layout.
 *
 * `sharkOpen` matters because the pane's right edge is the main card's, and the
 * Shark AI panel takes width off it.
 */
export const detailHeaderCentre = (
  icon: "expand" | "preview" | "close",
  { sharkOpen = true }: { sharkOpen?: boolean } = {},
) => {
  const paneRight =
    SITE_WIDTH - GUTTER - (sharkOpen ? SHARK_PANEL_WIDTH + GUTTER : 0);
  const padding = 20;
  const gap = 13;
  const close = 18;
  const preview = 23;
  const expand = 18;

  const fromRight = {
    close: padding + close / 2,
    preview: padding + close + gap + preview / 2,
    expand: padding + close + gap + preview + gap + expand / 2,
  }[icon];

  return {
    x: paneRight - fromRight,
    y: GUTTER + BOARD_TOP_BAR_HEIGHT + 34,
  };
};

/** Kept for callers that only want the expand control on the default layout. */
export const detailExpandCentre = () => detailHeaderCentre("expand");

/**
 * Centre of a feedback row's title, for a scene to click it open. Walked across
 * the table's own box model so it cannot drift from the layout.
 *
 * `filterOpen` matters because the table starts where the filter column ends,
 * and `index` picks the row — the board is newest-first.
 */
export const rowTitleCentre = ({
  filterOpen = false,
  index = 0,
}: { filterOpen?: boolean; index?: number } = {}) => {
  const mainLeft =
    GUTTER +
    RAIL_WIDTH +
    (filterOpen ? GUTTER + FILTER_PANEL_WIDTH + GUTTER : 0);
  const titleLeft =
    mainLeft +
    TABLE_PADDING +
    TABLE_CHECKBOX +
    TABLE_GAP +
    TABLE_VOTES_WIDTH +
    TABLE_GAP;

  return {
    x: titleLeft + 60,
    y:
      GUTTER +
      BOARD_TOP_BAR_HEIGHT +
      TABLE_HEADER_HEIGHT +
      index * TABLE_ROW_HEIGHT +
      TABLE_ROW_HEIGHT / 2,
  };
};

/**
 * Centre of the table header's select-all checkbox. Walked across the same box
 * model the table lays out with.
 */
export const headerCheckboxCentre = ({
  filterOpen = false,
}: { filterOpen?: boolean } = {}) => ({
  x:
    GUTTER +
    RAIL_WIDTH +
    (filterOpen ? GUTTER + FILTER_PANEL_WIDTH + GUTTER : 0) +
    TABLE_PADDING +
    TABLE_CHECKBOX / 2,
  y: GUTTER + BOARD_TOP_BAR_HEIGHT + TABLE_HEADER_HEIGHT / 2,
});

/** Centre of the Shark AI panel's close control. */
export const sharkCloseCentre = () => ({
  x: SITE_WIDTH - GUTTER - 20 - 9.5,
  y: GUTTER + 34,
});

/**
 * The Feedback board: rail, filter column, and the feedback table.
 *
 * Unlike Admin Home this page is not one window — the columns are separate cards
 * floating on the purple ground with a gutter between them, which is why it has
 * its own ground rather than reusing `AdminHomeBackdrop`.
 */
export const FeedbackBoard: React.FC<
  PartProps & {
    railIconStyle?: (index: number) => React.CSSProperties;
    railPreviousActiveIndex?: number;
    railPreviousAccent?: string;
    railActiveProgress?: number;
    railActiveIndicatorOpacity?: number;
    panelStyle?: React.CSSProperties;
    topBarStyle?: React.CSSProperties;
    contentStyle?: React.CSSProperties;
    sharkStyle?: React.CSSProperties;
    /** Rows, newest first. */
    rows: FeedbackRow[];
    /** Status and board counts for the filter column. */
    counts?: FilterCounts;
    /** Select-all state in the table header. */
    allChecked?: boolean;
    /** Anything floating over the page: the bulk bar, its menu, toasts. */
    overlay?: React.ReactNode;
    /** 0 = detail pane closed, 1 = fully open. */
    detailOpen?: number;
    detailPanel?: React.ReactNode;
    /**
     * 0 = filter column open, 1 = fully collapsed. Drives the column's own
     * width, so the table beside it reflows rather than being covered.
     */
    filterCollapse?: number;
    /** 0 = Shark AI panel closed, 1 = fully open. Same reasoning. */
    sharkOpen?: number;
    sharkPanel?: React.ReactNode;
  }
> = ({
  style,
  railIconStyle,
  railPreviousActiveIndex,
  railPreviousAccent,
  railActiveProgress,
  railActiveIndicatorOpacity,
  panelStyle,
  topBarStyle,
  contentStyle,
  sharkStyle,
  rows,
  counts,
  allChecked,
  overlay,
  detailOpen = 0,
  detailPanel,
  filterCollapse = 0,
  sharkOpen = 0,
  sharkPanel,
}) => (
  <Interactive.Div
    name="Feedback board"
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
      activeIndex={BOARD_RAIL_ACTIVE}
      activeAccent="#2fb47c"
      previousActiveIndex={railPreviousActiveIndex}
      previousActiveAccent={railPreviousAccent}
      activeProgress={railActiveProgress}
      activeIndicatorOpacity={railActiveIndicatorOpacity}
      iconStyle={railIconStyle}
      style={{ background: "transparent" }}
    />

    {/*
      Collapsing by width rather than by translate, so the main card genuinely
      grows into the space and the table's columns reflow with it. The negative
      margin eats the flex gap the empty column would otherwise still hold.
    */}
    <div
      style={{
        width: FILTER_PANEL_WIDTH * (1 - filterCollapse),
        marginRight: -GUTTER * filterCollapse,
        flexShrink: 0,
        overflow: "hidden",
        display: "flex",
      }}
    >
      <FeedbackFilterPanel style={panelStyle} counts={counts} />
    </div>

    <Interactive.Div
      name="Board main"
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
      <FeedbackBoardTopBar style={topBarStyle} sharkStyle={sharkStyle} />

      {/*
        The detail pane splits the card rather than floating over it, so opening
        it squeezes the table and its columns reflow.
      */}
      <div style={{ flex: 1, minHeight: 0, display: "flex" }}>
        <FeedbackTable rows={rows} allChecked={allChecked} />

        {detailPanel ? (
          <div
            style={{
              width: DETAIL_PANEL_WIDTH * detailOpen,
              flexShrink: 0,
              overflow: "hidden",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {detailPanel}
          </div>
        ) : null}
      </div>
    </Interactive.Div>

    {sharkPanel ? (
      <div
        style={{
          width: SHARK_PANEL_WIDTH * sharkOpen,
          marginLeft: -GUTTER * (1 - sharkOpen),
          flexShrink: 0,
          overflow: "hidden",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {sharkPanel}
      </div>
    ) : null}

    {overlay}
  </Interactive.Div>
);

/** Kept beside the layout so a scene's cursor maths cannot drift from it. */
export const BOARD_FRAME_WIDTH = SITE_WIDTH;
