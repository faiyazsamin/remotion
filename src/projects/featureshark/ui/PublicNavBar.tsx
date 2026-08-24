import { Interactive } from "remotion";
import {
  IconBell,
  IconCalendar,
  IconChat,
  IconChevronDown,
  IconHelpCircle,
  IconHomeOutline,
  IconLogout,
  IconMap,
  IconMonitor,
  IconSun,
} from "./icons";
import { BRAND_PURPLE, SITE_WIDTH, type PartProps } from "./tokens";

export const PUBLIC_NAV_WIDTH = 1306;
/**
 * Centred by an explicit offset rather than `left: 50%` + a translate, because
 * a scene animates `translate` to bring the bar in — the two would collide.
 */
const NAV_LEFT = (SITE_WIDTH - PUBLIC_NAV_WIDTH) / 2;

/** The site's sections, in the order the nav lists them. */
const NAV_ITEMS: { label: string; icon: React.ReactNode; caret?: boolean }[] = [
  { label: "Feedback", icon: <IconChat />, caret: true },
  { label: "Roadmap", icon: <IconMap /> },
  { label: "Changelog", icon: <IconCalendar /> },
  { label: "Help", icon: <IconHelpCircle /> },
];

const NavItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  caret?: boolean;
  active?: boolean;
}> = ({ label, icon, caret, active }) => (
  <span
    style={{
      height: 40,
      borderRadius: 11,
      /* The section you are on is the only one with a ground. */
      backgroundColor: active ? "#eeecfb" : "transparent",
      display: "flex",
      alignItems: "center",
      gap: 9,
      padding: active ? "0 14px" : 0,
      fontSize: 17,
      fontWeight: active ? 600 : 400,
      color: active ? BRAND_PURPLE : "#2b2f38",
      whiteSpace: "nowrap",
    }}
  >
    <span
      style={{
        color: active ? BRAND_PURPLE : "#5b6172",
        scale: 1.15,
        display: "flex",
      }}
    >
      {icon}
    </span>
    {label}
    {caret ? (
      <span style={{ color: "#8b91a3", scale: 1.2, display: "flex" }}>
        <IconChevronDown />
      </span>
    ) : null}
  </span>
);

/**
 * The public board's nav: a floating pill rather than a full-width bar, which is
 * what makes this read as the customer-facing site instead of the admin.
 */
export const PublicNavBar: React.FC<
  PartProps & {
    /**
     * `visitor` is the public view; `admin` is the same page previewed by a
     * signed-in admin, which swaps the right-hand controls.
     */
    variant?: "visitor" | "admin";
    /** Which section the nav highlights; none by default. */
    active?: string;
  }
> = ({ style, variant = "visitor", active }) => (
  <Interactive.Header
    name="Public nav"
    style={{
      position: "absolute",
      left: NAV_LEFT,
      top: 19,
      width: PUBLIC_NAV_WIDTH,
      height: 68,
      borderRadius: 20,
      backgroundColor: "#ffffff",
      boxShadow: "0 2px 14px rgba(24, 28, 45, 0.06)",
      display: "flex",
      alignItems: "center",
      gap: 26,
      padding: "0 28px",
      boxSizing: "border-box",
      ...style,
    }}
  >
    <span style={{ fontSize: 22, fontWeight: 800, color: "#16181d" }}>
      AcmeCorp
    </span>

    {NAV_ITEMS.map((item) => (
      <NavItem
        key={item.label}
        label={item.label}
        icon={item.icon}
        caret={item.caret}
        active={item.label === active}
      />
    ))}

    <div
      style={{
        marginLeft: "auto",
        display: "flex",
        alignItems: "center",
        gap: variant === "admin" ? 18 : 22,
        color: "#5b6172",
      }}
    >
      {variant === "admin" ? (
        <>
          <span style={{ scale: 1.25, display: "flex" }}>
            <IconSun />
          </span>
          <span style={{ scale: 1.35, display: "flex" }}>
            <IconBell />
          </span>
          <span
            style={{
              height: 40,
              borderRadius: 11,
              border: "1.4px solid #e6e7ee",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "0 16px",
              fontSize: 16.5,
              fontWeight: 600,
              color: "#2b2f38",
            }}
          >
            <IconHomeOutline size={18} />
            Admin
          </span>
          <span
            style={{
              height: 40,
              borderRadius: 11,
              backgroundColor: BRAND_PURPLE,
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "0 18px",
              fontSize: 16.5,
              fontWeight: 700,
            }}
          >
            <IconLogout size={18} />
            Logout
          </span>
        </>
      ) : (
        <>
          <IconMonitor size={20} />
          <span style={{ scale: 1.35, display: "flex" }}>
            <IconBell />
          </span>
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              backgroundColor: "#f1f1f6",
              color: "#3d4353",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            T
          </span>
        </>
      )}
    </div>
  </Interactive.Header>
);
