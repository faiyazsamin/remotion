import {
  AbsoluteFill,
  Composition,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import {
  BULK_BAR_HEIGHT,
  BulkActionBar,
  bulkItemCentre,
  bulkMenuItemCentre,
  BulkMenu,
  countsFor,
  Cursor,
  DARK_MODE_ROW,
  DARK_MODE_TITLE,
  FeedbackBoard,
  FPS,
  headerCheckboxCentre,
  IconChip,
  INTEGRATIONS_ROW,
  INTEGRATIONS_TITLE,
  sharkCentre,
  SharkAiPanel,
  SITE_HEIGHT,
  SITE_WIDTH,
  STATUS_META,
  StatusIcon,
  ToastStack,
  type AgentRun,
  type FeedbackRow,
  type Toast,
} from "./ui";

export const FeatureSharkBulkStatusSceneComposition = () => (
  <Composition
    id="FeatureSharkBulkStatusScene"
    component={BulkStatusScene}
    durationInFrames={840}
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

/** Beat 1 — select every row. */
const SELECT_REACH_START = 44;
const SELECT_REACH_END = 92;
const SELECT_CLICK = 100;
const BAR = SELECT_CLICK + 4;
const BAR_LENGTH = 30;

/** Beat 2 — open the Status menu out of the bar. */
const STATUS_REACH_START = 170;
const STATUS_REACH_END = 214;
const STATUS_CLICK = 222;
const MENU = STATUS_CLICK + 4;
const MENU_LENGTH = 22;

/** Beat 3 — pick Completed, and the confirmations arrive. */
const PICK_REACH_START = 300;
const PICK_REACH_END = 344;
const PICK_CLICK = 352;
const APPLIED = PICK_CLICK + 4;

/** Beat 4 — Shark AI shows the changelog agent picking the work up. */
const SHARK_REACH_START = 500;
const SHARK_REACH_END = 548;
const SHARK_CLICK = 556;
const SWAP = SHARK_CLICK + 4;
const SWAP_LENGTH = 30;
const RUNS_START = SWAP + 40;
const RUN_STAGGER = 14;
/** The agent announces itself once its log is on screen. */
const CHANGELOG_TOAST = SWAP + 80;
/**
 * Late in the scene the agent logs a fresh call, so the last thing the shot does
 * is show work happening rather than work already done.
 */
const LIVE_LINE = 700;
const SPIN_LENGTH = 46;

/** Both requests start mid-flight; the admin marks them both done. */
const STATUS_BEFORE = "In Progress";
const STATUS_AFTER = "Completed";

/**
 * The statuses the menu offers, straight off the shared list — so the menu, the
 * filter column and the row pills all agree on order and colour.
 */
const STATUS_MENU = STATUS_META.map((status) => ({
  label: status.label,
  icon: <StatusIcon label={status.label} />,
}));
const PICK_INDEX = STATUS_MENU.findIndex((item) => item.label === STATUS_AFTER);

/**
 * These rows have been on the board a while by now, so they carry older
 * timestamps than the scenes where they arrived.
 */
const ROWS: FeedbackRow[] = [
  { ...DARK_MODE_ROW, status: STATUS_BEFORE, time: "6 hours ago" },
  { ...INTEGRATIONS_ROW, status: STATUS_BEFORE, time: "8 hours ago" },
];

/**
 * Each confirmation carries when it arrives. The stack is built by sorting the
 * arrived ones newest-first, so a new toast takes the bottom slot and pushes the
 * others up — rather than the order depending on how they are written here.
 */
const TOASTS: (Toast & { at: number })[] = [
  {
    at: 0,
    kind: "info",
    title: "Status Updated",
    body: `"${INTEGRATIONS_TITLE}" → completed`,
  },
  {
    at: 18,
    kind: "info",
    title: "Status Updated",
    body: `"${DARK_MODE_TITLE}" → completed`,
  },
  {
    at: 36,
    kind: "tip",
    title: "Updated",
    body: `Updated ${ROWS.length} items to ${STATUS_AFTER}.`,
  },
];

/** A second agent writes the changelog once the work is marked done. */
const CHANGELOG_AGENT = "Changelog Writer";
const PROMPTED = `Agent '${CHANGELOG_AGENT}' was prompted by Article Writer`;
const CHANGELOG_TIME = "12 minutes ago";

/**
 * Newest line first within a run. A line with an `at` arrives then, spinning
 * until it resolves; the rest were already finished before the panel opened.
 */
const CHANGELOG_RUNS: {
  subject: string;
  items: { label: string; time?: string; at?: number }[];
}[] = [
  {
    subject: "Dark Mode Support",
    items: [
      { label: PROMPTED },
      { label: "used CreateChangelogDraft 'Dark Mode Support'" },
    ],
  },
  {
    subject: DARK_MODE_TITLE,
    items: [
      {
        label: "generated changelog content",
        time: "0 seconds ago",
        at: LIVE_LINE,
      },
      { label: "generated changelog content" },
    ],
  },
  {
    subject: "Expanded integration ecosystem",
    items: [
      { label: PROMPTED },
      { label: "used CreateChangelogDraft 'Expanded integration ecosystem'" },
    ],
  },
  {
    subject: INTEGRATIONS_TITLE,
    items: [
      { label: "generated changelog content" },
      { label: `used SearchFeedback '${INTEGRATIONS_TITLE}'` },
    ],
  },
];

/** The changelog agent's own mark, shown beside its name on a toast. */
const AgentAvatar: React.FC = () => (
  <span
    style={{
      width: 26,
      height: 26,
      borderRadius: 8,
      backgroundColor: "#f1f2f7",
      color: "#5b6172",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <IconChip />
  </span>
);

const CHECKBOX = headerCheckboxCentre({ filterOpen: true });
const STATUS_BUTTON = bulkItemCentre("Status");
const PICK = bulkMenuItemCentre(PICK_INDEX, STATUS_MENU.length);
/** The filter column is still open when Shark AI is pressed. */
const SHARK = (() => {
  const centre = sharkCentre();

  return { x: centre.x + 46, y: centre.y };
})();

const CURSOR_FROM = { x: -140, y: SITE_HEIGHT + 130 };
/** Pauses clear of the rows once the change lands. */
const CURSOR_REST = { x: 900, y: 300 };
/** Ends out of the top bar, off the panel it just opened. */
const SHARK_REST = { x: 640, y: 66 };

const CURSOR_TIMES = [
  SELECT_REACH_START,
  SELECT_REACH_END,
  STATUS_REACH_START,
  STATUS_REACH_END,
  PICK_REACH_START,
  PICK_REACH_END,
  APPLIED + 10,
  APPLIED + 60,
  SHARK_REACH_START,
  SHARK_REACH_END,
  SWAP + 10,
  SWAP + 50,
];
const CURSOR_X = [
  CURSOR_FROM.x,
  CHECKBOX.x,
  CHECKBOX.x,
  STATUS_BUTTON.x,
  STATUS_BUTTON.x,
  PICK.x,
  PICK.x,
  CURSOR_REST.x,
  CURSOR_REST.x,
  SHARK.x,
  SHARK.x,
  SHARK_REST.x,
];
const CURSOR_Y = [
  CURSOR_FROM.y,
  CHECKBOX.y,
  CHECKBOX.y,
  STATUS_BUTTON.y,
  STATUS_BUTTON.y,
  PICK.y,
  PICK.y,
  CURSOR_REST.y,
  CURSOR_REST.y,
  SHARK.y,
  SHARK.y,
  SHARK_REST.y,
];
const CURSOR_EASINGS = CURSOR_TIMES.slice(1).map(() => EASE_OUT);

/**
 * Scene: the admin clears the board — selecting everything and marking it done
 * in one action — and the changelog agent picks the work straight up.
 *
 * Four clicks. Select-all ticks both rows and raises the bulk bar; Status opens
 * its menu upward out of that bar; Completed applies to both rows at once, which
 * repaints their pills, moves the filter counts, drops the selection, and stacks
 * one confirmation per item plus a summary. Shark AI then shows the changelog
 * agent's log, it announces that it has started, and its next call lands
 * spinning before resolving. Still from ~frame 760.
 */
export const BulkStatusScene: React.FC = () => {
  const frame = useCurrentFrame();

  const selected = frame >= SELECT_CLICK && frame < APPLIED;
  const applied = frame >= APPLIED;

  const bar = arrive(frame, BAR, BAR + BAR_LENGTH);
  const barLeaving = arrive(frame, APPLIED, APPLIED + 20);
  const menu = arrive(frame, MENU, MENU + MENU_LENGTH);
  const menuLeaving = arrive(frame, PICK_CLICK, PICK_CLICK + 12);
  const swap = arrive(frame, SWAP, SWAP + SWAP_LENGTH);
  const spinnerAngle = frame * (360 / FPS);

  const rows: FeedbackRow[] = ROWS.map((row) => ({
    ...row,
    // The whole point of the beat: the status is what changes.
    status: applied ? STATUS_AFTER : row.status,
    checked: selected,
  }));

  const toasts = [
    ...TOASTS.map((toast) => ({ ...toast, at: APPLIED + toast.at })),
    {
      at: CHANGELOG_TOAST,
      kind: "agent" as const,
      title: CHANGELOG_AGENT,
      body: `Started working on ${INTEGRATIONS_TITLE}`,
      avatar: <AgentAvatar />,
      working: true,
    },
  ]
    .filter((toast) => frame >= toast.at)
    .sort((a, b) => b.at - a.at)
    .map((toast) => {
      const shown = arrive(frame, toast.at, toast.at + 18);

      return {
        ...toast,
        style: {
          opacity: shown,
          // Slides in from off the left edge, where the stack lives.
          translate: `${(1 - shown) * -26}px 0px`,
        },
      };
    });

  /** The changelog agent's log. Its calls were all finished before we looked. */
  const runs: AgentRun[] = CHANGELOG_RUNS.filter(
    (_, index) => frame >= RUNS_START + index * RUN_STAGGER,
  ).map((run, index) => {
    const at = RUNS_START + index * RUN_STAGGER;
    const shown = arrive(frame, at, at + 20);

    return {
      agent: CHANGELOG_AGENT,
      subject: run.subject,
      time: CHANGELOG_TIME,
      style: {
        opacity: shown,
        translate: `0px ${(1 - shown) * -10}px`,
      },
      items: run.items
        .filter((item) => item.at === undefined || frame >= item.at)
        .map((item) => {
          const shown =
            item.at === undefined ? 1 : arrive(frame, item.at, item.at + 14);

          return {
            label: item.label,
            time: item.time ?? CHANGELOG_TIME,
            done: item.at === undefined || frame >= item.at + SPIN_LENGTH,
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
      name="Bulk status scene"
      style={{ backgroundColor: "#3f2cc0" }}
    >
      <FeedbackBoard
        rows={rows}
        counts={countsFor(rows)}
        allChecked={selected}
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
            spinnerAngle={spinnerAngle}
            loadMore={
              frame >= RUNS_START + CHANGELOG_RUNS.length * RUN_STAGGER
            }
            style={{ opacity: arrive(frame, SWAP + 6, SWAP + 24) }}
          />
        }
        overlay={
          <>
            {frame >= BAR && frame < APPLIED + 20 ? (
              <BulkActionBar
                selected={rows.length}
                style={{
                  opacity: bar * (1 - barLeaving),
                  // Rises out of the bottom edge, and leaves the same way.
                  translate: `0px ${
                    (1 - bar) * BULK_BAR_HEIGHT +
                    barLeaving * BULK_BAR_HEIGHT
                  }px`,
                }}
              />
            ) : null}

            {frame >= MENU && frame < PICK_CLICK + 12 ? (
              <BulkMenu
                items={STATUS_MENU}
                style={{
                  opacity: menu * (1 - menuLeaving),
                  scale: interpolate(
                    frame,
                    [MENU, MENU + MENU_LENGTH],
                    [0.92, 1],
                    {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                      easing: EASE_OUT,
                    },
                  ),
                }}
              />
            ) : null}

            {toasts.length ? (
              <ToastStack toasts={toasts} spinnerAngle={spinnerAngle} />
            ) : null}
          </>
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
        hand
        style={{
          scale:
            press(frame, SELECT_CLICK, 0.88) *
            press(frame, STATUS_CLICK, 0.88) *
            press(frame, PICK_CLICK, 0.88) *
            press(frame, SHARK_CLICK, 0.88),
        }}
      />
    </AbsoluteFill>
  );
};
