import { Interactive } from "remotion";
import { AdminRail } from "./AdminRail";
import { ArticleBody } from "./ArticleBody";
import { EditorToolbar } from "./EditorToolbar";
import {
  ARTICLE_ACTIONS,
  HELP_ACCENT,
  type ArticleBlock,
} from "./helpCenterContent";
import { HELP_RAIL_ACTIVE, HELP_RAIL_ICONS } from "./HelpCenterBoard";
import {
  IconChevronDown,
  IconPencil,
  IconSearch,
  IconShareSquare,
  IconSparkle,
  IconStatusClosed,
  IconStatusDone,
  IconSettings,
  IconTrash,
} from "./icons";
import {
  ADMIN_CARD_RADIUS,
  ADMIN_GROUND,
  ADMIN_GUTTER,
  BRAND_PURPLE,
  FONT_STACK,
  type PartProps,
} from "./tokens";

const GUTTER = ADMIN_GUTTER;
const TOP_BAR_HEIGHT = 78;
const ACTION_BAR_HEIGHT = 62;
const PADDING = 30;

const ACTIONS_WIDTH = 122;
const CONFIG_WIDTH = 188;
const ACTIONS_GAP = 14;

/** Centre of the Actions button, which opens the menu. */
export const actionsCentre = (frameWidth: number) => ({
  x: frameWidth - GUTTER - PADDING - ACTIONS_WIDTH / 2,
  y: GUTTER + TOP_BAR_HEIGHT + ACTION_BAR_HEIGHT / 2,
});

const MENU_WIDTH = 236;
const MENU_PADDING = 8;
const MENU_ITEM_HEIGHT = 52;
const MENU_TOP_GAP = 8;

/** Centre of one item in the Actions menu. */
export const actionMenuItemCentre = (index: number, frameWidth: number) => ({
  x: frameWidth - GUTTER - PADDING - MENU_WIDTH / 2,
  y:
    GUTTER +
    TOP_BAR_HEIGHT +
    ACTION_BAR_HEIGHT +
    MENU_TOP_GAP +
    MENU_PADDING +
    index * MENU_ITEM_HEIGHT +
    MENU_ITEM_HEIGHT / 2,
});

const ACTION_ICONS = [
  <IconShareSquare key="view" />,
  <IconTrash key="delete" />,
];

/**
 * The article's own editor, which is where publishing the article lands.
 *
 * A page rather than a dialog: the wizard was for making the article, this is for
 * living with it — so it takes the whole card, carries the article's address, and
 * puts the destructive things behind Actions.
 */
export const HelpArticleEditor: React.FC<
  PartProps & {
    title: string;
    url: string;
    blocks: ArticleBlock[];
    /** How far the body has scrolled. */
    scroll?: number;
    /** The Actions menu, open under its button. */
    actionsOpen?: boolean;
    menuStyle?: React.CSSProperties;
    itemStyle?: (index: number) => React.CSSProperties;
    bodyStyle?: React.CSSProperties;
  }
> = ({
  style,
  title,
  url,
  blocks,
  scroll = 0,
  actionsOpen,
  menuStyle,
  itemStyle,
  bodyStyle,
}) => (
  <Interactive.Div
    name="Help article editor"
    style={{
      position: "absolute",
      inset: 0,
      background: ADMIN_GROUND,
      fontFamily: FONT_STACK,
      display: "flex",
      gap: GUTTER,
      padding: GUTTER,
      boxSizing: "border-box",
      ...style,
    }}
  >
    <AdminRail
      icons={HELP_RAIL_ICONS}
      activeIndex={HELP_RAIL_ACTIVE}
      activeAccent={HELP_ACCENT}
      style={{ background: "transparent" }}
    />

    <Interactive.Div
      name="Editor"
      style={{
        flex: 1,
        minWidth: 0,
        backgroundColor: "#ffffff",
        borderRadius: ADMIN_CARD_RADIUS,
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          height: TOP_BAR_HEIGHT,
          display: "flex",
          alignItems: "center",
          gap: 18,
          padding: `0 ${PADDING - 4}px`,
          boxSizing: "border-box",
        }}
      >
        <span style={{ color: "#5b6172", scale: 1.45, display: "flex" }}>
          <IconSearch />
        </span>
        <span
          style={{
            height: 40,
            borderRadius: 999,
            border: "1.5px solid #cfc6f7",
            color: BRAND_PURPLE,
            display: "flex",
            alignItems: "center",
            gap: 9,
            padding: "0 19px",
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          <IconSparkle size={18} />
          Shark AI
        </span>
      </div>

      <div
        style={{
          flexShrink: 0,
          height: ACTION_BAR_HEIGHT,
          borderTop: "1px solid #eef0f6",
          borderBottom: "1px solid #eef0f6",
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
            gap: 10,
            fontSize: 16.5,
            color: "#3d4353",
          }}
        >
          <IconStatusClosed size={18} />
          Close
        </span>

        <span
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: ACTIONS_GAP,
          }}
        >
          <span
            style={{
              width: CONFIG_WIDTH,
              height: 42,
              borderRadius: 10,
              border: "1.4px solid #e6e7ee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              fontSize: 16,
              fontWeight: 600,
              color: "#2b2f38",
            }}
          >
            <IconSettings />
            Configuration
          </span>
          <span
            style={{
              width: ACTIONS_WIDTH,
              height: 42,
              borderRadius: 10,
              backgroundColor: BRAND_PURPLE,
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            <span
              style={{
                scale: 1.2,
                display: "flex",
                rotate: actionsOpen ? "180deg" : "0deg",
              }}
            >
              <IconChevronDown />
            </span>
            Actions
          </span>
        </span>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
          position: "relative",
          ...bodyStyle,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            padding: `${PADDING}px ${PADDING * 2}px`,
            boxSizing: "border-box",
            translate: `0px ${-scroll}px`,
          }}
        >
          <div
            style={{
              fontSize: 40,
              fontWeight: 500,
              color: "#20242f",
            }}
          >
            {title}
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: "0.86em",
                marginLeft: 3,
                verticalAlign: "text-bottom",
                backgroundColor: "#20242f",
              }}
            />
          </div>

          {/* The address it now has, which is what publishing bought. */}
          <div
            style={{
              marginTop: 12,
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 16,
              color: "#8b91a3",
            }}
          >
            {url}
            <IconPencil size={15} />
          </div>

          {/*
            The editor's canvas is a bordered box here, not the whole pane — the
            article is one field on a page rather than the page itself.
          */}
          <div
            style={{
              marginTop: 26,
              borderRadius: 12,
              border: "1.4px solid #e6e7ee",
            }}
          >
            <EditorToolbar
              style={{ borderBottom: "1px solid #eef0f6", height: 56 }}
            />
            <ArticleBody
              blocks={blocks}
              style={{ padding: "34px 38px 40px" }}
            />
          </div>
        </div>
      </div>

      {actionsOpen ? (
        <Interactive.Div
          name="Actions menu"
          style={{
            position: "absolute",
            right: PADDING,
            top: TOP_BAR_HEIGHT + ACTION_BAR_HEIGHT + MENU_TOP_GAP,
            width: MENU_WIDTH,
            borderRadius: 12,
            backgroundColor: "#ffffff",
            boxShadow: "0 18px 48px rgba(24, 28, 45, 0.22)",
            padding: MENU_PADDING,
            boxSizing: "border-box",
            transformOrigin: "80% 0%",
            ...menuStyle,
          }}
        >
          {ARTICLE_ACTIONS.map((action, index) => (
            <div
              key={action.label}
              style={{
                height: MENU_ITEM_HEIGHT,
                borderRadius: 9,
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "0 14px",
                boxSizing: "border-box",
                fontSize: 17,
                fontWeight: action.danger ? 600 : 500,
                color: action.danger ? "#e05a5a" : "#2b2f38",
                ...itemStyle?.(index),
              }}
            >
              <span
                style={{
                  color: action.danger ? "#e05a5a" : "#6b7280",
                  display: "flex",
                }}
              >
                {ACTION_ICONS[index]}
              </span>
              {action.label}
            </div>
          ))}
        </Interactive.Div>
      ) : null}

      <div
        style={{
          flexShrink: 0,
          display: "flex",
          justifyContent: "flex-end",
          padding: `14px ${PADDING}px`,
          boxSizing: "border-box",
        }}
      >
        <span
          style={{
            height: 46,
            borderRadius: 10,
            backgroundColor: "#8b7bf0",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            gap: 11,
            padding: "0 24px",
            fontSize: 17,
            fontWeight: 700,
          }}
        >
          <IconStatusDone size={18} />
          Save
        </span>
      </div>
    </Interactive.Div>
  </Interactive.Div>
);
