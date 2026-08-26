import {
  AbsoluteFill,
  Composition,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import {
  BULK_BAR_HEIGHT,
  BULK_BAR_LEFT,
  BulkActionBar,
  BULK_BAR_TOP,
  BULK_BAR_WIDTH,
  bulkItemCentre,
  bulkMenuItemCentre,
  BULK_MENU_ITEM_HEIGHT,
  BULK_MENU_PADDING,
  BULK_MENU_WIDTH,
  BulkMenu,
  CHANGELOG_RAIL_ACTIVE,
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
  railSlotCentre,
  sharkCentre,
  SharkAiPanel,
  SHARK_PANEL_WIDTH,
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

const pulse = (frame: number, at: number) =>
  interpolate(frame, [at, at + 10, at + 28], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

const routeContentIn = (progress: number): React.CSSProperties => ({
  opacity: progress,
  translate: `${(1 - progress) * 54}px 0px`,
  filter: `blur(${(1 - progress) * 2.4}px)`,
});

const spotlightOpacity = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, start + 12, end - 12, end], [0, 1, 1, 0], {
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
        zIndex: 22,
        boxShadow: `0 0 0 9999px rgba(18, 14, 45, ${0.4 * opacity}), 0 0 ${
          30 * opacity
        }px rgba(255, 255, 255, ${0.16 * opacity})`,
        outline: `2px solid rgba(255, 255, 255, ${0.2 * opacity})`,
      }}
    />
  ) : null;

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
const RUNS_START = SWAP + 34;
const TASK_STEP = FPS / 2;
/** The agent announces itself once its log is on screen. */
const CHANGELOG_TOAST = SWAP + 80;
const SPIN_LENGTH = FPS / 2;

/** Handoff: leave the AI panel open, then go straight to Changelog in the rail. */
const CHANGELOG_REACH_START = 700;
const CHANGELOG_REACH_END = 778;
const CHANGELOG_CLICK = 790;

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
const SHARK_BUTTON = sharkCentre();
const CHANGELOG_RAIL = railSlotCentre(CHANGELOG_RAIL_ACTIVE);
/** The filter column is still open when Shark AI is pressed. */
const SHARK = (() => {
  return { x: SHARK_BUTTON.x + 46, y: SHARK_BUTTON.y };
})();
const GUTTER = 12;
const BULK_BAR_RECT = {
  x: BULK_BAR_LEFT,
  y: BULK_BAR_TOP,
  width: BULK_BAR_WIDTH,
  height: BULK_BAR_HEIGHT,
};
const MENU_HEIGHT =
  STATUS_MENU.length * BULK_MENU_ITEM_HEIGHT + BULK_MENU_PADDING * 2;
const STATUS_MENU_RECT = {
  x: BULK_BAR_LEFT + 180,
  y: BULK_BAR_TOP - 8 - MENU_HEIGHT,
  width: BULK_MENU_WIDTH,
  height: MENU_HEIGHT,
};
const SHARK_BUTTON_RECT = {
  x: SHARK_BUTTON.x - 73,
  y: SHARK_BUTTON.y - 26,
  width: 146,
  height: 52,
};
const SHARK_PANEL_RECT = {
  x: SITE_WIDTH - GUTTER - SHARK_PANEL_WIDTH,
  y: GUTTER,
  width: SHARK_PANEL_WIDTH,
  height: SITE_HEIGHT - GUTTER * 2,
};

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
  CHANGELOG_REACH_START,
  CHANGELOG_REACH_END,
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
  SHARK_REST.x,
  CHANGELOG_RAIL.x,
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
  SHARK_REST.y,
  CHANGELOG_RAIL.y,
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
  const boardIn = arrive(frame, 0, 36);
  const swap = arrive(frame, SWAP, SWAP + SWAP_LENGTH);
  const spinnerAngle = frame * (360 / FPS);
  const barFocus = spotlightOpacity(frame, BAR, STATUS_REACH_START + 26);
  const menuFocus = spotlightOpacity(frame, MENU, PICK_CLICK + 16);
  const sharkButtonFocus = spotlightOpacity(frame, SHARK_REACH_START + 4, SHARK_CLICK + 12);
  const sharkPanelFocus = spotlightOpacity(frame, SWAP + SWAP_LENGTH, CHANGELOG_REACH_START - 18);

  const rows: FeedbackRow[] = ROWS.map((row, index) => {
    const selectedPulse = pulse(frame, SELECT_CLICK + index * 5);
    const statusPulse = pulse(frame, APPLIED + index * 9);

    return {
      ...row,
      // The whole point of the beat: the status is what changes.
      status: applied ? STATUS_AFTER : row.status,
      checked: selected,
      style: {
        backgroundColor: selected
          ? `rgba(246, 245, 253, ${0.42 + selectedPulse * 0.18})`
          : applied
            ? `rgba(234, 250, 242, ${
                0.18 *
                arrive(frame, APPLIED + index * 9, APPLIED + 24 + index * 9)
              })`
            : undefined,
        boxShadow:
          selectedPulse > 0 || statusPulse > 0
            ? `0 0 ${26 * Math.max(selectedPulse, statusPulse)}px rgba(92, 69, 223, ${
                0.12 * Math.max(selectedPulse, statusPulse)
              })`
            : undefined,
      },
      statusStyle: {
        scale: applied ? 1 + statusPulse * 0.1 : undefined,
        boxShadow: applied
          ? `0 ${5 * statusPulse}px ${16 * statusPulse}px rgba(47, 180, 124, ${
              0.22 * statusPulse
            })`
          : undefined,
      },
    };
  });

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

  const runItemOffset = (index: number) =>
    CHANGELOG_RUNS.slice(0, index).reduce(
      (total, entry) => total + entry.items.length,
      0,
    );
  const totalLogItems = CHANGELOG_RUNS.reduce(
    (total, entry) => total + entry.items.length,
    0,
  );

  /** The changelog agent's log resolves on a visible half-second cadence. */
  const runs: AgentRun[] = CHANGELOG_RUNS.flatMap((run, index) => {
    const previousItems = runItemOffset(index);
    const at = RUNS_START + previousItems * TASK_STEP;

    if (frame < at) {
      return [];
    }

    const shown = arrive(frame, at, at + 20);

    return [
      {
        agent: CHANGELOG_AGENT,
        subject: run.subject,
        time: CHANGELOG_TIME,
        style: {
          opacity: shown,
          translate: `0px ${(1 - shown) * -10}px`,
        },
        items: run.items
          .filter((_, itemIndex) => {
            const itemAt = RUNS_START + (previousItems + itemIndex) * TASK_STEP;

            return frame >= itemAt;
          })
          .map((item, itemIndex) => {
            const itemAt = RUNS_START + (previousItems + itemIndex) * TASK_STEP;
            const shown = arrive(frame, itemAt, itemAt + 14);

            return {
              label: item.label,
              time: item.time ?? CHANGELOG_TIME,
              done: frame >= itemAt + SPIN_LENGTH,
              style: {
                opacity: shown,
                translate: `0px ${(1 - shown) * 6}px`,
              },
            };
          }),
      },
    ];
  });

  return (
    <AbsoluteFill
      name="Bulk status scene"
      style={{ backgroundColor: "#3f2cc0" }}
    >
      <FeedbackBoard
        panelStyle={routeContentIn(boardIn)}
        contentStyle={routeContentIn(boardIn)}
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
              frame >= RUNS_START + totalLogItems * TASK_STEP
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
                  scale: interpolate(
                    frame,
                    [BAR, BAR + 12, BAR + BAR_LENGTH],
                    [0.96, 1.03, 1],
                    {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                      easing: EASE_OUT,
                    },
                  ),
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
                itemStyle={(label) => {
                  const completedPulse = pulse(frame, PICK_REACH_END - 14);

                  return label === STATUS_AFTER
                    ? {
                        backgroundColor: `rgba(234, 250, 242, ${
                          0.7 + completedPulse * 0.3
                        })`,
                        color: "#1f8a5b",
                        borderRadius: 9,
                        scale: 1 + completedPulse * 0.04,
                        boxShadow: `0 ${4 * completedPulse}px ${
                          14 * completedPulse
                        }px rgba(47, 180, 124, ${0.2 * completedPulse})`,
                      }
                    : {};
                }}
              />
            ) : null}

            {toasts.length ? (
              <ToastStack toasts={toasts} spinnerAngle={spinnerAngle} />
            ) : null}
          </>
        }
      />

      <Spotlight
        label="Focus bulk action bar"
        opacity={barFocus}
        rect={BULK_BAR_RECT}
        radius={999}
      />
      <Spotlight
        label="Focus status menu"
        opacity={menuFocus}
        rect={STATUS_MENU_RECT}
        radius={14}
      />
      <Spotlight
        label="Focus Shark AI button"
        opacity={sharkButtonFocus}
        rect={SHARK_BUTTON_RECT}
        radius={14}
      />
      <Spotlight
        label="Focus Shark AI panel"
        opacity={sharkPanelFocus}
        rect={SHARK_PANEL_RECT}
        radius={18}
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
            press(frame, SHARK_CLICK, 0.88) *
            press(frame, CHANGELOG_CLICK, 0.88),
        }}
      />
    </AbsoluteFill>
  );
};
