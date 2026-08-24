import { Interactive } from "remotion";
import {
  CommentBlocks,
  paragraph,
  RichText,
  type CommentBlock,
} from "./CommentBody";
import { AGENT_REPLY } from "./FeedbackDetailPanel";
import {
  IconChat,
  IconEllipsis,
  IconHeart,
  IconPerson,
  IconSparkle,
} from "./icons";
import { BRAND_PURPLE, type PartProps } from "./tokens";

export { bullets, MENTION, paragraph, type CommentBlock } from "./CommentBody";

/** The visitor who comes back to chase the request. */
export const VISITOR_NAME = "Tanmay Das";
export const VISITOR_COMMENT =
  "@Product Manager When will you ship this feature?";

/**
 * The card's own box model, so a scene can aim a cursor at the composer and its
 * buttons without guessing.
 */
export const DISCUSSION_PADDING_TOP = 26;
export const DISCUSSION_PADDING_X = 38;
export const TABS_HEIGHT = 48;
export const COMPOSER_TOP_GAP = 24;
export const COMPOSER_HEIGHT = 58;
export const COMPOSER_EXPANDED_HEIGHT = 150;
export const ACTIONS_GAP = 16;
export const ACTIONS_HEIGHT = 44;

export type PublicComment = {
  name: string;
  initial: string;
  time: string;
  body: CommentBlock[];
  /**
   * Who is speaking, which decides the pill beside their name. Visitors get no
   * pill; only they carry an overflow menu.
   */
  badge?: "agent" | "admin";
  /** Replies nest one level, hanging off a rule. */
  replies?: PublicComment[];
  style?: React.CSSProperties;
};

/** The agent's reply, always present — the same text the admin pane shows. */
export const AGENT_COMMENT: PublicComment = {
  name: "Product Manager",
  initial: "P",
  time: "0m ago",
  body: [paragraph(AGENT_REPLY)],
  badge: "agent",
};

const BADGES = {
  agent: { label: "AI Agent", background: "#f1eefc", color: "#6a55d8" },
  admin: { label: "Admin", background: "#e8f1ff", color: "#2f6fdb" },
} as const;

const Comment: React.FC<{ comment: PublicComment; nested?: boolean }> = ({
  comment,
  nested,
}) => (
  <Interactive.Div
    name={`Comment: ${comment.name}`}
    style={{
      // Nested replies hang off a rule, which is how the thread shows depth.
      marginTop: nested ? 26 : 0,
      paddingLeft: nested ? 24 : 0,
      borderLeft: nested ? "2px solid #eceef4" : undefined,
      ...comment.style,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          backgroundColor: BRAND_PURPLE,
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          fontWeight: 700,
        }}
      >
        {comment.initial}
      </span>
      <span style={{ fontSize: 18, fontWeight: 700, color: "#1f232e" }}>
        {comment.name}
      </span>
      {comment.badge ? (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            height: 25,
            borderRadius: 999,
            backgroundColor: BADGES[comment.badge].background,
            color: BADGES[comment.badge].color,
            padding: "0 10px",
            fontSize: 13.5,
            fontWeight: 600,
          }}
        >
          {comment.badge === "agent" ? (
            <IconSparkle size={13} />
          ) : (
            <IconPerson size={13} />
          )}
          {BADGES[comment.badge].label}
        </span>
      ) : null}
      <span style={{ fontSize: 15.5, color: "#8b91a3" }}>{comment.time}</span>
      {comment.badge === "agent" || nested ? null : (
        <span style={{ marginLeft: "auto", color: "#b9bec9", display: "flex" }}>
          <IconEllipsis size={17} />
        </span>
      )}
    </div>

    <div style={{ marginTop: 18 }}>
      <CommentBlocks blocks={comment.body} fontSize={17} lineHeight={1.66} />
    </div>

    <div
      style={{
        marginTop: 20,
        display: "flex",
        alignItems: "center",
        gap: 30,
        color: "#7b8194",
        fontSize: 16,
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <IconHeart size={19} />0
      </span>
      {nested ? null : (
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ scale: 1.2, display: "flex" }}>
            <IconChat />
          </span>
          Reply
        </span>
      )}
    </div>

    {comment.replies?.map((reply) => (
      <Comment key={reply.name + reply.time} comment={reply} nested />
    ))}
  </Interactive.Div>
);

export type PublicDiscussionProps = PartProps & {
  /** Comments, newest first. The count badge is derived from its length. */
  comments: PublicComment[];
  /** Collapsed is the one-line prompt; expanded is the drafting textarea. */
  composer?: "collapsed" | "expanded";
  /** Text typed so far. */
  draft?: string;
  caret?: boolean;
  submitStyle?: React.CSSProperties;
};

/**
 * The public discussion card: tabs, a composer for visitors, and the thread.
 *
 * The count badge counts `comments` rather than taking a number, so it cannot
 * disagree with the thread below it.
 */
export const PublicDiscussion: React.FC<PublicDiscussionProps> = ({
  style,
  comments,
  composer = "collapsed",
  draft = "",
  caret,
  submitStyle,
}) => {
  const expanded = composer === "expanded";

  return (
    <Interactive.Div
      name="Discussion"
      style={{
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: `${DISCUSSION_PADDING_TOP}px ${DISCUSSION_PADDING_X}px 34px`,
        boxSizing: "border-box",
        boxShadow: "0 1px 3px rgba(24, 28, 45, 0.05)",
        ...style,
      }}
    >
      <div
        style={{
          height: TABS_HEIGHT,
          display: "flex",
          gap: 32,
          borderBottom: "1px solid #eef0f6",
          boxSizing: "border-box",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            borderBottom: `2.5px solid ${BRAND_PURPLE}`,
            marginBottom: -1,
            fontSize: 17,
            fontWeight: 600,
            color: "#20242f",
          }}
        >
          Discussion
          <span
            style={{
              minWidth: 22,
              height: 22,
              borderRadius: 7,
              backgroundColor: "#eeecfb",
              color: "#5b4ad0",
              fontSize: 13,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {comments.length}
          </span>
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 17,
            color: "#6b7280",
          }}
        >
          Activities
        </span>
      </div>

      <div
        style={{
          marginTop: COMPOSER_TOP_GAP,
          height: expanded ? COMPOSER_EXPANDED_HEIGHT : COMPOSER_HEIGHT,
          borderRadius: 12,
          border: "1.4px solid #e9ebf2",
          // Expanded it is a block of text: as a flex row every run of the
          // draft became a flex item, so the mention sat in its own column and
          // the rest of the sentence wrapped beside it instead of below it.
          display: expanded ? "block" : "flex",
          alignItems: expanded ? undefined : "center",
          lineHeight: expanded ? 1.6 : undefined,
          padding: expanded ? "16px 22px" : "0 10px 0 22px",
          boxSizing: "border-box",
          fontSize: 17,
          color: expanded ? "#2f333c" : "#8d93a3",
          // Mid-typing the draft can end on a space. HTML would collapse it and
          // sit the caret flush against the last word, so hold it literally.
          whiteSpace: "pre-wrap",
        }}
      >
        {expanded ? (
          <>
            <RichText text={draft} />
            {caret ? (
              <span
                style={{
                  display: "inline-block",
                  width: 1.5,
                  height: 20,
                  verticalAlign: "text-bottom",
                  backgroundColor: "#3b3f4a",
                  marginLeft: 1,
                }}
              />
            ) : null}
          </>
        ) : (
          <>
            Share your thoughts...
            <span
              style={{
                marginLeft: "auto",
                width: 38,
                height: 38,
                borderRadius: 10,
                backgroundColor: BRAND_PURPLE,
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ scale: 1.25, display: "flex" }}>
                <IconChat />
              </span>
            </span>
          </>
        )}
      </div>

      {expanded ? (
        <div
          style={{
            marginTop: ACTIONS_GAP,
            height: ACTIONS_HEIGHT,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 26,
          }}
        >
          <span style={{ fontSize: 17, color: "#6b7280" }}>Cancel</span>
          <span
            style={{
              height: ACTIONS_HEIGHT,
              borderRadius: 11,
              backgroundColor: "#8b7bf0",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              padding: "0 26px",
              fontSize: 17,
              fontWeight: 700,
              ...submitStyle,
            }}
          >
            Comment
          </span>
        </div>
      ) : null}

      {comments.map((comment) => (
        <div key={comment.name} style={{ marginTop: 30 }}>
          <Comment comment={comment} />
        </div>
      ))}
    </Interactive.Div>
  );
};
