import {
  AbsoluteFill,
  Composition,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import {
  AGENT_COMMENT,
  commentButtonCentre,
  composerCentre,
  Cursor,
  FEEDBACK_TITLE,
  FPS,
  PublicBoard,
  SITE_HEIGHT,
  SITE_WIDTH,
  paragraph,
  VISITOR_COMMENT,
  VISITOR_NAME,
  voteCentre,
  type PublicComment,
} from "./ui";

export const FeatureSharkPublicBoardSceneComposition = () => (
  <Composition
    id="FeatureSharkPublicBoardScene"
    component={PublicBoardScene}
    durationInFrames={660}
    fps={FPS}
    width={SITE_WIDTH}
    height={SITE_HEIGHT}
  />
);

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

/**
 * The previous scene ends pushed *into* a modal, so this one pulls back out of
 * one: the page resolves from slightly enlarged and out of focus. Same axis,
 * opposite direction, which is what makes the cut read as continuous rather than
 * as a new shot.
 */
const FOCUS_LENGTH = 30;

/** Then the page's own parts settle, top to bottom. */
const NAV = 6;
const BACK = 14;
const HEADER = 20;
const DISCUSSION = 30;
const META = 36;
const FOOTER = 56;
const BUBBLE = 64;

/** The pointer drifts in once the page has settled, before it does anything. */
const CURSOR_IN_START = 80;
const CURSOR_IN_END = 126;

/** Beat 1 — the visitor upvotes their own request. */
const VOTE_REACH_START = 150;
const VOTE_REACH_END = 196;
const VOTE_CLICK = 204;

/** Beat 2 — then opens the composer and types a nudge. */
const COMPOSER_REACH_START = 236;
const COMPOSER_REACH_END = 276;
const COMPOSER_CLICK = 284;
const TYPE_START = COMPOSER_CLICK + 14;
const FRAMES_PER_CHAR = 2;
const TYPE_END = TYPE_START + VISITOR_COMMENT.length * FRAMES_PER_CHAR;

/** Beat 3 — and posts it. */
const SUBMIT_REACH_START = TYPE_END + 12;
const SUBMIT_REACH_END = SUBMIT_REACH_START + 40;
const SUBMIT_CLICK = SUBMIT_REACH_END + 8;
const POSTED = SUBMIT_CLICK + 4;

const VOTE = voteCentre();
const COMPOSER = composerCentre();
const SUBMIT = commentButtonCentre();
const CURSOR_FROM = { x: SITE_WIDTH + 120, y: SITE_HEIGHT + 120 };
/** Where the pointer waits after the page settles, before it acts. */
const CURSOR_IDLE = { x: 1046, y: 850 };
/** Clear of the thread once the comment is up. */
const CURSOR_REST = { x: SUBMIT.x - 40, y: SUBMIT.y + 120 };

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
const CURSOR_Y = [
  CURSOR_FROM.y,
  CURSOR_IDLE.y,
  CURSOR_IDLE.y,
  VOTE.y,
  VOTE.y,
  COMPOSER.y,
  COMPOSER.y,
  SUBMIT.y,
  SUBMIT.y,
  CURSOR_REST.y,
];
const CURSOR_EASINGS = CURSOR_TIMES.slice(1).map(() => EASE_OUT);

/** Rise-into-place, shared by every card on the page. */
const rise = (frame: number, at: number, distance = 16) => {
  const shown = arrive(frame, at, at + 24);

  return {
    opacity: shown,
    translate: `0px ${(1 - shown) * distance}px`,
  };
};

/**
 * Scene: the request shows up on the public board, and the visitor pushes on it.
 *
 * The closing beat of the loop — the same feedback they sent, the same reply the
 * agent wrote, now on the customer-facing page. The page arrives out of the
 * previous scene's modal, settles, and then three clicks: upvote, open the
 * composer, post a nudge at the agent. Still from ~frame 560.
 */
export const PublicBoardScene: React.FC = () => {
  const frame = useCurrentFrame();

  const focus = arrive(frame, 0, FOCUS_LENGTH);

  const voted = frame >= VOTE_CLICK;
  const drafting = frame >= COMPOSER_CLICK && frame < POSTED;
  const posted = frame >= POSTED;

  // Typed a character at a time so the composer shows real progress.
  const typed = VISITOR_COMMENT.slice(
    0,
    Math.floor(
      interpolate(frame, [TYPE_START, TYPE_END], [0, VISITOR_COMMENT.length], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    ),
  );

  // Newest first, so the visitor's nudge lands above the agent's reply.
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
      name="Public board scene"
      style={{ backgroundColor: "#fbfbfd" }}
    >
      <PublicBoard
        title={FEEDBACK_TITLE}
        author="Anonymous"
        style={{
          // Resolves out of the previous scene's modal push.
          filter: `blur(${(1 - focus) * 9}px)`,
          scale: interpolate(frame, [0, FOCUS_LENGTH], [1.05, 1], {
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
        // An arrow until it reaches for a control, then the hand a browser shows.
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
