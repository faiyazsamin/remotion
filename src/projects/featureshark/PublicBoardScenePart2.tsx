import {
  AbsoluteFill,
  Composition,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import {
  commentButtonCentre,
  composerCentre,
  Cursor,
  DARK_MODE_QUESTIONS,
  DARK_MODE_TITLE,
  FPS,
  paragraph,
  PublicBoard,
  SITE_HEIGHT,
  SITE_WIDTH,
  SupportToast,
  VISITOR_COMMENT,
  VISITOR_NAME,
  voteCentre,
  type PublicComment,
} from "./ui";

export const FeatureSharkPublicBoardScenePart2Composition = () => (
  <Composition
    id="FeatureSharkPublicBoardScenePart2"
    component={PublicBoardScenePart2}
    durationInFrames={720}
    fps={FPS}
    width={SITE_WIDTH}
    height={SITE_HEIGHT}
  />
);

/** Shared with the admin scenes, so the copy cannot drift between surfaces. */
const TITLE = DARK_MODE_TITLE;
const AGENT_REPLY_BLOCKS = DARK_MODE_QUESTIONS;

const AGENT_COMMENT: PublicComment = {
  name: "Product Manager",
  initial: "P",
  time: "0m ago",
  body: AGENT_REPLY_BLOCKS,
  badge: "agent",
};

const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);

const arrive = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

const press = (frame: number, at: number, low: number) =>
  interpolate(frame, [at - 4, at, at + 7], [1, low, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

/** The page settles first, top to bottom. */
const NAV = 6;
const BACK = 14;
const HEADER = 20;
const DISCUSSION = 30;
const META = 36;
const FOOTER = 56;
const BUBBLE = 64;
/** The support greeting pops out of the bubble a beat after it lands. */
const TOAST = 92;

const CURSOR_IN_START = 80;
const CURSOR_IN_END = 126;

/** Beat 1 — upvote. */
const VOTE_REACH_START = 150;
const VOTE_REACH_END = 196;
const VOTE_CLICK = 204;

/** Beat 2 — open the composer and type. */
const COMPOSER_REACH_START = 236;
const COMPOSER_REACH_END = 276;
const COMPOSER_CLICK = 284;
const TYPE_START = COMPOSER_CLICK + 14;
const FRAMES_PER_CHAR = 2;
const TYPE_END = TYPE_START + VISITOR_COMMENT.length * FRAMES_PER_CHAR;

/** Beat 3 — post it. */
const SUBMIT_REACH_START = TYPE_END + 12;
const SUBMIT_REACH_END = SUBMIT_REACH_START + 40;
const SUBMIT_CLICK = SUBMIT_REACH_END + 8;
const POSTED = SUBMIT_CLICK + 4;

/**
 * The title card is taller here — the viewer owns this request, so it carries
 * Edit / Delete — which pushes everything below it down.
 */
const OWNER_OFFSET = 50;

const VOTE = voteCentre();
const COMPOSER = composerCentre();
const SUBMIT = commentButtonCentre();
const CURSOR_FROM = { x: SITE_WIDTH + 120, y: SITE_HEIGHT + 120 };
const CURSOR_IDLE = { x: 1046, y: 880 };
const CURSOR_REST = { x: SUBMIT.x - 40, y: SUBMIT.y + OWNER_OFFSET + 120 };

const CURSOR_TIMES = [
  CURSOR_IN_START,
  CURSOR_IN_END,
  VOTE_REACH_START,
  VOTE_REACH_END,
  COMPOSER_REACH_START,
  COMPOSER_REACH_END,
  SUBMIT_REACH_START,
  SUBMIT_REACH_END,
  POSTED + 8,
  POSTED + 44,
];
const CURSOR_X = [
  CURSOR_FROM.x,
  CURSOR_IDLE.x,
  CURSOR_IDLE.x,
  VOTE.x,
  VOTE.x,
  COMPOSER.x,
  COMPOSER.x,
  SUBMIT.x,
  SUBMIT.x,
  CURSOR_REST.x,
];
/** Every target below the title card shifts by the owner-actions row. */
const CURSOR_Y = [
  CURSOR_FROM.y,
  CURSOR_IDLE.y,
  CURSOR_IDLE.y,
  VOTE.y,
  VOTE.y,
  COMPOSER.y + OWNER_OFFSET,
  COMPOSER.y + OWNER_OFFSET,
  SUBMIT.y + OWNER_OFFSET,
  SUBMIT.y + OWNER_OFFSET,
  CURSOR_REST.y,
];
const CURSOR_EASINGS = CURSOR_TIMES.slice(1).map(() => EASE_OUT);

const rise = (frame: number, at: number, distance = 16) => {
  const shown = arrive(frame, at, at + 24);

  return {
    opacity: shown,
    translate: `0px ${(1 - shown) * distance}px`,
  };
};

/**
 * Scene: the public board, part 2 — the visitor's own "Enable dark mode"
 * request, with the agent's structured follow-up questions already waiting.
 *
 * Same page and same three beats as part 1 (upvote, compose, post), but the
 * viewer owns this request: the author is them, the title card carries Edit /
 * Delete, and the support widget greets them. Still from ~frame 620.
 */
export const PublicBoardScenePart2: React.FC = () => {
  const frame = useCurrentFrame();

  const voted = frame >= VOTE_CLICK;
  const drafting = frame >= COMPOSER_CLICK && frame < POSTED;
  const posted = frame >= POSTED;

  const typed = VISITOR_COMMENT.slice(
    0,
    Math.floor(
      interpolate(frame, [TYPE_START, TYPE_END], [0, VISITOR_COMMENT.length], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    ),
  );

  const visitorComment: PublicComment = {
    name: VISITOR_NAME,
    initial: VISITOR_NAME.charAt(0),
    time: "0m ago",
    body: [paragraph(VISITOR_COMMENT)],
    style: {
      opacity: arrive(frame, POSTED, POSTED + 20),
      translate: `0px ${(1 - arrive(frame, POSTED, POSTED + 20)) * -12}px`,
    },
  };

  const comments: PublicComment[] = posted
    ? [visitorComment, AGENT_COMMENT]
    : [AGENT_COMMENT];

  return (
    <AbsoluteFill
      name="Public board part 2"
      style={{ backgroundColor: "#fbfbfd" }}
    >
      <PublicBoard
        title={TITLE}
        author={VISITOR_NAME}
        ownerActions
        style={{
          scale: interpolate(frame, [0, 30], [1.03, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE_OUT,
          }),
        }}
        votes={voted ? 1 : 0}
        voted={voted}
        voteStyle={{ scale: press(frame, VOTE_CLICK, 0.9) }}
        voterName={VISITOR_NAME}
        comments={comments}
        composer={drafting ? "expanded" : "collapsed"}
        draft={typed}
        caret={drafting}
        submitStyle={{ scale: press(frame, SUBMIT_CLICK, 0.95) }}
        navStyle={rise(frame, NAV, -12)}
        backStyle={{ opacity: arrive(frame, BACK, BACK + 20) }}
        headerStyle={rise(frame, HEADER)}
        discussionStyle={rise(frame, DISCUSSION)}
        metaStyle={rise(frame, META)}
        footerStyle={{ opacity: arrive(frame, FOOTER, FOOTER + 24) }}
        bubbleStyle={{
          opacity: arrive(frame, BUBBLE, BUBBLE + 20),
          scale: interpolate(frame, [BUBBLE, BUBBLE + 26], [0.7, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE_OUT,
          }),
        }}
        overlay={
          <SupportToast
            style={{
              opacity: arrive(frame, TOAST, TOAST + 18),
              scale: interpolate(frame, [TOAST, TOAST + 28], [0.9, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: EASE_OUT,
              }),
            }}
          />
        }
      />

      <Cursor
        x={interpolate(frame, CURSOR_TIMES, CURSOR_X, {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: CURSOR_EASINGS,
        })}
        y={interpolate(frame, CURSOR_TIMES, CURSOR_Y, {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: CURSOR_EASINGS,
        })}
        hand={frame >= VOTE_REACH_START}
        style={{
          scale:
            press(frame, VOTE_CLICK, 0.88) *
            press(frame, COMPOSER_CLICK, 0.9) *
            press(frame, SUBMIT_CLICK, 0.88),
        }}
      />
    </AbsoluteFill>
  );
};
