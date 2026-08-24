import { AbsoluteFill, Composition } from "remotion";
import { ADMIN_HOME_HEIGHT, ADMIN_HOME_WIDTH, AdminHome, FPS } from "./ui";

/**
 * Motionless clone of `1.htm` — useful as a layout reference and for stills.
 * The animated version lives in `AdminHomeScene.tsx`.
 */
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
    <AdminHome />
  </AbsoluteFill>
);
