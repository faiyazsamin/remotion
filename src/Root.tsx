import "./index.css";
import {
  FeatureSharkAdminHomeSceneComposition,
  FeatureSharkBulkStatusSceneComposition,
  FeatureSharkChangelogSceneComposition,
  FeatureSharkComposition,
  FeatureSharkFeedbackBoardSceneComposition,
  FeatureSharkFeedbackReviewSceneComposition,
  FeatureSharkFeedbackWidgetSceneComposition,
  FeatureSharkFullDemoComposition,
  FeatureSharkHelpCenterSceneComposition,
  FeatureSharkPublicBoardScenePart2Composition,
  FeatureSharkWidgetSupportSceneComposition,
} from "./projects/featureshark";

/** Master timeline first; individual scenes remain registered for isolated edits. */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <FeatureSharkFullDemoComposition />
      <FeatureSharkFeedbackWidgetSceneComposition />
      <FeatureSharkFeedbackBoardSceneComposition />
      <FeatureSharkPublicBoardScenePart2Composition />
      <FeatureSharkFeedbackReviewSceneComposition />
      <FeatureSharkBulkStatusSceneComposition />
      <FeatureSharkChangelogSceneComposition />
      <FeatureSharkHelpCenterSceneComposition />
      <FeatureSharkWidgetSupportSceneComposition />
      <FeatureSharkComposition />
      <FeatureSharkAdminHomeSceneComposition />
    </>
  );
};
