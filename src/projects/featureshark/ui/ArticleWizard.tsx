import { Interactive } from "remotion";
import { ArticleBody } from "./ArticleBody";
import { EditorToolbar } from "./EditorToolbar";
import {
  ARTICLE_TITLE_LIMIT,
  HELP_ACCENT,
  HELP_LOCALE,
  PUBLISH_OPTIONS,
  WIZARD_STEPS,
  type ArticleBlock,
} from "./helpCenterContent";
import {
  IconArrowLeftSmall,
  IconArrowRightSmall,
  IconBook,
  IconChevronDown,
  IconClose,
  IconExpand,
  IconStatusDone,
} from "./icons";
import {
  BRAND_PURPLE,
  FONT_STACK,
  SITE_WIDTH,
  type PartProps,
} from "./tokens";

export const WIZARD_WIDTH = 1020;
export const WIZARD_HEIGHT = 904;
export const WIZARD_TOP = 80;
export const WIZARD_LEFT = (SITE_WIDTH - WIZARD_WIDTH) / 2;

const HEADER_HEIGHT = 90;
const FOOTER_HEIGHT = 76;
const PADDING = 30;

const BODY_TOP = WIZARD_TOP + HEADER_HEIGHT;
const BODY_HEIGHT = WIZARD_HEIGHT - HEADER_HEIGHT - FOOTER_HEIGHT;

/** Centre of the footer's primary button, which is where every step advances. */
export const wizardPrimaryCentre = ({
  width = 168,
}: { width?: number } = {}) => ({
  x: WIZARD_LEFT + WIZARD_WIDTH - PADDING - width / 2,
  y: WIZARD_TOP + WIZARD_HEIGHT - FOOTER_HEIGHT / 2,
});

export const wizardPrimaryRect = ({
  width = 168,
}: { width?: number } = {}) => {
  const centre = wizardPrimaryCentre({ width });

  return {
    x: centre.x - width / 2,
    y: centre.y - 46 / 2,
    width,
    height: 46,
  };
};

const OPTION_HEIGHT = 82;
const OPTION_GAP = 12;
/** Where the publishing options start, measured down the SEO step. */
const OPTIONS_TOP = BODY_TOP + 464;

/** Centre of one publishing option on the SEO step. */
export const wizardPublishCentre = (index: number) => ({
  x: WIZARD_LEFT + WIZARD_WIDTH / 2,
  y: OPTIONS_TOP + index * (OPTION_HEIGHT + OPTION_GAP) + OPTION_HEIGHT / 2,
});

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 17, color: "#6b7280" }}>{children}</div>
);

const Field: React.FC<PartProps & { children: React.ReactNode }> = ({
  style,
  children,
}) => (
  <div
    style={{
      marginTop: 12,
      height: 52,
      borderRadius: 11,
      border: "1.4px solid #e6e7ee",
      display: "flex",
      alignItems: "center",
      gap: 11,
      padding: "0 16px",
      boxSizing: "border-box",
      fontSize: 17.5,
      color: "#2b2f3a",
      ...style,
    }}
  >
    {children}
  </div>
);

/**
 * The three-step article wizard.
 *
 * One dialog whose body swaps rather than three dialogs, because the header,
 * footer and step dots stay put — that continuity is what makes it read as a
 * wizard. Every step's state is a prop; the geometry helpers above are derived
 * from the same constants it lays out with.
 */
export const ArticleWizard: React.FC<
  PartProps & {
    /** 0-based: Info, Content, SEO. */
    step: number;
    title: string;
    topic: string;
    /** Still typing the title, so it shows a caret. */
    titleTyping?: boolean;
    hasImage?: boolean;
    imageBackground?: string;
    imageStyle?: React.CSSProperties;
    /** The article body, revealed as far as it has been typed. */
    blocks?: ArticleBlock[];
    /** How many characters of the body are in, or `undefined` for all of it. */
    revealed?: number;
    /** How far the editor has scrolled to keep the caret in view. */
    contentScroll?: number;
    /** Which publishing option is chosen. */
    publishOption?: number;
    /** Width of the footer primary button, matching `wizardPrimaryCentre`. */
    primaryWidth?: number;
    /** Overrides the footer's primary label, e.g. once Publish Now is picked. */
    primaryLabel?: string;
    bodyStyle?: React.CSSProperties;
    primaryStyle?: React.CSSProperties;
    optionStyle?: (index: number) => React.CSSProperties;
    scrimStyle?: React.CSSProperties;
    cardStyle?: React.CSSProperties;
  }
> = ({
  style,
  step,
  title,
  topic,
  titleTyping,
  hasImage = true,
  imageBackground,
  imageStyle,
  blocks = [],
  revealed,
  contentScroll = 0,
  publishOption = 0,
  primaryWidth,
  primaryLabel,
  bodyStyle,
  primaryStyle,
  optionStyle,
  scrimStyle,
  cardStyle,
}) => {
  const meta = WIZARD_STEPS[step];
  const primary = primaryLabel ?? meta.next;

  /* Nothing is written yet until the first character lands. */
  const empty = revealed !== undefined && revealed <= 0;

  return (
    <Interactive.Div
      name="Article wizard"
      style={{
        position: "absolute",
        inset: 0,
        fontFamily: FONT_STACK,
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(38, 34, 62, 0.42)",
          ...scrimStyle,
        }}
      />

      <Interactive.Div
        name="Wizard card"
        style={{
          position: "absolute",
          left: WIZARD_LEFT,
          top: WIZARD_TOP,
          width: WIZARD_WIDTH,
          height: WIZARD_HEIGHT,
          borderRadius: 16,
          overflow: "hidden",
          backgroundColor: "#ffffff",
          boxShadow: "0 34px 100px rgba(20, 16, 52, 0.34)",
          display: "flex",
          flexDirection: "column",
          ...cardStyle,
        }}
      >
        <div
          style={{
            height: HEADER_HEIGHT,
            flexShrink: 0,
            /* Tinted with Help Center's own accent, faintly. */
            background:
              "linear-gradient(180deg, #f0fbff 0%, #ffffff 100%)",
            borderBottom: "1px solid #eef0f6",
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: `0 ${PADDING}px`,
            boxSizing: "border-box",
          }}
        >
          <span
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              backgroundColor: "#d9f2fb",
              color: HELP_ACCENT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              scale: 1.15,
            }}
          >
            <IconBook />
          </span>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span
                style={{ fontSize: 23, fontWeight: 700, color: "#1f232e" }}
              >
                {meta.title}
              </span>
              <span
                style={{
                  fontSize: 14.5,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  color: "#8b91a3",
                }}
              >
                {HELP_LOCALE.toUpperCase()}
              </span>
            </div>
            <div style={{ marginTop: 5, fontSize: 16.5, color: "#6b7280" }}>
              {meta.subtitle}
            </div>
          </div>

          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 20,
              color: "#8b91a3",
            }}
          >
            {/* Only the content step is worth taking full-screen. */}
            {step === 1 ? <IconExpand size={17} /> : null}
            <IconClose size={17} />
          </div>
        </div>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            ...bodyStyle,
          }}
        >
          {step === 0 ? (
            <div style={{ padding: PADDING, boxSizing: "border-box" }}>
              <Label>Title</Label>
              <div
                style={{
                  marginTop: 10,
                  fontSize: 34,
                  fontWeight: 500,
                  color: "#20242f",
                }}
              >
                {title}
                {titleTyping ? (
                  <span
                    style={{
                      display: "inline-block",
                      width: 2,
                      height: "0.9em",
                      marginLeft: 2,
                      verticalAlign: "text-bottom",
                      backgroundColor: "#20242f",
                    }}
                  />
                ) : null}
              </div>
              <div style={{ marginTop: 16, fontSize: 16, color: "#8b91a3" }}>
                {title.length}/{ARTICLE_TITLE_LIMIT}
              </div>

              <div style={{ marginTop: 26, display: "flex", gap: 22 }}>
                <div style={{ flex: 1 }}>
                  <Label>Topic</Label>
                  <Field>
                    {topic}
                    <span
                      style={{
                        marginLeft: "auto",
                        color: "#9aa0ad",
                        scale: 1.3,
                        display: "flex",
                      }}
                    >
                      <IconChevronDown />
                    </span>
                  </Field>
                </div>
                <div style={{ flex: 1 }}>
                  <Label>Sort Order</Label>
                  <Field>0</Field>
                </div>
              </div>

              <div style={{ marginTop: 26 }}>
                <Label>Featured Image</Label>
                {hasImage ? (
                  <div
                    style={{
                      marginTop: 12,
                      height: 262,
                      borderRadius: 12,
                      background: imageBackground,
                      position: "relative",
                      ...imageStyle,
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        width: 30,
                        height: 30,
                        borderRadius: 8,
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        color: "#4d5462",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconClose size={15} />
                    </span>
                  </div>
                ) : (
                  <div
                    style={{
                      marginTop: 12,
                      height: 262,
                      borderRadius: 12,
                      border: "1.6px dashed #d6d9e2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 17,
                      color: "#4d5462",
                    }}
                  >
                    Add a featured image
                  </div>
                )}
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <>
              <EditorToolbar
                style={{ borderBottom: "1px solid #eef0f6" }}
              />
              <div
                style={{
                  flex: 1,
                  minHeight: 0,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    padding: `${PADDING - 6}px ${PADDING}px`,
                    boxSizing: "border-box",
                    translate: `0px ${-contentScroll}px`,
                  }}
                >
                  {empty ? (
                    <div style={{ fontSize: 21, color: "#9aa0ad" }}>
                      Write your article content here...
                    </div>
                  ) : (
                    <ArticleBody blocks={blocks} revealed={revealed} />
                  )}
                </div>
              </div>
            </>
          ) : null}

          {step === 2 ? (
            <div style={{ padding: PADDING, boxSizing: "border-box" }}>
              <Label>Excerpt</Label>
              <div
                style={{
                  marginTop: 12,
                  height: 84,
                  borderRadius: 11,
                  border: "1.4px solid #e6e7ee",
                  padding: "16px 18px",
                  boxSizing: "border-box",
                  fontSize: 17.5,
                  color: "#9aa0ad",
                }}
              >
                Brief summary of this article...
              </div>

              <div
                style={{
                  marginTop: 18,
                  paddingTop: 16,
                  borderTop: "1px solid #eef0f6",
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  color: "#6b7280",
                }}
              >
                SEO
              </div>

              <div style={{ marginTop: 14 }}>
                <Label>Meta Title</Label>
                <Field style={{ color: "#9aa0ad" }}>SEO title (optional)</Field>
              </div>

              <div style={{ marginTop: 20 }}>
                <Label>Meta Description</Label>
                <div
                  style={{
                    marginTop: 12,
                    height: 74,
                    borderRadius: 11,
                    border: "1.4px solid #e6e7ee",
                    padding: "16px 18px",
                    boxSizing: "border-box",
                    fontSize: 17.5,
                    color: "#9aa0ad",
                  }}
                >
                  SEO description (optional)
                </div>
              </div>

              {PUBLISH_OPTIONS.map((option, index) => {
                const chosen = index === publishOption;

                return (
                  <div
                    key={option.label}
                    style={{
                      marginTop: index ? OPTION_GAP : 20,
                      height: OPTION_HEIGHT,
                      borderRadius: 12,
                      border: `1.6px solid ${chosen ? BRAND_PURPLE : "#e6e7ee"}`,
                      backgroundColor: chosen ? "#f7f6fe" : "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      gap: 18,
                      padding: "0 24px",
                      boxSizing: "border-box",
                      ...optionStyle?.(index),
                    }}
                  >
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        border: `1.8px solid ${chosen ? BRAND_PURPLE : "#c9cdd8"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {chosen ? (
                        <span
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor: BRAND_PURPLE,
                          }}
                        />
                      ) : null}
                    </span>
                    <div>
                      <div
                        style={{
                          fontSize: 19,
                          fontWeight: 600,
                          color: "#20242f",
                        }}
                      >
                        {option.label}
                      </div>
                      <div
                        style={{
                          marginTop: 5,
                          fontSize: 17,
                          color: "#6b7280",
                        }}
                      >
                        {option.detail}
                      </div>
                    </div>
                  </div>
                );
              })}

              <div
                style={{
                  marginTop: 18,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <span
                  style={{
                    width: 42,
                    height: 24,
                    borderRadius: 999,
                    backgroundColor: "#e3e5ed",
                    display: "flex",
                    alignItems: "center",
                    padding: 3,
                    boxSizing: "border-box",
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      backgroundColor: "#ffffff",
                    }}
                  />
                </span>
                <span style={{ fontSize: 18, color: "#2b2f38" }}>
                  Create another article after this one
                </span>
              </div>
            </div>
          ) : null}
        </div>

        <div
          style={{
            height: FOOTER_HEIGHT,
            flexShrink: 0,
            position: "relative",
            borderTop: "1px solid #eef0f6",
            backgroundColor: "#fcfcfd",
            display: "flex",
            alignItems: "center",
            padding: `0 ${PADDING}px`,
            boxSizing: "border-box",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              height: 44,
              borderRadius: 10,
              border: step ? "1.4px solid #e6e7ee" : undefined,
              padding: step ? "0 16px" : 0,
              fontSize: 17,
              color: "#3d4353",
            }}
          >
            {step ? <IconArrowLeftSmall size={16} /> : null}
            {meta.back}
          </span>

          {/* Where we are: done steps collapse to a tick. */}
          <span
            style={{
              /* Centred on the card, not on the footer's remaining space. */
              position: "absolute",
              left: 0,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              pointerEvents: "none",
            }}
          >
            {WIZARD_STEPS.map((_, index) => (
              <span
                key={index}
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                {index ? (
                  <span
                    style={{
                      width: 34,
                      height: 1.6,
                      backgroundColor: "#e3e5ed",
                    }}
                  />
                ) : null}
                <span
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    backgroundColor:
                      index < step
                        ? "#eeecfb"
                        : index === step
                          ? BRAND_PURPLE
                          : "#f1f2f6",
                    color:
                      index < step
                        ? BRAND_PURPLE
                        : index === step
                          ? "#ffffff"
                          : "#8b91a3",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 15.5,
                    fontWeight: 700,
                  }}
                >
                  {index < step ? <IconStatusDone size={17} /> : index + 1}
                </span>
              </span>
            ))}
          </span>

          <span
            style={{
              marginLeft: "auto",
              width: primaryWidth,
              height: 46,
              borderRadius: 10,
              backgroundColor: BRAND_PURPLE,
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 11,
              padding: primaryWidth === undefined ? "0 20px" : 0,
              fontSize: 17,
              fontWeight: 700,
              whiteSpace: "nowrap",
              ...primaryStyle,
            }}
          >
            {step === 2 ? <IconStatusDone size={18} /> : null}
            {primary}
            {step < 2 ? <IconArrowRightSmall size={16} /> : null}
          </span>
        </div>
      </Interactive.Div>
    </Interactive.Div>
  );
};

export { BODY_HEIGHT as WIZARD_BODY_HEIGHT, BODY_TOP as WIZARD_BODY_TOP };
