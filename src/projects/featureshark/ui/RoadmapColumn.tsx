import { Interactive } from "remotion";
import {
  IconCalendar,
  IconChevronDown,
  IconEllipsis,
  IconHammer,
  IconPerson,
} from "./icons";
import type { PartProps } from "./tokens";

/** One item sitting in a roadmap stage. */
export type RoadmapItem = {
  title: string;
  board: string;
  author: string;
  time: string;
  votes: number;
  /** The scoring model's output — RICE, in this workspace. */
  score: string;
  style?: React.CSSProperties;
};

export type RoadmapStage = {
  label: string;
  icon: React.ReactNode;
  tint: string;
  items: RoadmapItem[];
  style?: React.CSSProperties;
};

const Card: React.FC<{ item: RoadmapItem }> = ({ item }) => (
  <Interactive.Div
    name={`Roadmap card: ${item.title}`}
    style={{
      backgroundColor: "#ffffff",
      border: "1px solid #eceef4",
      borderRadius: 12,
      padding: 14,
      boxSizing: "border-box",
      display: "flex",
      gap: 14,
      boxShadow: "0 1px 2px rgba(24, 28, 45, 0.04)",
      ...item.style,
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 46,
          borderRadius: 10,
          border: "1.4px solid #e5e7f0",
          padding: "6px 0 8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <span
          style={{
            color: "#8b91a3",
            rotate: "180deg",
            scale: 1.4,
            display: "flex",
          }}
        >
          <IconChevronDown />
        </span>
        <span style={{ fontSize: 16, fontWeight: 700, color: "#2b2f3a" }}>
          {item.votes}
        </span>
      </div>
      <span
        style={{
          minWidth: 44,
          height: 24,
          borderRadius: 7,
          backgroundColor: "#f1f2f7",
          color: "#4d5464",
          fontSize: 13,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {item.score}
      </span>
    </div>

    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <span
          style={{
            flex: 1,
            fontSize: 17,
            fontWeight: 700,
            color: "#20242f",
          }}
        >
          {item.title}
        </span>
        <span style={{ color: "#a9aebb", display: "flex", marginTop: 3 }}>
          <IconEllipsis size={15} />
        </span>
      </div>

      <div
        style={{
          marginTop: 8,
          fontSize: 14.5,
          fontWeight: 600,
          color: "#1f9d63",
        }}
      >
        {item.board}
      </div>

      <div
        style={{
          marginTop: 10,
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 13.5,
          color: "#7b8194",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <IconPerson size={14} />
          {item.author}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <IconCalendar />
          {item.time}
        </span>
      </div>
    </div>
  </Interactive.Div>
);

/**
 * One kanban stage. Empty stages carry the illustration and the drag prompt,
 * which is most of what this page shows — only one item is on the roadmap.
 */
export const RoadmapColumn: React.FC<PartProps & { stage: RoadmapStage }> = ({
  style,
  stage,
}) => (
  <Interactive.Div
    name={`Stage: ${stage.label}`}
    style={{
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      ...stage.style,
      ...style,
    }}
  >
    <div
      style={{
        flexShrink: 0,
        height: 52,
        display: "flex",
        alignItems: "center",
        gap: 11,
        padding: "0 4px",
        boxSizing: "border-box",
      }}
    >
      <span style={{ color: stage.tint, display: "flex" }}>{stage.icon}</span>
      <span style={{ fontSize: 17, fontWeight: 600, color: "#20242f" }}>
        {stage.label}
      </span>
      <span style={{ fontSize: 15.5, color: "#9aa0ad" }}>
        {stage.items.length}
      </span>
      <span
        style={{
          marginLeft: "auto",
          color: "#8b91a3",
          fontSize: 21,
          lineHeight: 1,
        }}
      >
        +
      </span>
    </div>

    <div
      style={{
        flex: 1,
        minHeight: 0,
        borderRadius: 12,
        backgroundColor: "#fafafc",
        border: "1px solid #f1f2f7",
        padding: 12,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {stage.items.length ? (
        stage.items.map((item) => <Card key={item.title} item={item} />)
      ) : (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: 46,
            gap: 16,
          }}
        >
          <span
            style={{
              width: 76,
              height: 76,
              borderRadius: "50%",
              backgroundColor: "#f4f4f8",
              color: stage.tint,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconHammer size={34} />
          </span>
          <span
            style={{ fontSize: 16.5, fontWeight: 600, color: "#4b5262" }}
          >
            No items in this stage yet.
          </span>
          <span style={{ fontSize: 15, color: "#9aa0ad", marginTop: -8 }}>
            Drag items here to get started!
          </span>
        </div>
      )}
    </div>
  </Interactive.Div>
);
