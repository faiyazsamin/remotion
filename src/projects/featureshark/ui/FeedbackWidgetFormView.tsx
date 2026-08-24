import { Interactive } from "remotion";
import { FeedbackWidgetCredit } from "./FeedbackWidgetCredit";
import { FeedbackWidgetHeader } from "./FeedbackWidgetHeader";
import {
  IconCheck,
  IconChevronDown,
  IconPaperclip,
  IconPaperPlane,
  IconSpinner,
} from "./icons";
import {
  BRAND_PURPLE,
  WIDGET_RIGHT,
  WIDGET_WIDTH,
  type PartProps,
} from "./tokens";

/** The form rejects a title shorter than this, which is what the counter tracks. */
export const TITLE_MIN = 20;

/** Copy the scene types and selects. */
export const FORM_TITLE = "Add more integrations";
export const FORM_BOARD = "Feature Requests";
export const SUCCESS_MESSAGE = "Thank you for your feedback!";
export const SENDING_LABEL = "Sending";

const labelStyle: React.CSSProperties = {
  fontSize: 14.5,
  fontWeight: 700,
  color: "#2b2f3a",
};

const optionalStyle: React.CSSProperties = {
  fontSize: 13.5,
  fontWeight: 500,
  color: "#9299a8",
};

const fieldStyle: React.CSSProperties = {
  marginTop: 9,
  height: 46,
  borderRadius: 9,
  border: "1.3px solid #e3e5ed",
  backgroundColor: "#ffffff",
  display: "flex",
  alignItems: "center",
  padding: "0 15px",
  boxSizing: "border-box",
  fontSize: 15.5,
};

/** A field the user is in gets the brand border. */
const focusedBorder = `1.7px solid ${BRAND_PURPLE}`;

const placeholderColor = "#8d93a3";
const valueColor = "#2b2f3a";

export type FeedbackWidgetFormViewProps = PartProps & {
  headerStyle?: React.CSSProperties;
  cardStyle?: React.CSSProperties;
  /** Title text entered so far. Empty shows the placeholder. */
  title?: string;
  titleFocused?: boolean;
  /** Whether the caret is drawn — only while the field is being typed into. */
  caret?: boolean;
  /** Selected board, or null for the unselected placeholder. */
  board?: string | null;
  boardFocused?: boolean;
  /** Submit is in flight: the button shows a spinner instead of its label. */
  sending?: boolean;
  /** Spinner angle in degrees, driven by the frame — CSS animation cannot render. */
  spinnerAngle?: number;
  /** Confirmation banner between the attach row and the submit button. */
  showSuccess?: boolean;
  successStyle?: React.CSSProperties;
  submitStyle?: React.CSSProperties;
};

/**
 * The "Send Feedback" screen, pushed on top of the list view.
 *
 * Structurally different from the list: no search field, no tab bar, and a back
 * control in the header — which is why it is its own view rather than a swapped
 * panel body.
 *
 * Field values arrive as props so a scene can type into it. The counter is
 * derived from the title rather than passed in, so it cannot disagree with the
 * text on screen.
 */
export const FeedbackWidgetFormView: React.FC<FeedbackWidgetFormViewProps> = ({
  style,
  headerStyle,
  cardStyle,
  title = "",
  titleFocused,
  caret,
  board = null,
  boardFocused,
  sending,
  spinnerAngle = 0,
  showSuccess,
  successStyle,
  submitStyle,
}) => {
  const valid = title.length >= TITLE_MIN;

  return (
    <Interactive.Div
      name="Form view"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      <FeedbackWidgetHeader title="Send Feedback" back style={headerStyle} />

      <div
        style={{ flex: 1, minHeight: 0, padding: 18, boxSizing: "border-box" }}
      >
        <Interactive.Div
          name="Form card"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 14,
            padding: "22px 24px 24px",
            boxSizing: "border-box",
            boxShadow: "0 1px 3px rgba(24, 28, 45, 0.06)",
            ...cardStyle,
          }}
        >
          <div style={{ fontSize: 18.5, fontWeight: 700, color: "#22262f" }}>
            Send Feedback
          </div>

          <div style={{ marginTop: 20 }}>
            <div style={labelStyle}>Title *</div>
            <div
              style={{
                ...fieldStyle,
                border: titleFocused ? focusedBorder : fieldStyle.border,
                color: title ? valueColor : placeholderColor,
              }}
            >
              {title || "Brief description (min 20 characters)"}
              {caret ? (
                <span
                  style={{
                    width: 1.5,
                    height: 20,
                    backgroundColor: "#3b3f4a",
                    marginLeft: 1,
                  }}
                />
              ) : null}
            </div>

            <div
              style={{
                marginTop: 8,
                fontSize: 12.5,
                fontWeight: valid ? 600 : 400,
                color: valid ? "#16a34a" : "#9aa0ad",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              {valid
                ? `${title.length}/${TITLE_MIN} characters`
                : `${title.length}/${TITLE_MIN} characters (minimum)`}
              {valid ? <IconCheck size={13} /> : null}
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <div style={labelStyle}>
              Board <span style={optionalStyle}>(optional)</span>
            </div>
            <div
              style={{
                ...fieldStyle,
                border: boardFocused ? focusedBorder : fieldStyle.border,
                justifyContent: "space-between",
              }}
            >
              <span style={{ color: board ? valueColor : "#2b2f3a" }}>
                {board ?? "Select a board"}
              </span>
              <span style={{ color: "#6b7280", scale: 1.4, display: "flex" }}>
                <IconChevronDown />
              </span>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <div style={labelStyle}>
              Description <span style={optionalStyle}>(optional)</span>
            </div>
            <div
              style={{
                ...fieldStyle,
                height: 108,
                alignItems: "flex-start",
                padding: "13px 15px",
                color: placeholderColor,
              }}
            >
              Detailed description of your feedback
            </div>
          </div>

          <div
            style={{
              marginTop: 18,
              height: 46,
              borderRadius: 9,
              border: "1.4px dashed #d6d9e2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              fontSize: 14.5,
              color: "#4d5462",
            }}
          >
            <IconPaperclip size={17} />
            Attach images (max 5)
          </div>

          {/*
            Sits between the attach row and the button, in flow — so as it opens
            it pushes the button down rather than covering anything.
          */}
          {showSuccess ? (
            <Interactive.Div
              name="Success banner"
              style={{
                marginTop: 18,
                height: 46,
                borderRadius: 9,
                backgroundColor: "#dcfce7",
                display: "flex",
                alignItems: "center",
                padding: "0 18px",
                boxSizing: "border-box",
                fontSize: 15,
                fontWeight: 700,
                color: "#15803d",
                overflow: "hidden",
                whiteSpace: "nowrap",
                ...successStyle,
              }}
            >
              {SUCCESS_MESSAGE}
            </Interactive.Div>
          ) : null}

          <div
            style={{
              marginTop: 18,
              height: 52,
              borderRadius: 9,
              backgroundColor: BRAND_PURPLE,
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              fontSize: 16.5,
              fontWeight: 700,
              ...submitStyle,
            }}
          >
            {sending ? SENDING_LABEL : "Send Feedback"}
            {sending ? (
              <div style={{ rotate: `${spinnerAngle}deg`, display: "flex" }}>
                <IconSpinner size={19} />
              </div>
            ) : (
              <IconPaperPlane size={19} />
            )}
          </div>
        </Interactive.Div>
      </div>

      <FeedbackWidgetCredit />
    </Interactive.Div>
  );
};

/**
 * Frame-space centres of the controls a scene has to point at, walked down the
 * card's own box model: panel top + header (76) + body padding (18) + card
 * padding (22) gives the first row at y=206, then each label, field and margin
 * above accumulates. Kept beside the layout it measures so the two stay in step.
 */
export const formTargets = (frameWidth: number) => {
  const cardLeft = frameWidth - WIDGET_RIGHT - WIDGET_WIDTH + 18;
  const x = cardLeft + 24 + (WIDGET_WIDTH - 36 - 48) / 2;

  return {
    title: { x, y: 298 },
    board: { x, y: 409 },
    submit: { x, y: 690 },
  };
};
