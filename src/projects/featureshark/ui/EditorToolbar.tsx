
import type { PartProps } from "./tokens";

/*
  The editor's toolbar. Letterforms are drawn as text because that is what they
  are; the rest are small glyphs, grouped the way the editor groups them.
*/
const Glyph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg width={19} height={19} viewBox="0 0 24 24" fill="none">
    {children}
  </svg>
);

const line = (x1: number, y1: number, x2: number, y2: number, key: string) => (
  <path
    key={key}
    d={`M${x1} ${y1}H${x2}`}
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    transform={y1 === y2 ? undefined : `rotate(0)`}
  />
);

const Rows: React.FC<{ widths: number[] }> = ({ widths }) => (
  <Glyph>
    {widths.map((width, index) =>
      line(4, 6 + index * 4, 4 + width, 6 + index * 4, `row-${index}`),
    )}
  </Glyph>
);

const TOOLBAR_GROUPS: React.ReactNode[][] = [
  [
    <span key="b" style={{ fontWeight: 800 }}>
      B
    </span>,
    <span key="i" style={{ fontStyle: "italic", fontFamily: "Georgia, serif" }}>
      I
    </span>,
    <span key="u" style={{ textDecoration: "underline" }}>
      U
    </span>,
    <span key="s" style={{ textDecoration: "line-through" }}>
      S
    </span>,
    <Glyph key="mark">
      <path
        d="M6 15l7-7 3 3-7 7H6v-3Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M5 20h14" stroke="currentColor" strokeWidth="1.6" />
    </Glyph>,
    <Glyph key="sup">
      <path
        d="M5 18l8-8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M13 10h5m0 0v5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </Glyph>,
    <Glyph key="sub">
      <path
        d="M5 6l8 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M18 9v5m0 0h-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </Glyph>,
  ],
  [
    <span key="h1">
      H<sub style={{ fontSize: "0.68em" }}>1</sub>
    </span>,
    <span key="h2">
      H<sub style={{ fontSize: "0.68em" }}>2</sub>
    </span>,
    <span key="h3">
      H<sub style={{ fontSize: "0.68em" }}>3</sub>
    </span>,
  ],
  [
    <Glyph key="check">
      <path
        d="M4 7l2 2 3-3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M4 16l2 2 3-3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {line(12, 8, 20, 8, "c1")}
      {line(12, 17, 20, 17, "c2")}
    </Glyph>,
    <Glyph key="order">
      {line(9, 7, 20, 7, "o1")}
      {line(9, 12, 20, 12, "o2")}
      {line(9, 17, 20, 17, "o3")}
      <path
        d="M4 9V6h1m-1 9h2m-2 0 2-3H4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </Glyph>,
    <Rows key="paragraph" widths={[14, 10, 16, 8]} />,
  ],
  [
    <Glyph key="quote">
      <path
        d="M5 15c0-4 2-6 5-7l-1 2c-1 1-1 2-1 3h2v4H5v-2Zm9 0c0-4 2-6 5-7l-1 2c-1 1-1 2-1 3h2v4h-5v-2Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </Glyph>,
    <Glyph key="code">
      <path
        d="M9 8l-4 4 4 4m6-8 4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </Glyph>,
    <Glyph key="link">
      <path
        d="M10 14a3.5 3.5 0 0 1 0-5l2-2a3.5 3.5 0 0 1 5 5l-1 1m-2 1a3.5 3.5 0 0 1 0 5l-2 2a3.5 3.5 0 0 1-5-5l1-1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Glyph>,
  ],
  [
    <Rows key="left" widths={[16, 10, 16, 10]} />,
    <Glyph key="center">
      {line(4, 6, 20, 6, "a")}
      {line(7, 10, 17, 10, "b")}
      {line(4, 14, 20, 14, "c")}
      {line(7, 18, 17, 18, "d")}
    </Glyph>,
    <Glyph key="right">
      {line(4, 6, 20, 6, "a")}
      {line(10, 10, 20, 10, "b")}
      {line(4, 14, 20, 14, "c")}
      {line(10, 18, 20, 18, "d")}
    </Glyph>,
    <Glyph key="divider">
      {line(4, 12, 20, 12, "a")}
      <path
        d="M8 5v3m8-3v3M8 16v3m8-3v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Glyph>,
    <Glyph key="image">
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M5 16l4-4 3 3 2-2 5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Glyph>,
  ],
];

export const TOOLBAR_HEIGHT = 52;

/** The editor's formatting toolbar, shared by the wizard and the full editor. */
export const EditorToolbar: React.FC<PartProps> = ({ style }) => (
  <div
    style={{
      height: TOOLBAR_HEIGHT,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      padding: "0 24px",
      boxSizing: "border-box",
      color: "#3d4353",
      fontSize: 17,
      ...style,
    }}
  >
    {TOOLBAR_GROUPS.map((group, groupIndex) => (
      <div
        key={groupIndex}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          /* Groups are told apart by a rule, the way the editor does it. */
          borderLeft: groupIndex ? "1px solid #eef0f6" : undefined,
          marginLeft: groupIndex ? 10 : 0,
          paddingLeft: groupIndex ? 10 : 0,
        }}
      >
        {group.map((item, index) => (
          <span
            key={index}
            style={{
              width: 34,
              height: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    ))}
  </div>
);

