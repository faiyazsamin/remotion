import { Easing, interpolate, useCurrentFrame } from "remotion";

export type BrushUnderlineProps = {
  color: string;
  delay: number;
  width: number;
  children: React.ReactNode;
};

export const BrushUnderline: React.FC<BrushUnderlineProps> = ({ color, delay, width, children }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [delay, delay + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  const echoProgress = interpolate(frame, [delay + 5, delay + 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  const drawSVG = (amount: number) => ({
    strokeDashoffset: 1 - amount,
    opacity: 0.95 * amount,
  });

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {children}
      <svg
        viewBox="0 0 330 58"
        width={width}
        height="58"
        style={{
          position: "absolute",
          left: -10,
          top: "100%",
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        <path
          d="M7 33 C72 5 167 4 240 13 C283 18 311 25 323 31"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray="1"
          style={drawSVG(progress)}
        />
        <path
          d="M10 40 C78 14 173 12 246 21 C284 25 309 31 318 36"
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray="1"
          style={drawSVG(echoProgress)}
        />
      </svg>
    </span>
  );
};
