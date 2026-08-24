import { Interactive } from "remotion";
import {
  IconBook,
  IconCalendar,
  IconChat,
  IconHomeOutline,
  IconUploadInbox,
} from "./icons";
import {
  WIDGET_HEIGHT,
  WIDGET_NAV_HEIGHT,
  WIDGET_RIGHT,
  WIDGET_TOP,
  WIDGET_WIDTH,
  type PartProps,
} from "./tokens";

/**
 * The widget's tab bar. Every glyph but Home is reused straight from the admin
 * rail's icon set; Home needs the outline variant here.
 *
 * `IconChat`, `IconUploadInbox`, `IconBook` and `IconCalendar` render at a fixed
 * 15px for the rail, so each is scaled up from its own centre to tab size.
 */
export const WIDGET_TABS = [
  { label: "Home", icon: <IconHomeOutline size={25} />, scaled: false },
  { label: "Messages", icon: <IconUploadInbox />, scaled: true },
  { label: "Help", icon: <IconBook />, scaled: true },
  { label: "Updates", icon: <IconCalendar />, scaled: true },
  { label: "Feedback", icon: <IconChat />, scaled: true },
];

/** Index of the tab the panel opened on. */
export const ACTIVE_TAB = 4;

/** Centre of one tab, for a scene to switch views. */
export const widgetTabCentre = (index: number, frameWidth: number) => {
  const inner = WIDGET_WIDTH - 16;

  return {
    x:
      frameWidth -
      WIDGET_RIGHT -
      WIDGET_WIDTH +
      8 +
      (index + 0.5) * (inner / WIDGET_TABS.length),
    y: WIDGET_TOP + WIDGET_HEIGHT - WIDGET_NAV_HEIGHT / 2,
  };
};

export const FeedbackWidgetNav: React.FC<
  PartProps & {
    /** Which tab is on; defaults to the one the panel opens on. */
    activeIndex?: number;
    tabStyle?: (index: number) => React.CSSProperties;
  }
> = ({ style, activeIndex = ACTIVE_TAB, tabStyle }) => (
  <Interactive.Nav
    name="Widget tabs"
    style={{
      height: 74,
      flexShrink: 0,
      backgroundColor: "#ffffff",
      borderTop: "1px solid #ededf2",
      display: "flex",
      alignItems: "stretch",
      padding: "0 8px",
      boxSizing: "border-box",
      ...style,
    }}
  >
    {WIDGET_TABS.map((tab, index) => {
      const active = index === activeIndex;

      return (
        <div
          key={tab.label}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            borderRadius: 10,
            margin: "7px 2px",
            backgroundColor: active ? "#f4f4f8" : "transparent",
            color: active ? "#1f232e" : "#71778a",
            ...tabStyle?.(index),
          }}
        >
          <div style={{ height: 25, display: "flex", alignItems: "center" }}>
            {tab.scaled ? <div style={{ scale: 1.6 }}>{tab.icon}</div> : tab.icon}
          </div>
          <div style={{ fontSize: 12.5, fontWeight: active ? 600 : 500 }}>
            {tab.label}
          </div>
        </div>
      );
    })}
  </Interactive.Nav>
);
