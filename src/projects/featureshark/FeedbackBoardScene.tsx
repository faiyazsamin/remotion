import {
  AbsoluteFill,
  Composition,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import {
  countsFor,
  Cursor,
  detailExpandCentre,
  FeedbackBoard,
  FeedbackDetailModal,
  FeedbackDetailPanel,
  FPS,
  INTEGRATIONS_ROW,
  INTEGRATIONS_TITLE,
  rowTitleCentre,
  sharkCentre,
  SharkAiPanel,
  SITE_HEIGHT,
  SITE_WIDTH,
  TRIAGE_THREAD,
  type AgentRun,
  type FeedbackRow,
} from "./ui";

export const FeatureSharkFeedbackBoardSceneComposition = () => (
  <Composition
    id="FeatureSharkFeedbackBoardScene"
    component={FeedbackBoardScene}
    durationInFrames={960}
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

/** Beat 1 — the board settles, then the new feedback lands on it. */
const ROW_LANDS = 70;
const ROW_LENGTH = 26;

/** Beat 2 — after a beat on the new row, the pointer crosses to Shark AI. */
const REACH_START = 190;
const REACH_END = 240;
const SHARK_CLICK = 248;

/** Beat 3 — the click swaps the workspace over to the agent's log. */
const SWAP = SHARK_CLICK + 4;
const SWAP_LENGTH = 30;

/**
 * Where the pointer drifts after the click: out of the top bar's controls, so
 * it is not sitting on the panel it just opened.
 */
const CURSOR_REST = { x: 590, y: 52 };

/**
 * Beat 4 — the agent works. Each line appears as a spinner and resolves to a
 * tick `SPIN_LENGTH` frames later, so the panel shows the agent working rather
 * than a finished list fading in.
 *
 * `at` is when a line appears. The log is newest-first, so a later `at` sits
 * higher up its card.
 */
const SPIN_LENGTH = 46;

/** This run started before the click, so its calls are already settled. */
const SETTLED = SWAP + 20;

const LOG: {
  subject: string;
  time: string;
  at: number;
  items: { label: string; time: string; at: number; instant?: boolean }[];
}[] = [
  {
    subject: "integrations",
    time: "0 seconds ago",
    at: 410,
    items: [
      {
        label: "used SearchRoadmap 'integrations'",
        time: "0 seconds ago",
        at: 410,
      },
      {
        label: "used SearchFeedback 'integrations'",
        time: "0 seconds ago",
        at: 428,
      },
    ],
  },
  {
    subject: INTEGRATIONS_TITLE,
    time: "7 seconds ago",
    at: 0,
    items: [
      {
        label: `commented on feedback '${INTEGRATIONS_TITLE}'`,
        time: "0 seconds ago",
        at: 640,
      },
      {
        label: `commented on feedback '${INTEGRATIONS_TITLE}'`,
        time: "0 seconds ago",
        at: 620,
      },
      {
        label: `changed status of feedback '${INTEGRATIONS_TITLE}'`,
        time: "0 seconds ago",
        at: 344,
      },
      {
        label: `added tag to feedback '${INTEGRATIONS_TITLE}'`,
        time: "0 seconds ago",
        at: 322,
      },
      {
        label: "used ListRoadmaps",
        time: "1 second ago",
        at: SETTLED,
        instant: true,
      },
      {
        label: "used ListTeamMembers",
        time: "0 seconds ago",
        at: SETTLED + 5,
        instant: true,
      },
      {
        label: `searched for duplicates of '${INTEGRATIONS_TITLE}'`,
        time: "0 seconds ago",
        at: SETTLED + 10,
        instant: true,
      },
    ],
  },
];

/** Beat 5 — the row itself is opened, splitting the card into table + detail. */
const ROW_REACH_START = 520;
const ROW_REACH_END = 562;
const ROW_CLICK = 570;
const DETAIL = ROW_CLICK + 4;
const DETAIL_LENGTH = 30;

/** Beat 6 — the pane is expanded into the full-screen view. */
const EXPAND_REACH_START = 726;
const EXPAND_REACH_END = 764;
const EXPAND_CLICK = 772;
const MODAL = EXPAND_CLICK + 4;
const MODAL_LENGTH = 26;

const SHARK = (() => {
  const centre = sharkCentre();

  return { x: centre.x + 46, y: centre.y };
})();
const ROW_TITLE = rowTitleCentre();
const EXPAND = detailExpandCentre();
/** Enters from off-frame bottom-left, away from the row it is leaving alone. */
const CURSOR_FROM = { x: -140, y: SITE_HEIGHT + 130 };
/** Off the row once the pane is up, so it is not covering what it opened. */
const DETAIL_REST = { x: ROW_TITLE.x + 900, y: 140 };
/** Lands on the modal's own collapse control, which replaces the expand one. */
const MODAL_REST = { x: 1305, y: 62 };

const CURSOR_TIMES = [
  REACH_START,
  REACH_END,
  SWAP,
  SWAP + 40,
  ROW_REACH_START,
  ROW_REACH_END,
  DETAIL + 6,
  DETAIL + 46,
  EXPAND_REACH_START,
  EXPAND_REACH_END,
  MODAL + 4,
  MODAL + 34,
];
const CURSOR_X = [
  CURSOR_FROM.x,
  SHARK.x,
  SHARK.x,
  CURSOR_REST.x,
  CURSOR_REST.x,
  ROW_TITLE.x,
  ROW_TITLE.x,
  DETAIL_REST.x,
  DETAIL_REST.x,
  EXPAND.x,
  EXPAND.x,
  MODAL_REST.x,
];
const CURSOR_Y = [
  CURSOR_FROM.y,
  SHARK.y,
  SHARK.y,
  CURSOR_REST.y,
  CURSOR_REST.y,
  ROW_TITLE.y,
  ROW_TITLE.y,
  DETAIL_REST.y,
  DETAIL_REST.y,
  EXPAND.y,
  EXPAND.y,
  MODAL_REST.y,
];
const CURSOR_EASINGS = CURSOR_TIMES.slice(1).map(() => EASE_OUT);

/**
 * Scene: the feedback the visitor sent arrives on the admin's board, and the
 * agent picks it up.
 *
 * The page is already settled — the payoff is the row, so it is the only thing
 * that moves at first. It drops in from above, holds long enough to read, and
 * only then does the pointer come in and press Shark AI. That click closes the
 * filter column and opens the agent's activity log in its place, where each call
 * arrives spinning and resolves to a tick. Then the row itself is opened,
 * splitting the card into table and detail, the agent's two comments show up in
 * the log, and finally the pane is expanded into the full view over a blurred
 * board. Still from ~frame 830.
 */
export const FeedbackBoardScene: React.FC = () => {
  const frame = useCurrentFrame();

  const landed = arrive(frame, ROW_LANDS, ROW_LANDS + ROW_LENGTH);

  // One ramp drives both the column closing and the panel opening, so the two
  // read as a single move rather than two coincidental ones.
  const swap = arrive(frame, SWAP, SWAP + SWAP_LENGTH);
  const detail = arrive(frame, DETAIL, DETAIL + DETAIL_LENGTH);
  const modal = arrive(frame, MODAL, MODAL + MODAL_LENGTH);

  /** Only this one request exists at this point in the story. */
  const rows: FeedbackRow[] =
    frame >= ROW_LANDS
      ? [
          {
            ...INTEGRATIONS_ROW,
            selected: frame >= ROW_CLICK,
            style: {
              opacity: landed,
              // Drops in from above: it arrived from outside the workspace.
              translate: `0px ${(1 - landed) * -22}px`,
            },
          },
        ]
      : [];

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
            done: item.instant ? true : frame >= item.at + SPIN_LENGTH,
            style: {
              opacity: shown,
              translate: `0px ${(1 - shown) * 6}px`,
            },
          };
        }),
    };
  });

  return (
    <AbsoluteFill
      name="Feedback board scene"
      style={{ backgroundColor: "#3f2cc0" }}
    >
      <FeedbackBoard
        // Pushed out of focus behind the modal rather than hidden, so the
        // expanded view reads as sitting on top of the workspace.
        style={{
          filter: `blur(${modal * 7}px)`,
          scale: 1 - modal * 0.012,
        }}
        rows={rows}
        counts={countsFor(rows)}
        detailOpen={detail}
        detailPanel={
          <FeedbackDetailPanel
            title={INTEGRATIONS_TITLE}
            thread={TRIAGE_THREAD}
            // Fades in behind its own reveal, like the other two panels.
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
            // Fades in behind its own reveal so the contents are not visible
            // squeezed into a few pixels of open panel.
            style={{ opacity: arrive(frame, SWAP + 6, SWAP + 24) }}
          />
        }
      />

      {frame >= MODAL ? (
        <FeedbackDetailModal
          title={INTEGRATIONS_TITLE}
          thread={TRIAGE_THREAD}
          scrimStyle={{ opacity: arrive(frame, MODAL, MODAL + 16) }}
          cardStyle={{
            opacity: arrive(frame, MODAL, MODAL + 14),
            // Grows the last little way, so it reads as coming forward out of
            // the pane rather than appearing on top of it.
            scale: interpolate(frame, [MODAL, MODAL + MODAL_LENGTH], [0.965, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE_OUT,
            }),
          }}
        />
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
        hand
        style={{
          scale:
            press(frame, SHARK_CLICK, 0.88) *
            press(frame, ROW_CLICK, 0.88) *
            press(frame, EXPAND_CLICK, 0.88),
        }}
      />
    </AbsoluteFill>
  );
};
