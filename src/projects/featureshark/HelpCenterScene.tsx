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
  CHANGELOG_ACCENT,
  CHANGELOG_RAIL_ACTIVE,
  Cursor,
  FPS,
  HELP_RAIL_ACTIVE,
  HELP_TOPIC,
  HelpCenterBoard,
  MEDIA_PLACEHOLDERS,
  newArticleCentre,
  newArticleRect,
  HELPFUL_CARD_RECT,
  HELPFUL_YES_FROM_BOTTOM,
  HELPFUL_YES_FROM_LEFT,
  HelpArticleEditor,
  PUBLISH_ACTION,
  PublicHelpArticle,
  MediaGalleryModal,
  railSlotCentre,
  RELEASE_ENTRIES,
  RELEASE_PUBLISH_DATE,
  RELEASE_TITLE,
  SITE_HEIGHT,
  SITE_WIDTH,
  ToastStack,
  mediaTileCentre,
  wizardPrimaryCentre,
  wizardPrimaryRect,
  wizardPublishCentre,
  type Release,
} from "./ui";
import {
  WIZARD_BODY_TOP,
  WIZARD_LEFT,
  WIZARD_WIDTH,
} from "./ui/ArticleWizard";

/** Long enough to hold on the published page, and no longer. */
const SCENE_LENGTH = 1665;

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

const pulse = (frame: number, at: number) =>
  interpolate(frame, [at, at + 10, at + 28], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

const routeContentIn = (progress: number): React.CSSProperties => ({
  opacity: progress,
  translate: `${(1 - progress) * 54}px 0px`,
  filter: `blur(${(1 - progress) * 2.4}px)`,
});

const routeContentOut = (progress: number): React.CSSProperties => ({
  opacity: 1 - progress * 0.42,
  translate: `${progress * -34}px 0px`,
  filter: `blur(${progress * 2}px)`,
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
}> = ({ label, opacity, rect, radius = 18, style }) =>
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
        boxShadow: `0 0 0 9999px rgba(18, 14, 45, ${0.4 * opacity}), 0 0 ${
          30 * opacity
        }px rgba(255, 255, 255, ${0.16 * opacity})`,
        outline: `2px solid rgba(255, 255, 255, ${0.22 * opacity})`,
        ...style,
      }}
    />
  ) : null;

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
const TITLE_LENGTH = Math.round(ARTICLE_TITLE.length * 1.55);
const TITLE_END = TITLE_START + TITLE_LENGTH;

const IMAGE_REACH_START = TITLE_END + 18;
const IMAGE_REACH_END = TITLE_END + 52;
const IMAGE_CLICK = TITLE_END + 60;
const GALLERY = IMAGE_CLICK + 4;
const GALLERY_LENGTH = 24;
const TILE_REACH_START = GALLERY + 44;
const TILE_REACH_END = GALLERY + 78;
const TILE_CLICK = GALLERY + 86;
const IMAGE_PICKED = TILE_CLICK + 4;
const IMAGE_PICKED_LENGTH = 22;

/** Beat 4 — on to the content step. */
const CONTENT_REACH_START = IMAGE_PICKED + 22;
const CONTENT_REACH_END = IMAGE_PICKED + 54;
const CONTENT_CLICK = IMAGE_PICKED + 62;
const CONTENT = CONTENT_CLICK + 4;
const CONTENT_LENGTH = 22;

/** Beat 5 — the article is written. */
const BODY_CHARS = ARTICLE_BLOCKS.reduce(
  (total, block) => total + block.text.length + 1,
  0,
);
const BODY_START = CONTENT + 30;
/** About 2.6 seconds: a fast generated draft, not manual typing. */
const BODY_LENGTH = Math.round(FPS * 2.6);
const BODY_END = BODY_START + BODY_LENGTH;
/**
 * Final editor scroll. Keep it below the document's absolute end so the last
 * typed line lands near the lower edge of the write box, like a real editor
 * tracking the caret.
 */
const BODY_SCROLL = 1500;

/** Beat 6 — on to the SEO step. */
const SEO_REACH_START = BODY_END + 32;
const SEO_REACH_END = BODY_END + 66;
const SEO_CLICK = BODY_END + 74;
const SEO = SEO_CLICK + 4;
const SEO_LENGTH = 22;

/** Beat 7 — Publish Now instead of a draft, which renames the action. */
const PUBLISH_REACH_START = SEO + 34;
const PUBLISH_REACH_END = SEO + 66;
const PUBLISH_CLICK = SEO + 74;
const PUBLISH_NOW_AT = PUBLISH_CLICK + 4;
const PUBLISH_LENGTH = 20;

/** Beat 8 — and the article goes out. */
const CREATE_REACH_START = PUBLISH_NOW_AT + 34;
const CREATE_REACH_END = PUBLISH_NOW_AT + 66;
const CREATE_CLICK = PUBLISH_NOW_AT + 74;
/** Publishing lands in the article's own editor, with the confirmation. */
const EDITOR = CREATE_CLICK + 6;
const EDITOR_LENGTH = 32;

/** Beat 9 — Actions, which is where the public page lives. */
const ACTIONS_REACH_START = EDITOR + 56;
const ACTIONS_REACH_END = EDITOR + 90;
const ACTIONS_CLICK = EDITOR + 98;
const MENU = ACTIONS_CLICK + 4;
const MENU_LENGTH = 16;

/** Beat 10 — View Public Page. */
const VIEW_REACH_START = MENU + 30;
const VIEW_REACH_END = MENU + 62;
const VIEW_CLICK = MENU + 70;
const PUBLIC = VIEW_CLICK + 4;
const PUBLIC_LENGTH = 34;

/** Beat 11 — and read down it, all the way to the end of the article. */
const SCROLL_START = PUBLIC + 56;
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
const NEW_ARTICLE_RECT = newArticleRect(SITE_WIDTH);
const CREATE_PUBLISH_WIDTH = 268;
/* The footer button changes width when its label does, so aim per label. */
const NEXT_CONTENT = wizardPrimaryCentre({ width: 176 });
const NEXT_SEO = wizardPrimaryCentre({ width: 148 });
const CREATE_PUBLISH = wizardPrimaryCentre({ width: CREATE_PUBLISH_WIDTH });
const PUBLISH_NOW = wizardPublishCentre(1);
const ACTIONS_BUTTON = actionsCentre(SITE_WIDTH);
const VIEW_PUBLIC = actionMenuItemCentre(0, SITE_WIDTH);
const WIZARD_IMAGE_RECT = {
  x: WIZARD_LEFT + 30,
  y: WIZARD_BODY_TOP + 300,
  width: WIZARD_WIDTH - 60,
  height: 262,
};
const WIZARD_IMAGE = {
  x: WIZARD_IMAGE_RECT.x + WIZARD_IMAGE_RECT.width / 2,
  y: WIZARD_IMAGE_RECT.y + WIZARD_IMAGE_RECT.height / 2,
};
const MEDIA_TILE = mediaTileCentre(1);
const MEDIA_TILE_SIZE = 347;
const MEDIA_TILE_RECT = {
  x: MEDIA_TILE.x - MEDIA_TILE_SIZE / 2,
  y: MEDIA_TILE.y - MEDIA_TILE_SIZE / 2,
  width: MEDIA_TILE_SIZE,
  height: MEDIA_TILE_SIZE,
};
const PUBLISH_NOW_RECT = {
  x: WIZARD_LEFT + 30,
  y: PUBLISH_NOW.y - 41,
  width: WIZARD_WIDTH - 60,
  height: 82,
};
const CREATE_PUBLISH_RECT = wizardPrimaryRect({ width: CREATE_PUBLISH_WIDTH });
const ACTIONS_MENU_ITEM_RECT = {
  x: VIEW_PUBLIC.x - 118,
  y: VIEW_PUBLIC.y - 26,
  width: 236,
  height: 52,
};
/*
  The Yes button, measured up from the page's bottom edge — which, once the
  scroll has run its course, is the frame's bottom edge.
*/
const HELPFUL_YES = {
  x: HELPFUL_YES_FROM_LEFT,
  y: SITE_HEIGHT - HELPFUL_YES_FROM_BOTTOM,
};

const CURSOR_FROM = { x: -140, y: SITE_HEIGHT + 130 };
const CURSOR_TIMES = [
  RAIL_REACH_START,
  RAIL_REACH_END,
  NEW_REACH_START,
  NEW_REACH_END,
  IMAGE_REACH_START,
  IMAGE_REACH_END,
  GALLERY + 6,
  GALLERY + 34,
  TILE_REACH_START,
  TILE_REACH_END,
  CONTENT_REACH_START,
  CONTENT_REACH_END,
  SEO_REACH_START,
  SEO_REACH_END,
  PUBLISH_REACH_START,
  PUBLISH_REACH_END,
  CREATE_REACH_START,
  CREATE_REACH_END,
  ACTIONS_REACH_START,
  ACTIONS_REACH_END,
  VIEW_REACH_START,
  VIEW_REACH_END,
  YES_REACH_START,
  YES_REACH_END,
];
const CURSOR_X = [
  CURSOR_FROM.x,
  RAIL_HELP.x,
  RAIL_HELP.x,
  NEW_ARTICLE.x,
  NEW_ARTICLE.x,
  WIZARD_IMAGE.x,
  WIZARD_IMAGE.x,
  MEDIA_TILE.x,
  MEDIA_TILE.x,
  MEDIA_TILE.x,
  MEDIA_TILE.x,
  NEXT_CONTENT.x,
  NEXT_CONTENT.x,
  NEXT_SEO.x,
  NEXT_SEO.x,
  PUBLISH_NOW.x,
  PUBLISH_NOW.x,
  CREATE_PUBLISH.x,
  CREATE_PUBLISH.x,
  ACTIONS_BUTTON.x,
  ACTIONS_BUTTON.x,
  VIEW_PUBLIC.x,
  VIEW_PUBLIC.x,
  HELPFUL_YES.x,
];
const CURSOR_Y = [
  CURSOR_FROM.y,
  RAIL_HELP.y,
  RAIL_HELP.y,
  NEW_ARTICLE.y,
  NEW_ARTICLE.y,
  WIZARD_IMAGE.y,
  WIZARD_IMAGE.y,
  MEDIA_TILE.y,
  MEDIA_TILE.y,
  MEDIA_TILE.y,
  MEDIA_TILE.y,
  NEXT_CONTENT.y,
  NEXT_CONTENT.y,
  NEXT_SEO.y,
  NEXT_SEO.y,
  PUBLISH_NOW.y,
  PUBLISH_NOW.y,
  CREATE_PUBLISH.y,
  CREATE_PUBLISH.y,
  ACTIONS_BUTTON.y,
  ACTIONS_BUTTON.y,
  VIEW_PUBLIC.y,
  VIEW_PUBLIC.y,
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
  const hasImage = frame >= IMAGE_PICKED;
  const imageChosen = arrive(frame, IMAGE_PICKED, IMAGE_PICKED + IMAGE_PICKED_LENGTH);
  const imagePop = pulse(frame, IMAGE_PICKED + 6);
  const gallery = arrive(frame, GALLERY, GALLERY + GALLERY_LENGTH);
  const galleryOut = arrive(frame, IMAGE_PICKED, IMAGE_PICKED + IMAGE_PICKED_LENGTH);

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
  const newFocus = spotlightOpacity(frame, NEW_REACH_START + 4, NEW_CLICK + 16);
  const galleryTileFocus = spotlightOpacity(frame, TILE_REACH_START + 4, TILE_CLICK + 16);
  const publishFocus = spotlightOpacity(frame, PUBLISH_REACH_START + 4, PUBLISH_CLICK + 16);
  const createFocus = spotlightOpacity(frame, CREATE_REACH_START + 4, CREATE_CLICK + 16);
  const viewPublicFocus = spotlightOpacity(frame, VIEW_REACH_START + 4, VIEW_CLICK + 16);
  const helpfulFocus = spotlightOpacity(frame, YES_REACH_START + 4, YES_CLICK + 18);
  const newPop = pulse(frame, NEW_CLICK);
  const publishPop = pulse(frame, PUBLISH_CLICK);
  const createPop = pulse(frame, CREATE_CLICK);
  const viewPublicPop = pulse(frame, VIEW_REACH_END - 8);
  const helpfulPop = pulse(frame, YES_CLICK);
  const primaryWidth =
    step === 0 ? 176 : step === 1 ? 148 : publishNow ? CREATE_PUBLISH_WIDTH : 168;

  return (
    <AbsoluteFill
      name="Help Center scene"
      style={{ backgroundColor: "#3f2cc0" }}
    >
      {/* The changelog list we are leaving, until Help Center covers it. */}
      {frame < HELP + HELP_LENGTH ? (
        <AbsoluteFill name="Changelog list">
          <ChangelogBoard
            releases={RELEASES}
            panelStyle={routeContentOut(help)}
            contentStyle={routeContentOut(help)}
            railActiveIndicatorOpacity={1 - help}
          />
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
            /* Pushed out of focus behind the wizard rather than hidden. */
            filter: `blur(${wizard * 5}px)`,
          }}
        >
          <HelpCenterBoard
            emptyStyle={{ opacity: arrive(frame, HELP + 14, HELP + 44) }}
            railPreviousActiveIndex={CHANGELOG_RAIL_ACTIVE}
            railPreviousAccent={CHANGELOG_ACCENT}
            railActiveProgress={help}
            railActiveIndicatorOpacity={1}
            panelStyle={routeContentIn(help)}
            contentStyle={routeContentIn(help)}
            buttonStyle={{
              scale: press(frame, NEW_CLICK, 0.96) * (1 + newPop * 0.05),
              boxShadow: `0 ${14 + newPop * 8}px ${30 + newPop * 20}px rgba(92, 69, 223, ${
                0.32 + newPop * 0.16
              })`,
            }}
          />
        </AbsoluteFill>
      ) : null}

      {frame >= WIZARD && frame < EDITOR + EDITOR_LENGTH ? (
        <ArticleWizard
          step={step}
          title={ARTICLE_TITLE.slice(0, titleChars)}
          titleTyping={frame >= TITLE_START && frame < TITLE_END}
          topic={HELP_TOPIC}
          hasImage={hasImage}
          imageBackground={MEDIA_PLACEHOLDERS[1]}
          imageStyle={{
            opacity: imageChosen,
            scale:
              interpolate(imageChosen, [0, 1], [0.985, 1]) *
              (1 + imagePop * 0.018),
            boxShadow: `0 ${10 * imageChosen}px ${30 * imageChosen}px rgba(14, 165, 233, ${
              0.16 * imageChosen
            })`,
          }}
          blocks={ARTICLE_BLOCKS}
          revealed={bodyChars}
          contentScroll={bodyScroll}
          publishOption={publishNow ? 1 : 0}
          primaryLabel={publishNow ? PUBLISH_ACTION : undefined}
          primaryWidth={primaryWidth}
          /* Each step's body fades in on its own, under the fixed chrome. */
          bodyStyle={{
            opacity: stepIn,
            translate: `0px ${(1 - stepIn) * 10}px`,
          }}
          optionStyle={(index) =>
            index === 1
              ? {
                  scale: press(frame, PUBLISH_CLICK, 0.985) * (1 + publishPop * 0.035),
                  boxShadow: `0 ${8 * publishPop}px ${24 * publishPop}px rgba(92, 69, 223, ${
                    0.22 * publishPop
                  })`,
                }
              : {}
          }
          primaryStyle={{
            scale:
              press(frame, CONTENT_CLICK, 0.95) *
              press(frame, SEO_CLICK, 0.95) *
              press(frame, CREATE_CLICK, 0.95) *
              (1 + createPop * 0.04),
            boxShadow: `0 ${8 * createPop}px ${22 * createPop}px rgba(92, 69, 223, ${
              0.26 * createPop
            })`,
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

      {frame >= GALLERY && frame < IMAGE_PICKED + IMAGE_PICKED_LENGTH ? (
        <MediaGalleryModal
          scrimStyle={{ opacity: gallery - galleryOut }}
          cardStyle={{
            opacity: gallery - galleryOut,
            scale:
              interpolate(gallery, [0, 1], [0.965, 1]) *
              interpolate(galleryOut, [0, 1], [1, 0.985]),
          }}
          tileStyle={(index) =>
            index === 1
              ? {
                  scale:
                    press(frame, TILE_CLICK, 0.97) *
                    (1 + pulse(frame, TILE_REACH_END - 10) * 0.04),
                  boxShadow: `0 ${10 * galleryTileFocus}px ${34 * galleryTileFocus}px rgba(14, 165, 233, ${
                    0.25 * galleryTileFocus
                  })`,
                }
              : {}
          }
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
                    scale: 1 + viewPublicPop * 0.035,
                    boxShadow: `0 ${5 * viewPublicPop}px ${16 * viewPublicPop}px rgba(92, 69, 223, ${
                      0.18 * viewPublicPop
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
            yesStyle={{
              scale: press(frame, YES_CLICK, 0.96) * (1 + helpfulPop * 0.06),
              boxShadow: `0 ${6 * helpfulPop}px ${18 * helpfulPop}px rgba(92, 69, 223, ${
                0.22 * helpfulPop
              })`,
            }}
            thanksStyle={{
              opacity: arrive(frame, VOTED, VOTED + VOTED_LENGTH),
            }}
          />
        </AbsoluteFill>
      ) : null}

      <Spotlight
        label="Focus new article button"
        opacity={newFocus}
        rect={NEW_ARTICLE_RECT}
        radius={999}
        style={{
          scale: press(frame, NEW_CLICK, 0.96) * (1 + newPop * 0.05),
        }}
      />
      <Spotlight
        label="Focus media gallery tile"
        opacity={galleryTileFocus}
        rect={MEDIA_TILE_RECT}
        radius={14}
      />
      <Spotlight
        label="Focus publish now option"
        opacity={publishFocus}
        rect={PUBLISH_NOW_RECT}
        radius={14}
        style={{
          scale: press(frame, PUBLISH_CLICK, 0.985) * (1 + publishPop * 0.035),
        }}
      />
      <Spotlight
        label="Focus publish article button"
        opacity={createFocus}
        rect={CREATE_PUBLISH_RECT}
        radius={14}
        style={{
          scale: press(frame, CREATE_CLICK, 0.95) * (1 + createPop * 0.04),
        }}
      />
      <Spotlight
        label="Focus view public page action"
        opacity={viewPublicFocus}
        rect={ACTIONS_MENU_ITEM_RECT}
        radius={12}
        style={{
          scale: 1 + viewPublicPop * 0.035,
        }}
      />
      <Spotlight
        label="Focus helpful question card"
        opacity={helpfulFocus}
        rect={HELPFUL_CARD_RECT}
        radius={16}
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
        hand
        style={{
          zIndex: 30,
          scale:
            press(frame, RAIL_CLICK, 0.88) *
            press(frame, NEW_CLICK, 0.88) *
            press(frame, IMAGE_CLICK, 0.88) *
            press(frame, TILE_CLICK, 0.88) *
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
