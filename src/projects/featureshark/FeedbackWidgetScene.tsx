import {
  AbsoluteFill,
  Composition,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import {
  AcmeSite,
  BRAND_PURPLE,
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
  WIDGET_HEIGHT,
  WIDGET_TOP,
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
const SUCCESS_PARTICLES = [
  { x: -32, y: -18, size: 7, color: BRAND_PURPLE },
  { x: 20, y: -24, size: 5, color: "#34d399" },
  { x: 58, y: -6, size: 6, color: "#8b7cf6" },
  { x: -54, y: 12, size: 5, color: "#5ed4ca" },
  { x: 34, y: 20, size: 4, color: "#22c55e" },
];

const TOGGLE = toggleCentre(SITE_WIDTH, SITE_HEIGHT);
const FAB = fabCentre(SITE_WIDTH);
const FORM = formTargets(SITE_WIDTH);
const WIDGET_CENTER_Y = WIDGET_TOP + WIDGET_HEIGHT / 2;
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
  const hostDepth = arrive(frame, OPEN, OPEN + 40);
  const push = arrive(frame, PUSH, PUSH + PUSH_LENGTH);
  const boardPulse = arrive(frame, BOARD_CLICK, BOARD_CLICK + 18);
  const togglePulse =
    frame >= OPEN_CLICK && frame < OPEN_CLICK + 28
      ? 1 - arrive(frame, OPEN_CLICK, OPEN_CLICK + 28)
      : 0;

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
  const titleFocus = !sent && !boardPicked
    ? arrive(frame, TYPE_START - 18, TYPE_START + 18)
    : 0;
  const sending = frame >= SUBMIT_CLICK && !sent;
  const confirm = arrive(frame, SENT, SENT + 20);
  const successPop = arrive(frame, SENT + 6, SENT + 34);
  const successFade = 1 - arrive(frame, SENT + 52, SENT + 86);

  // Past the first click the pointer is over controls, so it takes the hand.
  const hand = frame >= FAB_CLICK;

  // Each press is 1 outside its own window, so the product is "whichever click
  // is currently happening".
  const cursorPress =
    press(frame, OPEN_CLICK, 0.88) *
    press(frame, FAB_CLICK, 0.88) *
    press(frame, BOARD_CLICK, 0.9) *
    press(frame, SUBMIT_CLICK, 0.88);
  const cameraFocus = arrive(frame, TYPE_START - 34, TYPE_START + 20);
  const cameraScale = interpolate(
    frame,
    [
      TYPE_START - 34,
      TYPE_START + 20,
      SUBMIT_REACH_END,
      SENT + 42,
    ],
    [1, 1.2, 1.16, 1.1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE_OUT,
    },
  );
  const cameraTargetX = interpolate(
    frame,
    [TYPE_START - 34, BOARD_REACH_END, SUBMIT_REACH_END],
    [FORM.title.x, FORM.board.x, FORM.submit.x],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE_OUT,
    },
  );
  const cameraTargetY = interpolate(
    frame,
    [TYPE_START - 34, BOARD_REACH_END, SUBMIT_REACH_END],
    [FORM.title.y, FORM.board.y + 24, WIDGET_CENTER_Y],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE_OUT,
    },
  );
  const cameraX =
    cameraFocus * (SITE_WIDTH / 2 - cameraTargetX * cameraScale);
  const cameraY =
    cameraFocus * (SITE_HEIGHT / 2 - cameraTargetY * cameraScale);

  return (
    <AbsoluteFill name="Feedback widget scene" style={{ backgroundColor: "#ffffff" }}>
      <AbsoluteFill
        name="Site camera"
        style={{
          transformOrigin: "0 0",
          transform: `translate(${cameraX}px, ${cameraY}px) scale(${cameraScale})`,
        }}
      >
      <AcmeSite
        style={{
          opacity: 1,
          scale: 1 - hostDepth * 0.006,
          filter: `blur(${hostDepth * 1.4}px)`,
        }}
      />
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: `rgba(10, 8, 24, ${hostDepth * 0.16})`,
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        name="Widget camera"
        style={{
          transformOrigin: "0 0",
          transform: `translate(${cameraX}px, ${cameraY}px) scale(${cameraScale})`,
        }}
      >
      <FeedbackWidget
        style={{
          opacity: arrive(frame, OPEN, OPEN + 14),
          scale: interpolate(frame, [OPEN, OPEN + 18, OPEN + 34], [0.72, 1.045, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE_OUT,
          }),
          // Rises the last stretch into place, matching the toggle's direction.
          translate: `0px ${(1 - open) * 30}px`,
          boxShadow: `0 ${18 + open * 12}px ${60 + open * 28}px rgba(24, 20, 60, ${
            0.18 + open * 0.08
          })`,
        }}
      >
        <FeedbackWidgetListView
          style={{
            // Pushed out to the left, the way a stack's previous screen leaves.
            translate: `${push * -24}%`,
            scale: 1 - push * 0.035,
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
              scale: interpolate(push, [0, 1], [1.018, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              boxShadow: `-18px 0 42px rgba(24, 20, 60, ${(1 - push) * 0.16})`,
            }}
            cardStyle={{
              boxShadow: `0 1px 3px rgba(24, 28, 45, 0.06), 0 0 ${
                18 * titleFocus
              }px rgba(92, 69, 223, ${0.12 * titleFocus})`,
            }}
            // Submitting clears the form, which is what the second reference
            // shows: placeholders back, counter grey, nothing focused.
            title={sent ? "" : typed}
            titleFocused={!sent && !boardPicked}
            titleFieldStyle={{
              boxShadow:
                !sent && !boardPicked
                  ? `0 0 0 ${3 * titleFocus}px rgba(92, 69, 223, ${
                      0.1 * titleFocus
                    })`
                  : undefined,
            }}
            caret={!sent && !boardPicked}
            board={boardPicked && !sent ? FORM_BOARD : null}
            boardFocused={boardPicked && !sent}
            boardFieldStyle={{
              backgroundColor: boardPicked && !sent ? "#f7f5ff" : undefined,
              boxShadow:
                boardPicked && !sent
                  ? `0 0 0 ${3 * (1 - boardPulse)}px rgba(92, 69, 223, ${
                      0.16 * (1 - boardPulse)
                    })`
                  : undefined,
              scale:
                boardPicked && !sent
                  ? interpolate(frame, [BOARD_CLICK, BOARD_CLICK + 8, BOARD_CLICK + 20], [1, 1.018, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                      easing: EASE_OUT,
                    })
                  : undefined,
            }}
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
              scale: interpolate(confirm, [0, 1], [0.96, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: EASE_OUT,
              }),
            }}
            submitStyle={{
              scale: press(frame, SUBMIT_CLICK, 0.97),
              boxShadow: sending
                ? "0 10px 24px rgba(92, 69, 223, 0.28)"
                : undefined,
              opacity: sending ? 0.94 : 1,
            }}
          />
        ) : null}
      </FeedbackWidget>

      {frame >= SENT ? (
        <div
          style={{
            position: "absolute",
            left: FORM.submit.x - 38,
            top: FORM.submit.y - 150,
            width: 1,
            height: 1,
            opacity: successPop * successFade,
            pointerEvents: "none",
          }}
        >
          {SUCCESS_PARTICLES.map((particle, index) => (
            <span
              key={`${particle.color}-${index}`}
              style={{
                position: "absolute",
                width: particle.size,
                height: particle.size,
                borderRadius: "50%",
                backgroundColor: particle.color,
                translate: `${interpolate(successPop, [0, 1], [0, particle.x])}px ${interpolate(
                  successPop,
                  [0, 1],
                  [0, particle.y],
                )}px`,
                scale: interpolate(successPop, [0, 1], [0.4, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: EASE_OUT,
                }),
              }}
            />
          ))}
        </div>
      ) : null}

      <FeedbackWidgetToggle
        style={{
          scale: press(frame, OPEN_CLICK, 0.92),
          boxShadow: `0 8px 24px rgba(70, 50, 190, 0.34), 0 0 ${
            28 * togglePulse
          }px rgba(92, 69, 223, ${0.28 * togglePulse})`,
        }}
        chevronStyle={{
          // Up while closed, down once open: the click turns it over.
          rotate: `${interpolate(frame, [OPEN_CLICK, OPEN_CLICK + 20], [180, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE_OUT,
          })}deg`,
        }}
      />

      {frame >= OPEN_CLICK && frame < OPEN_CLICK + 28 ? (
        <div
          style={{
            position: "absolute",
            left: TOGGLE.x - 32,
            top: TOGGLE.y - 32,
            width: 64,
            height: 64,
            borderRadius: "50%",
            border: `2px solid ${BRAND_PURPLE}`,
            opacity: togglePulse,
            scale: interpolate(frame, [OPEN_CLICK, OPEN_CLICK + 28], [1, 1.8], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE_OUT,
            }),
            pointerEvents: "none",
          }}
        />
      ) : null}

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
    </AbsoluteFill>
  );
};
