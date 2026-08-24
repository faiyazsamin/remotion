import { Interactive } from "remotion";
import {
  FeedbackDetailPanel,
  type DetailComment,
} from "./FeedbackDetailPanel";
import { IconSearch, IconStatusReview } from "./icons";
import { FONT_STACK, type PartProps } from "./tokens";

export const MODAL_WIDTH = 1334;
export const MODAL_HEIGHT = 1032;
export const MODAL_LIST_WIDTH = 538;

/**
 * Centre of the modal's close control, for a scene to dismiss it. Walked in from
 * the card's right edge past the header padding, so it tracks the layout.
 */
export const modalCloseCentre = (
  frameWidth: number,
  frameHeight: number,
) => ({
  x: (frameWidth + MODAL_WIDTH) / 2 - 26 - 9.5,
  y: (frameHeight - MODAL_HEIGHT) / 2 + 39,
});

/**
 * The expanded feedback view: a searchable list on the left and the same detail
 * content on the right, over a blurred board.
 *
 * The right column is `FeedbackDetailPanel` in its `modal` variant rather than a
 * second copy of the same markup — the content is identical, only its frame
 * changes.
 */
export const FeedbackDetailModal: React.FC<
  PartProps & {
    title: string;
    thread: DetailComment[];
    scrimStyle?: React.CSSProperties;
    cardStyle?: React.CSSProperties;
  }
> = ({ style, title, thread, scrimStyle, cardStyle }) => (
  <Interactive.Div
    name="Expanded feedback"
    style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: FONT_STACK,
      ...style,
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "rgba(244, 244, 250, 0.55)",
        ...scrimStyle,
      }}
    />

    <Interactive.Div
      name="Expanded card"
      style={{
        position: "relative",
        width: MODAL_WIDTH,
        height: MODAL_HEIGHT,
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: "#ffffff",
        display: "flex",
        boxShadow: "0 30px 90px rgba(24, 20, 60, 0.22)",
        ...cardStyle,
      }}
    >
      <div
        style={{
          width: MODAL_LIST_WIDTH,
          flexShrink: 0,
          borderRight: "1px solid #eef0f6",
          backgroundColor: "#fafafc",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flexShrink: 0,
            height: 68,
            borderBottom: "1px solid #eef0f6",
            backgroundColor: "#ffffff",
            display: "flex",
            alignItems: "center",
            gap: 13,
            padding: "0 26px",
            boxSizing: "border-box",
            color: "#8d93a3",
            fontSize: 17,
          }}
        >
          <span style={{ scale: 1.4, display: "flex" }}>
            <IconSearch />
          </span>
          Search feedback...
        </div>

        {/* The one result, and the one currently open — so it reads selected. */}
        <div
          style={{
            flexShrink: 0,
            padding: "18px 26px 20px",
            backgroundColor: "#f5f4fd",
            borderBottom: "1px solid #edecf7",
          }}
        >
          <div style={{ fontSize: 17.5, fontWeight: 600, color: "#20242f" }}>
            {title}
          </div>
          <div
            style={{
              marginTop: 10,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                height: 24,
                borderRadius: 7,
                backgroundColor: "#fdf6e7",
                color: "#c98a1e",
                padding: "0 9px",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              <IconStatusReview size={14} />
              Under Review
            </span>
            <span style={{ fontSize: 15, color: "#8b91a3" }}>0 votes</span>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <FeedbackDetailPanel title={title} variant="modal" thread={thread} />
      </div>
    </Interactive.Div>
  </Interactive.Div>
);
