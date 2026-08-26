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
  BOARD_TOP_BAR_HEIGHT,
  detailExpandCentre,
  DETAIL_PANEL_WIDTH,
  FeedbackBoard,
  FeedbackDetailModal,
  FeedbackDetailPanel,
  FILTER_PANEL_WIDTH,
  FPS,
  INTEGRATIONS_ROW,
  INTEGRATIONS_TITLE,
  rowTitleCentre,
  scaled,
  sharkCentre,
  SharkAiPanel,
  SHARK_PANEL_WIDTH,
  SITE_HEIGHT,
  SITE_WIDTH,
  TRIAGE_THREAD,
  type AgentRun,
  type FeedbackRow,
} from "./ui";
import { TABLE_ROW_HEIGHT } from "./ui/FeedbackTable";

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

const spotlightOpacity = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, start + 16, end - 16, end], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

const Spotlight: React.FC<{
  label: string;
  opacity: number;
  rect: { x: number; y: number; width: number; height: number };
  radius?: number;
}> = ({ label, opacity, rect, radius = 18 }) =>
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
        zIndex: 18,
        boxShadow: `0 0 0 9999px rgba(18, 14, 45, ${0.44 * opacity}), 0 0 ${
          34 * opacity
        }px rgba(255, 255, 255, ${0.16 * opacity})`,
        outline: `2px solid rgba(255, 255, 255, ${0.2 * opacity})`,
      }}
    />
  ) : null;

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
const SPIN_LENGTH = FPS / 2;
const TASK_STEP = FPS / 2;
const TASK_START = SWAP + 42;
const TASK_COUNT = 9;
const taskAt = (index: number) => TASK_START + TASK_STEP * index;
const TASKS_DONE = taskAt(TASK_COUNT - 1) + SPIN_LENGTH;

const LOG: {
  subject: string;
  time: string;
  at: number;
  items: { label: string; time: string; at: number }[];
}[] = [
  {
    subject: "integrations",
    time: "0 seconds ago",
    at: taskAt(7),
    items: [
      {
        label: "used SearchRoadmap 'integrations'",
        time: "0 seconds ago",
        at: taskAt(7),
      },
      {
        label: "used SearchFeedback 'integrations'",
        time: "0 seconds ago",
        at: taskAt(8),
      },
    ],
  },
  {
    subject: INTEGRATIONS_TITLE,
    time: "7 seconds ago",
    at: SWAP + 18,
    items: [
      {
        label: `commented on feedback '${INTEGRATIONS_TITLE}'`,
        time: "0 seconds ago",
        at: taskAt(6),
      },
      {
        label: `commented on feedback '${INTEGRATIONS_TITLE}'`,
        time: "0 seconds ago",
        at: taskAt(5),
      },
      {
        label: `changed status of feedback '${INTEGRATIONS_TITLE}'`,
        time: "0 seconds ago",
        at: taskAt(4),
      },
      {
        label: `added tag to feedback '${INTEGRATIONS_TITLE}'`,
        time: "0 seconds ago",
        at: taskAt(3),
      },
      {
        label: "used ListRoadmaps",
        time: "1 second ago",
        at: taskAt(0),
      },
      {
        label: "used ListTeamMembers",
        time: "0 seconds ago",
        at: taskAt(1),
      },
      {
        label: `searched for duplicates of '${INTEGRATIONS_TITLE}'`,
        time: "0 seconds ago",
        at: taskAt(2),
      },
    ],
  },
];

/** Beat 5 — the row itself is opened, splitting the card into table + detail. */
const ROW_REACH_START = TASKS_DONE + 30;
const ROW_REACH_END = ROW_REACH_START + 42;
const ROW_CLICK = ROW_REACH_END + 8;
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
const SHARK_BUTTON = sharkCentre();
const ROW_TITLE_FILTER_OPEN = rowTitleCentre({ filterOpen: true });
const ROW_TITLE = rowTitleCentre();
const EXPAND = detailExpandCentre();
/** Enters from off-frame bottom-left, away from the row it is leaving alone. */
const CURSOR_FROM = { x: -140, y: SITE_HEIGHT + 130 };
/** Off the row once the pane is up, so it is not covering what it opened. */
const DETAIL_REST = { x: ROW_TITLE.x + 900, y: 140 };
/** Lands on the modal's own collapse control, which replaces the expand one. */
const MODAL_REST = { x: 1305, y: 62 };

const GUTTER = 12;
const RAIL_WIDTH = scaled(46);
const FILTER_OPEN_MAIN_LEFT =
  GUTTER + RAIL_WIDTH + GUTTER + FILTER_PANEL_WIDTH + GUTTER;
const ROW_SPOTLIGHT = {
  x: FILTER_OPEN_MAIN_LEFT + 18,
  y: ROW_TITLE_FILTER_OPEN.y - TABLE_ROW_HEIGHT / 2 + 5,
  width: SITE_WIDTH - FILTER_OPEN_MAIN_LEFT - GUTTER - 36,
  height: TABLE_ROW_HEIGHT - 10,
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
const DETAIL_SPOTLIGHT = {
  x: SITE_WIDTH - GUTTER * 2 - SHARK_PANEL_WIDTH - DETAIL_PANEL_WIDTH,
  y: GUTTER + BOARD_TOP_BAR_HEIGHT,
  width: DETAIL_PANEL_WIDTH,
  height: SITE_HEIGHT - GUTTER * 2 - BOARD_TOP_BAR_HEIGHT,
};

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
  const rowPulse = arrive(frame, ROW_LANDS, ROW_LANDS + 38);
  const rowHover = arrive(frame, ROW_REACH_END - 18, ROW_CLICK);
  const sharkHover = arrive(frame, REACH_END - 20, SHARK_CLICK);
  const expandHover = arrive(frame, EXPAND_REACH_END - 16, EXPAND_CLICK);

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
              backgroundColor:
                frame < ROW_CLICK
                  ? `rgba(246, 245, 253, ${
                      0.28 + (1 - rowPulse) * 0.62 + rowHover * 0.24
                    })`
                  : "#f6f5fd",
              boxShadow:
                frame < ROW_CLICK
                  ? `0 ${
                      8 * (1 - rowPulse + rowHover)
                    }px ${26 * (1 - rowPulse + rowHover)}px rgba(92, 69, 223, ${
                      0.08 * (1 - rowPulse + rowHover)
                    })`
                  : undefined,
              scale:
                frame < ROW_CLICK
                  ? interpolate(
                      frame,
                      [ROW_LANDS, ROW_LANDS + 16, ROW_LANDS + 42],
                      [0.992, 1.012, 1],
                      {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                        easing: EASE_OUT,
                      },
                    )
                  : undefined,
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
            done: frame >= item.at + SPIN_LENGTH,
            style: {
              opacity: shown,
              translate: `0px ${(1 - shown) * 6}px`,
              backgroundColor:
                frame >= item.at && frame < item.at + SPIN_LENGTH
                  ? `rgba(246, 245, 253, ${0.34 * shown})`
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

  return (
    <AbsoluteFill
      name="Feedback board scene"
      style={{ backgroundColor: "#3f2cc0" }}
      from={-75}
    >
      <AbsoluteFill name="Board">
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
            style={{
              opacity: arrive(frame, DETAIL + 6, DETAIL + 24),
              boxShadow: `-18px 0 42px rgba(24, 20, 60, ${
                0.1 * detail
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
              : sharkHover
                ? "#faf8ff"
                : "#ffffff",
          boxShadow: sharkHover
            ? `0 0 ${22 * sharkHover}px rgba(92, 69, 223, ${
                0.22 * sharkHover
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
            // Fades in behind its own reveal so the contents are not visible
            // squeezed into a few pixels of open panel.
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

      <Spotlight
        label="Focus new feedback row"
        opacity={spotlightOpacity(frame, ROW_LANDS + 8, REACH_START - 8)}
        rect={ROW_SPOTLIGHT}
        radius={16}
      />
      <Spotlight
        label="Focus Shark AI button"
        opacity={spotlightOpacity(frame, REACH_START + 10, SWAP + 12)}
        rect={SHARK_BUTTON_SPOTLIGHT}
        radius={999}
      />
      <Spotlight
        label="Focus Shark AI panel"
        opacity={spotlightOpacity(frame, SWAP + 24, ROW_REACH_START - 18)}
        rect={SHARK_PANEL_SPOTLIGHT}
        radius={18}
      />
      <Spotlight
        label="Focus feedback detail pane"
        opacity={spotlightOpacity(frame, DETAIL + 12, MODAL - 18)}
        rect={DETAIL_SPOTLIGHT}
        radius={16}
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
        hand
        style={{
          scale:
            press(frame, SHARK_CLICK, 0.88) *
            press(frame, ROW_CLICK, 0.88) *
            press(frame, EXPAND_CLICK, 0.88) *
            (1 + expandHover * 0.025),
        }}
      />
      </AbsoluteFill>

      {frame >= MODAL ? (
        <FeedbackDetailModal
          title={INTEGRATIONS_TITLE}
          thread={TRIAGE_THREAD}
          scrimStyle={{
            opacity: arrive(frame, MODAL, MODAL + 16),
            backgroundColor: "rgba(32, 28, 66, 0.34)",
          }}
          cardStyle={{
            opacity: arrive(frame, MODAL, MODAL + 14),
            // Grows the last little way, so it reads as coming forward out of
            // the pane rather than appearing on top of it.
            scale: interpolate(frame, [MODAL, MODAL + MODAL_LENGTH], [0.92, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE_OUT,
            }),
            translate: `0px ${
              (1 - arrive(frame, MODAL, MODAL + MODAL_LENGTH)) * 26
            }px`,
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};
