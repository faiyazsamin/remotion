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
  BOARD_TOP_BAR_HEIGHT,
  commentButtonCentre,
  countsFor,
  Cursor,
  DARK_MODE_FOLLOW_UP,
  DARK_MODE_QUESTIONS,
  DARK_MODE_ROW,
  DARK_MODE_TITLE,
  DETAIL_PANEL_WIDTH,
  detailHeaderCentre,
  BOARD_RAIL_ACTIVE,
  FeedbackBoard,
  FeedbackDetailPanel,
  FILTER_PANEL_WIDTH,
  FPS,
  INTEGRATIONS_ROW,
  paragraph,
  PublicBoard,
  railSlotCentre,
  rowTitleCentre,
  railSlotCentre as railSlot,
  ROADMAP_COLUMNS_TOP,
  ROADMAP_MAIN_LEFT,
  ROADMAP_RAIL_ACTIVE,
  ROADMAP_STAGE_META,
  RoadmapBoard,
  scaled,
  sharkCentre,
  SharkAiPanel,
  SHARK_PANEL_WIDTH,
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
import { TABLE_ROW_HEIGHT } from "./ui/FeedbackTable";

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

const pop = (frame: number, at: number) =>
  interpolate(frame, [at, at + 8, at + 26], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

const spotlightOpacity = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, start + 14, end - 14, end], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

const routeContentIn = (progress: number): React.CSSProperties => ({
  opacity: progress,
  translate: `${(1 - progress) * 54}px 0px`,
  filter: `blur(${(1 - progress) * 2.4}px)`,
});

const routeContentOut = (progress: number): React.CSSProperties => ({
  opacity: 1 - progress * 0.42,
  translate: `${progress * -34}px 0px`,
  filter: `blur(${progress * 2}px)`,
});

const Spotlight: React.FC<{
  label: string;
  opacity: number;
  rect: { x: number; y: number; width: number; height: number };
  radius?: number;
  style?: React.CSSProperties;
}> = ({ label, opacity, rect, radius = 18, style }) =>
  opacity > 0.01 ? (
    <div
      aria-label={label}
      style={{
        position: "absolute",
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height,
        borderRadius: radius,
        pointerEvents: "none",
        zIndex: 22,
        boxShadow: `0 0 0 9999px rgba(18, 14, 45, ${0.42 * opacity}), 0 0 ${
          32 * opacity
        }px rgba(255, 255, 255, ${0.18 * opacity})`,
        outline: `2px solid rgba(255, 255, 255, ${0.22 * opacity})`,
        ...style,
      }}
    />
  ) : null;

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

const SPIN_LENGTH = FPS / 2;
const TASK_STEP = FPS / 2;
const TASK_START = SWAP + 42;
const TASK_COUNT = 7;
const taskAt = (index: number) => TASK_START + TASK_STEP * index;
const TASKS_DONE = taskAt(TASK_COUNT - 1) + SPIN_LENGTH;

/**
 * What the agent did with the admin's direction. Newest run first, and newest
 * line first within a run. Every line spins on arrival and resolves to a tick,
 * so the scene ends with the work finished.
 */
const LOG: {
  subject: string;
  time: string;
  at: number;
  items: { label: string; time: string; at: number }[];
}[] = [
  {
    subject: "acme-roadmap",
    time: "0 seconds ago",
    at: taskAt(5),
    items: [
      {
        label: "used GetRoadmapProgress 'acme-roadmap'",
        time: "0 seconds ago",
        at: taskAt(6),
      },
      {
        label: "used SearchRoadmap 'acme-roadmap'",
        time: "0 seconds ago",
        at: taskAt(5),
      },
    ],
  },
  {
    subject: DARK_MODE_TITLE,
    time: "2 minutes ago",
    at: SWAP + 18,
    items: [
      { label: "used ListRoadmaps", time: "1 second ago", at: taskAt(0) },
      {
        label: "used ListFeedbackStatuses",
        time: "1 second ago",
        at: taskAt(1),
      },
      {
        label: "used GetFeedbackDetail 'Enable dark mode'",
        time: "1 second ago",
        at: taskAt(2),
      },
      {
        label: "Agent 'Product Manager' was prompted by Article Writer",
        time: "49 seconds ago",
        at: taskAt(3),
      },
      {
        label: "Agent 'Product Manager' was prompted by Article Writer",
        time: "52 seconds ago",
        at: taskAt(4),
      },
    ],
  },
];

/** Beat 6 — the rail takes us on to the roadmap the agent just updated. */
const ROADMAP_REACH_START = TASKS_DONE + 70;
const ROADMAP_REACH_END = ROADMAP_REACH_START + 48;
const ROADMAP_CLICK = ROADMAP_REACH_END + 8;
const ROADMAP = ROADMAP_CLICK + 4;
const ROADMAP_LENGTH = 36;

/** Then the roadmap's own parts settle, left to right. */
const ROADMAP_PANEL = ROADMAP + 10;
const ROADMAP_TOGGLE = ROADMAP + 20;
const ROADMAP_STAGE_STAGGER = 7;
const ROADMAP_CARD = ROADMAP + 60;
const ROADMAP_CARD_FOCUS = ROADMAP_CARD + 22;
const ROADMAP_CARD_FOCUS_END = ROADMAP_CARD_FOCUS + 56;

/** Final handoff — return to Feedback before the bulk-work scene takes over. */
const FEEDBACK_RETURN_REACH_START = ROADMAP_CARD_FOCUS_END + 28;
const FEEDBACK_RETURN_REACH_END = FEEDBACK_RETURN_REACH_START + 40;
const FEEDBACK_RETURN_CLICK = FEEDBACK_RETURN_REACH_END + 8;

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

const ADMIN_SUBMIT = commentButtonCentre();
const BACK_LINK = backToFeedbackCentre();
/** The filter column is open again by the time Shark AI is pressed. */
const SHARK = (() => {
  const centre = sharkCentre();

  return { x: centre.x + 46, y: centre.y };
})();
const SHARK_BUTTON = sharkCentre();

const RAIL_ROADMAP = railSlot(ROADMAP_RAIL_ACTIVE);

const GUTTER = 12;
const RAIL_WIDTH = scaled(46);
const FILTER_OPEN_MAIN_LEFT =
  GUTTER + RAIL_WIDTH + GUTTER + FILTER_PANEL_WIDTH + GUTTER;
const ROW_SPOTLIGHT = {
  x: FILTER_OPEN_MAIN_LEFT + 18,
  y: ROW_TITLE.y - TABLE_ROW_HEIGHT / 2 + 5,
  width: SITE_WIDTH - FILTER_OPEN_MAIN_LEFT - GUTTER - 36,
  height: TABLE_ROW_HEIGHT - 10,
};
const DETAIL_SPOTLIGHT = {
  x: SITE_WIDTH - GUTTER - DETAIL_PANEL_WIDTH,
  y: GUTTER + BOARD_TOP_BAR_HEIGHT,
  width: DETAIL_PANEL_WIDTH,
  height: SITE_HEIGHT - GUTTER * 2 - BOARD_TOP_BAR_HEIGHT,
};
const PREVIEW_BUTTON_SPOTLIGHT = {
  x: PREVIEW_BUTTON.x - 26,
  y: PREVIEW_BUTTON.y - 26,
  width: 52,
  height: 52,
};
const PREVIEW_COMPOSER_RECT = {
  x: 324 + 38,
  y: 160 + 140 + 32 + 26 + 48 + 24,
  width: 828 - 76,
  height: 150,
};
const ADMIN_COMPOSER_CLICK_TARGET = {
  x: PREVIEW_COMPOSER_RECT.x + PREVIEW_COMPOSER_RECT.width - 78,
  y: PREVIEW_COMPOSER_RECT.y + 36,
};
const SHARK_BUTTON_SPOTLIGHT = {
  x: SHARK_BUTTON.x - 62,
  y: SHARK_BUTTON.y - 20,
  width: 124,
  height: 40,
};
const SHARK_PANEL_SPOTLIGHT = {
  x: SITE_WIDTH - GUTTER - SHARK_PANEL_WIDTH,
  y: GUTTER,
  width: SHARK_PANEL_WIDTH,
  height: SITE_HEIGHT - GUTTER * 2,
};
const ROADMAP_COLUMN_GAP = 17;
const ROADMAP_COLUMNS_X = ROADMAP_MAIN_LEFT + 14;
const ROADMAP_COLUMNS_WIDTH = SITE_WIDTH - ROADMAP_MAIN_LEFT - GUTTER - 28;
const ROADMAP_COLUMN_WIDTH =
  (ROADMAP_COLUMNS_WIDTH - ROADMAP_COLUMN_GAP * 3) / 4;
const ROADMAP_COLUMN_HEADER_HEIGHT = 52;
const ROADMAP_COLUMN_BODY_PADDING = 12;
const ROADMAP_CARD_HEIGHT = 114;
const PLANNED_CARD_SPOTLIGHT = {
  x:
    ROADMAP_COLUMNS_X +
    ROADMAP_COLUMN_WIDTH +
    ROADMAP_COLUMN_GAP +
    ROADMAP_COLUMN_BODY_PADDING,
  y:
    ROADMAP_COLUMNS_TOP +
    ROADMAP_COLUMN_HEADER_HEIGHT +
    ROADMAP_COLUMN_BODY_PADDING,
  width: ROADMAP_COLUMN_WIDTH - 24,
  height: ROADMAP_CARD_HEIGHT,
};

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
  FEEDBACK_RETURN_REACH_START,
  FEEDBACK_RETURN_REACH_END,
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
  ADMIN_COMPOSER_CLICK_TARGET.x,
  ADMIN_COMPOSER_CLICK_TARGET.x,
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
  ROADMAP_REST.x,
  RAIL_FEEDBACK.x,
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
  ADMIN_COMPOSER_CLICK_TARGET.y,
  ADMIN_COMPOSER_CLICK_TARGET.y,
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
  ROADMAP_REST.y,
  RAIL_FEEDBACK.y,
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
  const rowFocus = spotlightOpacity(frame, ROW_REACH_START, DETAIL + 18);
  const detailFocus = spotlightOpacity(frame, DETAIL + 12, PREVIEW_REACH_START - 8);
  const previewButtonFocus = spotlightOpacity(
    frame,
    PREVIEW_REACH_START + 4,
    PREVIEW_CLICK + 12,
  );
  const composerFocus = spotlightOpacity(frame, ADMIN_CLICK, ADMIN_SUBMIT_CLICK);
  const composerPop = arrive(frame, ADMIN_CLICK, ADMIN_CLICK + 42);
  const composerZoom =
    frame < ADMIN_POSTED
      ? interpolate(frame, [ADMIN_CLICK, ADMIN_CLICK + 34, ADMIN_CLICK + 92], [1, 1.08, 1.04], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: EASE_OUT,
        })
      : 1;
  const adminPostBurst = pop(frame, ADMIN_POSTED);
  const sharkButtonFocus = spotlightOpacity(frame, SHARK_REACH_START + 4, SWAP + 12);
  const sharkPanelFocus = spotlightOpacity(frame, SWAP + 24, ROADMAP_REACH_START - 12);
  const roadmapCardAppear = arrive(frame, ROADMAP_CARD, ROADMAP_CARD_FOCUS);
  const roadmapPayoff = spotlightOpacity(
    frame,
    ROADMAP_CARD_FOCUS,
    ROADMAP_CARD_FOCUS_END,
  );
  const roadmapCardZoom =
    frame >= ROADMAP_CARD_FOCUS
      ? interpolate(
          frame,
          [
            ROADMAP_CARD_FOCUS,
            ROADMAP_CARD_FOCUS + 14,
            ROADMAP_CARD_FOCUS + 46,
            ROADMAP_CARD_FOCUS_END,
          ],
          [1, 1.16, 1.08, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE_OUT,
          },
        )
      : 1;
  const roadmapCardLift =
    frame >= ROADMAP_CARD_FOCUS
      ? interpolate(
          frame,
          [
            ROADMAP_CARD_FOCUS,
            ROADMAP_CARD_FOCUS + 14,
            ROADMAP_CARD_FOCUS + 46,
            ROADMAP_CARD_FOCUS_END,
          ],
          [0, -8, 0, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE_OUT,
          },
        )
      : 0;

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
            scale: interpolate(frame, [ADMIN_POSTED, ADMIN_POSTED + 14, ADMIN_POSTED + 32], [0.985, 1.01, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE_OUT,
            }),
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
      backgroundColor:
        index === 0 && frame < ROW_CLICK
          ? `rgba(246, 245, 253, ${0.16 + rowFocus * 0.28})`
          : index === 0 && frame >= ROW_CLICK
            ? "#f6f5fd"
            : undefined,
      boxShadow:
        index === 0 && rowFocus
          ? `0 0 ${30 * rowFocus}px rgba(92, 69, 223, ${0.14 * rowFocus})`
          : undefined,
      scale: index === 0 ? 1 + rowFocus * 0.006 : undefined,
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
            done: frame >= item.at + SPIN_LENGTH,
            style: {
              opacity: shown,
              translate: `0px ${(1 - shown) * 6}px`,
              backgroundColor:
                frame >= item.at && frame < item.at + SPIN_LENGTH
                  ? `rgba(246, 245, 253, ${0.32 * shown})`
                  : frame >= item.at + SPIN_LENGTH
                    ? `rgba(230, 247, 239, ${
                        0.12 *
                        arrive(
                          frame,
                          item.at + SPIN_LENGTH,
                          item.at + SPIN_LENGTH + 16,
                        )
                      })`
                    : undefined,
              borderRadius: 10,
              padding: "8px 10px",
              marginLeft: -10,
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
                opacity: roadmapCardAppear,
                translate: `0px ${(1 - roadmapCardAppear) * -14 + roadmapCardLift}px`,
                scale: roadmapCardZoom,
                boxShadow: `0 ${8 + 14 * roadmapPayoff}px ${
                  18 + 44 * roadmapPayoff
                }px rgba(92, 69, 223, ${0.1 + 0.18 * roadmapPayoff})`,
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
        }}
        panelStyle={routeContentOut(roadmap)}
        contentStyle={routeContentOut(roadmap)}
        railActiveIndicatorOpacity={1 - roadmap}
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
            style={{
              opacity: arrive(frame, DETAIL + 6, DETAIL + 24),
              boxShadow: `-18px 0 42px rgba(24, 20, 60, ${
                0.1 * detailFocus
              })`,
            }}
          />
        }
        sharkStyle={{
          scale: press(frame, SHARK_CLICK, 0.94),
          // Only the pressed state tints — no idle glow before the click.
          backgroundColor:
            frame >= SHARK_CLICK - 4 && frame <= SHARK_CLICK + 7
              ? "#f4f1fe"
              : sharkButtonFocus
                ? "#faf8ff"
                : "#ffffff",
          boxShadow: sharkButtonFocus
            ? `0 0 ${22 * sharkButtonFocus}px rgba(92, 69, 223, ${
                0.2 * sharkButtonFocus
              })`
            : undefined,
        }}
        filterCollapse={swap}
        sharkOpen={swap}
        sharkPanel={
          <SharkAiPanel
            runs={runs}
            // One turn per second while anything is in flight.
            spinnerAngle={frame * (360 / FPS)}
            style={{
              opacity: arrive(frame, SWAP + 6, SWAP + 24),
              boxShadow: `-18px 0 48px rgba(24, 20, 60, ${
                0.14 * swap
              })`,
              borderLeft: `1px solid rgba(92, 69, 223, ${0.16 * swap})`,
            }}
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
            composerStyle={{
              borderColor: `rgba(92, 69, 223, ${0.12 + composerFocus * 0.42})`,
              boxShadow: `0 0 ${42 * composerPop}px rgba(92, 69, 223, ${
                0.13 * composerPop
              })`,
              backgroundColor: composerFocus
                ? `rgba(255, 255, 255, ${0.96 + 0.04 * composerFocus})`
                : undefined,
              transformOrigin: "50% 50%",
              scale: composerZoom,
            }}
            countStyle={{
              scale: 1 + adminPostBurst * 0.18,
              boxShadow: `0 0 ${18 * adminPostBurst}px rgba(92, 69, 223, ${
                0.24 * adminPostBurst
              })`,
            }}
            submitStyle={{
              scale:
                press(frame, ADMIN_SUBMIT_CLICK, 0.95) *
                (1 + adminPostBurst * 0.06),
              boxShadow: `0 ${8 * adminPostBurst}px ${
                22 * adminPostBurst
              }px rgba(92, 69, 223, ${0.26 * adminPostBurst})`,
            }}
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
        <AbsoluteFill name="Roadmap">
          <RoadmapBoard
            stages={stages}
            railPreviousActiveIndex={BOARD_RAIL_ACTIVE}
            railPreviousAccent="#2fb47c"
            railActiveProgress={roadmap}
            panelStyle={routeContentIn(roadmap)}
            contentStyle={routeContentIn(roadmap)}
            toggleStyle={{
              opacity: arrive(frame, ROADMAP_TOGGLE, ROADMAP_TOGGLE + 20),
            }}
          />
        </AbsoluteFill>
      ) : null}

      <Spotlight
        label="Focus feedback row"
        opacity={spotlightOpacity(frame, ROW_REACH_START, DETAIL + 14)}
        rect={ROW_SPOTLIGHT}
        radius={16}
      />
      <Spotlight
        label="Focus detail pane"
        opacity={detailFocus}
        rect={DETAIL_SPOTLIGHT}
        radius={16}
      />
      <Spotlight
        label="Focus preview button"
        opacity={previewButtonFocus}
        rect={PREVIEW_BUTTON_SPOTLIGHT}
        radius={14}
      />
      <Spotlight
        label="Focus admin comment composer"
        opacity={composerFocus}
        rect={PREVIEW_COMPOSER_RECT}
        radius={14}
        style={{
          transformOrigin: "50% 50%",
          scale: composerZoom,
        }}
      />
      <Spotlight
        label="Focus Shark AI button"
        opacity={sharkButtonFocus}
        rect={SHARK_BUTTON_SPOTLIGHT}
        radius={999}
      />
      <Spotlight
        label="Focus Shark AI panel"
        opacity={sharkPanelFocus}
        rect={SHARK_PANEL_SPOTLIGHT}
        radius={18}
      />
      <Spotlight
        label="Focus roadmap planned card"
        opacity={spotlightOpacity(
          frame,
          ROADMAP_CARD_FOCUS,
          ROADMAP_CARD_FOCUS_END,
        )}
        rect={PLANNED_CARD_SPOTLIGHT}
        radius={16}
        style={{
          transformOrigin: "50% 50%",
          scale: roadmapCardZoom,
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
        // An arrow while the preview is only being read, a hand once it is used.
        hand={
          (frame >= RAIL_REACH_START && frame < PREVIEW) ||
          frame >= ADMIN_REACH_START
        }
        style={{
          zIndex: 30,
          scale:
            press(frame, RAIL_CLICK, 0.88) *
            press(frame, ROW_CLICK, 0.88) *
            press(frame, PREVIEW_CLICK, 0.88) *
            press(frame, ADMIN_CLICK, 0.9) *
            press(frame, ADMIN_SUBMIT_CLICK, 0.88) *
            press(frame, BACK_CLICK, 0.88) *
            press(frame, SHARK_CLICK, 0.88) *
            press(frame, ROADMAP_CLICK, 0.88) *
            press(frame, FEEDBACK_RETURN_CLICK, 0.88),
        }}
      />
    </AbsoluteFill>
  );
};
