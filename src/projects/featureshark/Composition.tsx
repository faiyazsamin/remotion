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
  ADMIN_SCALE,
  AdminHomeBackdrop,
  AdminHomeHeadline,
  AdminHomeHero,
  AdminHomeMain,
  AdminHomeSidebar,
  AdminHomeSuggestions,
  AdminHomeTopBar,
  AdminHomeWindow,
  FPS,
  IconArrowUp,
  IconChevronDown,
  IconChip,
  IconSun,
  REM,
  scaled,
} from "./ui";

export const FeatureSharkComposition = () => (
  <Composition
    id="FeatureSharkHome"
    component={FeatureSharkHome}
    durationInFrames={300}
    fps={FPS}
    width={ADMIN_HOME_WIDTH}
    height={ADMIN_HOME_HEIGHT}
  />
);

export const FeatureSharkHome: React.FC = () => (
  <AbsoluteFill name="Admin Home">
    <AnimatedAdminHome />
  </AbsoluteFill>
);

const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
const POP_START = 10;
const TYPE_START = 76;
const TYPE_SPEED = 1.45;
const AGENT_PROMPT = [
  "Build a 5-day welcome email sequence.",
  "Segment trial users by activation signal.",
  "Generate the campaign, then publish the changelog.",
].join(" ");

const arrive = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

const AnimatedAdminHome: React.FC = () => {
  return (
    <AdminHomeBackdrop>
      <AdminHomeSidebar />
      <AdminHomeWindow>
        <AdminHomeMain>
          <AdminHomeTopBar />
          <AdminHomeHero>
            <AdminHomeHeadline />
            <TypingAgentComposer />
            <AdminHomeSuggestions />
          </AdminHomeHero>
        </AdminHomeMain>
      </AdminHomeWindow>
    </AdminHomeBackdrop>
  );
};

const TypingAgentComposer: React.FC = () => {
  const frame = useCurrentFrame();
  const composerPop = arrive(frame, POP_START, POP_START + 42);
  const composerPush = arrive(frame, POP_START + 42, POP_START + 112);
  const typed = AGENT_PROMPT.slice(
    0,
    Math.floor(
      interpolate(
        frame,
        [TYPE_START, TYPE_START + AGENT_PROMPT.length * TYPE_SPEED],
        [0, AGENT_PROMPT.length],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      ),
    ),
  );
  const caretVisible = Math.floor(frame / 18) % 2 === 0;

  return (
    <div
      style={{
        marginTop: 2 * REM,
        perspective: scaled(900),
      }}
    >
      <div
        style={{
          borderRadius: 1 * REM,
          border: `${scaled(1)}px solid #eceff9`,
          overflow: "hidden",
          backgroundColor: "#ffffff",
          boxShadow: `0 ${scaled(2 + composerPush * 36)}px ${scaled(
            8 + composerPush * 82,
          )}px rgba(54, 42, 148, ${
            0.03 + composerPush * 0.3
          }), 0 0 ${scaled(52)}px rgba(92, 69, 223, ${0.16 * composerPop})`,
          transformOrigin: "50% 50%",
          transform: `translateY(${interpolate(
            frame,
            [POP_START, POP_START + 42, POP_START + 112],
            [0, -26, -20],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          )}px) scale(${interpolate(
            frame,
            [POP_START, POP_START + 42, POP_START + 112],
            [1, 1.32, 1.24],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE_OUT,
            },
          )}) rotateX(${interpolate(
            frame,
            [POP_START, POP_START + 42, POP_START + 112],
            [0, -5, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          )}deg)`,
        }}
      >
      <div
        style={{
          height: scaled(44),
          borderBottom: `${scaled(1)}px solid #f2f4fb`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `0 ${scaled(16)}px`,
          boxSizing: "border-box",
          fontSize: scaled(12),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: scaled(6) }}>
          <span style={{ color: "#5c45df", scale: ADMIN_SCALE, display: "flex" }}>
            <IconChip small />
          </span>
          <span style={{ color: "#4e556b", fontWeight: 700 }}>Shark Agent</span>
          <span
            style={{
              borderRadius: scaled(999),
              backgroundColor: "#effdf7",
              color: "#209b74",
              fontSize: scaled(10),
              fontWeight: 700,
              padding: `${scaled(3)}px ${scaled(7)}px`,
            }}
          >
            live
          </span>
        </div>
        <span style={{ color: "#a0a8bc", scale: ADMIN_SCALE, display: "flex" }}>
          <IconChevronDown />
        </span>
      </div>

      <div
        style={{
          minHeight: scaled(96),
          display: "flex",
          alignItems: "center",
          padding: `0 ${scaled(16)}px`,
          color: typed ? "#25283a" : "#9da4b8",
          fontSize: scaled(18),
          lineHeight: 1.45,
          fontWeight: typed ? 700 : 500,
        }}
      >
        <span>
          {typed || "Ask anything about your workspace..."}
          {typed ? (
            <span
              style={{
                color: "#5c45df",
                opacity: caretVisible ? 1 : 0,
                marginLeft: scaled(2),
              }}
            >
              |
            </span>
          ) : null}
        </span>
      </div>

      <div
        style={{
          height: scaled(43),
          borderTop: `${scaled(1)}px solid #f2f4fb`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: scaled(8),
          padding: `0 ${scaled(10)}px 0 ${scaled(16)}px`,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", gap: scaled(8) }}>
          {["Feedback", "Roadmap", "Changelog"].map((label) => (
            <span
              key={label}
              style={{
                borderRadius: scaled(8),
                backgroundColor: "#f6f7fb",
                border: `${scaled(1)}px solid #eceff9`,
                color: "#72798e",
                fontSize: scaled(11),
                fontWeight: 700,
                padding: `${scaled(6)}px ${scaled(9)}px`,
              }}
            >
              {label}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: scaled(8) }}>
          <div
            style={{
              width: scaled(20),
              height: scaled(20),
              borderRadius: scaled(10),
              backgroundColor: "#edfff6",
              border: `${scaled(1)}px solid #69d8b2`,
              color: "#2ca984",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ scale: ADMIN_SCALE, display: "flex" }}>
              <IconChip tiny />
            </div>
          </div>
          <div
            style={{
              width: scaled(20),
              height: scaled(20),
              borderRadius: scaled(10),
              backgroundColor: "#f0fffd",
              border: `${scaled(1)}px solid #5ed4ca`,
              color: "#1e9e92",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ scale: ADMIN_SCALE, display: "flex" }}>
              <IconSun tiny />
            </div>
          </div>
          <div
            style={{
              width: scaled(24),
              height: scaled(24),
              borderRadius: "50%",
              backgroundColor: "#5c45df",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 ${scaled(5)}px ${scaled(14)}px rgba(92, 69, 223, 0.32)`,
            }}
          >
            <div style={{ scale: ADMIN_SCALE, display: "flex" }}>
              <IconArrowUp />
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
