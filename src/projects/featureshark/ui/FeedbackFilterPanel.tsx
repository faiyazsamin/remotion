import { Img, Interactive, staticFile } from "remotion";
import {
  IconBug,
  IconBulb,
  IconCalendar,
  IconChevronDown,
  IconClock,
  IconEllipsis,
  IconFlame,
  IconHelpCircle,
  IconSortBars,
} from "./icons";
import { STATUS_META } from "./statuses";
import { BRAND_PURPLE, type PartProps } from "./tokens";

export const FILTER_PANEL_WIDTH = 324;

const HEADING: React.CSSProperties = {
  fontSize: 12.5,
  fontWeight: 700,
  letterSpacing: "0.07em",
  color: "#8b91a3",
};

const SELECT: React.CSSProperties = {
  marginTop: 11,
  height: 42,
  borderRadius: 10,
  border: "1.3px solid #e5e7f0",
  display: "flex",
  alignItems: "center",
  gap: 11,
  padding: "0 13px",
  boxSizing: "border-box",
  fontSize: 15,
  fontWeight: 600,
  color: "#2b2f3a",
};

const CREATE: React.CSSProperties = {
  marginTop: 14,
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 15,
  fontWeight: 600,
  color: "#3d4353",
};

const BOARD_ROWS = [
  { label: "Bug Reports", icon: <IconBug />, tint: "#e05a5a" },
  { label: "Feature Requests", icon: <IconFlame />, tint: "#2fb47c" },
  { label: "Improvements", icon: <IconBulb />, tint: "#b06cf0" },
];

/** Counts shown against each status and board, keyed by label. */
export type FilterCounts = Record<string, number>;

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

/** One selectable status or board, with its count and overflow menu. */
const FilterRow: React.FC<{
  label: string;
  icon: React.ReactNode;
  tint: string;
  count: number;
}> = ({ label, icon, tint, count }) => (
  <div
    style={{
      marginTop: 15,
      display: "flex",
      alignItems: "center",
      gap: 11,
      fontSize: 15,
    }}
  >
    <Checkbox />
    <span style={{ color: tint, display: "flex" }}>{icon}</span>
    <span style={{ flex: 1, fontWeight: 600, color: "#2b2f3a" }}>{label}</span>
    <span
      style={{
        minWidth: 22,
        height: 20,
        borderRadius: 6,
        backgroundColor: "#f1f2f7",
        color: "#7b8194",
        fontSize: 12.5,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {count}
    </span>
    <span style={{ color: "#b9bec9", display: "flex" }}>
      <IconEllipsis size={15} />
    </span>
  </div>
);

const SectionHeader: React.FC<{ label: string }> = ({ label }) => (
  <div
    style={{
      marginTop: 26,
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
 * The board's left column: date range, sort, and the status / board / category
 * filter lists. Everything reads zero because this workspace has exactly one
 * piece of feedback in it — the one the visitor just sent.
 */
export const FeedbackFilterPanel: React.FC<
  PartProps & { counts?: FilterCounts }
> = ({ style, counts = {} }) => (
  <Interactive.Div
    name="Filter panel"
    style={{
      width: FILTER_PANEL_WIDTH,
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
        <Img
          src={staticFile("featureshark/logo-square.svg")}
          style={{ width: 26, height: 26, borderRadius: 7 }}
        />
        <span style={{ fontSize: 21, fontWeight: 700, color: "#1f232e" }}>
          Feedback
        </span>
        <span style={{ color: "#b3b8c4", display: "flex" }}>
          <IconHelpCircle size={17} />
        </span>
        <div
          style={{
            marginLeft: "auto",
            height: 34,
            borderRadius: 9,
            border: `1.4px solid ${BRAND_PURPLE}`,
            color: BRAND_PURPLE,
            display: "flex",
            alignItems: "center",
            gap: 9,
            padding: "0 12px",
            fontSize: 15,
            fontWeight: 700,
          }}
        >
          New
          <span style={{ scale: 1.3, display: "flex" }}>
            <IconChevronDown />
          </span>
        </div>
      </div>

      <div style={{ marginTop: 26 }}>
        <span style={HEADING}>DATE RANGE</span>
        <div style={SELECT}>
          <span style={{ color: "#7b8194", scale: 1.15, display: "flex" }}>
            <IconCalendar />
          </span>
          <span style={{ flex: 1, textAlign: "center" }}>All time</span>
          <span style={{ color: "#9aa0ad", scale: 1.3, display: "flex" }}>
            <IconChevronDown />
          </span>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <span style={HEADING}>SORT BY</span>
        <div style={SELECT}>
          <span style={{ color: "#7b8194", display: "flex" }}>
            <IconSortBars size={16} />
          </span>
          <span style={{ flex: 1, textAlign: "center" }}>Newest</span>
          <span style={{ color: "#9aa0ad", scale: 1.3, display: "flex" }}>
            <IconChevronDown />
          </span>
        </div>
      </div>

      <SectionHeader label="STATUS" />
      <div style={CREATE}>
        <span style={{ color: "#3d4353", fontSize: 17 }}>+</span> Create Status
      </div>
      {STATUS_META.map((status) => (
        <FilterRow
          key={status.label}
          label={status.label}
          icon={<status.Icon />}
          tint={status.tint}
          count={counts[status.label] ?? 0}
        />
      ))}

      <SectionHeader label="BOARDS" />
      <div style={CREATE}>
        <span style={{ color: "#3d4353", fontSize: 17 }}>+</span> Create Board
      </div>
      {BOARD_ROWS.map((row) => (
        <FilterRow key={row.label} {...row} count={counts[row.label] ?? 0} />
      ))}

      <SectionHeader label="CATEGORIES" />
      <div style={CREATE}>
        <span style={{ color: "#3d4353", fontSize: 17 }}>+</span> Create Category
      </div>
      <div style={{ marginTop: 18, fontSize: 15, color: "#a2a8b6" }}>
        No categories yet
      </div>
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
      Trial: 14 days remaining
    </div>
  </Interactive.Div>
);
