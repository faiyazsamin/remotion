import { Interactive } from "remotion";
import { IconChevronDown, IconPencil, IconTrash } from "./icons";
import { BRAND_PURPLE, type PartProps } from "./tokens";

/** Box model the scene aims its cursor at. */
export const VOTE_CARD_HEIGHT = 140;
/** Taller when the viewer owns the feedback and gets Edit / Delete. */
export const VOTE_CARD_OWNER_HEIGHT = 190;
export const VOTE_CARD_PADDING_X = 38;
export const VOTE_BOX_SIZE = 65;

/** Vote box and title, the public page's first card. */
export const PublicVoteHeader: React.FC<
  PartProps & {
    title: string;
    votes: number;
    /** Voted state: the box takes the brand colour, as the real board does. */
    voted?: boolean;
    voteStyle?: React.CSSProperties;
    /** The viewer submitted this one, so they can edit or delete it. */
    ownerActions?: boolean;
  }
> = ({ style, title, votes, voted, voteStyle, ownerActions }) => (
  <Interactive.Div
    name="Vote header"
    style={{
      backgroundColor: "#ffffff",
      borderRadius: 16,
      height: ownerActions ? VOTE_CARD_OWNER_HEIGHT : VOTE_CARD_HEIGHT,
      display: "flex",
      alignItems: "center",
      gap: 30,
      padding: `0 ${VOTE_CARD_PADDING_X}px`,
      boxSizing: "border-box",
      boxShadow: "0 1px 3px rgba(24, 28, 45, 0.05)",
      ...style,
    }}
  >
    <div
      style={{
        width: VOTE_BOX_SIZE,
        height: VOTE_BOX_SIZE,
        borderRadius: 13,
        backgroundColor: voted ? "#eeecfb" : "#f7f7fa",
        border: voted ? `1.5px solid ${BRAND_PURPLE}` : "1.5px solid transparent",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        flexShrink: 0,
        ...voteStyle,
      }}
    >
      <span
        style={{
          color: voted ? BRAND_PURPLE : "#8b91a3",
          rotate: "180deg",
          scale: 1.6,
          display: "flex",
        }}
      >
        <IconChevronDown />
      </span>
      <span
        style={{
          fontSize: 19,
          fontWeight: 700,
          color: voted ? BRAND_PURPLE : "#2b2f3a",
        }}
      >
        {votes}
      </span>
    </div>

    <div>
      <span
        style={{
          fontSize: 33,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          color: "#20242f",
        }}
      >
        {title}
      </span>

      {ownerActions ? (
        <div
          style={{
            marginTop: 14,
            display: "flex",
            alignItems: "center",
            gap: 26,
            fontSize: 16.5,
            color: "#6b7280",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <IconPencil size={17} />
            Edit
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <IconTrash size={17} />
            Delete
          </span>
        </div>
      ) : null}
    </div>
  </Interactive.Div>
);
