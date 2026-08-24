import { Interactive } from "remotion";
import {
  IconChart,
  IconChat,
  IconChevronDown,
  IconCheck,
  IconClose,
  IconSparkle,
  IconSpinner,
  IconUsers,
} from "./icons";
import { BRAND_PURPLE, type PartProps } from "./tokens";

export const SHARK_PANEL_WIDTH = 508;

/** Agent runs are attributed to a persona; Product Manager took these. */
export const AGENT_NAME = "Product Manager";

/** One line in a run's activity log. */
export type AgentActivity = {
  label: string;
  time: string;
  /** False while the call is in flight, which is what shows the spinner. */
  done: boolean;
  style?: React.CSSProperties;
};

/** One agent run: who ran it, what it was working on, and what it did. */
export type AgentRun = {
  /** Defaults to Product Manager, the agent that triages feedback. */
  agent?: string;
  subject: string;
  time: string;
  items: AgentActivity[];
  style?: React.CSSProperties;
};

const AGENT_CHIPS = ["All", "Product Manager", "Support Manager", "Ch"];

const Tab: React.FC<{
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}> = ({ label, icon, active }) => (
  <div
    style={{
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 9,
      fontSize: 16,
      fontWeight: 600,
      color: active ? BRAND_PURPLE : "#6b7280",
      borderBottom: active
        ? `2.5px solid ${BRAND_PURPLE}`
        : "2.5px solid transparent",
      boxSizing: "border-box",
    }}
  >
    <span style={{ display: "flex", scale: 1.25 }}>{icon}</span>
    {label}
  </div>
);

/**
 * The state badge on an activity line. In flight it is a grey rotating arc;
 * finished it is a green tick on a mint disc. Both are the same size so the
 * change never nudges the row.
 */
const StateBadge: React.FC<{ done: boolean; spinnerAngle: number }> = ({
  done,
  spinnerAngle,
}) => (
  <span
    style={{
      width: 21,
      height: 21,
      borderRadius: "50%",
      flexShrink: 0,
      // Opaque, so the spine behind the column does not show through.
      backgroundColor: done ? "#e6f7ef" : "#ffffff",
      border: done ? "1.4px solid #9fdfc2" : "1.4px solid #e2e5ec",
      color: done ? "#2fb47c" : "#b4b9c4",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      zIndex: 1,
      boxSizing: "border-box",
    }}
  >
    {done ? (
      <IconCheck size={11} />
    ) : (
      <div style={{ rotate: `${spinnerAngle}deg`, display: "flex" }}>
        <IconSpinner size={15} />
      </div>
    )}
  </span>
);

const ActivityRow: React.FC<{
  item: AgentActivity;
  spinnerAngle: number;
}> = ({ item, spinnerAngle }) => (
  <div
    style={{
      marginTop: 16,
      display: "flex",
      alignItems: "flex-start",
      gap: 12,
      ...item.style,
    }}
  >
    <StateBadge done={item.done} spinnerAngle={spinnerAngle} />
    <div>
      <div style={{ fontSize: 16, fontWeight: 600, color: "#242833" }}>
        {item.label}
      </div>
      <div style={{ marginTop: 3, fontSize: 14, color: "#9aa0ad" }}>
        {item.time}
      </div>
    </div>
  </div>
);

/** One run's card: who, what they were on, and the log beneath it. */
const RunCard: React.FC<{ run: AgentRun; spinnerAngle: number }> = ({
  run,
  spinnerAngle,
}) => (
  <Interactive.Div
    name="Agent run"
    style={{
      marginTop: 14,
      border: "1px solid #e9ebf2",
      borderRadius: 12,
      padding: "16px 18px 20px",
      boxSizing: "border-box",
      backgroundColor: "#ffffff",
      ...run.style,
    }}
  >
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
      <span
        style={{
          width: 30,
          height: 30,
          borderRadius: 8,
          backgroundColor: "#f0eefb",
          color: "#6f63d8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <IconUsers />
      </span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 17.5, fontWeight: 700, color: "#1f232e" }}>
          {run.agent ?? AGENT_NAME}
        </div>
        <div
          style={{
            marginTop: 3,
            display: "flex",
            alignItems: "baseline",
            gap: 9,
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 700, color: "#3d4353" }}>
            {run.subject}
          </span>
          <span style={{ fontSize: 14, color: "#9aa0ad" }}>{run.time}</span>
        </div>
      </div>
      <span
        style={{
          color: "#8b91a3",
          rotate: "180deg",
          scale: 1.5,
          display: "flex",
        }}
      >
        <IconChevronDown />
      </span>
    </div>

    {/*
      The spine threads the badge column. It is behind the badges, which are
      opaque, so it reads as a line connecting them rather than crossing them.
    */}
    <div style={{ position: "relative", marginTop: 2 }}>
      {run.items.length > 1 ? (
        <div
          style={{
            position: "absolute",
            left: 10,
            top: 26,
            bottom: 26,
            width: 1.5,
            backgroundColor: "#eceef4",
          }}
        />
      ) : null}

      {/* Keyed by position: a run can log the same call twice. */}
      {run.items.map((item, index) => (
        <ActivityRow
          key={index}
          item={item}
          spinnerAngle={spinnerAngle}
        />
      ))}
    </div>
  </Interactive.Div>
);

/**
 * The Shark AI panel, opened from the board's top bar.
 *
 * Its contents are laid out at a fixed width so that a scene can reveal it by
 * animating the *wrapper's* width without squashing anything — see the
 * width/opacity split in `FeedbackBoard`.
 *
 * `runs` is the whole log, newest first. Per-item `done` and `style` let a scene
 * bring a call in as a spinner and resolve it to a tick, which is the one place
 * motion belongs in here: the calls genuinely land one after another.
 */
export const SharkAiPanel: React.FC<
  PartProps & {
    runs: AgentRun[];
    spinnerAngle?: number;
    /** Shown when the log has more history behind it. */
    loadMore?: boolean;
    loadMoreStyle?: React.CSSProperties;
  }
> = ({ style, runs, spinnerAngle = 0, loadMore, loadMoreStyle }) => (
  <Interactive.Div
    name="Shark AI panel"
    style={{
      width: SHARK_PANEL_WIDTH,
      height: "100%",
      backgroundColor: "#ffffff",
      borderRadius: 14,
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
      ...style,
    }}
  >
    <div
      style={{
        flexShrink: 0,
        height: 68,
        display: "flex",
        alignItems: "center",
        gap: 11,
        padding: "0 20px",
        boxSizing: "border-box",
      }}
    >
      <span style={{ color: BRAND_PURPLE, display: "flex" }}>
        <IconSparkle size={19} />
      </span>
      <span style={{ fontSize: 19, fontWeight: 700, color: "#1f232e" }}>
        Shark AI
      </span>
      <span style={{ marginLeft: "auto", color: "#5b6172", display: "flex" }}>
        <IconClose size={19} />
      </span>
    </div>

    <div
      style={{
        flexShrink: 0,
        height: 52,
        borderBottom: "1px solid #eef0f6",
        display: "flex",
      }}
    >
      <Tab label="Agent Activities" icon={<IconChart />} active />
      <Tab label="Ask SharkAgent" icon={<IconChat />} />
    </div>

    <div
      style={{
        flexShrink: 0,
        height: 56,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "0 16px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {AGENT_CHIPS.map((chip, index) => (
        <div
          key={chip}
          style={{
            height: 34,
            borderRadius: 9,
            backgroundColor: "#f5f5fa",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "0 12px",
            fontSize: 14.5,
            fontWeight: 600,
            color: "#3d4353",
            flexShrink: 0,
          }}
        >
          {index > 0 ? (
            <span style={{ color: "#8b91a3", display: "flex", scale: 0.95 }}>
              <IconUsers />
            </span>
          ) : null}
          {chip}
          {index < 2 ? (
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#2fb47c",
              }}
            />
          ) : null}
        </div>
      ))}
    </div>

    <div style={{ flex: 1, minHeight: 0, padding: "0 16px 16px" }}>
      <div
        style={{
          marginTop: 10,
          textAlign: "right",
          fontSize: 15,
          color: "#6b7280",
        }}
      >
        Collapse All
      </div>

      {runs.map((run) => (
        <RunCard
          key={`${run.subject}-${run.time}`}
          run={run}
          spinnerAngle={spinnerAngle}
        />
      ))}

      {loadMore ? (
        <div
          style={{
            marginTop: 14,
            height: 48,
            borderRadius: 12,
            border: "1px solid #e9ebf2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16.5,
            color: "#3d4353",
            ...loadMoreStyle,
          }}
        >
          Load More
        </div>
      ) : null}
    </div>
  </Interactive.Div>
);
