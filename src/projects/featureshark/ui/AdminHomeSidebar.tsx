import { AdminRail } from "./AdminRail";
import {
  IconBook,
  IconCalendar,
  IconChart,
  IconChat,
  IconChip,
  IconClipboard,
  IconHome,
  IconMap,
  IconSettings,
  IconSurveys,
  IconSwitchWorkspace,
  IconUploadInbox,
  IconUserPlus,
  IconUsers,
} from "./icons";
import type { PartProps } from "./tokens";

/**
 * The rail as Admin Home lists it. Home comes first and is the active item on
 * this page; `IconSwitchWorkspace` sits on its own at the bottom.
 */
const SIDEBAR_ICONS = [
  <IconHome key="home" />,
  <IconUploadInbox key="upload" />,
  <IconChat key="chat" />,
  <IconMap key="map" />,
  <IconCalendar key="calendar" />,
  <IconBook key="book" />,
  <IconClipboard key="clipboard" />,
  <IconUsers key="users" />,
  <IconUserPlus key="user-plus" />,
  <IconSurveys key="surveys" />,
  <IconChart key="chart" />,
  <IconSettings key="settings" />,
  <IconChip key="chip" />,
];

export type AdminHomeSidebarProps = PartProps & {
  logoStyle?: React.CSSProperties;
  iconStyle?: (index: number) => React.CSSProperties;
  footerStyle?: React.CSSProperties;
};

/**
 * Admin Home's rail. `iconStyle(index)` lets a scene stagger the icons as they
 * arrive; the logo and the footer icon are driven by `logoStyle`/`footerStyle`.
 */
export const AdminHomeSidebar: React.FC<AdminHomeSidebarProps> = ({
  style,
  logoStyle,
  iconStyle,
  footerStyle,
}) => (
  <AdminRail
    icons={SIDEBAR_ICONS}
    activeIndex={0}
    footer={<IconSwitchWorkspace />}
    // No background: the rail sits straight on the page's purple ground, the
    // way the Feedback board's does.
    style={style}
    logoStyle={logoStyle}
    iconStyle={iconStyle}
    footerStyle={footerStyle}
  />
);
