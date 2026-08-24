import { Interactive } from "remotion";
import {
  CardArtChangelog,
  CardArtInsights,
  CardArtReview,
  CardArtRoadmap,
} from "./icons";
import { REM, scaled, type PartProps } from "./tokens";

export const SUGGESTION_CARDS = [
  {
    title: "What are users requesting most?",
    body: "Get a quick rundown of the top requested features and trends from your feedback.",
    art: <CardArtInsights />,
  },
  {
    title: "Show me recent changelog updates",
    body: "Catch up on the latest updates your team has shipped.",
    art: <CardArtChangelog />,
  },
  {
    title: "How many feedback items are under review?",
    body: "See the current state of your review pipeline at a glance.",
    art: <CardArtReview />,
  },
  {
    title: "What’s on the roadmap?",
    body: "Explore what’s planned, in progress, and coming next.",
    art: <CardArtRoadmap />,
  },
];

/** `min-h-[128px] rounded-xl border p-4 flex flex-col items-start justify-between`. */
const cardStyleBase: React.CSSProperties = {
  position: "relative",
  minHeight: scaled(128),
  borderRadius: 0.75 * REM,
  border: `${scaled(1)}px solid #e8ebf6`,
  backgroundColor: "#ffffff",
  padding: 1 * REM,
  boxSizing: "border-box",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
};

/**
 * The card art is a background flourish: on the real page it sits at
 * `absolute right-1 bottom-1 h-20 w-20` *behind* the copy, which wins via
 * `relative z-10`. Without that stacking the art paints over the text.
 */
const artStyle: React.CSSProperties = {
  position: "absolute",
  right: 0.25 * REM,
  bottom: 0.25 * REM,
  width: 5 * REM,
  height: 5 * REM,
  opacity: 0.98,
};

/** `relative z-10 w-full` — keeps the copy above the art. */
const copyStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 10,
  width: "100%",
};

/** 2x2 grid of suggested prompts. `cardStyle(index)` staggers their arrival. */
export const AdminHomeSuggestions: React.FC<
  PartProps & { cardStyle?: (index: number) => React.CSSProperties }
> = ({ style, cardStyle }) => (
  <Interactive.Div
    name="Suggestions"
    style={{
      marginTop: 2 * REM,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 0.75 * REM,
      ...style,
    }}
  >
    {SUGGESTION_CARDS.map((card, index) => (
      <article
        key={card.title}
        style={{ ...cardStyleBase, ...cardStyle?.(index) }}
      >
        <div style={copyStyle}>
          <div
            style={{
              fontSize: 0.875 * REM,
              lineHeight: 1.25,
              color: "#29324a",
              fontWeight: 600,
            }}
          >
            {card.title}
          </div>
          <div
            style={{
              marginTop: 0.25 * REM,
              fontSize: 0.75 * REM,
              lineHeight: 1.625,
              color: "#8f97ab",
            }}
          >
            {card.body}
          </div>
        </div>
        <div style={artStyle}>{card.art}</div>
      </article>
    ))}
  </Interactive.Div>
);
