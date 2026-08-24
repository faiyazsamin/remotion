import { Interactive } from "remotion";
import { AdminRail } from "./AdminRail";
import {
  BOARD_TOP_BAR_HEIGHT,
  FeedbackBoardTopBar,
} from "./FeedbackBoardTopBar";
import { HELP_ACCENT, HELP_LOCALE, HELP_TOPIC } from "./helpCenterContent";
import {
  IconBook,
  IconCalendar,
  IconChart,
  IconChat,
  IconChevronDown,
  IconClock,
  IconChip,
  IconClipboard,
  IconEllipsis,
  IconHelpCircle,
  IconHome,
  IconMap,
  IconPlus,
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
  BRAND_PURPLE,
  FONT_STACK,
  scaled,
  type PartProps,
} from "./tokens";

const GUTTER = ADMIN_GUTTER;
const RAIL_WIDTH = scaled(46);
const PANEL_WIDTH = 350;

/** The rail is the same everywhere; Help Center is the sixth slot. */
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

export const HELP_RAIL_ACTIVE = 5;

const LOCALE_BAR_HEIGHT = 66;
const TABLE_HEADER_HEIGHT = 58;
const MAIN_LEFT = GUTTER + RAIL_WIDTH + GUTTER + PANEL_WIDTH + GUTTER;

/*
  The empty state, stacked from the top of the card body. Every step has an
  explicit height so the button's centre can be worked out rather than guessed.
*/
const EMPTY_TOP = 74;
const EMPTY_ART = 152;
const EMPTY_TITLE_GAP = 30;
const EMPTY_TITLE_HEIGHT = 42;
const EMPTY_COPY_GAP = 14;
const EMPTY_COPY_HEIGHT = 54;
const EMPTY_BUTTON_GAP = 28;
const EMPTY_BUTTON_HEIGHT = 60;
export const NEW_ARTICLE_BUTTON_WIDTH = 200;

const BODY_TOP =
  GUTTER + BOARD_TOP_BAR_HEIGHT + LOCALE_BAR_HEIGHT + TABLE_HEADER_HEIGHT;

/** Centre of the New Article button, the empty state's one action. */
export const newArticleCentre = (frameWidth: number) => ({
  x: MAIN_LEFT + (frameWidth - GUTTER - MAIN_LEFT) / 2,
  y:
    BODY_TOP +
    EMPTY_TOP +
    EMPTY_ART +
    EMPTY_TITLE_GAP +
    EMPTY_TITLE_HEIGHT +
    EMPTY_COPY_GAP +
    EMPTY_COPY_HEIGHT +
    EMPTY_BUTTON_GAP +
    EMPTY_BUTTON_HEIGHT / 2,
});

export const newArticleRect = (frameWidth: number) => {
  const centre = newArticleCentre(frameWidth);

  return {
    x: centre.x - NEW_ARTICLE_BUTTON_WIDTH / 2,
    y: centre.y - EMPTY_BUTTON_HEIGHT / 2,
    width: NEW_ARTICLE_BUTTON_WIDTH,
    height: EMPTY_BUTTON_HEIGHT,
  };
};

/** A drawn flag, because emoji do not render in the renderer's font stack. */
const FlagUS: React.FC = () => (
  <svg width={22} height={15} viewBox="0 0 22 15">
    <rect width="22" height="15" rx="2" fill="#f0f0f0" />
    {[0, 2, 4, 6].map((row) => (
      <rect
        key={row}
        y={row * 3.75 + 1.9}
        width="22"
        height="1.9"
        fill="#d8232f"
      />
    ))}
    <rect width="10" height="8" rx="1" fill="#2a3560" />
  </svg>
);

const Checkbox: React.FC = () => (
  <div
    style={{
      width: 18,
      height: 18,
      borderRadius: 5,
      border: "1.7px solid #d3d7e2",
      flexShrink: 0,
    }}
  />
);

const COLUMNS: { label: string; width?: number; flex?: number }[] = [
  { label: "Article Name", flex: 1 },
  { label: "Status", width: 240 },
  { label: "Views", width: 210 },
  { label: "Created", width: 340 },
];

/**
 * Help Center with nothing in it yet: the topic the admin made, and an empty
 * article list offering the one action worth taking.
 */
export const HelpCenterBoard: React.FC<
  PartProps & {
    emptyStyle?: React.CSSProperties;
    buttonStyle?: React.CSSProperties;
    panelStyle?: React.CSSProperties;
  }
> = ({ style, emptyStyle, buttonStyle, panelStyle }) => (
  <Interactive.Div
    name="Help Center board"
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
      activeIndex={HELP_RAIL_ACTIVE}
      activeAccent={HELP_ACCENT}
      footer={<IconSwitchWorkspace />}
      style={{ background: "transparent" }}
    />

    <Interactive.Aside
      name="Help Center panel"
      style={{
        width: PANEL_WIDTH,
        flexShrink: 0,
        backgroundColor: "#f7f7fb",
        borderRadius: ADMIN_CARD_RADIUS,
        display: "flex",
        flexDirection: "column",
        padding: "0 26px",
        boxSizing: "border-box",
        ...panelStyle,
      }}
    >
      <div
        style={{
          height: BOARD_TOP_BAR_HEIGHT,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            backgroundColor: HELP_ACCENT,
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconBook />
        </span>
        <span style={{ fontSize: 21, fontWeight: 700, color: "#1f232e" }}>
          Help Center
        </span>
        <span style={{ color: "#b9bec9", display: "flex" }}>
          <IconHelpCircle size={17} />
        </span>
        <span
          style={{
            marginLeft: "auto",
            height: 36,
            borderRadius: 9,
            backgroundColor: BRAND_PURPLE,
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "0 14px",
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          New
          <span style={{ scale: 1.1, display: "flex" }}>
            <IconChevronDown />
          </span>
        </span>
      </div>

      <div
        style={{
          marginTop: 26,
          display: "flex",
          alignItems: "center",
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "0.08em",
          color: "#8b91a3",
        }}
      >
        TOPICS
        <span style={{ marginLeft: "auto", scale: 1.15, display: "flex" }}>
          <IconChevronDown />
        </span>
      </div>

      <div
        style={{
          marginTop: 30,
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontSize: 17,
          color: "#2b2f38",
        }}
      >
        <IconPlus size={15} />
        Create Topic
      </div>

      {/* The one topic there is, and the article about to land in it. */}
      <div
        style={{
          marginTop: 26,
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontSize: 17,
          color: "#2b2f38",
        }}
      >
        <Checkbox />
        <span style={{ color: "#8b91a3", display: "flex" }}>
          <IconBook />
        </span>
        {HELP_TOPIC}
        <span style={{ marginLeft: "auto", color: "#b9bec9", display: "flex" }}>
          <IconEllipsis size={16} />
        </span>
      </div>

      <div
        style={{
          marginTop: "auto",
          paddingBottom: 22,
          display: "flex",
          alignItems: "center",
          gap: 11,
          fontSize: 17,
          color: "#3d4353",
        }}
      >
        <IconSettings />
        Settings
      </div>

      <div
        style={{
          borderTop: "1px solid #e8e9f0",
          paddingBottom: 22,
          paddingTop: 18,
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontSize: 16,
          color: "#6b7280",
        }}
      >
        <IconClock size={16} />
        Trial: 13 days remaining
      </div>
    </Interactive.Aside>

    <Interactive.Div
      name="Help Center main"
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
      <FeedbackBoardTopBar />

      {/* Which locale the article list is showing. */}
      <div
        style={{
          height: LOCALE_BAR_HEIGHT,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 26px",
          boxSizing: "border-box",
        }}
      >
        <span
          style={{
            height: 42,
            borderRadius: 10,
            border: "1.4px solid #e6e7ee",
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0 14px",
            fontSize: 16.5,
            color: "#2b2f38",
          }}
        >
          <FlagUS />
          {HELP_LOCALE}
          <span style={{ color: "#8b91a3", scale: 1.15, display: "flex" }}>
            <IconChevronDown />
          </span>
        </span>
      </div>

      <div
        style={{
          height: TABLE_HEADER_HEIGHT,
          flexShrink: 0,
          borderTop: "1px solid #eef0f6",
          borderBottom: "1px solid #eef0f6",
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "0 24px",
          boxSizing: "border-box",
          fontSize: 15,
          fontWeight: 700,
          color: BRAND_PURPLE,
        }}
      >
        <Checkbox />
        {COLUMNS.map((column) => (
          <div
            key={column.label}
            style={{
              width: column.width,
              flex: column.flex,
              flexShrink: column.width ? 0 : 1,
              minWidth: 0,
            }}
          >
            {column.label}
          </div>
        ))}
      </div>

      {/*
        Nothing to list yet, so the empty state carries the action instead of the
        toolbar — the only thing to do here is write the first article.
      */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: EMPTY_TOP,
          ...emptyStyle,
        }}
      >
        <div
          style={{
            width: EMPTY_ART,
            height: EMPTY_ART,
            borderRadius: "50%",
            backgroundColor: "#f5f5fa",
            color: "#c9cbe4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconEllipsis size={34} />
        </div>

        <div
          style={{
            marginTop: EMPTY_TITLE_GAP,
            height: EMPTY_TITLE_HEIGHT,
            fontSize: 32,
            fontWeight: 700,
            color: "#20242f",
          }}
        >
          No results found
        </div>
        <div
          style={{
            marginTop: EMPTY_COPY_GAP,
            width: 400,
            height: EMPTY_COPY_HEIGHT,
            textAlign: "center",
            fontSize: 18,
            lineHeight: "27px",
            color: "#6b7280",
          }}
        >
          We couldn&apos;t find any data matching your current filters.
        </div>

        <Interactive.Div
          name="New Article"
          style={{
            marginTop: EMPTY_BUTTON_GAP,
            height: EMPTY_BUTTON_HEIGHT,
            width: NEW_ARTICLE_BUTTON_WIDTH,
            borderRadius: 999,
            backgroundColor: BRAND_PURPLE,
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 13,
            fontSize: 19,
            fontWeight: 700,
            boxShadow: "0 14px 30px rgba(92, 69, 223, 0.32)",
            ...buttonStyle,
          }}
        >
          <IconPlus size={18} />
          New Article
        </Interactive.Div>
      </div>
    </Interactive.Div>
  </Interactive.Div>
);

export { MAIN_LEFT as HELP_MAIN_LEFT, RAIL_ICONS as HELP_RAIL_ICONS };
