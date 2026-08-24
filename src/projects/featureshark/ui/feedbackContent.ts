import { bullets, paragraph, type CommentBlock } from "./CommentBody";
import { FORM_TITLE } from "./FeedbackWidgetFormView";
import { VISITOR_NAME } from "./PublicDiscussion";
import type { FeedbackRow } from "./FeedbackTable";

/**
 * The two feedback items the film follows, and the copy attached to them.
 *
 * Kept in one place because several scenes show the same item from different
 * surfaces — the admin table, the admin pane, the public page — and they must
 * not be able to disagree about titles, authors, counts or comment text.
 */

export const INTEGRATIONS_TITLE = FORM_TITLE;
export const DARK_MODE_TITLE = "Enable dark mode";

/** The agent's opening questions on the dark-mode request. */
export const DARK_MODE_QUESTIONS: CommentBlock[] = [
  paragraph(
    "Thanks for submitting this feature request! 👋 Could you please provide a bit more detail about what you're looking for? For example:",
  ),
  bullets(
    "Which parts of the app would you like to see a dark mode applied to?",
    "Do you prefer a manual toggle or an automatic switch based on system settings?",
    "Any specific color scheme or design references you have in mind?",
  ),
  paragraph(
    "This will help us better understand and evaluate your request. Thanks!",
  ),
];

/** Its reply to the visitor chasing a ship date. */
export const DARK_MODE_FOLLOW_UP = paragraph(
  "Thanks for following up! The dark mode feature is currently **under review** by our team. We've noted the strong interest and it's on our radar, but I don't have a specific release date to share at this point. Your feedback helps us prioritize — please keep the votes and comments coming! We'll update this thread as soon as we have more concrete plans. 🚀",
);

export const INTEGRATIONS_ROW: FeedbackRow = {
  title: INTEGRATIONS_TITLE,
  board: "FEATURE REQUESTS",
  tag: "INTEGRATIONS",
  status: "Under Review",
  author: "Anonymous",
  authorInitial: "A",
  time: "a few seconds ago",
  votes: 0,
};

export const DARK_MODE_ROW: FeedbackRow = {
  title: DARK_MODE_TITLE,
  board: "FEATURE REQUESTS",
  tag: "DARK-MODE",
  status: "Under Review",
  author: VISITOR_NAME,
  authorInitial: VISITOR_NAME.charAt(0),
  time: "2 minutes ago",
  votes: 1,
};

/** Row board pills are uppercase; the filter column lists them title-cased. */
const BOARD_LABELS: Record<string, string> = {
  "FEATURE REQUESTS": "Feature Requests",
  "BUG REPORTS": "Bug Reports",
  IMPROVEMENTS: "Improvements",
};

/**
 * Filter counts derived from whichever rows are on the board, keyed by the same
 * labels the filter column renders — so a status change moves the counts without
 * anything else being touched.
 */
export const countsFor = (rows: FeedbackRow[]) => {
  const counts: Record<string, number> = {};

  for (const row of rows) {
    counts[row.status] = (counts[row.status] ?? 0) + 1;

    const board = BOARD_LABELS[row.board] ?? row.board;

    counts[board] = (counts[board] ?? 0) + 1;
  }

  return counts;
};

/** The workspace admin, who steps in to direct the agent. */
export const ADMIN_NAME = "Acme Admin";
export const ADMIN_COMMENT =
  "@Product Manager Add this to main roadmap and move this to planned and prioritize the feedback with RICE.";
