/**
 * The release the changelog agent drafted, and its entries.
 *
 * The two entries are the two requests the film followed — integrations and dark
 * mode — written up as one release.
 */

export const RELEASE_TITLE = "Expanded Integrations";
export const RELEASE_STATUS = "Draft";

export type ChangelogEntry = { type: string; body: string };

export const RELEASE_ENTRIES: ChangelogEntry[] = [
  {
    type: "New",
    body: "Added new third-party integrations based on user requests from the [Feature Requests board](https://example.com/feature-requests). You can now connect the platform with additional services to streamline your workflows.",
  },
  {
    type: "New",
    body: "Added a dark mode theme that can be enabled to reduce eye strain and improve usability in low-light environments.",
  },
];

/** Entry types the workspace has, with the tint each one wears. */
export const ENTRY_TYPES = [
  { label: "New", tint: "#2f6fdb" },
  { label: "Improved", tint: "#b06cf0" },
  { label: "Fixed", tint: "#e05a5a" },
];

/** Release statuses, in the order the filter column lists them. */
export const RELEASE_STATUSES = ["Published", "Draft", "Scheduled"];

/**
 * How each status looks. Kept here rather than in the table so the list and any
 * other surface showing a release cannot disagree about it.
 */
export const RELEASE_STATUS_TINTS: Record<
  string,
  { color: string; background: string; border: string }
> = {
  Published: { color: "#1f8a52", background: "#eefaf2", border: "#b6e6c9" },
  Draft: { color: "#c98a1e", background: "#fffaf0", border: "#f0d49a" },
  Scheduled: { color: "#4b5bd0", background: "#f3f4ff", border: "#c8cdf5" },
};

/** The date the release goes out, as the admin list writes it. */
export const RELEASE_PUBLISH_DATE = "6/28/2026";
/** The same date, as the public page writes it. */
export const RELEASE_PUBLISH_DATE_LONG = "June 28, 2026";
export const RELEASE_AUTHOR = "Changelog Writer";
