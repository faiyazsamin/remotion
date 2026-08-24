import "./index.css";
import {
  FeatureSharkAdminHomeSceneComposition,
  FeatureSharkBulkStatusSceneComposition,
  FeatureSharkChangelogSceneComposition,
  FeatureSharkComposition,
  FeatureSharkFeedbackBoardSceneComposition,
  FeatureSharkFeedbackReviewSceneComposition,
  FeatureSharkFeedbackWidgetSceneComposition,
  FeatureSharkHelpCenterSceneComposition,
  FeatureSharkPublicBoardScenePart2Composition,
  FeatureSharkWidgetSupportSceneComposition,
} from "./projects/featureshark";

/** Registered in story order, which is the order the film cuts them. */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <FeatureSharkComposition />
      <FeatureSharkAdminHomeSceneComposition />
      <FeatureSharkFeedbackWidgetSceneComposition />
      <FeatureSharkFeedbackBoardSceneComposition />
      <FeatureSharkPublicBoardScenePart2Composition />
      <FeatureSharkFeedbackReviewSceneComposition />
      <FeatureSharkBulkStatusSceneComposition />
      <FeatureSharkChangelogSceneComposition />
      <FeatureSharkHelpCenterSceneComposition />
      <FeatureSharkWidgetSupportSceneComposition />
    </>
  );
};
