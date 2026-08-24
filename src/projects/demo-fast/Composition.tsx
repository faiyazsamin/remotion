import {
  AbsoluteFill,
  CalculateMetadataFunction,
  Composition,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
} from "remotion";
import { BrushUnderline } from "../../components/BrushUnderline";

type Props = {};
const calculateMetadata: CalculateMetadataFunction<Props> = () => ({});
const easeIn = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

export const MyComposition = () => (
  <Composition
    id="MyComp"
    component={MyComponent}
    durationInFrames={300}
    fps={60}
    width={1920}
    height={1080}
    calculateMetadata={calculateMetadata}
  />
);
export const Part2Composition = () => (
  <Composition
    id="Part2"
    component={Part2}
    durationInFrames={300}
    fps={60}
    width={1920}
    height={1080}
  />
);
export const Part3Composition = () => (
  <Composition
    id="Part3"
    component={Part3}
    durationInFrames={300}
    fps={60}
    width={1920}
    height={1080}
  />
);

export const MyComponent: React.FC<Props> = () => {
  const frame = useCurrentFrame();
  const popup = easeIn(frame, 8, 34);
  const header = easeIn(frame, 24, 48);
  const firstMessage = easeIn(frame, 58, 88);
  const secondMessage = easeIn(frame, 126, 156);
  const typing = Math.floor(
    interpolate(frame, [64, 84], [0, 43], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const message = "Hey, last-minute change in the demo...";
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFFFF",
        color: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: 820,
          minHeight: 590,
          boxSizing: "border-box",
          backgroundColor: "#151519",
          border: "1px solid #303038",
          borderRadius: 28,
          padding: "38px 42px 44px",
          display: "flex",
          flexDirection: "column",
          gap: 26,
          opacity: popup,
          scale: 0.94 + popup * 0.06,
          translate: `0 ${interpolate(frame, [0, 34], [28, 0], { extrapolateRight: "clamp" })}px`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            borderBottom: "1px solid #303038",
            paddingBottom: 25,
            opacity: header,
          }}
        >
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              backgroundColor: "#8B5CF6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 23,
              fontWeight: 800,
            }}
          >
            AC
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>Alex Chen</div>
            <div style={{ color: "#96969F", fontSize: 17, marginTop: 5 }}>
              Client - Just now
            </div>
          </div>
          <div
            style={{
              color: "#8B5CF6",
              border: "1px solid #8B5CF6",
              borderRadius: 100,
              padding: "8px 15px",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            LAST-MINUTE
          </div>
        </div>
        <div
          style={{
            alignSelf: "flex-start",
            maxWidth: 650,
            backgroundColor: "#26262D",
            borderRadius: "22px 22px 22px 5px",
            padding: "22px 28px",
            fontSize: 30,
            lineHeight: 1.25,
            opacity: firstMessage,
          }}
        >
          {message.slice(0, typing)}
          <span style={{ color: "#8B5CF6" }}>|</span>
        </div>
        <div
          style={{
            alignSelf: "flex-start",
            color: "#96969F",
            fontSize: 16,
            opacity: easeIn(frame, 94, 108) * (1 - secondMessage),
          }}
        >
          Alex is typing ...
        </div>
        <div
          style={{
            alignSelf: "flex-end",
            maxWidth: 590,
            backgroundColor: "#8B5CF6",
            borderRadius: "22px 22px 5px 22px",
            padding: "22px 28px",
            fontSize: 34,
            fontWeight: 700,
            opacity: secondMessage,
          }}
        >
          It needs to be changed.
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Part2: React.FC = () => {
  const frame = useCurrentFrame();
  const firstLine = easeIn(frame, 42, 74);
  const secondLine = easeIn(frame, 82, 114);
  const firstStep = frame / 8;
  const secondStep = (frame + 12) / 8;
  const motion = (step: number, phase: number) =>
    Math.sin(step / 2 + phase) * 4;
  const tilt = (phase: number, amount: number) =>
    Math.sin(frame / 18 + phase) * amount;
  const wordStyle = (translate: string, rotate: number) => ({
    display: "inline-block",
    translate,
    rotate: `${rotate}deg`,
  });
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFFFF",
        color: "#17171C",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Segoe Print, Bradley Hand, Comic Sans MS, cursive",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          opacity: easeIn(frame, 8, 36),
        }}
      >
        <div style={{ fontSize: 86, lineHeight: 1.1, opacity: firstLine }}>
          <span style={wordStyle(`${motion(firstStep, 0)}px 0`, tilt(0, 0.7))}>
            Your
          </span>{" "}
          <span
            style={wordStyle(`0 ${motion(secondStep, 1)}px`, tilt(1.4, 0.6))}
          >
            product
          </span>{" "}
          <span
            style={wordStyle(`${motion(firstStep, 2.5)}px 0`, tilt(2.5, 0.6))}
          >
            changed.
          </span>
        </div>
        <div style={{ fontSize: 86, lineHeight: 1.1, opacity: secondLine }}>
          <span
            style={wordStyle(`0 ${motion(secondStep, 3.5)}px`, tilt(3.5, 0.6))}
          >
            but
          </span>{" "}
          <span
            style={wordStyle(`${motion(firstStep, 4.5)}px 0`, tilt(4.5, 0.5))}
          >
            your
          </span>{" "}
          <span style={wordStyle(`0 ${motion(firstStep, 6)}px`, tilt(6, 0.7))}>
            demo
          </span>{" "}
          <span
            style={wordStyle(`${motion(secondStep, 7.5)}px 0`, tilt(7.5, 0.5))}
          >
            didn&apos;t.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Part3: React.FC = () => (
  <AbsoluteFill from={-4}>
    <Sequence durationInFrames={100} layout="none" from={4}>
      <Part3PageOne />
    </Sequence>
    <Sequence from={104} durationInFrames={100} layout="none">
      <Part3PageTwo />
    </Sequence>
    <Sequence from={200} durationInFrames={100} layout="none">
      <Part3PageThree />
    </Sequence>
  </AbsoluteFill>
);
const Part3PageOne: React.FC = () => {
  const frame = useCurrentFrame();
  const words = ["Turn", "your"];
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#17151B",
        color: "#F7F5F0",
        alignItems: "center",
        justifyContent: "center",
        padding: 120,
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 110, fontWeight: 800 }}>
        {words.map((word, index) => {
          const wordProgress = easeIn(frame, index * 7, index * 7 + 24);
          return (
            <span
              key={word}
              style={{
                display: "inline-block",
                marginRight: 24,
                opacity: wordProgress,
                translate: `${interpolate(wordProgress, [0, 1], [index % 2 ? 70 : -70, 0])}px 0`,
                rotate: `${interpolate(wordProgress, [0, 1], [index % 2 ? -8 : 8, 0])}deg`,
              }}
            >
              {word}
            </span>
          );
        })}{" "}
        <BrushUnderline color="#A78BFA" delay={25} width={550}>
          <span
            style={{
              display: "inline-block",
              color: "#A78BFA",
              fontFamily: "Segoe Print, Bradley Hand, cursive",
              opacity: easeIn(frame, 14, 38),
              translate: `${interpolate(easeIn(frame, 14, 38), [0, 1], [50, 0])}px 0`,
              rotate: `${interpolate(easeIn(frame, 14, 38), [0, 1], [8, 0])}deg`,
            }}
          >
            product
          </span>
        </BrushUnderline>
      </div>
    </AbsoluteFill>
  );
};
const Part3PageTwo: React.FC = () => {
  const frame = useCurrentFrame();
  const words = ["into"];
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0D2928",
        color: "#E8FFFA",
        alignItems: "center",
        justifyContent: "center",
        padding: 120,
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 110, fontWeight: 800 }}>
        {words.map((word, index) => {
          const wordProgress = easeIn(frame, index * 8, index * 8 + 26);
          return (
            <span
              key={word}
              style={{
                display: "inline-block",
                marginRight: 24,
                opacity: wordProgress,
                translate: `0 ${interpolate(wordProgress, [0, 1], [-40, 0])}px`,
                rotate: `${interpolate(wordProgress, [0, 1], [-5, 0])}deg`,
              }}
            >
              {word}
            </span>
          );
        })}{" "}
        <BrushUnderline color="#5EEAD4" delay={18} width={750}>
          <span
            style={{
              display: "inline-block",
              color: "#5EEAD4",
              fontFamily: "Segoe Print, Bradley Hand, cursive",
              opacity: easeIn(frame, 8, 34),
              translate: `0 ${interpolate(easeIn(frame, 8, 34), [0, 1], [80, 0])}px`,
              rotate: `${interpolate(easeIn(frame, 8, 34), [0, 1], [10, 0])}deg`,
              scale: 0.7 + easeIn(frame, 8, 34) * 0.3,
            }}
          >
            interactive
          </span>
        </BrushUnderline>{" "}demo
      </div>
    </AbsoluteFill>
  );
};
const Part3PageThree: React.FC = () => {
  const frame = useCurrentFrame();
  const words = ["in"];
  const minuteProgress = easeIn(frame, 24, 48);
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#24152F",
        color: "#FAF5FF",
        alignItems: "center",
        justifyContent: "center",
        padding: 120,
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 110, fontWeight: 800 }}>
        {words.map((word, index) => {
          const wordProgress = easeIn(frame, index * 12, index * 12 + 24);
          return (
            <span
              key={word}
              style={{
                display: "inline-block",
                marginRight: 28,
                opacity: wordProgress,
                translate: `${interpolate(wordProgress, [0, 1], [index % 2 ? 55 : -55, 0])}px ${interpolate(wordProgress, [0, 1], [24, 0])}px`,
                rotate: `${interpolate(wordProgress, [0, 1], [index % 2 ? 7 : -7, 0])}deg`,
                scale: 0.88 + wordProgress * 0.12,
              }}
            >
              {word}
            </span>
          );
        })}{" "}
        <BrushUnderline color="#FB923C" delay={42} width={380}>
          <span
            style={{
              display: "inline-block",
              color: "#FB923C",
              fontFamily: "Segoe Print, Bradley Hand, cursive",
              opacity: minuteProgress,
              translate: `0 ${interpolate(minuteProgress, [0, 1], [24, 0])}px`,
              rotate: `${interpolate(minuteProgress, [0, 1], [7, 0])}deg`,
              scale: 0.78 + minuteProgress * 0.22,
            }}
          >
            minutes
          </span>
        </BrushUnderline>
      </div>
    </AbsoluteFill>
  );
};
