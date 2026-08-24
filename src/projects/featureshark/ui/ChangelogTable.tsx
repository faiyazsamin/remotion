import { Interactive } from "remotion";
import { ENTRY_TYPES, RELEASE_STATUS_TINTS } from "./changelogContent";
import {
  IconCalendar,
  IconEllipsis,
  IconFlame,
  IconPaperPlane,
  IconPencil,
} from "./icons";
import {
  TABLE_CHECKBOX,
  TABLE_GAP,
  TABLE_HEADER_HEIGHT,
  TABLE_PADDING,
  TABLE_ROW_HEIGHT,
} from "./FeedbackTable";
import { BRAND_PURPLE, type PartProps } from "./tokens";

const COLUMNS: { label: string; width?: number; flex?: number }[] = [
  { label: "Release Title", flex: 1 },
  { label: "Status", width: 210 },
  { label: "Views", width: 150 },
  { label: "Date", width: 250 },
  { label: "", width: 40 },
];

export type Release = {
  title: string;
  /** One pill per entry in the release. */
  types: string[];
  status: string;
  views: number;
  date: string;
  selected?: boolean;
  style?: React.CSSProperties;
};

const cell = (
  column: (typeof COLUMNS)[number],
): React.CSSProperties => ({
  width: column.width,
  flex: column.flex,
  flexShrink: column.width ? 0 : 1,
  minWidth: 0,
});

const Checkbox: React.FC = () => (
  <div
    style={{
      width: TABLE_CHECKBOX,
      height: TABLE_CHECKBOX,
      borderRadius: 5,
      border: "1.7px solid #d3d7e2",
      flexShrink: 0,
    }}
  />
);

const typeTint = (label: string) =>
  ENTRY_TYPES.find((type) => type.label === label)?.tint ?? "#2f6fdb";

const STATUS_ICONS: Record<string, React.ReactNode> = {
  Published: <IconPaperPlane size={15} />,
  Draft: <IconPencil size={15} />,
  Scheduled: (
    <span style={{ scale: 15 / 24, display: "flex" }}>
      <IconCalendar />
    </span>
  ),
};

/**
 * Where a release row's title sits, for a scene to click it open. The changelog
 * table reuses the feedback table's box model, so the offsets come from there.
 */
export const releaseTitleCentre = ({
  left,
  index = 0,
}: {
  left: number;
  index?: number;
}) => ({
  x: left + TABLE_PADDING + TABLE_CHECKBOX + TABLE_GAP + 100,
  y:
    TABLE_HEADER_HEIGHT +
    index * TABLE_ROW_HEIGHT +
    TABLE_ROW_HEIGHT / 2,
});

/** The list of releases: what shipped, and whether it has shipped yet. */
export const ChangelogTable: React.FC<
  PartProps & { releases: Release[] }
> = ({ style, releases }) => (
  <Interactive.Div
    name="Changelog table"
    style={{ flex: 1, minWidth: 0, minHeight: 0, ...style }}
  >
    <div
      style={{
        height: TABLE_HEADER_HEIGHT,
        borderBottom: "1px solid #eef0f6",
        display: "flex",
        alignItems: "center",
        gap: TABLE_GAP,
        padding: `0 ${TABLE_PADDING}px`,
        boxSizing: "border-box",
        fontSize: 15,
        fontWeight: 700,
        color: BRAND_PURPLE,
        whiteSpace: "nowrap",
      }}
    >
      <Checkbox />
      {COLUMNS.map((column) => (
        <div key={column.label} style={cell(column)}>
          {column.label}
        </div>
      ))}
    </div>

    {releases.map((release) => (
      <Interactive.Div
        key={release.title}
        name={`Release: ${release.title}`}
        style={{
          minHeight: TABLE_ROW_HEIGHT,
          display: "flex",
          alignItems: "center",
          gap: TABLE_GAP,
          padding: `0 ${TABLE_PADDING}px`,
          boxSizing: "border-box",
          backgroundColor: release.selected ? "#f6f5fd" : "transparent",
          ...release.style,
        }}
      >
        <Checkbox />

        <div style={cell(COLUMNS[0])}>
          <div
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: "#20242f",
              whiteSpace: "nowrap",
            }}
          >
            {release.title}
          </div>
          <div style={{ marginTop: 8, display: "flex", gap: 9 }}>
            {release.types.map((type, index) => (
              <span
                key={index}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  height: 24,
                  borderRadius: 999,
                  backgroundColor: typeTint(type),
                  color: "#ffffff",
                  padding: "0 10px",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  whiteSpace: "nowrap",
                }}
              >
                <IconFlame size={13} />
                {type.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        <div style={cell(COLUMNS[1])}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              height: 30,
              borderRadius: 999,
              border: `1.4px solid ${RELEASE_STATUS_TINTS[release.status]?.border}`,
              backgroundColor: RELEASE_STATUS_TINTS[release.status]?.background,
              color: RELEASE_STATUS_TINTS[release.status]?.color,
              padding: "0 12px",
              fontSize: 14.5,
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            {STATUS_ICONS[release.status]}
            {release.status}
          </span>
        </div>

        <div style={cell(COLUMNS[2])}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 36,
              height: 30,
              borderRadius: 8,
              border: "1.3px solid #e5e7f0",
              fontSize: 15,
              color: "#2b2f3a",
            }}
          >
            {release.views}
          </span>
        </div>

        <div
          style={{
            ...cell(COLUMNS[3]),
            fontSize: 15.5,
            color: "#6b7280",
            whiteSpace: "nowrap",
          }}
        >
          {release.date}
        </div>

        <div style={{ ...cell(COLUMNS[4]), color: "#b9bec9" }}>
          <IconEllipsis size={16} />
        </div>
      </Interactive.Div>
    ))}
  </Interactive.Div>
);
