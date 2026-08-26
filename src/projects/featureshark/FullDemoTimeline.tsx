import {
  AbsoluteFill,
  Composition,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
} from "remotion";
import { BulkStatusScene } from "./BulkStatusScene";
import { ChangelogScene } from "./ChangelogScene";
import { FeedbackBoardScene } from "./FeedbackBoardScene";
import { FeedbackReviewScene } from "./FeedbackReviewScene";
import { FeedbackWidgetScene } from "./FeedbackWidgetScene";
import { HelpCenterScene } from "./HelpCenterScene";
import { PublicBoardScenePart2 } from "./PublicBoardScenePart2";
import { WidgetSupportScene } from "./WidgetSupportScene";
import { FPS, SITE_HEIGHT, SITE_WIDTH } from "./ui";

type DemoScene = {
  id: string;
  label: string;
  duration: number;
  Component: React.FC;
  trimBefore?: number;
  overlap?: number;
  /** Keeps app chrome locked for seams between two views of the same app. */
  staticShell?: boolean;
};

type TimedDemoScene = DemoScene & {
  from: number;
};

const DEFAULT_OVERLAP = 30;

export const FEATURE_SHARK_DEMO_SCENES: DemoScene[] = [
  {
    id: "feedback-widget",
    label: "Customer feedback widget",
    duration: 600,
    Component: FeedbackWidgetScene,
  },
  {
    id: "feedback-board",
    label: "Feedback board triage",
    duration: 960,
    Component: FeedbackBoardScene,
  },
  {
    id: "public-board-discussion",
    label: "Public board discussion",
    duration: 720,
    Component: PublicBoardScenePart2,
  },
  {
    id: "feedback-review",
    label: "Feedback review",
    duration: 1510,
    trimBefore: 140,
    Component: FeedbackReviewScene,
  },
  {
    id: "bulk-status",
    label: "Bulk status update",
    duration: 840,
    staticShell: true,
    Component: BulkStatusScene,
  },
  {
    id: "changelog",
    label: "Changelog publishing",
    duration: 1284,
    staticShell: true,
    Component: ChangelogScene,
  },
  {
    id: "help-center",
    label: "Help center article",
    duration: 1665,
    Component: HelpCenterScene,
  },
  {
    id: "support-widget",
    label: "Support widget self-serve",
    duration: 1490,
    Component: WidgetSupportScene,
  },
];

export const FEATURE_SHARK_FULL_DEMO_DURATION =
  FEATURE_SHARK_DEMO_SCENES.reduce((total, scene, index) => {
    const overlap = index === 0 ? 0 : (scene.overlap ?? DEFAULT_OVERLAP);

    return total + scene.duration - overlap;
  }, 0);

export const FEATURE_SHARK_DEMO_TIMELINE =
  FEATURE_SHARK_DEMO_SCENES.reduce<TimedDemoScene[]>((timeline, scene) => {
    const previous = timeline[timeline.length - 1];
    const overlap = previous ? (scene.overlap ?? DEFAULT_OVERLAP) : 0;
    const from = previous ? previous.from + previous.duration - overlap : 0;

    return [...timeline, { ...scene, from }];
  }, []);

export const FeatureSharkFullDemoComposition = () => (
  <Composition
    id="FeatureSharkFullDemo"
    component={FeatureSharkFullDemo}
    durationInFrames={FEATURE_SHARK_FULL_DEMO_DURATION}
    fps={FPS}
    width={SITE_WIDTH}
    height={SITE_HEIGHT}
  />
);

const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
const DEMO_FRAME_SCALE = 0.925;
const DEMO_FRAME_LEFT = (SITE_WIDTH - SITE_WIDTH * DEMO_FRAME_SCALE) / 2;
const DEMO_FRAME_TOP = (SITE_HEIGHT - SITE_HEIGHT * DEMO_FRAME_SCALE) / 2;

const TimelineScene: React.FC<{
  scene: TimedDemoScene;
  nextStaticShell?: boolean;
}> = ({ scene, nextStaticShell }) => {
  const frame = useCurrentFrame();
  const {
    label,
    duration,
    from,
    trimBefore = 0,
    overlap = DEFAULT_OVERLAP,
    staticShell,
    Component,
  } = scene;
  const firstScene = from === 0;
  const lastScene =
    from + duration >= FEATURE_SHARK_FULL_DEMO_DURATION - 1;
  const localFrame = frame - from;
  const staticShellEnter = Boolean(
    staticShell && !firstScene && localFrame <= overlap,
  );
  const wrapperProgress = staticShell
    ? [1, 1, 1, 1]
    : [1.012, 1, 1, nextStaticShell ? 1 : 0.992];
  const wrapperBlur = staticShell
    ? [0, 0, 0, nextStaticShell || lastScene ? 0 : 3]
    : [firstScene ? 0 : 4, 0, 0, nextStaticShell || lastScene ? 0 : 3];
  const inOpacity = firstScene
    ? 1
    : interpolate(localFrame, [0, overlap], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: EASE_OUT,
      });
  const outOpacity = lastScene
    ? 1
    : interpolate(
        localFrame,
        [duration - overlap, duration],
        [1, 0],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: EASE_OUT,
        },
      );
  const lockedInOpacity = staticShell ? 1 : inOpacity;
  const lockedOutOpacity = nextStaticShell ? 1 : outOpacity;

  return (
    <Sequence
      name={label}
      from={from}
      durationInFrames={duration}
      layout="absolute-fill"
    >
      <AbsoluteFill
        name={`${label} transition wrapper`}
        style={{
          zIndex: staticShellEnter
            ? 3
            : !lastScene && localFrame >= duration - overlap
              ? 2
              : 1,
          opacity: lockedInOpacity * lockedOutOpacity,
          scale: interpolate(
            localFrame,
            [0, overlap, duration - overlap, duration],
            wrapperProgress,
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE_OUT,
            },
          ),
          filter: `blur(${
            interpolate(
              localFrame,
              [0, overlap, duration - overlap, duration],
              wrapperBlur,
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: EASE_OUT,
              },
            )
          }px)`,
        }}
      >
        <Sequence from={-trimBefore} layout="absolute-fill">
          <Component />
        </Sequence>
      </AbsoluteFill>
    </Sequence>
  );
};

export const FeatureSharkFullDemo: React.FC = () => {
  return (
    <AbsoluteFill
      name="FeatureShark full demo stage"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(31, 18, 105, 0.92) 0%, rgba(47, 26, 139, 0.72) 38%, rgba(79, 60, 204, 0.28) 62%, rgba(102, 117, 255, 0) 82%), linear-gradient(90deg, #6675ff 0%, #7a85ff 50%, #6675ff 100%)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: DEMO_FRAME_LEFT - 28,
          top: DEMO_FRAME_TOP - 28,
          width: SITE_WIDTH * DEMO_FRAME_SCALE + 56,
          height: SITE_HEIGHT * DEMO_FRAME_SCALE + 56,
          borderRadius: 44,
          background:
            "radial-gradient(circle at 50% 50%, rgba(18, 10, 70, 0.72) 0%, rgba(25, 14, 88, 0.54) 46%, rgba(45, 28, 139, 0.18) 100%)",
          filter: "blur(58px)",
          opacity: 0.86,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: DEMO_FRAME_LEFT + 24,
          top: DEMO_FRAME_TOP + 20,
          width: SITE_WIDTH * DEMO_FRAME_SCALE - 48,
          height: SITE_HEIGHT * DEMO_FRAME_SCALE - 40,
          borderRadius: 28,
          background:
            "radial-gradient(circle at 50% 50%, rgba(12, 8, 50, 0.5), rgba(27, 16, 94, 0.28) 60%, rgba(68, 48, 174, 0) 100%)",
          filter: "blur(46px)",
          opacity: 0.72,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: DEMO_FRAME_LEFT,
          top: DEMO_FRAME_TOP,
          width: SITE_WIDTH,
          height: SITE_HEIGHT,
          borderRadius: 20 / DEMO_FRAME_SCALE,
          overflow: "hidden",
          backgroundColor: "#3f2cc0",
          scale: DEMO_FRAME_SCALE,
          transformOrigin: "0 0",
          boxShadow:
            "0 28px 110px rgba(13, 8, 56, 0.42), 0 0 88px rgba(18, 10, 70, 0.32)",
        }}
      >
        <AbsoluteFill name="FeatureShark full demo timeline">
          {FEATURE_SHARK_DEMO_TIMELINE.map((scene, index) => (
            <TimelineScene
              key={scene.id}
              scene={scene}
              nextStaticShell={
                FEATURE_SHARK_DEMO_TIMELINE[index + 1]?.staticShell
              }
            />
          ))}
        </AbsoluteFill>
      </div>
    </AbsoluteFill>
  );
};
