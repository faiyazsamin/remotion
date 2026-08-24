import { Interactive } from "remotion";
import { ENTRY_TYPES, RELEASE_STATUSES } from "./changelogContent";
import {
  IconBug,
  IconBulb,
  IconCalendar,
  IconChevronDown,
  IconClock,
  IconEllipsis,
  IconFlame,
  IconHelpCircle,
  IconPaperPlane,
  IconPencil,
} from "./icons";
import { BRAND_PURPLE, type PartProps } from "./tokens";

export const CHANGELOG_PANEL_WIDTH = 324;

const HEADING: React.CSSProperties = {
  fontSize: 12.5,
  fontWeight: 700,
  letterSpacing: "0.07em",
  color: "#8b91a3",
};

/** Each release status carries the glyph that describes how it ships. */
const STATUS_ICONS: Record<string, React.ReactNode> = {
  Published: <IconPaperPlane size={17} />,
  Draft: <IconPencil size={17} />,
  Scheduled: <IconCalendar />,
};

const TYPE_ICONS: Record<string, React.ReactNode> = {
  New: <IconFlame />,
  Improved: <IconBulb />,
  Fixed: <IconBug />,
};

const Checkbox: React.FC = () => (
  <div
    style={{
      width: 17,
      height: 17,
      borderRadius: 5,
      border: "1.6px solid #d8dbe5",
      flexShrink: 0,
    }}
  />
);

const Row: React.FC<{
  label: string;
  icon: React.ReactNode;
  tint: string;
  overflow?: boolean;
}> = ({ label, icon, tint, overflow }) => (
  <div
    style={{
      marginTop: 16,
      display: "flex",
      alignItems: "center",
      gap: 11,
      fontSize: 15.5,
    }}
  >
    <Checkbox />
    <span style={{ color: tint, display: "flex" }}>{icon}</span>
    <span style={{ flex: 1, fontWeight: 600, color: "#2b2f3a" }}>{label}</span>
    {overflow ? (
      <span style={{ color: "#b9bec9", display: "flex" }}>
        <IconEllipsis size={15} />
      </span>
    ) : null}
  </div>
);

const SectionHeader: React.FC<{ label: string }> = ({ label }) => (
  <div
    style={{
      marginTop: 28,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <span style={HEADING}>{label}</span>
    <span style={{ color: "#9aa0ad", scale: 1.3, display: "flex" }}>
      <IconChevronDown />
    </span>
  </div>
);

/**
 * The changelog's left column. Same shape as the feedback board's filter column
 * — sort, then the lists you can filter by — so the pages read as one app.
 */
export const ChangelogPanel: React.FC<PartProps> = ({ style }) => (
  <Interactive.Div
    name="Changelog panel"
    style={{
      width: CHANGELOG_PANEL_WIDTH,
      flexShrink: 0,
      backgroundColor: "#ffffff",
      borderRadius: 14,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      ...style,
    }}
  >
    <div style={{ flex: 1, minHeight: 0, padding: "22px 24px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ color: "#e8752f", display: "flex" }}>
          <IconCalendar />
        </span>
        <span style={{ fontSize: 21, fontWeight: 700, color: "#1f232e" }}>
          Changelog
        </span>
        <span style={{ color: "#b3b8c4", display: "flex" }}>
          <IconHelpCircle size={17} />
        </span>
        <div
          style={{
            marginLeft: "auto",
            height: 34,
            borderRadius: 9,
            backgroundColor: BRAND_PURPLE,
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "0 13px",
            fontSize: 15,
            fontWeight: 700,
          }}
        >
          New
          <span style={{ scale: 1.2, display: "flex" }}>
            <IconChevronDown />
          </span>
        </div>
      </div>

      <div style={{ marginTop: 26 }}>
        <span style={HEADING}>SORT BY</span>
        <div
          style={{
            marginTop: 11,
            height: 42,
            borderRadius: 10,
            border: "1.3px solid #e5e7f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 13px",
            boxSizing: "border-box",
            fontSize: 15,
            fontWeight: 600,
            color: "#2b2f3a",
          }}
        >
          Newest
          <span style={{ color: "#9aa0ad", scale: 1.3, display: "flex" }}>
            <IconChevronDown />
          </span>
        </div>
      </div>

      <SectionHeader label="STATUS" />
      {RELEASE_STATUSES.map((status) => (
        <Row
          key={status}
          label={status}
          icon={STATUS_ICONS[status]}
          tint="#7b8194"
        />
      ))}

      <SectionHeader label="TYPES" />
      <div
        style={{
          marginTop: 16,
          display: "flex",
          alignItems: "center",
          gap: 9,
          fontSize: 15.5,
          fontWeight: 600,
          color: "#3d4353",
        }}
      >
        <span style={{ color: "#3d4353", fontSize: 17 }}>+</span> Create Type
      </div>
      {ENTRY_TYPES.map((type) => (
        <Row
          key={type.label}
          label={type.label}
          icon={TYPE_ICONS[type.label]}
          tint={type.tint}
          overflow
        />
      ))}
    </div>

    <div
      style={{
        flexShrink: 0,
        height: 52,
        borderTop: "1px solid #eef0f6",
        backgroundColor: "#fbfbfe",
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "0 24px",
        fontSize: 14.5,
        fontWeight: 600,
        color: "#4d5464",
      }}
    >
      <span style={{ color: "#7b8194", display: "flex" }}>
        <IconClock size={16} />
      </span>
      Trial: 13 days remaining
    </div>
  </Interactive.Div>
);
