import { Interactive } from "remotion";
import { ENTRY_TYPES, type ChangelogEntry } from "./changelogContent";
import {
  IconArrowLeft,
  IconCalendar,
  IconEye,
  IconFlame,
  IconPerson,
} from "./icons";
import { PublicNavBar } from "./PublicNavBar";
import {
  BRAND_PURPLE,
  FONT_STACK,
  SITE_WIDTH,
  type PartProps,
} from "./tokens";

const CONTENT_WIDTH = 1150;
const CONTENT_LEFT = (SITE_WIDTH - CONTENT_WIDTH) / 2;
const BACK_TOP = 132;
const CARD_PADDING = 36;
const IMAGE_HEIGHT = 363;

const typeTint = (label: string) =>
  ENTRY_TYPES.find((type) => type.label === label)?.tint ?? "#2f6fdb";

const Meta: React.FC<{
  icon: React.ReactNode;
  tint: string;
  children: React.ReactNode;
}> = ({ icon, tint, children }) => (
  <span
    style={{
      display: "flex",
      alignItems: "center",
      gap: 11,
      fontSize: 18,
      color: "#4d5462",
    }}
  >
    <span
      style={{
        width: 30,
        height: 30,
        borderRadius: 9,
        backgroundColor: `${tint}1a`,
        color: tint,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </span>
    {children}
  </span>
);

/**
 * The release as the customer sees it: the published changelog post.
 *
 * The other side of the editor — same title, same entries, same featured image,
 * but on the public site's white ground under the floating nav, so the cut reads
 * as leaving the admin rather than opening another admin screen.
 *
 * `scroll` moves the page under the nav, which stays pinned.
 */
export const PublicChangelogPost: React.FC<
  PartProps & {
    title: string;
    date: string;
    author: string;
    views: number;
    entries: ChangelogEntry[];
    imageBackground?: string;
    /** How far the page has been scrolled, in px. */
    scroll?: number;
    navStyle?: React.CSSProperties;
    bodyStyle?: React.CSSProperties;
  }
> = ({
  style,
  title,
  date,
  author,
  views,
  entries,
  imageBackground,
  scroll = 0,
  navStyle,
  bodyStyle,
}) => (
  <Interactive.Div
    name="Public changelog post"
    style={{
      position: "absolute",
      inset: 0,
      backgroundColor: "#ffffff",
      fontFamily: FONT_STACK,
      overflow: "hidden",
      ...style,
    }}
  >
    {/* The page moves; the nav does not. */}
    <Interactive.Main
      name="Post"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        translate: `0px ${-scroll}px`,
        paddingBottom: 120,
        ...bodyStyle,
      }}
    >
      <div
        style={{
          marginTop: BACK_TOP,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          fontSize: 19,
          fontWeight: 600,
          color: BRAND_PURPLE,
        }}
      >
        <IconArrowLeft size={19} />
        Back to Updates
      </div>

      <div
        style={{
          marginTop: 34,
          textAlign: "center",
          fontSize: 62,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: "#3d4353",
        }}
      >
        {title}
      </div>

      <div
        style={{
          marginTop: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 34,
        }}
      >
        <Meta
          icon={
            <span style={{ scale: 17 / 24, display: "flex" }}>
              <IconCalendar />
            </span>
          }
          tint="#e8752f"
        >
          {date}
        </Meta>
        <Meta icon={<IconPerson size={17} />} tint="#5b6172">
          {author}
        </Meta>
        <Meta icon={<IconEye size={17} />} tint="#1f8a52">
          {views} {views === 1 ? "views" : "views"}
        </Meta>
      </div>

      <div
        style={{
          margin: "48px auto 0",
          width: CONTENT_WIDTH,
          borderRadius: 18,
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 30px rgba(24, 28, 45, 0.07)",
          padding: CARD_PADDING,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            height: IMAGE_HEIGHT,
            borderRadius: 12,
            background: imageBackground,
          }}
        />

        {/*
          One entry per change, each introduced by its type pill sitting on a
          hairline — the public read of the editor's timeline.
        */}
        {entries.map((entry, index) => (
          <div key={index}>
            <div
              style={{
                position: "relative",
                marginTop: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: "50%",
                  height: 1,
                  backgroundColor: "#eef0f6",
                }}
              />
              <span
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  height: 34,
                  borderRadius: 999,
                  backgroundColor: typeTint(entry.type),
                  color: "#ffffff",
                  padding: "0 18px",
                  fontSize: 16.5,
                  fontWeight: 700,
                }}
              >
                <IconFlame size={15} />
                {entry.type}
              </span>
            </div>

            <div
              style={{
                marginTop: 30,
                fontSize: 19,
                lineHeight: 1.72,
                color: "#4d5462",
              }}
            >
              {entry.body}
            </div>
          </div>
        ))}
      </div>
    </Interactive.Main>

    <PublicNavBar variant="admin" active="Changelog" style={navStyle} />
  </Interactive.Div>
);

export { CONTENT_LEFT as PUBLIC_POST_LEFT };
