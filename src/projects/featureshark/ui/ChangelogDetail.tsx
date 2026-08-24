import { Interactive } from "remotion";
import { ENTRY_TYPES, type ChangelogEntry } from "./changelogContent";
import { CHANGELOG_RAIL_ACTIVE, CHANGELOG_ACCENT } from "./ChangelogBoard";
import { AdminRail } from "./AdminRail";
import {
  IconBook,
  IconCalendar,
  IconChart,
  IconChat,
  IconChevronDown,
  IconChip,
  IconClipboard,
  IconClose,
  IconHome,
  IconMap,
  IconPencil,
  IconSearch,
  IconSettings,
  IconSparkle,
  IconStatusClosed,
  IconStatusDone,
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

const TOP_BAR_HEIGHT = 78;
const ACTION_BAR_HEIGHT = 62;
const CONTENT_LEFT = GUTTER + RAIL_WIDTH + GUTTER;

/** Centre of the Configuration button, for a scene to open the modal. */
export const configurationCentre = (frameWidth: number) => ({
  x: frameWidth - GUTTER - 24 - 116 - 14 - 84,
  y: GUTTER + TOP_BAR_HEIGHT + ACTION_BAR_HEIGHT / 2,
});

const FOOTER_PADDING = 26;
const SAVE_WIDTH = 113;
const FOOTER_HEIGHT = 76;

/** Centre of the Save button in the editor's footer. */
export const saveCentre = (frameWidth: number, frameHeight: number) => ({
  x: frameWidth - GUTTER - FOOTER_PADDING - SAVE_WIDTH / 2,
  y: frameHeight - GUTTER - FOOTER_HEIGHT / 2,
});

const typeTint = (label: string) =>
  ENTRY_TYPES.find((type) => type.label === label)?.tint ?? BRAND_PURPLE;

/**
 * The release editor. Unlike the list, this page has no filter column — the
 * editor takes the whole card, which is what makes opening a release read as
 * going somewhere rather than opening a pane.
 */
export const ChangelogDetail: React.FC<
  PartProps & {
    title: string;
    entries: ChangelogEntry[];
    actionBarStyle?: React.CSSProperties;
    bodyStyle?: React.CSSProperties;
    entryStyle?: (index: number) => React.CSSProperties;
  }
> = ({ style, title, entries, actionBarStyle, bodyStyle, entryStyle }) => (
  <Interactive.Div
    name="Changelog detail"
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

    <Interactive.Div
      name="Editor"
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
      <div
        style={{
          flexShrink: 0,
          height: TOP_BAR_HEIGHT,
          display: "flex",
          alignItems: "center",
          gap: 18,
          padding: "0 26px",
          boxSizing: "border-box",
        }}
      >
        <span style={{ color: "#5b6172", scale: 1.45, display: "flex" }}>
          <IconSearch />
        </span>
        <span
          style={{
            height: 40,
            borderRadius: 999,
            border: "1.5px solid #cfc6f7",
            color: BRAND_PURPLE,
            display: "flex",
            alignItems: "center",
            gap: 9,
            padding: "0 19px",
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          <IconSparkle size={18} />
          Shark AI
        </span>
      </div>

      <div
        style={{
          flexShrink: 0,
          height: ACTION_BAR_HEIGHT,
          borderTop: "1px solid #eef0f6",
          borderBottom: "1px solid #eef0f6",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          boxSizing: "border-box",
          ...actionBarStyle,
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 16.5,
            color: "#3d4353",
          }}
        >
          <IconStatusClosed size={18} />
          Close
        </span>

        <span
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <span
            style={{
              height: 40,
              borderRadius: 10,
              border: "1.4px solid #e6e7ee",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "0 15px",
              fontSize: 16,
              fontWeight: 600,
              color: "#2b2f38",
            }}
          >
            <IconSettings />
            Configuration
          </span>
          <span
            style={{
              height: 40,
              borderRadius: 10,
              backgroundColor: BRAND_PURPLE,
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "0 16px",
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            <span style={{ scale: 1.2, display: "flex" }}>
              <IconChevronDown />
            </span>
            Actions
          </span>
        </span>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          padding: "34px 60px",
          boxSizing: "border-box",
          ...bodyStyle,
        }}
      >
        <div style={{ fontSize: 17, color: "#6b7280" }}>Title</div>
        <div
          style={{
            marginTop: 8,
            fontSize: 34,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#20242f",
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop: 30,
            fontSize: 17.5,
            fontWeight: 600,
            color: "#3d4353",
          }}
        >
          Changelog Entries <span style={{ color: "#e05a5a" }}>*</span>
        </div>

        {/*
          One rail down the left with a dot per entry — the timeline the editor
          uses to show that a release is a list of changes, not one blob.
        */}
        <div style={{ position: "relative", marginTop: 18, paddingLeft: 46 }}>
          <div
            style={{
              position: "absolute",
              left: 5,
              top: 8,
              bottom: 18,
              width: 2,
              backgroundColor: "#e6e7ee",
            }}
          />

          {entries.map((entry, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                paddingBottom: 40,
                ...entryStyle?.(index),
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: -46,
                  top: 9,
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: typeTint(entry.type),
                }}
              />
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  height: 38,
                  borderRadius: 999,
                  backgroundColor: typeTint(entry.type),
                  color: "#ffffff",
                  padding: "0 16px",
                  fontSize: 16.5,
                  fontWeight: 700,
                }}
              >
                {entry.type}
                <IconClose size={13} />
              </span>
              <div
                style={{
                  marginTop: 22,
                  fontSize: 17,
                  lineHeight: 1.62,
                  color: "#3d4353",
                }}
              >
                {entry.body}
              </div>
            </div>
          ))}

          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: -46,
                top: 9,
                width: 12,
                height: 12,
                borderRadius: "50%",
                border: `2px solid ${BRAND_PURPLE}`,
                backgroundColor: "#ffffff",
                boxSizing: "border-box",
              }}
            />
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 11,
                height: 42,
                borderRadius: 10,
                border: `1.5px solid ${BRAND_PURPLE}`,
                color: BRAND_PURPLE,
                padding: "0 17px",
                fontSize: 16.5,
                fontWeight: 700,
              }}
            >
              <IconPencil size={17} />
              Add Entry
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          flexShrink: 0,
          height: FOOTER_HEIGHT,
          borderTop: "1px solid #eef0f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: `0 ${FOOTER_PADDING}px`,
          boxSizing: "border-box",
        }}
      >
        <span
          style={{
            width: SAVE_WIDTH,
            height: 44,
            borderRadius: 10,
            backgroundColor: "#8b7bf0",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 11,
            fontSize: 16.5,
            fontWeight: 700,
          }}
        >
          <IconStatusDone size={18} />
          Save
        </span>
      </div>
    </Interactive.Div>
  </Interactive.Div>
);

export { CONTENT_LEFT as CHANGELOG_EDITOR_LEFT };
