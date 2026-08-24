import { Interactive } from "remotion";
import {
  IconBell,
  IconImage,
  IconSearch,
  IconShareSquare,
  IconSun,
} from "./icons";
import { ADMIN_SCALE, scaled, type PartProps } from "./tokens";

export type AdminHomeTopBarProps = PartProps & {
  searchStyle?: React.CSSProperties;
  utilityStyle?: React.CSSProperties;
};

/** Top bar: command-palette search field in the middle, utility icons right. */
export const AdminHomeTopBar: React.FC<AdminHomeTopBarProps> = ({
  style,
  searchStyle,
  utilityStyle,
}) => (
  <Interactive.Header
    name="Top bar"
    style={{
      height: scaled(48),
      flexShrink: 0,
      borderBottom: `${scaled(1)}px solid #eef1fb`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: `0 ${scaled(14)}px`,
      boxSizing: "border-box",
      ...style,
    }}
  >
    <div style={{ width: scaled(136) }} />

    <Interactive.Div
      name="Search field"
      style={{
        width: scaled(350),
        height: scaled(30),
        borderRadius: scaled(10),
        border: `${scaled(1)}px solid #e5e8f5`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `0 ${scaled(10)}px`,
        color: "#a2a8bb",
        fontSize: scaled(11),
        letterSpacing: scaled(0.1),
        boxSizing: "border-box",
        ...searchStyle,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: scaled(8) }}>
        <span style={{ color: "#9ca4b8", scale: ADMIN_SCALE, display: "flex" }}>
          <IconSearch />
        </span>
        <span>Press Cmd+K to search...</span>
      </div>
      <span
        style={{
          border: `${scaled(1)}px solid #e2e6f3`,
          borderRadius: scaled(6),
          minWidth: scaled(18),
          height: scaled(18),
          padding: `0 ${scaled(4)}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: scaled(10),
        }}
      >
        K
      </span>
    </Interactive.Div>

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: scaled(10),
        color: "#8f97ab",
        fontSize: scaled(11),
        ...utilityStyle,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: scaled(10), scale: ADMIN_SCALE }}>
        <IconImage />
        <IconShareSquare />
        <IconSun />
      </div>
      <span style={{ fontWeight: 500 }}>US</span>
      <div style={{ scale: ADMIN_SCALE, display: "flex" }}>
        <IconBell />
      </div>
      <span
        style={{
          width: scaled(20),
          height: scaled(20),
          borderRadius: "50%",
          backgroundColor: "#e8752f",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: scaled(10),
          fontWeight: 700,
        }}
      >
        F
      </span>
    </div>
  </Interactive.Header>
);
