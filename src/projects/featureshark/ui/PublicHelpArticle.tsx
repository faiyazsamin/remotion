import { Interactive } from "remotion";
import { ArticleBody } from "./ArticleBody";
import {
  HELP_PUBLIC_TAGLINE,
  HELP_PUBLIC_TITLE,
  HELP_SEARCH_PLACEHOLDER,
  type ArticleBlock,
} from "./helpCenterContent";
import {
  IconArrowLeft,
  IconBook,
  IconHeart,
  IconCalendar,
  IconChevronDown,
  IconEye,
  IconSearch,
  IconSun,
} from "./icons";
import {
  BRAND_PURPLE,
  FONT_STACK,
  SITE_HEIGHT,
  SITE_WIDTH,
  type PartProps,
} from "./tokens";

const HERO_HEIGHT = 270;
const CONTENT_WIDTH = 1221;
const CONTENT_LEFT = (SITE_WIDTH - CONTENT_WIDTH) / 2;
const SEARCH_WIDTH = 755;
const IMAGE_HEIGHT = 428;

/*
  The page's tail: the helpfulness question and the site footer. Measured up from
  the bottom, because that is the only place a scene can aim at it reliably — the
  article above is as tall as the article is.
*/
const HELPFUL_GAP_ABOVE = 40;
const HELPFUL_PADDING = 36;
const HELPFUL_LABEL_HEIGHT = 30;
const HELPFUL_GAP = 22;
const VOTE_HEIGHT = 44;
const FOOTER_GAP = 56;
const FOOTER_HEIGHT = 76;
const VOTE_WIDTH = 96;
const HELPFUL_CARD_HEIGHT =
  HELPFUL_PADDING * 2 + HELPFUL_LABEL_HEIGHT + HELPFUL_GAP + VOTE_HEIGHT;

/**
 * How far above the page's bottom edge the Yes button's centre sits. With the
 * page scrolled to the end, that is all a scene needs to aim at it.
 */
export const HELPFUL_YES_FROM_BOTTOM =
  FOOTER_HEIGHT + FOOTER_GAP + HELPFUL_PADDING + VOTE_HEIGHT / 2;

/** And how far in from the left, which is the content column's own edge. */
export const HELPFUL_YES_FROM_LEFT =
  CONTENT_LEFT + HELPFUL_PADDING + VOTE_WIDTH / 2;

export const HELPFUL_CARD_RECT = {
  x: CONTENT_LEFT,
  y:
    SITE_HEIGHT -
    (FOOTER_HEIGHT + FOOTER_GAP + HELPFUL_CARD_HEIGHT),
  width: CONTENT_WIDTH,
  height: HELPFUL_CARD_HEIGHT,
};

const Meta: React.FC<{ icon: React.ReactNode; children: React.ReactNode }> = ({
  icon,
  children,
}) => (
  <span
    style={{
      display: "flex",
      alignItems: "center",
      gap: 9,
      fontSize: 17,
      color: "#6b7280",
    }}
  >
    <span style={{ color: "#8b91a3", display: "flex" }}>{icon}</span>
    {children}
  </span>
);

/** A thumb button. Chosen is a filled state, because a vote is final. */
const Vote: React.FC<PartProps & { label: string; chosen?: boolean }> = ({
  style,
  label,
  chosen,
}) => (
  <span
    style={{
      width: VOTE_WIDTH,
      height: VOTE_HEIGHT,
      borderRadius: 10,
      backgroundColor: chosen ? "#a99cf5" : "#ffffff",
      border: chosen ? undefined : "1.4px solid #e6e7ee",
      color: chosen ? "#ffffff" : "#9aa0ad",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      fontSize: 18,
      fontWeight: chosen ? 700 : 500,
      ...style,
    }}
  >
    <ThumbUp />
    {label}
  </span>
);

const ThumbUp: React.FC = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <path
      d="M7 21V10.5l3.5-7A1.8 1.8 0 0 1 13.8 5l-.8 4.5h5.3a2 2 0 0 1 2 2.3l-1 6A2 2 0 0 1 17.3 21H7Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M7 10.5H4.8A1.8 1.8 0 0 0 3 12.3v6.9A1.8 1.8 0 0 0 4.8 21H7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * The article as a customer reads it.
 *
 * A hero over a light ground rather than the admin's purple field of cards: the
 * masthead and its search are the only chrome, because the one thing a reader
 * came to do is read. The body comes from the same blocks the editor holds, so
 * the published page cannot drift from what was written.
 *
 * `scroll` moves the page; the hero scrolls away with it, as a page does.
 */
export const PublicHelpArticle: React.FC<
  PartProps & {
    title: string;
    topic: string;
    blocks: ArticleBlock[];
    views: number;
    published: string;
    updated: string;
    imageBackground?: string;
    scroll?: number;
    /** Which way the reader voted, if they have. */
    helpful?: "yes" | "no";
    yesStyle?: React.CSSProperties;
    thanksStyle?: React.CSSProperties;
    bodyStyle?: React.CSSProperties;
  }
> = ({
  style,
  title,
  topic,
  blocks,
  views,
  published,
  updated,
  imageBackground,
  scroll = 0,
  helpful,
  yesStyle,
  thanksStyle,
  bodyStyle,
}) => (
  <Interactive.Div
    name="Public help article"
    style={{
      position: "absolute",
      inset: 0,
      backgroundColor: "#f7f8fc",
      fontFamily: FONT_STACK,
      overflow: "hidden",
      ...style,
    }}
  >
    <Interactive.Main
      name="Article page"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        translate: `0px ${-scroll}px`,
        ...bodyStyle,
      }}
    >
      <Interactive.Header
        name="Help hero"
        style={{
          height: HERO_HEIGHT,
          backgroundColor: BRAND_PURPLE,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxSizing: "border-box",
          paddingTop: 34,
        }}
      >
        <span
          style={{
            position: "absolute",
            left: CONTENT_LEFT,
            top: 36,
            fontSize: 30,
            fontWeight: 800,
            color: "#ffffff",
          }}
        >
          {HELP_PUBLIC_TITLE}
        </span>

        <span
          style={{
            position: "absolute",
            right: CONTENT_LEFT,
            top: 34,
            display: "flex",
            alignItems: "center",
            gap: 22,
          }}
        >
          <span style={{ color: "#e5e0ff", scale: 1.2, display: "flex" }}>
            <IconSun />
          </span>
          <span
            style={{
              height: 40,
              borderRadius: 10,
              backgroundColor: "rgba(255, 255, 255, 0.92)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "0 14px",
              fontSize: 17,
              fontWeight: 600,
              color: "#2b2f38",
            }}
          >
            {/* A drawn flag: emoji do not render in the renderer's fonts. */}
            <svg width={22} height={15} viewBox="0 0 22 15">
              <rect width="22" height="15" rx="2" fill="#f0f0f0" />
              {[0, 2, 4, 6].map((row) => (
                <rect
                  key={row}
                  y={row * 3.75 + 1.9}
                  width="22"
                  height="1.9"
                  fill="#d8232f"
                />
              ))}
              <rect width="10" height="8" rx="1" fill="#2a3560" />
            </svg>
            English
            <span style={{ color: "#8b91a3", scale: 1.1, display: "flex" }}>
              <IconChevronDown />
            </span>
          </span>
        </span>

        <span
          style={{
            /* Clear of the wordmark, which sits on its own line. */
            marginTop: 78,
            fontSize: 21,
            color: "#e9e5ff",
          }}
        >
          {HELP_PUBLIC_TAGLINE}
        </span>

        <span
          style={{
            marginTop: 26,
            width: SEARCH_WIDTH,
            height: 62,
            borderRadius: 12,
            backgroundColor: "#ffffff",
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "0 22px",
            boxSizing: "border-box",
            fontSize: 18,
            color: "#9aa0ad",
          }}
        >
          <span style={{ color: "#9aa0ad", scale: 1.35, display: "flex" }}>
            <IconSearch />
          </span>
          {HELP_SEARCH_PLACEHOLDER}
        </span>
      </Interactive.Header>

      <div
        style={{
          width: CONTENT_WIDTH,
          margin: "0 auto",
          paddingTop: 44,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 17,
            color: "#6b7280",
          }}
        >
          {HELP_PUBLIC_TITLE}
          <span style={{ color: "#b9bec9" }}>›</span>
          <span style={{ color: "#8b91a3", display: "flex" }}>
            <IconBook />
          </span>
          {topic}
          <span style={{ color: "#b9bec9" }}>›</span>
          <span style={{ color: "#3d4353" }}>{title}</span>
        </div>

        <div
          style={{
            marginTop: 20,
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              height: 48,
              borderRadius: 11,
              border: "1.4px solid #e6e7ee",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "0 20px",
              fontSize: 17.5,
              color: "#2b2f38",
            }}
          >
            <IconArrowLeft size={18} />
            {topic}
          </span>
          <span
            style={{
              marginLeft: "auto",
              height: 48,
              borderRadius: 11,
              border: "1.4px solid #e6e7ee",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              padding: "0 22px",
              fontSize: 17.5,
              color: "#2b2f38",
            }}
          >
            View all topics
          </span>
        </div>

        <div
          style={{
            marginTop: 34,
            fontSize: 46,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "#3d4353",
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop: 18,
            display: "flex",
            alignItems: "center",
            gap: 30,
          }}
        >
          <Meta icon={<IconEye size={17} />}>{views} views</Meta>
          <Meta
            icon={
              <span style={{ scale: 17 / 24, display: "flex" }}>
                <IconCalendar />
              </span>
            }
          >
            Published: {published}
          </Meta>
          <Meta
            icon={
              <span style={{ scale: 17 / 24, display: "flex" }}>
                <IconCalendar />
              </span>
            }
          >
            Updated: {updated}
          </Meta>
        </div>

        <div
          style={{
            marginTop: 26,
            height: IMAGE_HEIGHT,
            borderRadius: 14,
            background: imageBackground,
          }}
        />

        <div
          style={{
            marginTop: 34,
            borderRadius: 16,
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 30px rgba(24, 28, 45, 0.06)",
            padding: "44px 40px 48px",
            boxSizing: "border-box",
          }}
        >
          {/* Larger than in the editor, because this one is for reading. */}
          <ArticleBody blocks={blocks} scale={1.06} />
        </div>

        {/* Its own card, so the question reads as a thing to answer. */}
        <div
          style={{
            marginTop: HELPFUL_GAP_ABOVE,
            borderRadius: 16,
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 30px rgba(24, 28, 45, 0.06)",
            padding: HELPFUL_PADDING,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              height: HELPFUL_LABEL_HEIGHT,
              fontSize: 21,
              color: "#3d4353",
            }}
          >
            Was this article helpful?
          </div>

          <div
            style={{
              marginTop: HELPFUL_GAP,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <Vote
              label="Yes"
              chosen={helpful === "yes"}
              style={yesStyle}
            />
            <Vote label="No" chosen={helpful === "no"} />
            {/* Only ever an acknowledgement — the vote is not undoable. */}
            {helpful ? (
              <span
                style={{
                  marginLeft: 10,
                  fontSize: 18,
                  color: "#3d4353",
                  ...thanksStyle,
                }}
              >
                Thank you for your feedback!
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: FOOTER_GAP,
          height: FOOTER_HEIGHT,
          borderTop: "1px solid #e8e9f0",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: CONTENT_WIDTH,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            fontSize: 17,
            color: "#8b91a3",
          }}
        >
          © 2026 {HELP_PUBLIC_TITLE}
          <span
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            Powered by
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 20,
                fontWeight: 800,
                color: BRAND_PURPLE,
              }}
            >
              <span
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 7,
                  backgroundColor: BRAND_PURPLE,
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconHeart size={14} />
              </span>
              featureshark
            </span>
          </span>
        </div>
      </div>
    </Interactive.Main>
  </Interactive.Div>
);

export { CONTENT_LEFT as PUBLIC_HELP_LEFT, HERO_HEIGHT as PUBLIC_HELP_HERO };
