import {
  AbsoluteFill,
  Composition,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import {
  ADMIN_COMMENT,
  ADMIN_NAME,
  AdminHome,
  backToFeedbackCentre,
  commentButtonCentre,
  composerCentre,
  countsFor,
  Cursor,
  DARK_MODE_FOLLOW_UP,
  DARK_MODE_QUESTIONS,
  DARK_MODE_ROW,
  DARK_MODE_TITLE,
  detailHeaderCentre,
  FeedbackBoard,
  FeedbackDetailPanel,
  FPS,
  INTEGRATIONS_ROW,
  paragraph,
  PublicBoard,
  railSlotCentre,
  rowTitleCentre,
  railSlotCentre as railSlot,
  ROADMAP_RAIL_ACTIVE,
  ROADMAP_STAGE_META,
  RoadmapBoard,
  sharkCentre,
  SharkAiPanel,
  SITE_HEIGHT,
  SITE_WIDTH,
  VISITOR_COMMENT,
  VISITOR_NAME,
  type AgentRun,
  type DetailComment,
  type RoadmapStage,
  type FeedbackRow,
  type PublicComment,
} from "./ui";

export const FeatureSharkFeedbackReviewSceneComposition = () => (
  <Composition
    id="FeatureSharkFeedbackReviewScene"
    component={FeedbackReviewScene}
    durationInFrames={1620}
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

/** Beat 1 — Admin Home, then the rail takes us to Feedback. */
const RAIL_REACH_START = 44;
const RAIL_REACH_END = 92;
const RAIL_CLICK = 100;
const NAV = RAIL_CLICK + 4;
const NAV_LENGTH = 36;
const BOARD = NAV + NAV_LENGTH;

/** Beat 2 — the dark-mode request is opened. */
const ROW_REACH_START = BOARD + 60;
const ROW_REACH_END = BOARD + 110;
const ROW_CLICK = BOARD + 118;
const DETAIL = ROW_CLICK + 4;
const DETAIL_LENGTH = 30;

/** Beat 3 — "open in preview" shows the request as a visitor sees it. */
const PREVIEW_REACH_START = DETAIL + 70;
const PREVIEW_REACH_END = DETAIL + 116;
const PREVIEW_CLICK = DETAIL + 124;
const PREVIEW = PREVIEW_CLICK + 4;
const PREVIEW_LENGTH = 34;

/** Beat 4 — the admin writes a direction for the agent on the public thread. */
const ADMIN_REACH_START = 500;
const ADMIN_REACH_END = 544;
const ADMIN_CLICK = 552;
const ADMIN_TYPE_START = ADMIN_CLICK + 14;
/** A little quicker per character than the shorter comments: this one is long. */
const FRAMES_PER_CHAR = 1.5;
const ADMIN_TYPE_END =
  ADMIN_TYPE_START + ADMIN_COMMENT.length * FRAMES_PER_CHAR;
const ADMIN_SUBMIT_REACH_START = ADMIN_TYPE_END + 14;
const ADMIN_SUBMIT_REACH_END = ADMIN_SUBMIT_REACH_START + 44;
const ADMIN_SUBMIT_CLICK = ADMIN_SUBMIT_REACH_END + 8;
const ADMIN_POSTED = ADMIN_SUBMIT_CLICK + 4;

/** Beat 5 — back to the board, then Shark AI shows what the agent did next. */
const BACK_REACH_START = 860;
const BACK_REACH_END = 904;
const BACK_CLICK = 912;
const BACK = BACK_CLICK + 4;
const BACK_LENGTH = 28;

const SHARK_REACH_START = 990;
const SHARK_REACH_END = 1034;
const SHARK_CLICK = 1042;
const SWAP = SHARK_CLICK + 4;
const SWAP_LENGTH = 30;

/** A call resolves this long after it appears, unless it is still in flight. */
const SPIN_LENGTH = 46;
/** The older run had already finished by the time the panel opens. */
const SETTLED = SWAP + 18;

/**
 * What the agent did with the admin's direction. Newest run first, and newest
 * line first within a run. Every line spins on arrival and resolves to a tick,
 * so the scene ends with the work finished.
 */
const LOG: {
  subject: string;
  time: string;
  at: number;
  items: { label: string; time: string; at: number; instant?: boolean }[];
}[] = [
  {
    subject: "acme-roadmap",
    time: "0 seconds ago",
    at: SWAP + 74,
    items: [
      {
        label: "used GetRoadmapProgress 'acme-roadmap'",
        time: "0 seconds ago",
        at: SWAP + 104,
      },
      {
        label: "used SearchRoadmap 'acme-roadmap'",
        time: "0 seconds ago",
        at: SWAP + 74,
      },
    ],
  },
  {
    subject: DARK_MODE_TITLE,
    time: "2 minutes ago",
    at: 0,
    items: [
      { label: "used ListRoadmaps", time: "1 second ago", at: SETTLED, instant: true },
      {
        label: "used ListFeedbackStatuses",
        time: "1 second ago",
        at: SETTLED + 5,
        instant: true,
      },
      {
        label: "used GetFeedbackDetail 'Enable dark mode'",
        time: "1 second ago",
        at: SETTLED + 10,
        instant: true,
      },
      {
        label: "Agent 'Product Manager' was prompted by Article Writer",
        time: "49 seconds ago",
        at: SETTLED + 15,
        instant: true,
      },
      {
        label: "Agent 'Product Manager' was prompted by Article Writer",
        time: "52 seconds ago",
        at: SETTLED + 20,
        instant: true,
      },
    ],
  },
];

/** Beat 6 — the rail takes us on to the roadmap the agent just updated. */
const ROADMAP_REACH_START = 1240;
const ROADMAP_REACH_END = 1288;
const ROADMAP_CLICK = 1296;
const ROADMAP = ROADMAP_CLICK + 4;
const ROADMAP_LENGTH = 36;

/** Then the roadmap's own parts settle, left to right. */
const ROADMAP_PANEL = ROADMAP + 10;
const ROADMAP_TOGGLE = ROADMAP + 20;
const ROADMAP_STAGE_STAGGER = 7;
const ROADMAP_CARD = ROADMAP + 60;

/** The public page's own parts settle once it is up. */
const PREVIEW_NAV = PREVIEW + 8;
const PREVIEW_HEADER = PREVIEW + 16;
const PREVIEW_DISCUSSION = PREVIEW + 24;
const PREVIEW_META = PREVIEW + 30;
const PREVIEW_FOOTER = PREVIEW + 44;

/**
 * Both requests are on the board by now. Newest first, so dark mode — which the
 * visitor has already voted on and chased — sits on top.
 */
const ROWS: FeedbackRow[] = [DARK_MODE_ROW, INTEGRATIONS_ROW];

/** The dark-mode thread: the visitor chasing a date, and the agent's answers. */
const DARK_THREAD: DetailComment[] = [
  {
    author: VISITOR_NAME,
    initial: VISITOR_NAME.charAt(0),
    time: "Just now",
    blocks: [paragraph(VISITOR_COMMENT)],
    replies: [
      {
        author: "Product Manager",
        initial: "P",
        time: "Just now",
        agent: true,
        blocks: [DARK_MODE_FOLLOW_UP],
      },
    ],
  },
  {
    author: "Product Manager",
    initial: "P",
    time: "1 minute ago",
    agent: true,
    blocks: DARK_MODE_QUESTIONS,
  },
];

/** The same thread as the public page renders it. */
const PUBLIC_THREAD: PublicComment[] = [
  {
    name: VISITOR_NAME,
    initial: VISITOR_NAME.charAt(0),
    time: "0m ago",
    body: [paragraph(VISITOR_COMMENT)],
    replies: [
      {
        name: "Product Manager",
        initial: "P",
        time: "0m ago",
        badge: "agent",
        body: [DARK_MODE_FOLLOW_UP],
      },
    ],
  },
  {
    name: "Product Manager",
    initial: "P",
    time: "1m ago",
    badge: "agent",
    body: DARK_MODE_QUESTIONS,
  },
];

const RAIL_FEEDBACK = railSlotCentre(2);
/** The filter column is open on this page, so the table starts further right. */
const ROW_TITLE = rowTitleCentre({ filterOpen: true, index: 0 });
/** Shark AI is closed here, so the pane's controls sit further right. */
const PREVIEW_BUTTON = detailHeaderCentre("preview", { sharkOpen: false });

const ADMIN_COMPOSER = composerCentre();
const ADMIN_SUBMIT = commentButtonCentre();
const BACK_LINK = backToFeedbackCentre();
/** The filter column is open again by the time Shark AI is pressed. */
const SHARK = (() => {
  const centre = sharkCentre();

  return { x: centre.x + 46, y: centre.y };
})();

const RAIL_ROADMAP = railSlot(ROADMAP_RAIL_ACTIVE);

const CURSOR_FROM = { x: -140, y: SITE_HEIGHT + 130 };
/** Clear of the pane it just opened. */
const CURSOR_REST = { x: ROW_TITLE.x + 130, y: ROW_TITLE.y + 320 };
/** Pauses beside the agent's reply on the public page, reading it. */
const PREVIEW_REST = { x: 1075, y: 716 };
/** Pauses clear of the thread once the direction is posted. */
const ADMIN_REST = { x: ADMIN_SUBMIT.x - 60, y: ADMIN_SUBMIT.y + 150 };
/** Pauses out of the top bar's controls, off the panel it just opened. */
const SHARK_REST = { x: 620, y: 300 };
/** Ends on the one item that made it onto the roadmap. */
const ROADMAP_REST = { x: 1080, y: 420 };

const CURSOR_TIMES = [
  RAIL_REACH_START,
  RAIL_REACH_END,
  ROW_REACH_START,
  ROW_REACH_END,
  DETAIL + 8,
  DETAIL + 48,
  PREVIEW_REACH_START,
  PREVIEW_REACH_END,
  PREVIEW + 10,
  PREVIEW + 50,
  ADMIN_REACH_START,
  ADMIN_REACH_END,
  ADMIN_SUBMIT_REACH_START,
  ADMIN_SUBMIT_REACH_END,
  ADMIN_POSTED + 8,
  ADMIN_POSTED + 48,
  BACK_REACH_START,
  BACK_REACH_END,
  SHARK_REACH_START,
  SHARK_REACH_END,
  SWAP + 10,
  SWAP + 50,
  ROADMAP_REACH_START,
  ROADMAP_REACH_END,
  ROADMAP + 10,
  ROADMAP + 60,
];
const CURSOR_X = [
  CURSOR_FROM.x,
  RAIL_FEEDBACK.x,
  RAIL_FEEDBACK.x,
  ROW_TITLE.x,
  ROW_TITLE.x,
  CURSOR_REST.x,
  CURSOR_REST.x,
  PREVIEW_BUTTON.x,
  PREVIEW_BUTTON.x,
  PREVIEW_REST.x,
  PREVIEW_REST.x,
  ADMIN_COMPOSER.x,
  ADMIN_COMPOSER.x,
  ADMIN_SUBMIT.x,
  ADMIN_SUBMIT.x,
  ADMIN_REST.x,
  ADMIN_REST.x,
  BACK_LINK.x,
  BACK_LINK.x,
  SHARK.x,
  SHARK.x,
  SHARK_REST.x,
  SHARK_REST.x,
  RAIL_ROADMAP.x,
  RAIL_ROADMAP.x,
  ROADMAP_REST.x,
];
const CURSOR_Y = [
  CURSOR_FROM.y,
  RAIL_FEEDBACK.y,
  RAIL_FEEDBACK.y,
  ROW_TITLE.y,
  ROW_TITLE.y,
  CURSOR_REST.y,
  CURSOR_REST.y,
  PREVIEW_BUTTON.y,
  PREVIEW_BUTTON.y,
  PREVIEW_REST.y,
  PREVIEW_REST.y,
  ADMIN_COMPOSER.y,
  ADMIN_COMPOSER.y,
  ADMIN_SUBMIT.y,
  ADMIN_SUBMIT.y,
  ADMIN_REST.y,
  ADMIN_REST.y,
  BACK_LINK.y,
  BACK_LINK.y,
  SHARK.y,
  SHARK.y,
  SHARK_REST.y,
  SHARK_REST.y,
  RAIL_ROADMAP.y,
  RAIL_ROADMAP.y,
  ROADMAP_REST.y,
];
const CURSOR_EASINGS = CURSOR_TIMES.slice(1).map(() => EASE_OUT);

/**
 * Scene: an admin goes from their home page to the feedback board, opens the
 * dark-mode request the visitor has been chasing, and previews it.
 *
 * Three clicks, and nothing moves that a click did not cause. Feedback in the
 * rail swaps Admin Home's pane for the board — the rail is common to both pages,
 * so it holds still and only its highlight moves — then the row opens its pane,
 * squeezing the table rather than covering it. Finally "open in preview" brings
 * up the same request as a visitor sees it, still signed in as an admin — where
 * they leave the agent its next instruction. Back on the board, Shark AI shows
 * what the agent did with it. A last hop through the rail lands on the roadmap
 * the agent moved the request onto. Still from ~frame 1440.
 */
export const FeedbackReviewScene: React.FC = () => {
  const frame = useCurrentFrame();

  /** The navigation: Admin Home's pane leaves as the board's columns arrive. */
  const nav = arrive(frame, NAV, NAV + NAV_LENGTH);
  const detail = arrive(frame, DETAIL, DETAIL + DETAIL_LENGTH);
  const preview = arrive(frame, PREVIEW, PREVIEW + PREVIEW_LENGTH);

  /** The preview closes on the way back, revealing the board behind it. */
  const back = arrive(frame, BACK, BACK + BACK_LENGTH);
  const swap = arrive(frame, SWAP, SWAP + SWAP_LENGTH);
  const roadmap = arrive(frame, ROADMAP, ROADMAP + ROADMAP_LENGTH);

  const drafting = frame >= ADMIN_CLICK && frame < ADMIN_POSTED;
  const adminPosted = frame >= ADMIN_POSTED;

  // Typed a character at a time, so the composer shows real progress.
  const typed = ADMIN_COMMENT.slice(
    0,
    Math.floor(
      interpolate(
        frame,
        [ADMIN_TYPE_START, ADMIN_TYPE_END],
        [0, ADMIN_COMMENT.length],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      ),
    ),
  );

  // Newest first, so the admin's direction lands above the visitor's question.
  const comments: PublicComment[] = adminPosted
    ? [
        {
          name: ADMIN_NAME,
          initial: ADMIN_NAME.charAt(0),
          time: "0m ago",
          badge: "admin" as const,
          body: [paragraph(ADMIN_COMMENT)],
          style: {
            opacity: arrive(frame, ADMIN_POSTED, ADMIN_POSTED + 20),
            translate: `0px ${
              (1 - arrive(frame, ADMIN_POSTED, ADMIN_POSTED + 20)) * -12
            }px`,
          },
        },
        ...PUBLIC_THREAD,
      ]
    : PUBLIC_THREAD;

  const rows = ROWS.map((row, index) => ({
    ...row,
    selected: index === 0 && frame >= ROW_CLICK,
    style: {
      // The board is already populated; the rows just settle in behind the
      // navigation rather than arriving as news.
      opacity: arrive(frame, BOARD - 20 + index * 8, BOARD + 10 + index * 8),
    },
  }));

  // Runs and lines that have not started are dropped rather than hidden, so the
  // card genuinely grows as the log fills.
  const runs: AgentRun[] = LOG.filter((run) => frame >= run.at).map((run) => {
    const appeared = arrive(frame, run.at, run.at + 18);

    return {
      subject: run.subject,
      time: run.time,
      style: {
        opacity: appeared,
        translate: `0px ${(1 - appeared) * -10}px`,
      },
      items: run.items
        .filter((item) => frame >= item.at)
        .map((item) => {
          const shown = arrive(frame, item.at, item.at + 14);

          return {
            label: item.label,
            time: item.time,
            done: item.instant || frame >= item.at + SPIN_LENGTH,
            style: {
              opacity: shown,
              translate: `0px ${(1 - shown) * 6}px`,
            },
          };
        }),
    };
  });

  /** Only the request the admin directed onto the roadmap is on it. */
  const stages: RoadmapStage[] = ROADMAP_STAGE_META.map((stage, index) => ({
    ...stage,
    items:
      stage.label === "Planned"
        ? [
            {
              title: DARK_MODE_TITLE,
              board: "Feature Requests",
              author: VISITOR_NAME.split(" ")[0],
              time: "3 minutes ago",
              votes: 1,
              score: "20k",
              style: {
                opacity: arrive(frame, ROADMAP_CARD, ROADMAP_CARD + 22),
                translate: `0px ${
                  (1 - arrive(frame, ROADMAP_CARD, ROADMAP_CARD + 22)) * -14
                }px`,
              },
            },
          ]
        : [],
    style: {
      opacity: arrive(
        frame,
        ROADMAP + 26 + index * ROADMAP_STAGE_STAGGER,
        ROADMAP + 50 + index * ROADMAP_STAGE_STAGGER,
      ),
    },
  }));

  return (
    <AbsoluteFill
      name="Feedback review scene"
      style={{ backgroundColor: "#3f2cc0" }}
    >
      <FeedbackBoard
        // Recedes very slightly as the preview comes forward over it.
        style={{
          scale: 1 - preview * (1 - back) * 0.01,
          // Leaves to the left as the roadmap takes over, the way the pages
          // before it did.
          translate: `${roadmap * -3}% 0px`,
        }}
        rows={rows}
        counts={countsFor(rows)}
        // The pane closes as we head back to the list.
        detailOpen={detail * (1 - back)}
        detailPanel={
          <FeedbackDetailPanel
            title={DARK_MODE_TITLE}
            thread={DARK_THREAD}
            // Fades in behind its own reveal so the contents are not visible
            // squeezed into a few pixels of open pane.
            style={{ opacity: arrive(frame, DETAIL + 6, DETAIL + 24) }}
          />
        }
        sharkStyle={{
          scale: press(frame, SHARK_CLICK, 0.94),
          // Only the pressed state tints — no idle glow before the click.
          backgroundColor:
            frame >= SHARK_CLICK - 4 && frame <= SHARK_CLICK + 7
              ? "#f4f1fe"
              : "#ffffff",
        }}
        filterCollapse={swap}
        sharkOpen={swap}
        sharkPanel={
          <SharkAiPanel
            runs={runs}
            // One turn per second while anything is in flight.
            spinnerAngle={frame * (360 / FPS)}
            style={{ opacity: arrive(frame, SWAP + 6, SWAP + 24) }}
          />
        }
      />

      {/*
        Admin Home sits on top until the navigation is done. Both pages share the
        same ground and the same rail in the same place, so fading this layer out
        moves the rail's highlight from Home to Feedback without anything jumping.
      */}
      {frame < NAV + NAV_LENGTH ? (
        <AbsoluteFill
          name="Admin Home"
          style={{
            opacity: 1 - nav,
            // Leaves to the left, the way a page you navigate away from does.
            translate: `${nav * -4}% 0px`,
            scale: interpolate(frame, [0, 30], [1.02, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE_OUT,
            }),
          }}
        >
          <AdminHome />
        </AbsoluteFill>
      ) : null}

      {/*
        The preview arrives in front of the workspace, the way opening a page
        does — the board stays put behind it rather than sliding away.
      */}
      {frame >= PREVIEW && frame < BACK + BACK_LENGTH ? (
        <AbsoluteFill
          name="Public preview"
          style={{
            // Arrives forward, then leaves the same way it came.
            opacity: arrive(frame, PREVIEW, PREVIEW + 16) * (1 - back),
            scale:
              interpolate(
                frame,
                [PREVIEW, PREVIEW + PREVIEW_LENGTH],
                [1.03, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: EASE_OUT,
                },
              ) *
              (1 + back * 0.02),
          }}
        >
          <PublicBoard
            title={DARK_MODE_TITLE}
            author={VISITOR_NAME}
            // Previewed while signed in, so the nav keeps the admin controls.
            navVariant="admin"
            votes={1}
            voted
            voterName={VISITOR_NAME}
            voterRole="User"
            voterTime="Jun 27, 09:19 PM"
            comments={comments}
            composer={drafting ? "expanded" : "collapsed"}
            draft={typed}
            caret={drafting}
            submitStyle={{ scale: press(frame, ADMIN_SUBMIT_CLICK, 0.95) }}
            navStyle={{ opacity: arrive(frame, PREVIEW_NAV, PREVIEW_NAV + 20) }}
            headerStyle={{
              opacity: arrive(frame, PREVIEW_HEADER, PREVIEW_HEADER + 20),
            }}
            discussionStyle={{
              opacity: arrive(
                frame,
                PREVIEW_DISCUSSION,
                PREVIEW_DISCUSSION + 20,
              ),
            }}
            metaStyle={{
              opacity: arrive(frame, PREVIEW_META, PREVIEW_META + 20),
            }}
            footerStyle={{
              opacity: arrive(frame, PREVIEW_FOOTER, PREVIEW_FOOTER + 20),
            }}
            bubbleStyle={{
              opacity: arrive(frame, PREVIEW_FOOTER, PREVIEW_FOOTER + 20),
            }}
          />
        </AbsoluteFill>
      ) : null}

      {/*
        The roadmap arrives over the board. Both pages share the ground and the
        rail, so the only visible change is the highlight moving down a slot.
      */}
      {frame >= ROADMAP ? (
        <AbsoluteFill
          name="Roadmap"
          style={{
            opacity: arrive(frame, ROADMAP, ROADMAP + 18),
            scale: interpolate(
              frame,
              [ROADMAP, ROADMAP + ROADMAP_LENGTH],
              [1.015, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: EASE_OUT,
              },
            ),
          }}
        >
          <RoadmapBoard
            stages={stages}
            panelStyle={{
              opacity: arrive(frame, ROADMAP_PANEL, ROADMAP_PANEL + 20),
            }}
            toggleStyle={{
              opacity: arrive(frame, ROADMAP_TOGGLE, ROADMAP_TOGGLE + 20),
            }}
          />
        </AbsoluteFill>
      ) : null}

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
        // An arrow while the preview is only being read, a hand once it is used.
        hand={
          (frame >= RAIL_REACH_START && frame < PREVIEW) ||
          frame >= ADMIN_REACH_START
        }
        style={{
          scale:
            press(frame, RAIL_CLICK, 0.88) *
            press(frame, ROW_CLICK, 0.88) *
            press(frame, PREVIEW_CLICK, 0.88) *
            press(frame, ADMIN_CLICK, 0.9) *
            press(frame, ADMIN_SUBMIT_CLICK, 0.88) *
            press(frame, BACK_CLICK, 0.88) *
            press(frame, SHARK_CLICK, 0.88) *
            press(frame, ROADMAP_CLICK, 0.88),
        }}
      />
    </AbsoluteFill>
  );
};
