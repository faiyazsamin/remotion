import {
  AbsoluteFill,
  Composition,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import {
  AcmeSite,
  ARTICLE_BLOCKS,
  ARTICLE_DATE,
  ARTICLE_TITLE,
  Cursor,
  FeedbackWidget,
  FeedbackWidgetHeader,
  FeedbackWidgetNav,
  FeedbackWidgetToggle,
  FeedbackWidgetCredit,
  FPS,
  HELP_TOPIC,
  homeActionCentre,
  helpTopicCentre,
  MEDIA_PLACEHOLDERS,
  RELEASE_ENTRIES,
  RELEASE_PUBLISH_DATE_LONG,
  RELEASE_TITLE,
  SITE_HEIGHT,
  SITE_WIDTH,
  SupportToast,
  toggleCentre,
  topicArticleCentre,
  updateCardCentre,
  WIDGET_EXPANDED_HEIGHT,
  WIDGET_EXPANDED_TOP,
  WIDGET_EXPANDED_WIDTH,
  WIDGET_HEIGHT,
  WIDGET_RIGHT,
  WIDGET_TOP,
  WIDGET_WIDTH,
  widgetBackCentre,
  widgetCloseCentre,
  widgetTabCentre,
  WidgetHelpView,
  WidgetHomeView,
  WidgetMessagesView,
  WidgetReaderCredit,
  WidgetReaderView,
  WidgetTopicView,
  WidgetUpdatesView,
} from "./ui";

/** Long enough to read both pieces, then breathe briefly after closing. */
const SCENE_LENGTH = 1490;

export const FeatureSharkWidgetSupportSceneComposition = () => (
  <Composition
    id="FeatureSharkWidgetSupportScene"
    component={WidgetSupportScene}
    durationInFrames={SCENE_LENGTH}
    fps={FPS}
    width={SITE_WIDTH}
    height={SITE_HEIGHT}
  />
);

const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);

const arrive = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

const press = (frame: number, at: number, low: number) =>
  interpolate(frame, [at - 4, at, at + 7], [1, low, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

const pulse = (frame: number, at: number) =>
  interpolate(frame, [at, at + 10, at + 28], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

const spotlightOpacity = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, start + 12, end - 12, end], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

const Spotlight: React.FC<{
  label: string;
  opacity: number;
  rect: { x: number; y: number; width: number; height: number };
  radius?: number;
  style?: React.CSSProperties;
}> = ({ label, opacity, rect, radius = 16, style }) =>
  opacity > 0.01 ? (
    <div
      aria-label={label}
      style={{
        position: "absolute",
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height,
        borderRadius: radius,
        pointerEvents: "none",
        zIndex: 22,
        boxShadow: `0 0 0 9999px rgba(18, 14, 45, ${0.36 * opacity}), 0 0 ${
          28 * opacity
        }px rgba(255, 255, 255, ${0.18 * opacity})`,
        outline: `2px solid rgba(255, 255, 255, ${0.24 * opacity})`,
        ...style,
      }}
    />
  ) : null;

/** Beat 1 — the greeting is already out; the visitor opens the panel. */
const TOGGLE_REACH_START = 30;
const TOGGLE_REACH_END = 76;
const TOGGLE_CLICK = 84;
const OPEN = TOGGLE_CLICK + 4;
const OPEN_LENGTH = 26;

/** Beat 2 — Home, from the Messages tab the panel opens on. */
const HOME_REACH_START = OPEN + 70;
const HOME_REACH_END = OPEN + 116;
const HOME_CLICK = OPEN + 124;
const HOME = HOME_CLICK + 4;
const VIEW_LENGTH = 20;

/** Beat 3 — Browse Help Articles. */
const HELP_REACH_START = HOME + 66;
const HELP_REACH_END = HOME + 112;
const HELP_CLICK = HOME + 120;
const HELP = HELP_CLICK + 4;

/** Beat 4 — the one topic there is. */
const TOPIC_REACH_START = HELP + 62;
const TOPIC_REACH_END = HELP + 106;
const TOPIC_CLICK = HELP + 114;
const TOPIC = TOPIC_CLICK + 4;

/** Beat 5 — and the article, which opens the panel out to read it. */
const ARTICLE_REACH_START = TOPIC + 62;
const ARTICLE_REACH_END = TOPIC + 106;
const ARTICLE_CLICK = TOPIC + 114;
const ARTICLE = ARTICLE_CLICK + 4;
const EXPAND_LENGTH = 30;

/** Beat 6 — read down it. */
const ARTICLE_SCROLL_START = ARTICLE + 60;
const ARTICLE_SCROLL_END = ARTICLE_SCROLL_START + 200;
const ARTICLE_SCROLL = 1360;

/** Beat 7 — back, which shrinks the panel to the topic again. */
const BACK_REACH_START = ARTICLE_SCROLL_END + 34;
const BACK_REACH_END = ARTICLE_SCROLL_END + 78;
const BACK_CLICK = ARTICLE_SCROLL_END + 86;
const BACK = BACK_CLICK + 4;

/** Beat 8 — Updates. */
const UPDATES_REACH_START = BACK + 62;
const UPDATES_REACH_END = BACK + 106;
const UPDATES_CLICK = BACK + 114;
const UPDATES = UPDATES_CLICK + 4;

/** Beat 9 — the release, read the same way. */
const RELEASE_REACH_START = UPDATES + 62;
const RELEASE_REACH_END = UPDATES + 106;
const RELEASE_CLICK = UPDATES + 114;
const RELEASE = RELEASE_CLICK + 4;

const RELEASE_SCROLL_START = RELEASE + 60;
const RELEASE_SCROLL_END = RELEASE_SCROLL_START + 90;
/* The release is short — one screen of entries past the image, and no more. */
const RELEASE_SCROLL = 160;

/** Beat 10 — and the panel closes. */
const CLOSE_REACH_START = RELEASE_SCROLL_END + 34;
const CLOSE_REACH_END = RELEASE_SCROLL_END + 78;
const CLOSE_CLICK = RELEASE_SCROLL_END + 86;
const CLOSED = CLOSE_CLICK + 4;

/** Which tab each view belongs to, for the bar's highlight. */
const TAB_MESSAGES = 1;
const TAB_HOME = 0;
const TAB_HELP = 2;
const TAB_UPDATES = 3;

const TOGGLE = toggleCentre(SITE_WIDTH, SITE_HEIGHT);
const TAB_HOME_POINT = widgetTabCentre(TAB_HOME, SITE_WIDTH);
const TAB_UPDATES_POINT = widgetTabCentre(TAB_UPDATES, SITE_WIDTH);
const BROWSE_HELP = homeActionCentre(1, SITE_WIDTH);
const TOPIC_ROW = helpTopicCentre(0, SITE_WIDTH);
const ARTICLE_CARD = topicArticleCentre(0, SITE_WIDTH);
const UPDATE_CARD = updateCardCentre(0, SITE_WIDTH);

/*
  Both header controls are aimed at while the panel is expanded — the article is
  left through its back arrow, and the release through its close.
*/
const EXPANDED_BACK = widgetBackCentre(SITE_WIDTH, { expanded: true });
const PANEL_CLOSE = widgetCloseCentre(SITE_WIDTH, { expanded: true });

const CURSOR_FROM = { x: SITE_WIDTH + 130, y: SITE_HEIGHT + 120 };

const CURSOR_TIMES = [
  TOGGLE_REACH_START,
  TOGGLE_REACH_END,
  HOME_REACH_START,
  HOME_REACH_END,
  HELP_REACH_START,
  HELP_REACH_END,
  TOPIC_REACH_START,
  TOPIC_REACH_END,
  ARTICLE_REACH_START,
  ARTICLE_REACH_END,
  BACK_REACH_START,
  BACK_REACH_END,
  UPDATES_REACH_START,
  UPDATES_REACH_END,
  RELEASE_REACH_START,
  RELEASE_REACH_END,
  CLOSE_REACH_START,
  CLOSE_REACH_END,
];
const CURSOR_X = [
  CURSOR_FROM.x,
  TOGGLE.x,
  TOGGLE.x,
  TAB_HOME_POINT.x,
  TAB_HOME_POINT.x,
  BROWSE_HELP.x,
  BROWSE_HELP.x,
  TOPIC_ROW.x,
  TOPIC_ROW.x,
  ARTICLE_CARD.x,
  ARTICLE_CARD.x,
  EXPANDED_BACK.x,
  EXPANDED_BACK.x,
  TAB_UPDATES_POINT.x,
  TAB_UPDATES_POINT.x,
  UPDATE_CARD.x,
  UPDATE_CARD.x,
  PANEL_CLOSE.x,
];
const CURSOR_Y = [
  CURSOR_FROM.y,
  TOGGLE.y,
  TOGGLE.y,
  TAB_HOME_POINT.y,
  TAB_HOME_POINT.y,
  BROWSE_HELP.y,
  BROWSE_HELP.y,
  TOPIC_ROW.y,
  TOPIC_ROW.y,
  ARTICLE_CARD.y,
  ARTICLE_CARD.y,
  EXPANDED_BACK.y,
  EXPANDED_BACK.y,
  TAB_UPDATES_POINT.y,
  TAB_UPDATES_POINT.y,
  UPDATE_CARD.y,
  UPDATE_CARD.y,
  PANEL_CLOSE.y,
];
const CURSOR_EASINGS = CURSOR_TIMES.slice(1).map(() => EASE_OUT);

/** The article as the widget lists it: title, a taste of the body, its date. */
const TOPIC_ARTICLES = [
  {
    title: ARTICLE_TITLE,
    excerpt: `${ARTICLE_BLOCKS[0].text}${ARTICLE_BLOCKS[1].text}`.replace(
      /\*\*|`/g,
      "",
    ),
    date: ARTICLE_DATE,
  },
];

const RELEASES = [
  { title: RELEASE_TITLE, when: "Yesterday", type: RELEASE_ENTRIES[0].type },
];

/**
 * Scene: everything the widget can do that is not sending feedback.
 *
 * The same panel the visitor sent a request through, used the other way round —
 * to read. Home offers the four ways in; Help and Updates each lead to something
 * worth reading, and reading is the one thing the panel is too narrow for, so it
 * opens out to twice its width and shrinks back on the way out. Every view lives
 * in the one shell, so only its contents change between beats.
 */
export const WidgetSupportScene: React.FC = () => {
  const frame = useCurrentFrame();

  const open = arrive(frame, OPEN, OPEN + OPEN_LENGTH);
  const closed = arrive(frame, CLOSED, CLOSED + OPEN_LENGTH);

  /* Which view is up. Later beats win, so this reads in story order. */
  const reading =
    (frame >= ARTICLE && frame < BACK) || frame >= RELEASE;
  const view =
    frame >= RELEASE
      ? "release"
      : frame >= UPDATES
        ? "updates"
        : frame >= BACK
          ? "topic"
          : frame >= ARTICLE
            ? "article"
            : frame >= TOPIC
              ? "topic"
              : frame >= HELP
                ? "help"
                : frame >= HOME
                  ? "home"
                  : "messages";

  const tab =
    view === "messages"
      ? TAB_MESSAGES
      : view === "home"
        ? TAB_HOME
        : view === "updates" || view === "release"
          ? TAB_UPDATES
          : TAB_HELP;

  /* The panel opens out to read and comes back in on the way out. */
  const expand = reading
    ? frame >= RELEASE
      ? arrive(frame, RELEASE, RELEASE + EXPAND_LENGTH)
      : arrive(frame, ARTICLE, ARTICLE + EXPAND_LENGTH)
    : frame >= BACK && frame < UPDATES
      ? 1 - arrive(frame, BACK, BACK + EXPAND_LENGTH)
      : 0;

  const width = interpolate(expand, [0, 1], [WIDGET_WIDTH, WIDGET_EXPANDED_WIDTH]);
  const height = interpolate(
    expand,
    [0, 1],
    [WIDGET_HEIGHT, WIDGET_EXPANDED_HEIGHT],
  );
  const top = interpolate(expand, [0, 1], [WIDGET_TOP, WIDGET_EXPANDED_TOP]);
  const widgetRect = {
    x: SITE_WIDTH - WIDGET_RIGHT - width,
    y: top,
    width,
    height,
  };

  /* Each view fades in on its own under the header, which never re-mounts. */
  const viewIn = arrive(
    frame,
    frame >= RELEASE
      ? RELEASE
      : frame >= UPDATES
        ? UPDATES
        : frame >= BACK
          ? BACK
          : frame >= ARTICLE
            ? ARTICLE
            : frame >= TOPIC
              ? TOPIC
              : frame >= HELP
                ? HELP
                : frame >= HOME
                  ? HOME
                  : OPEN,
    (frame >= RELEASE
      ? RELEASE
      : frame >= UPDATES
        ? UPDATES
        : frame >= BACK
          ? BACK
          : frame >= ARTICLE
            ? ARTICLE
            : frame >= TOPIC
              ? TOPIC
              : frame >= HELP
                ? HELP
                : frame >= HOME
                  ? HOME
                  : OPEN) + VIEW_LENGTH,
  );

  const header =
    view === "article"
      ? { title: ARTICLE_TITLE, back: true, minimize: true }
      : view === "release"
        ? { title: RELEASE_TITLE, back: true, minimize: true }
        : view === "topic"
          ? { title: HELP_TOPIC, back: true }
          : view === "help"
            ? { title: "Help", search: true }
            : view === "home"
              ? { title: "Home" }
              : { title: "Messages" };
  const widgetFocus = spotlightOpacity(
    frame,
    OPEN,
    CLOSED + OPEN_LENGTH - 4,
  );
  const hostDepth = widgetFocus;
  const togglePop = pulse(frame, TOGGLE_CLICK);
  const homePop = pulse(frame, HOME_CLICK);
  const helpPop = pulse(frame, HELP_CLICK);
  const topicPop = pulse(frame, TOPIC_CLICK);
  const articlePop = pulse(frame, ARTICLE_CLICK);
  const updatesPop = pulse(frame, UPDATES_CLICK);
  const releasePop = pulse(frame, RELEASE_CLICK);

  return (
    <AbsoluteFill name="Widget support scene" style={{ backgroundColor: "#ffffff" }}>
      <AcmeSite
        style={{
          scale: 1 - hostDepth * 0.006,
          filter: `blur(${hostDepth * 1.4}px)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: `rgba(10, 8, 24, ${hostDepth * 0.14})`,
          pointerEvents: "none",
        }}
      />

      {/* The greeting that was already waiting, gone once the panel is open. */}
      {frame < OPEN + OPEN_LENGTH ? (
        <SupportToast
          style={{
            opacity: 1 - open,
            scale: interpolate(open, [0, 1], [1, 0.96]),
          }}
        />
      ) : null}

      {frame >= OPEN && frame < CLOSED + OPEN_LENGTH ? (
        <FeedbackWidget
          style={{
            width,
            height,
            top,
            opacity: open - closed,
            scale:
              interpolate(open, [0, 1], [0.94, 1]) *
              interpolate(closed, [0, 1], [1, 0.94]),
            display: "flex",
            flexDirection: "column",
            /* White behind the reader, the panel's own grey behind the lists. */
            backgroundColor: reading ? "#ffffff" : "#f7f8fa",
          }}
        >
          <FeedbackWidgetHeader
            title={header.title}
            back={header.back}
            search={header.search}
            minimize={header.minimize}
            searchPlaceholder="Search help articles..."
          />

          {view === "messages" ? (
            <WidgetMessagesView style={{ opacity: viewIn }} />
          ) : null}

          {view === "home" ? (
            <WidgetHomeView
              style={{ opacity: viewIn }}
              actionStyle={(index) =>
                index === 1
                  ? {
                      backgroundColor: `rgba(244, 244, 248, ${
                        arrive(frame, HELP_REACH_END - 12, HELP_CLICK)
                      })`,
                      scale: press(frame, HELP_CLICK, 0.98) * (1 + helpPop * 0.035),
                      boxShadow: `0 ${6 * helpPop}px ${18 * helpPop}px rgba(92, 69, 223, ${
                        0.16 * helpPop
                      })`,
                    }
                  : {}
              }
            />
          ) : null}

          {view === "help" ? (
            <WidgetHelpView
              style={{ opacity: viewIn }}
              topics={[{ title: HELP_TOPIC, count: 1 }]}
              topicStyle={() => ({
                backgroundColor: `rgba(247, 247, 251, ${
                  arrive(frame, TOPIC_REACH_END - 10, TOPIC_CLICK) * 0.9
                })`,
                scale: press(frame, TOPIC_CLICK, 0.99) * (1 + topicPop * 0.025),
              })}
            />
          ) : null}

          {view === "topic" ? (
            <WidgetTopicView
              style={{ opacity: viewIn }}
              topic={HELP_TOPIC}
              articles={TOPIC_ARTICLES}
              articleStyle={() => ({
                scale: press(frame, ARTICLE_CLICK, 0.98) * (1 + articlePop * 0.035),
                boxShadow: `0 ${6 + articlePop * 8}px ${18 + articlePop * 18}px rgba(24, 28, 45, ${
                  0.08 + articlePop * 0.08
                })`,
              })}
            />
          ) : null}

          {view === "updates" ? (
            <WidgetUpdatesView
              style={{ opacity: viewIn }}
              releases={RELEASES}
              imageBackground={MEDIA_PLACEHOLDERS[0]}
              cardStyle={() => ({
                scale: press(frame, RELEASE_CLICK, 0.98) * (1 + releasePop * 0.035),
                boxShadow: `0 ${6 + releasePop * 8}px ${18 + releasePop * 18}px rgba(24, 28, 45, ${
                  0.08 + releasePop * 0.08
                })`,
              })}
            />
          ) : null}

          {view === "article" ? (
            <WidgetReaderView
              style={{ opacity: viewIn }}
              title={ARTICLE_TITLE}
              meta={ARTICLE_DATE}
              imageBackground={MEDIA_PLACEHOLDERS[1]}
              blocks={ARTICLE_BLOCKS}
              scroll={
                arrive(frame, ARTICLE_SCROLL_START, ARTICLE_SCROLL_END) *
                ARTICLE_SCROLL
              }
            />
          ) : null}

          {view === "release" ? (
            <WidgetReaderView
              style={{ opacity: viewIn }}
              title={RELEASE_TITLE}
              meta={`${RELEASE_PUBLISH_DATE_LONG} · 3 views · by Changelog Writer`}
              metaCentred
              imageBackground={MEDIA_PLACEHOLDERS[0]}
              entries={RELEASE_ENTRIES}
              scroll={
                arrive(frame, RELEASE_SCROLL_START, RELEASE_SCROLL_END) *
                RELEASE_SCROLL
              }
            />
          ) : null}

          {/* The reader stands on the credit; the lists sit above the tabs. */}
          {reading ? (
            <WidgetReaderCredit />
          ) : (
            <>
              <FeedbackWidgetCredit />
              <FeedbackWidgetNav
                activeIndex={tab}
                tabStyle={(index) =>
                  index === TAB_HOME
                    ? {
                        scale: press(frame, HOME_CLICK, 0.96) * (1 + homePop * 0.04),
                        boxShadow: `0 ${5 * homePop}px ${14 * homePop}px rgba(92, 69, 223, ${
                          0.16 * homePop
                        })`,
                      }
                    : index === TAB_UPDATES
                      ? {
                          scale:
                            press(frame, UPDATES_CLICK, 0.96) *
                            (1 + updatesPop * 0.04),
                          boxShadow: `0 ${5 * updatesPop}px ${14 * updatesPop}px rgba(92, 69, 223, ${
                            0.16 * updatesPop
                          })`,
                        }
                      : {}
                }
              />
            </>
          )}
        </FeedbackWidget>
      ) : null}

      <FeedbackWidgetToggle
        chevronStyle={{
          rotate: frame >= OPEN && frame < CLOSED ? "0deg" : "180deg",
        }}
        style={{
          scale: press(frame, TOGGLE_CLICK, 0.92) * (1 + togglePop * 0.08),
          boxShadow: `0 ${8 + togglePop * 8}px ${24 + togglePop * 18}px rgba(70, 50, 190, ${
            0.34 + togglePop * 0.16
          })`,
        }}
      />

      <Spotlight
        label="Focus support widget"
        opacity={widgetFocus}
        rect={widgetRect}
        radius={18}
      />

      <Cursor
        x={interpolate(frame, CURSOR_TIMES, CURSOR_X, {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: CURSOR_EASINGS,
        })}
        y={interpolate(frame, CURSOR_TIMES, CURSOR_Y, {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: CURSOR_EASINGS,
        })}
        hand={frame >= HOME_REACH_START}
        style={{
          zIndex: 30,
          scale:
            press(frame, TOGGLE_CLICK, 0.88) *
            press(frame, HOME_CLICK, 0.88) *
            press(frame, HELP_CLICK, 0.88) *
            press(frame, TOPIC_CLICK, 0.88) *
            press(frame, ARTICLE_CLICK, 0.88) *
            press(frame, BACK_CLICK, 0.88) *
            press(frame, UPDATES_CLICK, 0.88) *
            press(frame, RELEASE_CLICK, 0.88) *
            press(frame, CLOSE_CLICK, 0.88),
        }}
      />
    </AbsoluteFill>
  );
};
