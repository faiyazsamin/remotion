import {
  AbsoluteFill,
  Composition,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import {
  actionMenuItemCentre,
  actionsCentre,
  ARTICLE_BLOCKS,
  ARTICLE_DATE,
  ARTICLE_TITLE,
  ARTICLE_URL,
  ARTICLE_VIEWS,
  ArticleWizard,
  ChangelogBoard,
  Cursor,
  FPS,
  HELP_RAIL_ACTIVE,
  HELP_TOPIC,
  HelpCenterBoard,
  MEDIA_PLACEHOLDERS,
  newArticleCentre,
  HELPFUL_YES_FROM_BOTTOM,
  HELPFUL_YES_FROM_LEFT,
  HelpArticleEditor,
  PUBLISH_ACTION,
  PublicHelpArticle,
  railSlotCentre,
  RELEASE_ENTRIES,
  RELEASE_PUBLISH_DATE,
  RELEASE_TITLE,
  SITE_HEIGHT,
  SITE_WIDTH,
  ToastStack,
  wizardPrimaryCentre,
  wizardPublishCentre,
  type Release,
} from "./ui";

/** Long enough to hold on the published page, and no longer. */
const SCENE_LENGTH = 2220;

export const FeatureSharkHelpCenterSceneComposition = () => (
  <Composition
    id="FeatureSharkHelpCenterScene"
    component={HelpCenterScene}
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

/** Beat 1 — the rail takes us from the changelog to Help Center. */
const RAIL_REACH_START = 44;
const RAIL_REACH_END = 92;
const RAIL_CLICK = 100;
const HELP = RAIL_CLICK + 4;
const HELP_LENGTH = 36;

/** Beat 2 — the empty state's one action. */
const NEW_REACH_START = HELP + 74;
const NEW_REACH_END = HELP + 122;
const NEW_CLICK = HELP + 130;
const WIZARD = NEW_CLICK + 4;
const WIZARD_LENGTH = 28;

/** Beat 3 — the title is typed on the Info step. */
const TITLE_START = WIZARD + 34;
const TITLE_LENGTH = ARTICLE_TITLE.length * 3;
const TITLE_END = TITLE_START + TITLE_LENGTH;

/** Beat 4 — on to the content step. */
const CONTENT_REACH_START = TITLE_END + 46;
const CONTENT_REACH_END = TITLE_END + 92;
const CONTENT_CLICK = TITLE_END + 100;
const CONTENT = CONTENT_CLICK + 4;
const CONTENT_LENGTH = 22;

/** Beat 5 — the article is written. */
const BODY_CHARS = ARTICLE_BLOCKS.reduce(
  (total, block) => total + block.text.length + 1,
  0,
);
const BODY_START = CONTENT + 44;
/** Nine characters a frame: fast enough to sit through, slow enough to read. */
const BODY_LENGTH = Math.round(BODY_CHARS / 9);
const BODY_END = BODY_START + BODY_LENGTH;
/**
 * How far the editor has scrolled by the end. Tuned against the render so the
 * last line sits just above the footer, which is where the caret should be.
 */
const BODY_SCROLL = 1700;

/** Beat 6 — on to the SEO step. */
const SEO_REACH_START = BODY_END + 50;
const SEO_REACH_END = BODY_END + 96;
const SEO_CLICK = BODY_END + 104;
const SEO = SEO_CLICK + 4;
const SEO_LENGTH = 22;

/** Beat 7 — Publish Now instead of a draft, which renames the action. */
const PUBLISH_REACH_START = SEO + 66;
const PUBLISH_REACH_END = SEO + 112;
const PUBLISH_CLICK = SEO + 120;
const PUBLISH_NOW_AT = PUBLISH_CLICK + 4;
const PUBLISH_LENGTH = 20;

/** Beat 8 — and the article goes out. */
const CREATE_REACH_START = PUBLISH_NOW_AT + 74;
const CREATE_REACH_END = PUBLISH_NOW_AT + 120;
const CREATE_CLICK = PUBLISH_NOW_AT + 128;
/** Publishing lands in the article's own editor, with the confirmation. */
const EDITOR = CREATE_CLICK + 6;
const EDITOR_LENGTH = 32;

/** Beat 9 — Actions, which is where the public page lives. */
const ACTIONS_REACH_START = EDITOR + 96;
const ACTIONS_REACH_END = EDITOR + 142;
const ACTIONS_CLICK = EDITOR + 150;
const MENU = ACTIONS_CLICK + 4;
const MENU_LENGTH = 16;

/** Beat 10 — View Public Page. */
const VIEW_REACH_START = MENU + 60;
const VIEW_REACH_END = MENU + 104;
const VIEW_CLICK = MENU + 112;
const PUBLIC = VIEW_CLICK + 4;
const PUBLIC_LENGTH = 34;

/** Beat 11 — and read down it, all the way to the end of the article. */
const SCROLL_START = PUBLIC + 110;
const SCROLL_END = SCROLL_START + 330;
/**
 * The whole page less one screen, so the scroll ends on the article's last line
 * rather than part-way down it. Tuned against the render.
 */
const SCROLL_DISTANCE = 2186;

/** Beat 12 — the reader says the article helped. */
const YES_REACH_START = SCROLL_END + 26;
const YES_REACH_END = SCROLL_END + 72;
const YES_CLICK = SCROLL_END + 80;
const VOTED = YES_CLICK + 4;
const VOTED_LENGTH = 18;

/** The changelog list we are leaving, exactly as the last scene left it. */
const RELEASES: Release[] = [
  {
    title: RELEASE_TITLE,
    types: RELEASE_ENTRIES.map((entry) => entry.type),
    status: "Published",
    views: 0,
    date: RELEASE_PUBLISH_DATE,
  },
];

const RAIL_HELP = railSlotCentre(HELP_RAIL_ACTIVE);
const NEW_ARTICLE = newArticleCentre(SITE_WIDTH);
/* The footer button changes width when its label does, so aim per label. */
const NEXT_CONTENT = wizardPrimaryCentre({ width: 176 });
const NEXT_SEO = wizardPrimaryCentre({ width: 148 });
const CREATE_PUBLISH = wizardPrimaryCentre({ width: 268 });
const PUBLISH_NOW = wizardPublishCentre(1);
const ACTIONS_BUTTON = actionsCentre(SITE_WIDTH);
const VIEW_PUBLIC = actionMenuItemCentre(0, SITE_WIDTH);
/*
  The Yes button, measured up from the page's bottom edge — which, once the
  scroll has run its course, is the frame's bottom edge.
*/
const HELPFUL_YES = {
  x: HELPFUL_YES_FROM_LEFT,
  y: SITE_HEIGHT - HELPFUL_YES_FROM_BOTTOM,
};

const CURSOR_FROM = { x: -140, y: SITE_HEIGHT + 130 };
/** Clear of the dialog's fields while the title types. */
const TITLE_REST = { x: 1370, y: 950 };
/** Inside the editor, where a writer's pointer would sit. */
const BODY_REST = { x: 745, y: 290 };
/** Over the article, clear of its chrome, while the editor settles. */
const EDITOR_REST = { x: 780, y: 640 };
/** Down the published page, out of the way of what is being read. */
const PUBLIC_REST = { x: 830, y: 590 };

const CURSOR_TIMES = [
  RAIL_REACH_START,
  RAIL_REACH_END,
  NEW_REACH_START,
  NEW_REACH_END,
  WIZARD + 8,
  WIZARD + 52,
  CONTENT_REACH_START,
  CONTENT_REACH_END,
  CONTENT + 8,
  CONTENT + 52,
  SEO_REACH_START,
  SEO_REACH_END,
  PUBLISH_REACH_START,
  PUBLISH_REACH_END,
  CREATE_REACH_START,
  CREATE_REACH_END,
  EDITOR + 10,
  EDITOR + 56,
  ACTIONS_REACH_START,
  ACTIONS_REACH_END,
  VIEW_REACH_START,
  VIEW_REACH_END,
  PUBLIC + 10,
  PUBLIC + 60,
  YES_REACH_START,
  YES_REACH_END,
];
const CURSOR_X = [
  CURSOR_FROM.x,
  RAIL_HELP.x,
  RAIL_HELP.x,
  NEW_ARTICLE.x,
  NEW_ARTICLE.x,
  TITLE_REST.x,
  TITLE_REST.x,
  NEXT_CONTENT.x,
  NEXT_CONTENT.x,
  BODY_REST.x,
  BODY_REST.x,
  NEXT_SEO.x,
  NEXT_SEO.x,
  PUBLISH_NOW.x,
  PUBLISH_NOW.x,
  CREATE_PUBLISH.x,
  CREATE_PUBLISH.x,
  EDITOR_REST.x,
  EDITOR_REST.x,
  ACTIONS_BUTTON.x,
  ACTIONS_BUTTON.x,
  VIEW_PUBLIC.x,
  VIEW_PUBLIC.x,
  PUBLIC_REST.x,
  PUBLIC_REST.x,
  HELPFUL_YES.x,
];
const CURSOR_Y = [
  CURSOR_FROM.y,
  RAIL_HELP.y,
  RAIL_HELP.y,
  NEW_ARTICLE.y,
  NEW_ARTICLE.y,
  TITLE_REST.y,
  TITLE_REST.y,
  NEXT_CONTENT.y,
  NEXT_CONTENT.y,
  BODY_REST.y,
  BODY_REST.y,
  NEXT_SEO.y,
  NEXT_SEO.y,
  PUBLISH_NOW.y,
  PUBLISH_NOW.y,
  CREATE_PUBLISH.y,
  CREATE_PUBLISH.y,
  EDITOR_REST.y,
  EDITOR_REST.y,
  ACTIONS_BUTTON.y,
  ACTIONS_BUTTON.y,
  VIEW_PUBLIC.y,
  VIEW_PUBLIC.y,
  PUBLIC_REST.y,
  PUBLIC_REST.y,
  HELPFUL_YES.y,
];
const CURSOR_EASINGS = CURSOR_TIMES.slice(1).map(() => EASE_OUT);

/**
 * Scene: the help article for the integration that just shipped.
 *
 * Help Center opens with nothing in it, so the empty state carries the only
 * action there is. The wizard is one dialog across three steps — header, footer
 * and step dots hold still while the body swaps, which is what makes it read as
 * progress rather than three separate dialogs. The title types, the article types
 * under a scrolling view, and the last step is the only real decision in the
 * scene: draft or publish. Still from ~frame 1500.
 */
export const HelpCenterScene: React.FC = () => {
  const frame = useCurrentFrame();

  const help = arrive(frame, HELP, HELP + HELP_LENGTH);
  const wizard = arrive(frame, WIZARD, WIZARD + WIZARD_LENGTH);

  /* Which step we are on, and how far into its arrival. */
  const step = frame >= SEO ? 2 : frame >= CONTENT ? 1 : 0;
  const stepIn =
    step === 2
      ? arrive(frame, SEO, SEO + SEO_LENGTH)
      : step === 1
        ? arrive(frame, CONTENT, CONTENT + CONTENT_LENGTH)
        : 1;

  const titleChars = Math.floor(
    interpolate(frame, [TITLE_START, TITLE_END], [0, ARTICLE_TITLE.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  const bodyChars = Math.floor(
    interpolate(frame, [BODY_START, BODY_END], [0, BODY_CHARS], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  /*
    The view follows the caret rather than the clock: it only starts moving once
    the first screenful is full, which is what an editor scrolling itself does.
  */
  const bodyScroll =
    interpolate(bodyChars, [BODY_CHARS * 0.24, BODY_CHARS], [0, BODY_SCROLL], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  const publishNow = frame >= PUBLISH_NOW_AT;
  const editor = arrive(frame, EDITOR, EDITOR + EDITOR_LENGTH);
  const onPublic = arrive(frame, PUBLIC, PUBLIC + PUBLIC_LENGTH);

  return (
    <AbsoluteFill
      name="Help Center scene"
      style={{ backgroundColor: "#3f2cc0" }}
    >
      {/* The changelog list we are leaving, until Help Center covers it. */}
      {frame < HELP + HELP_LENGTH ? (
        <AbsoluteFill name="Changelog list">
          <ChangelogBoard releases={RELEASES} />
        </AbsoluteFill>
      ) : null}

      {/*
        Help Center arrives over it. Same ground, same rail, same place — only the
        highlight moves a slot and the cards under it change.
      */}
      {frame >= HELP && frame < EDITOR + EDITOR_LENGTH ? (
        <AbsoluteFill
          name="Help Center"
          style={{
            opacity: help,
            scale: interpolate(help, [0, 1], [1.015, 1]),
            /* Pushed out of focus behind the wizard rather than hidden. */
            filter: `blur(${wizard * 5}px)`,
          }}
        >
          <HelpCenterBoard
            emptyStyle={{ opacity: arrive(frame, HELP + 14, HELP + 44) }}
            buttonStyle={{ scale: press(frame, NEW_CLICK, 0.96) }}
          />
        </AbsoluteFill>
      ) : null}

      {frame >= WIZARD && frame < EDITOR + EDITOR_LENGTH ? (
        <ArticleWizard
          step={step}
          title={ARTICLE_TITLE.slice(0, titleChars)}
          titleTyping={frame >= TITLE_START && frame < TITLE_END}
          topic={HELP_TOPIC}
          imageBackground={MEDIA_PLACEHOLDERS[1]}
          blocks={ARTICLE_BLOCKS}
          revealed={bodyChars}
          contentScroll={bodyScroll}
          publishOption={publishNow ? 1 : 0}
          primaryLabel={publishNow ? PUBLISH_ACTION : undefined}
          /* Each step's body fades in on its own, under the fixed chrome. */
          bodyStyle={{
            opacity: stepIn,
            translate: `0px ${(1 - stepIn) * 10}px`,
          }}
          optionStyle={(index) =>
            index === 1 ? { scale: press(frame, PUBLISH_CLICK, 0.985) } : {}
          }
          primaryStyle={{
            scale:
              press(frame, CONTENT_CLICK, 0.95) *
              press(frame, SEO_CLICK, 0.95) *
              press(frame, CREATE_CLICK, 0.95),
            /* Renaming itself is the visible result of choosing to publish. */
            opacity: publishNow
              ? arrive(frame, PUBLISH_NOW_AT, PUBLISH_NOW_AT + PUBLISH_LENGTH) *
                  0.4 +
                0.6
              : 1,
          }}
          scrimStyle={{ opacity: wizard - editor }}
          cardStyle={{
            opacity: wizard - editor,
            /* Hands off to the page it made rather than simply vanishing. */
            scale:
              interpolate(wizard, [0, 1], [0.965, 1]) *
              interpolate(editor, [0, 1], [1, 1.02]),
          }}
        />
      ) : null}

      {/*
        Publishing lands on the article's own page. A cut rather than a fade: the
        wizard is finished with, and this is where the article lives now.
      */}
      {frame >= EDITOR ? (
        <AbsoluteFill
          name="Article editor"
          style={{
            opacity: editor,
            scale: interpolate(editor, [0, 1], [1.015, 1]),
          }}
        >
          <HelpArticleEditor
            title={ARTICLE_TITLE}
            url={ARTICLE_URL}
            blocks={ARTICLE_BLOCKS}
            actionsOpen={frame >= MENU && frame < PUBLIC}
            menuStyle={{
              opacity: arrive(frame, MENU, MENU + 12),
              scale: interpolate(
                frame,
                [MENU, MENU + MENU_LENGTH],
                [0.96, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: EASE_OUT,
                },
              ),
            }}
            itemStyle={(index) =>
              index === 0
                ? {
                    backgroundColor: `rgba(238, 236, 251, ${
                      arrive(frame, VIEW_REACH_END - 10, VIEW_CLICK) * 0.9
                    })`,
                  }
                : {}
            }
            bodyStyle={{ opacity: arrive(frame, EDITOR + 8, EDITOR + 32) }}
          />
        </AbsoluteFill>
      ) : null}

      {/* The confirmation, which names what was just created. */}
      {frame >= EDITOR && frame < PUBLIC ? (
        <ToastStack
          toasts={[
            {
              title: "Created",
              body: ARTICLE_TITLE,
              kind: "info",
              style: {
                opacity: arrive(frame, EDITOR + 10, EDITOR + 30),
                translate: `0px ${(1 - arrive(frame, EDITOR + 10, EDITOR + 36)) * 18}px`,
              },
            },
          ]}
        />
      ) : null}

      {/*
        And the article as a reader gets it — the same blocks, on the public help
        centre, so the page cannot drift from what was written.
      */}
      {frame >= PUBLIC ? (
        <AbsoluteFill
          name="Public article"
          style={{
            opacity: onPublic,
            scale: interpolate(onPublic, [0, 1], [1.012, 1]),
          }}
        >
          <PublicHelpArticle
            title={ARTICLE_TITLE}
            topic={HELP_TOPIC}
            blocks={ARTICLE_BLOCKS}
            views={ARTICLE_VIEWS}
            published={ARTICLE_DATE}
            updated={ARTICLE_DATE}
            imageBackground={MEDIA_PLACEHOLDERS[1]}
            scroll={
              arrive(frame, SCROLL_START, SCROLL_END) * SCROLL_DISTANCE
            }
            helpful={frame >= VOTED ? "yes" : undefined}
            yesStyle={{ scale: press(frame, YES_CLICK, 0.96) }}
            thanksStyle={{
              opacity: arrive(frame, VOTED, VOTED + VOTED_LENGTH),
            }}
          />
        </AbsoluteFill>
      ) : null}

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
        hand
        style={{
          scale:
            press(frame, RAIL_CLICK, 0.88) *
            press(frame, NEW_CLICK, 0.88) *
            press(frame, CONTENT_CLICK, 0.88) *
            press(frame, SEO_CLICK, 0.88) *
            press(frame, PUBLISH_CLICK, 0.88) *
            press(frame, CREATE_CLICK, 0.88) *
            press(frame, ACTIONS_CLICK, 0.88) *
            press(frame, VIEW_CLICK, 0.88) *
            press(frame, YES_CLICK, 0.88),
        }}
      />
    </AbsoluteFill>
  );
};
