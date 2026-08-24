import { Interactive } from "remotion";
import { IconArrowUp, IconChevronDown, IconChip, IconSun } from "./icons";
import { ADMIN_SCALE, REM, scaled, type PartProps } from "./tokens";

/** "Shark Agent" prompt box below the headline (`mt-8 rounded-2xl`). */
export const AdminHomeComposer: React.FC<PartProps> = ({ style }) => (
  <Interactive.Div
    name="Agent composer"
    style={{
      marginTop: 2 * REM,
      borderRadius: 1 * REM,
      border: `${scaled(1)}px solid #eceff9`,
      overflow: "hidden",
      backgroundColor: "#ffffff",
      boxShadow: `0 ${scaled(2)}px ${scaled(8)}px rgba(20, 28, 55, 0.03)`,
      ...style,
    }}
  >
    <div
      style={{
        height: scaled(44),
        borderBottom: `${scaled(1)}px solid #f2f4fb`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `0 ${scaled(16)}px`,
        boxSizing: "border-box",
        fontSize: scaled(12),
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: scaled(6) }}>
        <span style={{ color: "#6d7488", scale: ADMIN_SCALE, display: "flex" }}>
          <IconChip small />
        </span>
        <span style={{ color: "#4e556b", fontWeight: 600 }}>Shark Agent</span>
      </div>
      <span style={{ color: "#a0a8bc", scale: ADMIN_SCALE, display: "flex" }}>
        <IconChevronDown />
      </span>
    </div>

    <div
      style={{
        minHeight: scaled(72),
        display: "flex",
        alignItems: "center",
        padding: `0 ${scaled(12)}px`,
        color: "#9da4b8",
        fontSize: scaled(13),
      }}
    >
      Ask anything about your workspace...
    </div>

    <div
      style={{
        height: scaled(43),
        borderTop: `${scaled(1)}px solid #f2f4fb`,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: scaled(8),
        padding: `0 ${scaled(10)}px`,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: scaled(20),
          height: scaled(20),
          borderRadius: scaled(10),
          backgroundColor: "#edfff6",
          border: `${scaled(1)}px solid #69d8b2`,
          color: "#2ca984",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ scale: ADMIN_SCALE, display: "flex" }}>
          <IconChip tiny />
        </div>
      </div>
      <div
        style={{
          width: scaled(20),
          height: scaled(20),
          borderRadius: scaled(10),
          backgroundColor: "#f0fffd",
          border: `${scaled(1)}px solid #5ed4ca`,
          color: "#1e9e92",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ scale: ADMIN_SCALE, display: "flex" }}>
          <IconSun tiny />
        </div>
      </div>
      <div
        style={{
          width: scaled(24),
          height: scaled(24),
          borderRadius: "50%",
          backgroundColor: "#b4a6ff",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ scale: ADMIN_SCALE, display: "flex" }}>
          <IconArrowUp />
        </div>
      </div>
    </div>
  </Interactive.Div>
);
