import { Interactive } from "remotion";
import { FeedbackWidgetCredit } from "./FeedbackWidgetCredit";
import { FeedbackWidgetEmptyState } from "./FeedbackWidgetEmptyState";
import { FeedbackWidgetHeader } from "./FeedbackWidgetHeader";
import { FeedbackWidgetNav } from "./FeedbackWidgetNav";
import { IconPlus } from "./icons";
import { BRAND_PURPLE, FAB_INSET, FAB_SIZE, type PartProps } from "./tokens";

export type FeedbackWidgetListViewProps = PartProps & {
  headerStyle?: React.CSSProperties;
  searchStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  fabStyle?: React.CSSProperties;
  navStyle?: React.CSSProperties;
  tabStyle?: (index: number) => React.CSSProperties;
};

/** The panel's root view: search, the feedback list, the tab bar and the FAB. */
export const FeedbackWidgetListView: React.FC<FeedbackWidgetListViewProps> = ({
  style,
  headerStyle,
  searchStyle,
  bodyStyle,
  fabStyle,
  navStyle,
  tabStyle,
}) => (
  <Interactive.Div
    name="List view"
    style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      ...style,
    }}
  >
    <FeedbackWidgetHeader
      title="Feedback"
      search
      style={headerStyle}
      searchStyle={searchStyle}
    />

    <div
      style={{
        flex: 1,
        minHeight: 0,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        ...bodyStyle,
      }}
    >
      <FeedbackWidgetEmptyState />

      <div
        style={{
          position: "absolute",
          right: FAB_INSET,
          bottom: FAB_INSET,
          width: FAB_SIZE,
          height: FAB_SIZE,
          borderRadius: "50%",
          // Same purple as the toggle that opens the panel.
          backgroundColor: BRAND_PURPLE,
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 18px rgba(90, 70, 210, 0.28)",
          ...fabStyle,
        }}
      >
        <IconPlus size={22} />
      </div>
    </div>

    <FeedbackWidgetCredit />
    <FeedbackWidgetNav style={navStyle} tabStyle={tabStyle} />
  </Interactive.Div>
);
