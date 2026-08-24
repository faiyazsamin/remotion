import { Interactive } from "remotion";
import {
  IconCheck,
  IconChevronDown,
  IconFlame,
  IconGithubMark,
  IconTag,
} from "./icons";
import { statusMeta } from "./statuses";
import { BRAND_PURPLE, type PartProps } from "./tokens";

/**
 * The one row on this board: the feedback the visitor sent in the previous
 * scene. Its title is the same string that gets typed there, imported rather
 * than repeated so the two can never disagree.
 */
export { FORM_TITLE as FEEDBACK_TITLE } from "./FeedbackWidgetFormView";

/**
 * Table's own box model, which a scene needs to aim a cursor into a row.
 *
 * The padding, gap and fixed columns are deliberately tight: when the detail
 * pane opens, everything here is overhead subtracted from the three text
 * columns, and at ~786px of table there is not enough left over for the status
 * and board pills unless this stays lean.
 */
export const TABLE_PADDING = 24;
export const TABLE_GAP = 16;
export const TABLE_CHECKBOX = 18;
export const TABLE_VOTES_WIDTH = 76;
export const TABLE_HEADER_HEIGHT = 58;
export const TABLE_ROW_HEIGHT = 96;

/**
 * The three text columns are proportional rather than fixed so the table can
 * give up width when the detail pane opens beside it. With fixed widths its
 * min-content floor squeezed the pane out of the card instead.
 */
const COLUMNS: { label: string; width?: number; flex?: number }[] = [
  { label: "Votes", width: TABLE_VOTES_WIDTH },
  { label: "Feedback Title", flex: 1.5 },
  { label: "Status", flex: 1.25 },
  { label: "Author", flex: 1.45 },
  // Wide enough for its own header; the glyph itself needs far less.
  { label: "Channels", width: 66 },
];

const Checkbox: React.FC<{ checked?: boolean }> = ({ checked }) => (
  <div
    style={{
      width: 18,
      height: 18,
      borderRadius: 5,
      border: checked ? "1.7px solid #5c45df" : "1.7px solid #d3d7e2",
      backgroundColor: checked ? "#5c45df" : "transparent",
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      boxSizing: "border-box",
    }}
  >
    {checked ? <IconCheck size={11} /> : null}
  </div>
);

const cell = (
  column: (typeof COLUMNS)[number],
): React.CSSProperties => ({
  width: column.width,
  flex: column.flex,
  // Fixed columns hold their size; proportional ones may shrink past their
  // content, which `minWidth: 0` is what actually permits.
  flexShrink: column.width ? 0 : 1,
  minWidth: 0,
  // Anything that still will not fit is clipped rather than allowed to run
  // into the next column.
  overflow: "hidden",
});

export type FeedbackRow = {
  title: string;
  /** Board pill, e.g. "FEATURE REQUESTS". */
  board: string;
  /** Tag chip beside it, e.g. "DARK-MODE". */
  tag: string;
  status: string;
  author: string;
  authorInitial: string;
  time: string;
  votes: number;
  /** The open row reads as selected. */
  selected?: boolean;
  /** Ticked by a bulk selection. */
  checked?: boolean;
  style?: React.CSSProperties;
};

export type FeedbackTableProps = PartProps & {
  headerStyle?: React.CSSProperties;
  /** Rows, newest first. */
  rows: FeedbackRow[];
  /** Select-all state in the header. */
  allChecked?: boolean;
};

/** Header row plus the feedback list. */
export const FeedbackTable: React.FC<FeedbackTableProps> = ({
  style,
  headerStyle,
  rows,
  allChecked,
}) => (
  <Interactive.Div
    // `minWidth: 0` lets the table shrink below its columns' natural width,
    // which is what makes room for the detail pane.
    name="Feedback table"
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
        ...headerStyle,
      }}
    >
      <Checkbox checked={allChecked} />
      {COLUMNS.map((column) => (
        <div key={column.label} style={cell(column)}>
          {column.label}
        </div>
      ))}
    </div>

    {rows.map((row) => (
      <Interactive.Div
        key={row.title}
        name={`Row: ${row.title}`}
        style={{
          minHeight: TABLE_ROW_HEIGHT,
          borderBottom: "1px solid #f3f4f9",
          display: "flex",
          alignItems: "center",
          gap: TABLE_GAP,
          padding: `0 ${TABLE_PADDING}px`,
          boxSizing: "border-box",
          backgroundColor: row.selected ? "#f6f5fd" : "transparent",
          ...row.style,
        }}
      >
        <Checkbox checked={row.checked} />

        <div style={cell(COLUMNS[0])}>
          <div
            style={{
              width: 52,
              borderRadius: 10,
              border: "1.4px solid #e5e7f0",
              padding: "7px 0 9px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <span
              style={{
                color: "#8b91a3",
                scale: 1.5,
                rotate: "180deg",
                display: "flex",
              }}
            >
              <IconChevronDown />
            </span>
            <span style={{ fontSize: 17, fontWeight: 700, color: "#2b2f3a" }}>
              {row.votes}
            </span>
          </div>
        </div>

        <div style={cell(COLUMNS[1])}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#20242f",
              whiteSpace: "nowrap",
            }}
          >
            {row.title}
          </div>
          <div
            style={{
              marginTop: 8,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                height: 25,
                borderRadius: 7,
                backgroundColor: "#1f9d63",
                color: "#ffffff",
                padding: "0 9px",
                fontSize: 11.5,
                fontWeight: 700,
                letterSpacing: "0.03em",
                // Never wrap: a wrapped pill blows out its own fixed height.
                whiteSpace: "nowrap",
              }}
            >
              <IconFlame size={14} />
              {row.board}
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: "#3d4353",
                fontSize: 11.5,
                fontWeight: 700,
                letterSpacing: "0.03em",
                whiteSpace: "nowrap",
              }}
            >
              <IconTag size={13} />
              {row.tag}
            </span>
          </div>
        </div>

        <div style={cell(COLUMNS[2])}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              height: 30,
              borderRadius: 999,
              border: `1.4px solid ${statusMeta(row.status).pill.border}`,
              backgroundColor: statusMeta(row.status).pill.background,
              color: statusMeta(row.status).pill.color,
              padding: "0 11px",
              fontSize: 14,
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            {(() => {
              const { Icon } = statusMeta(row.status);

              return <Icon size={15} />;
            })()}
            {row.status}
          </div>
        </div>

        <div
          style={{
            ...cell(COLUMNS[3]),
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              backgroundColor: "#eceafb",
              color: "#5b4ad0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {row.authorInitial}
          </span>
          <div style={{ minWidth: 0, whiteSpace: "nowrap" }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#2b2f3a" }}>
              {row.author}
            </div>
            <div style={{ fontSize: 13.5, color: "#8b91a3" }}>{row.time}</div>
          </div>
        </div>

        <div style={{ ...cell(COLUMNS[4]), color: "#20242f" }}>
          <IconGithubMark size={21} />
        </div>
      </Interactive.Div>
    ))}
  </Interactive.Div>
);
