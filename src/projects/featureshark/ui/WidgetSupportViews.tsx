import { Interactive } from "remotion";
import { ArticleBody } from "./ArticleBody";
import { ENTRY_TYPES, type ChangelogEntry } from "./changelogContent";
import { FeedbackWidgetCredit } from "./FeedbackWidgetCredit";
import type { ArticleBlock } from "./helpCenterContent";
import {
  IconBook,
  IconCalendar,
  IconChat,
  IconChevronDown,
  IconFlame,
  IconPaperPlane,
} from "./icons";
import {
  BRAND_PURPLE,
  WIDGET_CREDIT_HEIGHT,
  WIDGET_HEIGHT,
  WIDGET_NAV_HEIGHT,
  WIDGET_RIGHT,
  WIDGET_TOP,
  WIDGET_WIDTH,
  type PartProps,
} from "./tokens";

/*
  Panel geometry. The support views live in the same shell the feedback views do,
  so everything is measured from the panel's own corner — and the expanded shape
  the article and release views take is just a second set of the same numbers.
*/
const PADDING = 20;
const HEADER_PLAIN = 76;
const HEADER_SEARCH = 132;
const BODY_TOP_PLAIN = WIDGET_TOP + HEADER_PLAIN;
const BODY_TOP_SEARCH = WIDGET_TOP + HEADER_SEARCH;

export const WIDGET_EXPANDED_WIDTH = 890;
export const WIDGET_EXPANDED_HEIGHT = 930;
export const WIDGET_EXPANDED_TOP = 34;

/*
  The header's controls, which both sizes lay out the same way: 20px in from the
  panel's own edges, 32px square, the close one last.
*/
const HEADER_PAD = 20;
const CONTROL_SIZE = 32;

/**
 * Centre of the panel's close control. The expanded views sit higher up the
 * frame, so which size the panel is at is the only thing that moves it.
 */
export const widgetCloseCentre = (
  frameWidth: number,
  { expanded = false }: { expanded?: boolean } = {},
) => ({
  x: frameWidth - WIDGET_RIGHT - HEADER_PAD - CONTROL_SIZE / 2,
  y:
    (expanded ? WIDGET_EXPANDED_TOP : WIDGET_TOP) +
    HEADER_PAD +
    CONTROL_SIZE / 2,
});

/** Centre of an expanded view's back control, top-left of its header. */
export const widgetBackCentre = (
  frameWidth: number,
  { expanded = false }: { expanded?: boolean } = {},
) => ({
  x:
    frameWidth -
    WIDGET_RIGHT -
    (expanded ? WIDGET_EXPANDED_WIDTH : WIDGET_WIDTH) +
    HEADER_PAD +
    CONTROL_SIZE / 2,
  y:
    (expanded ? WIDGET_EXPANDED_TOP : WIDGET_TOP) +
    HEADER_PAD +
    CONTROL_SIZE / 2,
});

/** The panel's left edge, at either size. */
const panelLeft = (frameWidth: number, width = WIDGET_WIDTH) =>
  frameWidth - WIDGET_RIGHT - width;

/* ---- Home ----------------------------------------------------------- */

const CARD_PADDING = 22;
const SUPPORT_HEADING = 26;
const SUPPORT_LINE = 24;
const SUPPORT_GAP = 18;
const ACTION_HEIGHT = 48;
const ACTION_GAP = 12;

export const HOME_ACTIONS = [
  { label: "Start Conversation", icon: <IconChat /> },
  { label: "Browse Help Articles", icon: <IconBook /> },
  { label: "View Updates & Changelog", icon: <IconCalendar /> },
  { label: "Send Feedback", icon: <IconChat /> },
];

/** Centre of one of Home's actions, which is how every other view is reached. */
export const homeActionCentre = (index: number, frameWidth: number) => ({
  x: panelLeft(frameWidth) + WIDGET_WIDTH / 2,
  y:
    BODY_TOP_PLAIN +
    PADDING +
    CARD_PADDING +
    SUPPORT_HEADING +
    SUPPORT_LINE +
    SUPPORT_GAP +
    index * (ACTION_HEIGHT + ACTION_GAP) +
    ACTION_HEIGHT / 2,
});

const Action: React.FC<
  PartProps & { label: string; icon: React.ReactNode }
> = ({ style, label, icon }) => (
  <div
    style={{
      height: ACTION_HEIGHT,
      borderRadius: 10,
      border: "1.3px solid #e6e7ee",
      backgroundColor: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 11,
      fontSize: 16,
      fontWeight: 600,
      color: "#20242f",
      ...style,
    }}
  >
    <span style={{ color: "#4d5462", display: "flex" }}>{icon}</span>
    {label}
  </div>
);

/** Home: the four things the widget can do, and nothing else. */
export const WidgetHomeView: React.FC<
  PartProps & { actionStyle?: (index: number) => React.CSSProperties }
> = ({ style, actionStyle }) => (
  <Interactive.Div
    name="Widget home"
    style={{ flex: 1, minHeight: 0, padding: PADDING, ...style }}
  >
    <div
      style={{
        borderRadius: 14,
        backgroundColor: "#ffffff",
        padding: CARD_PADDING,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          height: SUPPORT_HEADING,
          fontSize: 20,
          fontWeight: 700,
          color: "#1f232e",
        }}
      >
        Support
      </div>
      <div
        style={{
          height: SUPPORT_LINE,
          fontSize: 15.5,
          color: "#4d5462",
        }}
      >
        Hi! How can we help you today?
      </div>

      <div
        style={{
          marginTop: SUPPORT_GAP,
          display: "flex",
          flexDirection: "column",
          gap: ACTION_GAP,
        }}
      >
        {HOME_ACTIONS.map((action, index) => (
          <Action
            key={action.label}
            label={action.label}
            icon={action.icon}
            style={actionStyle?.(index)}
          />
        ))}
      </div>
    </div>
  </Interactive.Div>
);

/* ---- Messages ------------------------------------------------------- */

/** Messages: nothing in it, which is the point — the panel opens here. */
export const WidgetMessagesView: React.FC<PartProps> = ({ style }) => (
  <Interactive.Div
    name="Widget messages"
    style={{
      flex: 1,
      minHeight: 0,
      display: "flex",
      flexDirection: "column",
      ...style,
    }}
  >
    <div
      style={{
        height: 42,
        flexShrink: 0,
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 9,
        padding: `0 ${PADDING}px`,
        boxSizing: "border-box",
        fontSize: 15,
        color: "#8b91a3",
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#b9bec9",
        }}
      />
      Offline
    </div>

    <div
      style={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: 84,
        fontSize: 16,
        color: "#6b7280",
      }}
    >
      No active conversations found.
    </div>

    <div style={{ flexShrink: 0, padding: `0 ${PADDING}px ${PADDING}px` }}>
      <div
        style={{
          height: 52,
          borderRadius: 11,
          backgroundColor: BRAND_PURPLE,
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          fontSize: 17,
          fontWeight: 700,
        }}
      >
        Send us a message
        <IconPaperPlane size={17} />
      </div>
    </div>
  </Interactive.Div>
);

/* ---- Help: topics --------------------------------------------------- */

const TOPIC_HEIGHT = 78;

/** Centre of one topic row in the Help list. */
export const helpTopicCentre = (index: number, frameWidth: number) => ({
  x: panelLeft(frameWidth) + WIDGET_WIDTH / 2,
  y: BODY_TOP_SEARCH + index * TOPIC_HEIGHT + TOPIC_HEIGHT / 2,
});

export const WidgetHelpView: React.FC<
  PartProps & {
    topics: { title: string; count: number }[];
    topicStyle?: (index: number) => React.CSSProperties;
  }
> = ({ style, topics, topicStyle }) => (
  <Interactive.Div
    name="Widget help"
    style={{ flex: 1, minHeight: 0, backgroundColor: "#ffffff", ...style }}
  >
    {topics.map((topic, index) => (
      <div
        key={topic.title}
        style={{
          height: TOPIC_HEIGHT,
          borderBottom: "1px solid #f0f0f5",
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: `0 ${PADDING}px`,
          boxSizing: "border-box",
          ...topicStyle?.(index),
        }}
      >
        <span
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            /* Topics wear the help centre's own orange, not the brand purple. */
            backgroundColor: "#e8752f",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            scale: 1.2,
            flexShrink: 0,
          }}
        >
          <IconBook />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: "#1f232e" }}>
            {topic.title}
          </div>
          <div style={{ marginTop: 3, fontSize: 14.5, color: "#8b91a3" }}>
            {topic.count} {topic.count === 1 ? "article" : "articles"}
          </div>
        </div>
        <span
          style={{
            color: "#c2c6d0",
            scale: 1.2,
            rotate: "-90deg",
            display: "flex",
          }}
        >
          <IconChevronDown />
        </span>
      </div>
    ))}
  </Interactive.Div>
);

/* ---- Help: one topic ------------------------------------------------ */

const TOPIC_TITLE_HEIGHT = 34;
const ARTICLE_CARD_HEIGHT = 148;
const ARTICLE_CARD_PADDING = 22;

/** Centre of an article card inside a topic. */
export const topicArticleCentre = (index: number, frameWidth: number) => ({
  x: panelLeft(frameWidth) + WIDGET_WIDTH / 2,
  y:
    BODY_TOP_PLAIN +
    PADDING +
    TOPIC_TITLE_HEIGHT +
    14 +
    index * (ARTICLE_CARD_HEIGHT + 14) +
    ARTICLE_CARD_HEIGHT / 2,
});

export const WidgetTopicView: React.FC<
  PartProps & {
    topic: string;
    articles: { title: string; excerpt: string; date: string }[];
    articleStyle?: (index: number) => React.CSSProperties;
  }
> = ({ style, topic, articles, articleStyle }) => (
  <Interactive.Div
    name="Widget topic"
    style={{ flex: 1, minHeight: 0, padding: PADDING, ...style }}
  >
    <div
      style={{
        height: TOPIC_TITLE_HEIGHT,
        fontSize: 21,
        fontWeight: 700,
        color: "#1f232e",
      }}
    >
      {topic}
    </div>

    <div
      style={{
        marginTop: 14,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      {articles.map((article, index) => (
        <div
          key={article.title}
          style={{
            height: ARTICLE_CARD_HEIGHT,
            borderRadius: 12,
            backgroundColor: "#ffffff",
            boxShadow: "0 2px 12px rgba(24, 28, 45, 0.06)",
            padding: ARTICLE_CARD_PADDING,
            boxSizing: "border-box",
            ...articleStyle?.(index),
          }}
        >
          <div
            style={{
              fontSize: 17,
              lineHeight: 1.3,
              fontWeight: 700,
              color: "#1f232e",
            }}
          >
            {article.title}
          </div>
          <div
            style={{
              marginTop: 12,
              fontSize: 14.5,
              lineHeight: 1.5,
              color: "#9aa0ad",
              /* Two lines of the article, then it stops — it is a teaser. */
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {article.excerpt}
          </div>
          <div style={{ marginTop: 12, fontSize: 13.5, color: "#b0b5c0" }}>
            {article.date}
          </div>
        </div>
      ))}
    </div>
  </Interactive.Div>
);

/* ---- Updates -------------------------------------------------------- */

const UPDATE_IMAGE_HEIGHT = 180;
const UPDATE_BODY_HEIGHT = 128;

/** Centre of a release card in Updates. */
export const updateCardCentre = (index: number, frameWidth: number) => ({
  x: panelLeft(frameWidth) + WIDGET_WIDTH / 2,
  y:
    BODY_TOP_PLAIN +
    PADDING +
    index * (UPDATE_IMAGE_HEIGHT + UPDATE_BODY_HEIGHT + 16) +
    (UPDATE_IMAGE_HEIGHT + UPDATE_BODY_HEIGHT) / 2,
});

const typeTint = (label: string) =>
  ENTRY_TYPES.find((type) => type.label === label)?.tint ?? "#2f6fdb";

const TypePill: React.FC<{ type: string; small?: boolean }> = ({
  type,
  small,
}) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      height: small ? 28 : 32,
      borderRadius: 999,
      backgroundColor: `${typeTint(type)}1f`,
      color: typeTint(type),
      padding: small ? "0 12px" : "0 14px",
      fontSize: small ? 13.5 : 15,
      fontWeight: 600,
    }}
  >
    <IconFlame size={small ? 12 : 14} />
    {type}
  </span>
);

export const WidgetUpdatesView: React.FC<
  PartProps & {
    releases: { title: string; when: string; type: string }[];
    imageBackground?: string;
    cardStyle?: (index: number) => React.CSSProperties;
  }
> = ({ style, releases, imageBackground, cardStyle }) => (
  <Interactive.Div
    name="Widget updates"
    style={{ flex: 1, minHeight: 0, padding: PADDING, ...style }}
  >
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {releases.map((release, index) => (
        <div
          key={release.title}
          style={{
            borderRadius: 14,
            overflow: "hidden",
            backgroundColor: "#ffffff",
            boxShadow: "0 2px 12px rgba(24, 28, 45, 0.06)",
            ...cardStyle?.(index),
          }}
        >
          <div
            style={{
              height: UPDATE_IMAGE_HEIGHT,
              background: imageBackground,
            }}
          />
          <div
            style={{
              height: UPDATE_BODY_HEIGHT,
              padding: 18,
              boxSizing: "border-box",
            }}
          >
            <div style={{ fontSize: 17, fontWeight: 700, color: "#1f232e" }}>
              {release.title}
            </div>
            <div style={{ marginTop: 5, fontSize: 14.5, color: "#9aa0ad" }}>
              {release.when}
            </div>
            <div style={{ marginTop: 12 }}>
              <TypePill type={release.type} small />
            </div>
          </div>
        </div>
      ))}
    </div>
  </Interactive.Div>
);

/* ---- The expanded reader -------------------------------------------- */

const READER_PADDING = 32;
const READER_IMAGE_HEIGHT = 446;

/**
 * An article or a release, read inside the widget.
 *
 * Both take the panel's expanded shape, because reading is the one thing the
 * widget is too narrow for. `scroll` moves the body under the fixed header.
 */
export const WidgetReaderView: React.FC<
  PartProps & {
    title: string;
    meta: string;
    /** Centred under the title, the way a release writes it. */
    metaCentred?: boolean;
    imageBackground?: string;
    blocks?: ArticleBlock[];
    /** A release lists its entries instead of a body. */
    entries?: ChangelogEntry[];
    entriesHeading?: string;
    scroll?: number;
  }
> = ({
  style,
  title,
  meta,
  metaCentred,
  imageBackground,
  blocks,
  entries,
  entriesHeading = "What's New",
  scroll = 0,
}) => (
  <Interactive.Div
    name="Widget reader"
    style={{
      flex: 1,
      minHeight: 0,
      backgroundColor: "#ffffff",
      overflow: "hidden",
      position: "relative",
      ...style,
    }}
  >
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        padding: `${READER_PADDING - 6}px ${READER_PADDING}px ${READER_PADDING}px`,
        boxSizing: "border-box",
        translate: `0px ${-scroll}px`,
      }}
    >
      <div
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: "#1f232e",
          textAlign: metaCentred ? "center" : "left",
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 8,
          fontSize: 14.5,
          color: "#9aa0ad",
          textAlign: metaCentred ? "center" : "left",
        }}
      >
        {meta}
      </div>

      <div
        style={{
          marginTop: 20,
          height: READER_IMAGE_HEIGHT,
          borderRadius: 10,
          background: imageBackground,
        }}
      />

      {blocks ? (
        <ArticleBody
          blocks={blocks}
          scale={0.92}
          style={{ marginTop: 28 }}
        />
      ) : null}

      {entries ? (
        <>
          <div
            style={{
              marginTop: 26,
              fontSize: 19,
              fontWeight: 700,
              color: "#1f232e",
            }}
          >
            {entriesHeading}
          </div>
          <div
            style={{
              marginTop: 16,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {entries.map((entry, index) => (
              <div
                key={index}
                style={{
                  borderRadius: 12,
                  border: "1.3px solid #eef0f6",
                  padding: 20,
                  boxSizing: "border-box",
                }}
              >
                <TypePill type={entry.type} />
                <div
                  style={{
                    marginTop: 14,
                    fontSize: 16.5,
                    lineHeight: 1.6,
                    color: "#3d4353",
                  }}
                >
                  {entry.body}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  </Interactive.Div>
);

/** The credit sits on the panel floor in the expanded views. */
export const WidgetReaderCredit: React.FC<PartProps> = ({ style }) => (
  <FeedbackWidgetCredit
    style={{
      height: WIDGET_CREDIT_HEIGHT,
      backgroundColor: "#ffffff",
      borderTop: "1px solid #f0f0f5",
      ...style,
    }}
  />
);

export {
  BODY_TOP_PLAIN as WIDGET_BODY_TOP,
  WIDGET_HEIGHT as WIDGET_PANEL_HEIGHT,
  WIDGET_NAV_HEIGHT as WIDGET_PANEL_NAV,
};
