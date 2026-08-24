import {
  AbsoluteFill,
  Composition,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import {
  AcmeSite,
  Cursor,
  fabCentre,
  FeedbackWidget,
  FeedbackWidgetFormView,
  FeedbackWidgetListView,
  FeedbackWidgetToggle,
  FORM_BOARD,
  FORM_TITLE,
  formTargets,
  FPS,
  SITE_HEIGHT,
  SITE_WIDTH,
  toggleCentre,
} from "./ui";

export const FeatureSharkFeedbackWidgetSceneComposition = () => (
  <Composition
    id="FeatureSharkFeedbackWidgetScene"
    component={FeedbackWidgetScene}
    durationInFrames={600}
    fps={FPS}
    width={SITE_WIDTH}
    height={SITE_HEIGHT}
  />
);

const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);

/** 0 → 1 ramp with clamped ends, used for every arrival in this scene. */
const arrive = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

/**
 * A press-in and release. Outside its own window this returns exactly 1, so
 * several of them can be multiplied together to give one element every click it
 * takes over the scene.
 */
const press = (frame: number, at: number, low: number) =>
  interpolate(frame, [at - 4, at, at + 7], [1, low, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

/** Beat 1 — the cursor travels in and opens the panel. */
const CURSOR_IN_START = 8;
const CURSOR_IN_END = 44;
const OPEN_CLICK = 50;
const OPEN = OPEN_CLICK + 4;

/** Overlaps the panel's own growth, so the tab bar is never a blank white strip. */
const TAB_START = OPEN + 6;
const TAB_STAGGER = 3;

/** Beat 2 — after a beat of stillness, the cursor crosses to the FAB. */
const REACH_START = 140;
const REACH_END = 176;
const FAB_CLICK = 182;
const PUSH = FAB_CLICK + 4;
/** How long the two views overlap while one pushes the other out. */
const PUSH_LENGTH = 24;

/** Beat 3 — the title is typed into the field the form opened focused on. */
const TYPE_START = 246;
const FRAMES_PER_CHAR = 2;
const TYPE_END = TYPE_START + FORM_TITLE.length * FRAMES_PER_CHAR;

/** Beat 4 — pick a board, then submit. */
const BOARD_REACH_START = 300;
const BOARD_REACH_END = 330;
const BOARD_CLICK = 336;
const SUBMIT_REACH_START = 348;
const SUBMIT_REACH_END = 380;
const SUBMIT_CLICK = 386;
/** The request is in flight for one second before it lands. */
const SENDING_LENGTH = FPS;
const SENT = SUBMIT_CLICK + SENDING_LENGTH;

const TOGGLE = toggleCentre(SITE_WIDTH, SITE_HEIGHT);
const FAB = fabCentre(SITE_WIDTH);
const FORM = formTargets(SITE_WIDTH);
/** Off-frame, down and right of the toggle, so the approach reads as one line. */
const CURSOR_FROM = { x: SITE_WIDTH + 130, y: SITE_HEIGHT + 120 };
/**
 * Right of the submit button's centre rather than on it. Dead centre puts the
 * hand over the label, which hides the "Sending" state the click produces.
 */
const SUBMIT_POINT = { x: FORM.submit.x + 100, y: FORM.submit.y };

/**
 * The pointer's whole journey as waypoints. Pairs of identical points are the
 * holds between legs, so one `interpolate` per axis covers the entire scene and
 * every leg is a straight line.
 */
const PATH = [
  { at: CURSOR_IN_START, ...CURSOR_FROM },
  { at: CURSOR_IN_END, ...TOGGLE },
  { at: REACH_START, ...TOGGLE },
  { at: REACH_END, ...FAB },
  { at: BOARD_REACH_START, ...FAB },
  { at: BOARD_REACH_END, ...FORM.board },
  { at: SUBMIT_REACH_START, ...FORM.board },
  { at: SUBMIT_REACH_END, ...SUBMIT_POINT },
];

const PATH_TIMES = PATH.map((point) => point.at);
const PATH_EASINGS = PATH.slice(1).map(() => EASE_OUT);

/**
 * Scene: a visitor opens the embedded FeatureShark widget, writes a feature
 * request and sends it.
 *
 * The site is already settled when the scene starts — it is scenery. Four clicks
 * drive everything, and nothing on screen moves that a click did not cause:
 * the toggle opens the panel out of its own corner, the FAB pushes the form over
 * the list, the board select takes focus off the title, and submit spins for a
 * second before clearing the form and opening the confirmation. Still from
 * ~frame 470 to the end.
 */
export const FeedbackWidgetScene: React.FC = () => {
  const frame = useCurrentFrame();

  const open = arrive(frame, OPEN, OPEN + 26);
  const push = arrive(frame, PUSH, PUSH + PUSH_LENGTH);

  // Typed one character at a time rather than by ramping opacity, so the
  // counter underneath can be derived from the text actually on screen.
  const typed = FORM_TITLE.slice(
    0,
    Math.floor(
      interpolate(frame, [TYPE_START, TYPE_END], [0, FORM_TITLE.length], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    ),
  );

  const sent = frame >= SENT;
  const boardPicked = frame >= BOARD_CLICK;
  const sending = frame >= SUBMIT_CLICK && !sent;
  const confirm = arrive(frame, SENT, SENT + 20);

  // Past the first click the pointer is over controls, so it takes the hand.
  const hand = frame >= FAB_CLICK;

  // Each press is 1 outside its own window, so the product is "whichever click
  // is currently happening".
  const cursorPress =
    press(frame, OPEN_CLICK, 0.88) *
    press(frame, FAB_CLICK, 0.88) *
    press(frame, BOARD_CLICK, 0.9) *
    press(frame, SUBMIT_CLICK, 0.88);

  return (
    <AbsoluteFill name="Feedback widget scene" style={{ backgroundColor: "#ffffff" }}>
      <AcmeSite />

      <FeedbackWidget
        style={{
          opacity: arrive(frame, OPEN, OPEN + 14),
          scale: interpolate(frame, [OPEN, OPEN + 26], [0.82, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE_OUT,
          }),
          // Rises the last stretch into place, matching the toggle's direction.
          translate: `0px ${(1 - open) * 26}px`,
        }}
      >
        <FeedbackWidgetListView
          style={{
            // Pushed out to the left, the way a stack's previous screen leaves.
            translate: `${push * -30}%`,
            // Gone well before the push ends, or its credit line and tab bar
            // read through the incoming screen.
            opacity: 1 - arrive(frame, PUSH, PUSH + 13),
          }}
          searchStyle={{ opacity: arrive(frame, OPEN + 12, OPEN + 30) }}
          bodyStyle={{ opacity: arrive(frame, OPEN + 14, OPEN + 34) }}
          fabStyle={{
            opacity: arrive(frame, OPEN + 20, OPEN + 38),
            scale:
              interpolate(frame, [OPEN + 20, OPEN + 42], [0.7, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: EASE_OUT,
              }) * press(frame, FAB_CLICK, 0.9),
          }}
          tabStyle={(index) => {
            const start = TAB_START + index * TAB_STAGGER;
            const progress = arrive(frame, start, start + 16);

            return {
              opacity: progress,
              translate: `0px ${(1 - progress) * 10}px`,
            };
          }}
        />

        {/*
          Mounted only once it is on its way in, so it never shows early. It
          arrives fully rendered — a pushed screen is complete before it slides,
          so there is no per-row stagger to leave the card briefly blank.
        */}
        {frame >= PUSH ? (
          <FeedbackWidgetFormView
            style={{
              translate: `${(1 - push) * 100}%`,
              boxShadow: `-14px 0 30px rgba(24, 20, 60, ${(1 - push) * 0.1})`,
            }}
            // Submitting clears the form, which is what the second reference
            // shows: placeholders back, counter grey, nothing focused.
            title={sent ? "" : typed}
            titleFocused={!sent && !boardPicked}
            caret={!sent && !boardPicked}
            board={boardPicked && !sent ? FORM_BOARD : null}
            boardFocused={boardPicked && !sent}
            sending={sending}
            // One turn per second, and it only exists while the request is in
            // flight, so a rotating element never survives into the hold.
            spinnerAngle={(frame - SUBMIT_CLICK) * (360 / FPS)}
            showSuccess={sent}
            successStyle={{
              // Opens in flow, so it pushes the button down as it grows.
              height: 46 * confirm,
              marginTop: 18 * confirm,
              opacity: confirm,
            }}
            submitStyle={{ scale: press(frame, SUBMIT_CLICK, 0.97) }}
          />
        ) : null}
      </FeedbackWidget>

      <FeedbackWidgetToggle
        style={{ scale: press(frame, OPEN_CLICK, 0.92) }}
        chevronStyle={{
          // Up while closed, down once open: the click turns it over.
          rotate: `${interpolate(frame, [OPEN_CLICK, OPEN_CLICK + 20], [180, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE_OUT,
          })}deg`,
        }}
      />

      <Cursor
        x={interpolate(
          frame,
          PATH_TIMES,
          PATH.map((point) => point.x),
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: PATH_EASINGS,
          },
        )}
        y={interpolate(
          frame,
          PATH_TIMES,
          PATH.map((point) => point.y),
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: PATH_EASINGS,
          },
        )}
        hand={hand}
        style={{ scale: cursorPress }}
      />
    </AbsoluteFill>
  );
};
