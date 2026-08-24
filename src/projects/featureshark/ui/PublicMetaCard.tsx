import { Img, Interactive, staticFile } from "remotion";
import { IconCalendar, IconStatusReview, IconUsers } from "./icons";
import { BRAND_PURPLE, type PartProps } from "./tokens";

const ROW: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: 16.5,
};

const LABEL: React.CSSProperties = { color: "#6b7280" };
const VALUE: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 9,
  fontSize: 16.5,
  fontWeight: 700,
  color: "#20242f",
};

/** Status, author, dates and vote count, down the right of the public page. */
export const PublicMetaCard: React.FC<
  PartProps & {
    comments: number;
    voters: number;
    voterName?: string;
    /** When they voted. Given, the voter row shows its full detail. */
    voterTime?: string;
    voterRole?: string;
    /** Who submitted the feedback. */
    author: string;
  }
> = ({ style, comments, voters, voterName, voterTime, voterRole, author }) => (
  <Interactive.Div
    name="Meta card"
    style={{
      backgroundColor: "#ffffff",
      borderRadius: 16,
      padding: "26px 26px 26px",
      boxSizing: "border-box",
      boxShadow: "0 1px 3px rgba(24, 28, 45, 0.05)",
      display: "flex",
      flexDirection: "column",
      gap: 22,
      ...style,
    }}
  >
    <div style={ROW}>
      <span style={LABEL}>Status</span>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          height: 28,
          borderRadius: 999,
          backgroundColor: "#fdf6e7",
          color: "#c98a1e",
          padding: "0 11px",
          fontSize: 14.5,
          fontWeight: 600,
          whiteSpace: "nowrap",
        }}
      >
        <IconStatusReview size={14} />
        Under Review
      </span>
    </div>

    <div style={ROW}>
      <span style={LABEL}>Author</span>
      <span style={VALUE}>
        <span
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            backgroundColor: "#eeecfb",
            color: "#6a55d8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconUsers />
        </span>
        {author}
      </span>
    </div>

    <div style={ROW}>
      <span style={LABEL}>Created</span>
      <span style={VALUE}>
        <span style={{ color: "#8b91a3", display: "flex" }}>
          <IconCalendar />
        </span>
        Jun 27, 2026
      </span>
    </div>

    <div style={ROW}>
      <span style={LABEL}>Discussion</span>
      <span style={VALUE}>
        {comments} {comments === 1 ? "comment" : "comments"}
      </span>
    </div>

    <div style={ROW}>
      <span style={LABEL}>Voters</span>
      <span
        style={{
          minWidth: 24,
          height: 24,
          borderRadius: 7,
          backgroundColor: "#eeecfb",
          color: BRAND_PURPLE,
          fontSize: 14,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {voters}
      </span>
    </div>

    {voters && voterName && voterTime ? (
      /* Detailed voter list: who, what they are, and when they voted. */
      <div style={{ marginTop: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              backgroundColor: BRAND_PURPLE,
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {voterName.charAt(0)}
          </span>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{ fontSize: 16.5, fontWeight: 700, color: "#20242f" }}
              >
                {voterName}
              </span>
              {voterRole ? (
                <span
                  style={{
                    height: 24,
                    borderRadius: 7,
                    backgroundColor: "#e6f7ef",
                    color: "#1f8a5b",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 9px",
                    fontSize: 13.5,
                    fontWeight: 600,
                  }}
                >
                  {voterRole}
                </span>
              ) : null}
            </div>
            <div style={{ marginTop: 2, fontSize: 15, color: "#8b91a3" }}>
              {voterTime}
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 22,
            textAlign: "center",
            fontSize: 16,
            color: "#8b91a3",
          }}
        >
          All voters loaded
        </div>
      </div>
    ) : (
      <div
        style={{
          marginTop: 2,
          height: 62,
          borderRadius: 12,
          backgroundColor: "#f8f8fb",
          display: "flex",
          alignItems: "center",
          justifyContent: voters ? "flex-start" : "center",
          gap: 11,
          padding: voters ? "0 18px" : 0,
          boxSizing: "border-box",
          fontSize: 16.5,
          color: "#6b7280",
        }}
      >
        {voters && voterName ? (
          <>
            <span
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                backgroundColor: BRAND_PURPLE,
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {voterName.charAt(0)}
            </span>
            <span style={{ color: "#20242f", fontWeight: 600 }}>
              {voterName}
            </span>
          </>
        ) : (
          "No votes yet"
        )}
      </div>
    )}
  </Interactive.Div>
);

/** "Powered by featureshark", centred under the page. */
export const PublicFooter: React.FC<PartProps> = ({ style }) => (
  <Interactive.Div
    name="Public footer"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      fontSize: 18,
      color: "#6b7280",
      ...style,
    }}
  >
    Powered by
    <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
      <Img
        src={staticFile("featureshark/logo-square.svg")}
        style={{ width: 22, height: 22, borderRadius: 6 }}
      />
      <span
        style={{
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: "-0.01em",
          color: BRAND_PURPLE,
        }}
      >
        featureshark
      </span>
    </span>
  </Interactive.Div>
);
