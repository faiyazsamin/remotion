import { Interactive } from "remotion";
import {
  IconChart,
  IconChat,
  IconChevronDown,
  IconClose,
  IconCollapse,
  IconEllipsis,
  IconExpand,
  IconHeart,
  IconInfo,
  IconSettings,
  IconShareSquare,
  IconSliders,
  IconSparkle,
} from "./icons";
import {
  CommentBlocks,
  paragraph,
  type CommentBlock,
} from "./CommentBody";
import { BRAND_PURPLE, type PartProps } from "./tokens";

export const DETAIL_PANEL_WIDTH = 533;

/** The agent's public reply, asking the author to be more specific. */
export const AGENT_REPLY =
  "Thanks for submitting this request! Could you share more details about which specific integrations you'd like to see? For example, are there particular tools, platforms, or services you're hoping we'll connect with? This will help us better evaluate and prioritize your request! 🚀";

/** The agent's private triage note, as a heading plus one line per finding. */
export const TRIAGE_LINES = [
  "Status changed from unset → **Under Review**",
  "Tag added: **integrations**",
  "Board: Feature Requests (unchanged)",
  "No duplicate found",
  "No description provided by author — asked for clarification via public comment about which specific integrations are desired",
  "No assignment made yet; can assign to Product Manager once more detail arrives",
];

const Tab: React.FC<{
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}> = ({ label, icon, active }) => (
  <div
    style={{
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 9,
      fontSize: 16,
      fontWeight: 600,
      color: active ? BRAND_PURPLE : "#6b7280",
      borderBottom: active
        ? `2.5px solid ${BRAND_PURPLE}`
        : "2.5px solid transparent",
      boxSizing: "border-box",
    }}
  >
    <span style={{ display: "flex" }}>{icon}</span>
    {label}
  </div>
);

const Pill: React.FC<{
  children: React.ReactNode;
  background: string;
  color: string;
}> = ({ children, background, color }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      height: 24,
      borderRadius: 999,
      backgroundColor: background,
      color,
      padding: "0 9px",
      fontSize: 13,
      fontWeight: 600,
    }}
  >
    {children}
  </span>
);

/** One entry in a feedback's thread. Replies nest one level, as the app does. */
export type DetailComment = {
  author: string;
  initial: string;
  time: string;
  blocks: CommentBlock[];
  /** Agent authors carry the AI pill. */
  agent?: boolean;
  /** Internal notes carry the Private pill and are not shown publicly. */
  private?: boolean;
  replies?: DetailComment[];
  style?: React.CSSProperties;
};

/** The agent's public reply plus its private triage note, for the first item. */
export const TRIAGE_THREAD: DetailComment[] = [
  {
    author: "Product Manager",
    initial: "P",
    time: "Just now",
    agent: true,
    blocks: [paragraph(AGENT_REPLY)],
  },
  {
    author: "Product Manager",
    initial: "P",
    time: "Just now",
    agent: true,
    private: true,
    blocks: [paragraph("**Triage Summary:**"), ...TRIAGE_LINES.map(paragraph)],
  },
];

const Byline: React.FC<{ comment: DetailComment }> = ({ comment }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <span
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        backgroundColor: BRAND_PURPLE,
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {comment.initial}
    </span>
    <span style={{ fontSize: 16, fontWeight: 700, color: "#1f232e" }}>
      {comment.author}
    </span>
    {comment.agent ? (
      <Pill background="#f1eefc" color="#6a55d8">
        <IconSparkle size={12} />
        AI Agent
      </Pill>
    ) : null}
    <span style={{ fontSize: 14.5, color: "#8b91a3" }}>{comment.time}</span>
    {comment.private ? (
      <Pill background="#fdf3d7" color="#a37711">
        <span style={{ scale: 1.1, display: "flex" }}>
          <IconChevronDown />
        </span>
        Private
      </Pill>
    ) : null}
  </div>
);

/** Like / Reply / overflow beneath a comment. Replies cannot be replied to. */
const CommentActions: React.FC<{ reply?: boolean }> = ({ reply }) => (
  <div
    style={{
      marginTop: 14,
      display: "flex",
      alignItems: "center",
      gap: 26,
      color: "#7b8194",
      fontSize: 15,
      fontWeight: 600,
    }}
  >
    <IconHeart size={18} />
    {reply ? (
      <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <IconChat />
        Reply
      </span>
    ) : null}
    <IconEllipsis size={16} />
  </div>
);

const ThreadComment: React.FC<{ comment: DetailComment; nested?: boolean }> = ({
  comment,
  nested,
}) => (
  <Interactive.Div
    name={`Comment: ${comment.author}`}
    style={{
      marginTop: nested ? 18 : 24,
      // Nested replies hang off a rule, which is how the thread shows depth.
      paddingLeft: nested ? 20 : 0,
      borderLeft: nested ? "2px solid #eceef4" : undefined,
      ...comment.style,
    }}
  >
    <Byline comment={comment} />

    <div style={{ marginTop: 14 }}>
      <CommentBlocks blocks={comment.blocks} fontSize={15.5} />
    </div>

    <CommentActions reply={!nested} />

    {comment.replies?.map((reply) => (
      <ThreadComment key={reply.author + reply.time} comment={reply} nested />
    ))}
  </Interactive.Div>
);

export type FeedbackDetailPanelProps = PartProps & {
  title: string;
  /**
   * `pane` is the column docked beside the table; `modal` is the same content
   * blown up inside the expanded overlay, so it fills its container, drops the
   * divider, sets a larger title and offers collapse instead of expand.
   */
  variant?: "pane" | "modal";
  /** The thread, oldest first. */
  thread: DetailComment[];
};

/**
 * The feedback detail pane, opened by clicking a row.
 *
 * Laid out at a fixed width so a scene can reveal it by animating its
 * *wrapper's* width, letting the table beside it shrink rather than be covered —
 * the same split used for the filter column and the Shark AI panel.
 */
export const FeedbackDetailPanel: React.FC<FeedbackDetailPanelProps> = ({
  style,
  title,
  variant = "pane",
  thread,
}) => {
  const modal = variant === "modal";

  return (
  <Interactive.Div
    name="Feedback detail"
    style={{
      width: modal ? "100%" : DETAIL_PANEL_WIDTH,
      height: "100%",
      borderLeft: modal ? undefined : "1px solid #eef0f6",
      backgroundColor: "#ffffff",
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
      ...style,
    }}
  >
    <div
      style={{
        flexShrink: 0,
        height: modal ? 78 : 68,
        display: "flex",
        alignItems: "center",
        gap: 13,
        padding: modal ? "0 26px" : "0 20px",
        boxSizing: "border-box",
      }}
    >
      <span
        style={{
          color: "#5b6172",
          rotate: "180deg",
          scale: 1.5,
          display: "flex",
        }}
      >
        <IconChevronDown />
      </span>
      <span style={{ fontSize: 19, fontWeight: 700, color: "#2b2f3a" }}>0</span>
      <span
        style={{
          flex: 1,
          fontSize: modal ? 24 : 20,
          fontWeight: 700,
          color: "#1f232e",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {title}
      </span>
      <span style={{ color: "#5b6172", display: "flex" }}>
        {modal ? <IconCollapse size={19} /> : <IconExpand size={18} />}
      </span>
      <span style={{ color: "#5b6172", scale: 1.3, display: "flex" }}>
        <IconShareSquare />
      </span>
      <span style={{ color: "#5b6172", display: "flex" }}>
        <IconClose size={18} />
      </span>
    </div>

    <div
      style={{
        flexShrink: 0,
        height: 48,
        borderBottom: "1px solid #eef0f6",
        display: "flex",
      }}
    >
      <Tab label="Feed" icon={<IconInfo />} active />
      <Tab label="Edit" icon={<IconSliders />} />
      <Tab label="Integrations" icon={<IconSettings />} />
    </div>

    <div
      style={{
        flexShrink: 0,
        display: "flex",
        gap: 8,
        padding: "16px 20px 0",
      }}
    >
      <div
        style={{
          height: 38,
          borderRadius: 9,
          backgroundColor: "#f4f4f9",
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 14px",
          fontSize: 15.5,
          fontWeight: 700,
          color: "#2b2f3a",
        }}
      >
        <IconChat />
        Discussion
        <span
          style={{
            minWidth: 20,
            height: 20,
            borderRadius: 6,
            backgroundColor: "#e6e6ef",
            fontSize: 12.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          2
        </span>
      </div>
      <div
        style={{
          height: 38,
          borderRadius: 9,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 14px",
          fontSize: 15.5,
          fontWeight: 600,
          color: "#6b7280",
        }}
      >
        <IconChart />
        Activities
      </div>
    </div>

    <div
      style={{
        flex: 1,
        minHeight: 0,
        padding: "18px 20px 0",
        overflow: "hidden",
      }}
    >
      {thread.map((comment) => (
        <ThreadComment key={comment.author + comment.time} comment={comment} />
      ))}
    </div>

    <div
      style={{
        flexShrink: 0,
        padding: modal ? "14px 26px 22px" : "14px 20px 18px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          height: 92,
          borderRadius: 11,
          border: "1.4px solid #e3e5ed",
          padding: "14px 16px",
          boxSizing: "border-box",
          fontSize: 15.5,
          color: "#8d93a3",
        }}
      >
        Leave a comment... (Type @ to mention users)
      </div>
      <div
        style={{
          marginTop: 14,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span
          style={{
            width: 38,
            height: 21,
            borderRadius: 999,
            backgroundColor: "#e6e7ee",
            display: "flex",
            alignItems: "center",
            padding: 2,
            boxSizing: "border-box",
          }}
        >
          <span
            style={{
              width: 17,
              height: 17,
              borderRadius: "50%",
              backgroundColor: "#ffffff",
            }}
          />
        </span>
        <span style={{ fontSize: 15.5, color: "#3d4353" }}>Private comment</span>
        <span
          style={{
            marginLeft: "auto",
            width: 30,
            height: 30,
            borderRadius: "50%",
            backgroundColor: "#e2e3ea",
          }}
        />
        <span
          style={{
            height: 38,
            borderRadius: 9,
            backgroundColor: "#a99cf5",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            padding: "0 18px",
            fontSize: 15.5,
            fontWeight: 700,
          }}
        >
          Comment
        </span>
      </div>
    </div>
  </Interactive.Div>
  );
};
