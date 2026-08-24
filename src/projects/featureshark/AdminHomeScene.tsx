import {
  AbsoluteFill,
  Composition,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import {
  ADMIN_HOME_HEIGHT,
  ADMIN_HOME_WIDTH,
  AdminHomeBackdrop,
  AdminHomeComposer,
  AdminHomeHeadline,
  AdminHomeHero,
  AdminHomeMain,
  AdminHomeSidebar,
  AdminHomeSuggestions,
  AdminHomeTopBar,
  AdminHomeWindow,
  FPS,
  HEADLINE,
} from "./ui";

export const FeatureSharkAdminHomeSceneComposition = () => (
  <Composition
    id="FeatureSharkAdminHomeScene"
    component={AdminHomeScene}
    durationInFrames={300}
    fps={FPS}
    width={ADMIN_HOME_WIDTH}
    height={ADMIN_HOME_HEIGHT}
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

const SIDEBAR_START = 8;
const SIDEBAR_STAGGER = 1.5;
const WORD_START = 26;
const WORD_STAGGER = 1.6;
const CARD_START = 96;
const CARD_STAGGER = 5;

const WORD_COUNT = HEADLINE.split(" ").length;

/**
 * Scene: the FeatureShark Admin Home (clone of `1.htm`) assembling itself.
 *
 * The window settles out of a slight push-in, the chrome arrives from its own
 * edges (rail from the left, top bar from above), then the hero cascades
 * downwards — headline word by word, composer, suggestion cards — and the
 * frame holds completely still from frame 135 onwards.
 */
export const AdminHomeScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Admin Home scene" style={{ backgroundColor: "#4431bc" }}>
      <AdminHomeBackdrop>
        <AdminHomeSidebar
            logoStyle={{
              opacity: arrive(frame, 4, 24),
              scale: interpolate(frame, [4, 30], [0.8, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: EASE_OUT,
              }),
            }}
            iconStyle={(index) => {
              const start = SIDEBAR_START + index * SIDEBAR_STAGGER;
              const progress = arrive(frame, start, start + 18);

              return {
                opacity: progress,
                translate: `${(progress - 1) * 10}px 0px`,
              };
            }}
            footerStyle={{ opacity: arrive(frame, 28, 46) }}
          />

        <AdminHomeWindow
          style={{
            // No opacity fade here: the pane must stay opaque or the purple
            // ground bleeds through it. Its parts fade in instead.
            scale: interpolate(frame, [0, 34], [1.035, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE_OUT,
            }),
          }}
        >
          <AdminHomeMain>
            <AdminHomeTopBar
              style={{
                opacity: arrive(frame, 12, 34),
                translate: `0px ${(arrive(frame, 12, 34) - 1) * 8}px`,
              }}
              searchStyle={{
                opacity: arrive(frame, 20, 44),
                scale: interpolate(frame, [20, 44], [0.96, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: EASE_OUT,
                }),
              }}
              utilityStyle={{ opacity: arrive(frame, 24, 48) }}
            />

            <AdminHomeHero>
              <AdminHomeHeadline
                wordStyle={(index) => {
                  const start = WORD_START + index * WORD_STAGGER;
                  const progress = arrive(frame, start, start + 20);

                  return {
                    opacity: progress,
                    translate: `0px ${(1 - progress) * 14}px`,
                  };
                }}
              />

              <AdminHomeComposer
                style={{
                  opacity: arrive(
                    frame,
                    WORD_START + WORD_COUNT * WORD_STAGGER,
                    WORD_START + WORD_COUNT * WORD_STAGGER + 26,
                  ),
                  translate: `0px ${
                    (1 -
                      arrive(
                        frame,
                        WORD_START + WORD_COUNT * WORD_STAGGER,
                        WORD_START + WORD_COUNT * WORD_STAGGER + 26,
                      )) *
                    20
                  }px`,
                }}
              />

              <AdminHomeSuggestions
                cardStyle={(index) => {
                  const start = CARD_START + index * CARD_STAGGER;
                  const progress = arrive(frame, start, start + 24);

                  return {
                    opacity: progress,
                    translate: `0px ${(1 - progress) * 18}px`,
                  };
                }}
              />
            </AdminHomeHero>
          </AdminHomeMain>
        </AdminHomeWindow>
      </AdminHomeBackdrop>
    </AbsoluteFill>
  );
};
