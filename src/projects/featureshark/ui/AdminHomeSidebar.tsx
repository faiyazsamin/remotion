import { AdminRail } from "./AdminRail";
import {
  IconBook,
  IconCalendar,
  IconChip,
  IconClipboard,
  IconFeedbackRail,
  IconHomeRail,
  IconMap,
  IconSettings,
  IconSurveys,
  IconUploadInbox,
  IconUserPlus,
  IconUsers,
} from "./icons";
import type { PartProps } from "./tokens";

/**
 * The rail as the product lists it: Home, Support, Feedback, Roadmap,
 * Changelog, Help Center, Surveys, Users, Team, Integrations, Settings, Agents.
 */
const SIDEBAR_ICONS = [
  <IconHomeRail key="home" />,
  <IconUploadInbox key="support" />,
  <IconFeedbackRail key="feedback" />,
  <IconMap key="roadmap" />,
  <IconCalendar key="changelog" />,
  <IconBook key="help" />,
  <IconClipboard key="surveys" />,
  <IconUsers key="users" />,
  <IconUserPlus key="team" />,
  <IconSurveys key="integrations" />,
  <IconSettings key="settings" />,
  <IconChip key="agents" />,
];

export type AdminHomeSidebarProps = PartProps & {
  logoStyle?: React.CSSProperties;
  iconStyle?: (index: number) => React.CSSProperties;
  footerStyle?: React.CSSProperties;
};

/**
 * Admin Home's rail. `iconStyle(index)` lets a scene stagger the icons as they
 * arrive; `footerStyle` is kept for older scene props.
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
    // No background: the rail sits straight on the page's purple ground, the
    // way the Feedback board's does.
    style={style}
    logoStyle={logoStyle}
    iconStyle={iconStyle}
    footerStyle={footerStyle}
  />
);
