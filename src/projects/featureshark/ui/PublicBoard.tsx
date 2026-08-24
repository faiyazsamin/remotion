import { Interactive } from "remotion";
import { IconArrowLeft, IconChat } from "./icons";
import {
  ACTIONS_GAP,
  ACTIONS_HEIGHT,
  COMPOSER_EXPANDED_HEIGHT,
  COMPOSER_HEIGHT,
  COMPOSER_TOP_GAP,
  DISCUSSION_PADDING_TOP,
  DISCUSSION_PADDING_X,
  PublicDiscussion,
  TABS_HEIGHT,
  type PublicComment,
} from "./PublicDiscussion";
import { PublicFooter, PublicMetaCard } from "./PublicMetaCard";
import { PublicNavBar } from "./PublicNavBar";
import {
  PublicVoteHeader,
  VOTE_BOX_SIZE,
  VOTE_CARD_HEIGHT,
  VOTE_CARD_PADDING_X,
} from "./PublicVoteHeader";
import { BRAND_PURPLE, FONT_STACK, type PartProps } from "./tokens";

const CONTENT_LEFT = 324;
const MAIN_WIDTH = 828;
const SIDE_WIDTH = 394;
const COLUMN_GAP = 48;
const BACK_TOP = 112;
const BACK_HEIGHT = 24;
const CONTENT_TOP = 160;
const CARD_GAP = 32;

/** Centre of the "Back to Feedback" link, top-left of the page. */
export const backToFeedbackCentre = () => ({
  x: CONTENT_LEFT + 80,
  y: BACK_TOP + BACK_HEIGHT / 2,
});

/** Centre of the vote box, left of the title. */
export const voteCentre = () => ({
  x: CONTENT_LEFT + VOTE_CARD_PADDING_X + VOTE_BOX_SIZE / 2,
  y: CONTENT_TOP + VOTE_CARD_HEIGHT / 2,
});

/** Top of the discussion card, which everything below is measured from. */
const DISCUSSION_TOP = CONTENT_TOP + VOTE_CARD_HEIGHT + CARD_GAP;
const COMPOSER_TOP =
  DISCUSSION_TOP + DISCUSSION_PADDING_TOP + TABS_HEIGHT + COMPOSER_TOP_GAP;

/** A point inside the collapsed composer, for the click that opens it. */
export const composerCentre = () => ({
  x: CONTENT_LEFT + DISCUSSION_PADDING_X + 180,
  y: COMPOSER_TOP + COMPOSER_HEIGHT / 2,
});

/** Centre of the expanded composer's Comment button. */
export const commentButtonCentre = () => ({
  x: CONTENT_LEFT + MAIN_WIDTH - DISCUSSION_PADDING_X - 66,
  y:
    COMPOSER_TOP +
    COMPOSER_EXPANDED_HEIGHT +
    ACTIONS_GAP +
    ACTIONS_HEIGHT / 2,
});

/**
 * The public, customer-facing feedback page — the same request the visitor sent
 * and the agent triaged, now visible to everyone.
 *
 * Deliberately a different shape from the admin board: no rail, no purple
 * ground, a floating nav pill and generous white space, so it reads as the other
 * side of the product rather than another admin screen.
 */
export const PublicBoard: React.FC<
  PartProps & {
    title: string;
    /** Who submitted the feedback. */
    author: string;
    /** The viewer submitted it, so the title card offers Edit / Delete. */
    ownerActions?: boolean;
    votes: number;
    voted?: boolean;
    voteStyle?: React.CSSProperties;
    comments: PublicComment[];
    composer?: "collapsed" | "expanded";
    draft?: string;
    caret?: boolean;
    submitStyle?: React.CSSProperties;
    voterName?: string;
    voterRole?: string;
    voterTime?: string;
    /** `admin` swaps the nav right-hand controls for the signed-in set. */
    navVariant?: "visitor" | "admin";
    navStyle?: React.CSSProperties;
    backStyle?: React.CSSProperties;
    headerStyle?: React.CSSProperties;
    discussionStyle?: React.CSSProperties;
    metaStyle?: React.CSSProperties;
    footerStyle?: React.CSSProperties;
    bubbleStyle?: React.CSSProperties;
    /** Anything pinned over the page, e.g. the support toast. */
    overlay?: React.ReactNode;
  }
> = ({
  style,
  title,
  author,
  ownerActions,
  votes,
  voted,
  voteStyle,
  comments,
  composer,
  draft,
  caret,
  submitStyle,
  voterName,
  voterRole,
  voterTime,
  navVariant,
  navStyle,
  backStyle,
  headerStyle,
  discussionStyle,
  metaStyle,
  footerStyle,
  bubbleStyle,
  overlay,
}) => (
  <Interactive.Div
    name="Public board"
    style={{
      position: "absolute",
      inset: 0,
      backgroundColor: "#fbfbfd",
      fontFamily: FONT_STACK,
      ...style,
    }}
  >
    <PublicNavBar style={navStyle} variant={navVariant} />

    {/*
      Flow layout, not absolute positions: the discussion card grows when the
      composer expands, and the footer has to move down with it rather than be
      overlapped. The column block is centred on the page, so the footer centred
      within it lands on the page centre too.
    */}
    <div
      style={{
        position: "absolute",
        left: CONTENT_LEFT,
        top: BACK_TOP,
        width: MAIN_WIDTH + COLUMN_GAP + SIDE_WIDTH,
      }}
    >
      <div
        style={{
          height: BACK_HEIGHT,
          display: "flex",
          alignItems: "center",
          gap: 11,
          fontSize: 17,
          color: "#6b7280",
          ...backStyle,
        }}
      >
        <IconArrowLeft size={18} />
        Back to Feedback
      </div>

      <div
        style={{
          marginTop: CONTENT_TOP - BACK_TOP - BACK_HEIGHT,
          display: "flex",
          gap: COLUMN_GAP,
          alignItems: "flex-start",
        }}
      >
        <div style={{ width: MAIN_WIDTH, flexShrink: 0 }}>
          <PublicVoteHeader
            title={title}
            votes={votes}
            voted={voted}
            voteStyle={voteStyle}
            ownerActions={ownerActions}
            style={headerStyle}
          />
          <PublicDiscussion
            style={{ marginTop: CARD_GAP, ...discussionStyle }}
            comments={comments}
            composer={composer}
            draft={draft}
            caret={caret}
            submitStyle={submitStyle}
          />
        </div>

        <div style={{ width: SIDE_WIDTH, flexShrink: 0 }}>
          <PublicMetaCard
            comments={comments.length}
            voters={votes}
            voterName={voterName}
            voterRole={voterRole}
            voterTime={voterTime}
            author={author}
            style={metaStyle}
          />
        </div>
      </div>

      <PublicFooter style={{ marginTop: 56, ...footerStyle }} />
    </div>

    {/* The same widget the visitor used, still sitting in the corner. */}
    <div
      style={{
        position: "absolute",
        right: 29,
        bottom: 28,
        width: 58,
        height: 58,
        borderRadius: "50%",
        backgroundColor: BRAND_PURPLE,
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 8px 24px rgba(70, 50, 190, 0.3)",
        ...bubbleStyle,
      }}
    >
      <span style={{ scale: 1.7, display: "flex" }}>
        <IconChat />
      </span>
    </div>

    {overlay}
  </Interactive.Div>
);
