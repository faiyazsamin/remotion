/**
 * The help-centre article the admin writes, and the copy around it.
 *
 * It documents the integration the film just shipped — the release that went out
 * in the changelog is what there is to write a help article about.
 */

export const HELP_TOPIC = "Integrations";
export const ARTICLE_TITLE = "How to use GitHub integration";
export const ARTICLE_TITLE_LIMIT = 100;

export type ArticleBlock =
  /** A numbered section heading; the number comes from its order. */
  | { kind: "h2"; text: string }
  /** An unnumbered heading — the article's own title, and its sub-sections. */
  | { kind: "h3"; text: string }
  | { kind: "li"; text: string }
  | { kind: "p"; text: string };

/**
 * The article body. `**bold**` and `` `code` `` are the only markup, which is
 * what the editor's own toolbar produces.
 */
export const ARTICLE_BLOCKS: ArticleBlock[] = [
  { kind: "h3", text: "Comprehensive Guide: How to Use GitHub Integration" },
  {
    kind: "p",
    text: "GitHub integrations allow you to connect your code repositories with external tools, automation pipelines, project management boards, and communication platforms. Integrating GitHub into your workflow enhances collaboration, automates repetitive tasks, and ensures code quality throughout the development lifecycle.",
  },
  {
    kind: "p",
    text: "This guide covers the fundamental ways to integrate with GitHub, common integrations (such as Slack, Jira, and CI/CD tools), and step-by-step instructions for implementation.",
  },
  { kind: "h2", text: "Understanding GitHub Integration Types" },
  {
    kind: "p",
    text: "GitHub offers several mechanisms to connect with external platforms, depending on your requirements:",
  },
  {
    kind: "li",
    text: "**GitHub Apps:** The recommended way to integrate. GitHub Apps have granular permissions, are installed directly on organizations or repositories, and act independently without requiring a dedicated user seat.",
  },
  {
    kind: "li",
    text: "**OAuth Apps:** These act on behalf of a specific GitHub user. They are best suited when an external tool needs to perform actions using your explicit identity and access rights.",
  },
  {
    kind: "li",
    text: "**Webhooks:** Outbound HTTP callbacks that trigger when specific events happen on GitHub (e.g., a `push`, a `pull_request`, or an `issue` creation). Webhooks send data payloads to a specified server URL.",
  },
  {
    kind: "li",
    text: "**GitHub Actions:** Native automation workflows that can integrate with third-party services using custom actions available in the GitHub Marketplace.",
  },
  { kind: "h2", text: "Common GitHub Integrations & How to Use Them" },
  { kind: "h3", text: "A. Integrating GitHub with Slack (Communication)" },
  {
    kind: "p",
    text: "Keep your team updated on repository activities directly within your chat channels.",
  },
  {
    kind: "li",
    text: "**Install the app:** Add the GitHub app to your Slack workspace, then run `/github subscribe owner/repo` in the channel that should receive updates.",
  },
  {
    kind: "li",
    text: "**Confirm the connection:** Once the handshake completes, the repository row shows a green checkmark.",
  },
  { kind: "h2", text: "Best Practices for GitHub Integrations" },
  {
    kind: "li",
    text: "**Principle of Least Privilege:** When granting access to GitHub Apps or generating tokens, only select the absolute minimum permissions required (e.g., read-only access to code if it only needs to read a configuration file).",
  },
  {
    kind: "li",
    text: "**Avoid Hardcoding Secrets:** Never commit API keys, webhook secrets, or personal access tokens directly into your repository. Use **GitHub Secrets** (`Settings > Secrets and variables > Actions`) to store sensitive data safely.",
  },
  {
    kind: "li",
    text: "**Monitor Active Integrations:** Periodically audit your organization or account settings (`Settings > Third-party access` or `Installed GitHub Apps`) to remove integrations that are no longer in use.",
  },
  {
    kind: "li",
    text: '**Use Webhook Secrets:** Always configure a "Secret" when setting up webhooks to validate that the incoming payloads actually originate from GitHub and not a malicious source.',
  },
  { kind: "h2", text: "Troubleshooting Integration Issues" },
  {
    kind: "li",
    text: "**404 Not Found / 401 Unauthorized:** Check if your Personal Access Token has expired or lacks the necessary scopes. If using a GitHub App, ensure it is installed on the specific repository you are trying to access.",
  },
  {
    kind: "li",
    text: "**Webhooks Failing:** Go to your repository **Settings** > **Webhooks**, click on the failing webhook, and look at the **Recent Deliveries** tab. This provides the exact request header, payload, and server response code (e.g., `500 Internal Server Error`) to diagnose the destination server issue.",
  },
  {
    kind: "li",
    text: "**Organization Restrictions:** If an integration isn't working for a specific repository, ensure that the Organization owner has approved the third-party application access under `Organization Settings > Third-party access`.",
  },
];

/** How the wizard's three steps are labelled. */
export const WIZARD_STEPS = [
  {
    title: "Create New Article",
    subtitle: "Set up the basic details for your article.",
    /** The button that leaves this step. */
    next: "Next: Content",
    back: "Cancel",
  },
  {
    title: "Write Content",
    subtitle: "Write the full content of your article.",
    next: "Next: SEO",
    back: "Prev: Info",
  },
  {
    title: "SEO",
    subtitle: "Set up SEO, excerpt, and publishing options.",
    next: "Save as Draft",
    back: "Prev: Content",
  },
];

/** The button on the last step, once Publish Now is chosen instead. */
export const PUBLISH_ACTION = "Create and Publish Article";

export const PUBLISH_OPTIONS = [
  { label: "Save as Draft", detail: "Only visible to team members" },
  { label: "Publish Now", detail: "Visible to everyone immediately" },
];

/** Help Center's own accent, which the rail and the panel wear. */
export const HELP_ACCENT = "#1eaedc";
export const HELP_LOCALE = "en-US";

/** The article's own address, which the editor shows under the title. */
export const ARTICLE_URL =
  "https://acme.featureshark.test/help/en-US/topics/integrations/articles/how-to-use-github-integration";
/** The day it went out, which is the day the release did. */
export const ARTICLE_DATE = "6/28/2026";
export const ARTICLE_VIEWS = 1;

/** What the editor's Actions menu offers. */
export const ARTICLE_ACTIONS = [
  { label: "View Public Page", danger: false },
  { label: "Delete", danger: true },
];

/** The public help centre's masthead. */
export const HELP_PUBLIC_TITLE = "Help Center";
export const HELP_PUBLIC_TAGLINE =
  "Find answers to your questions and learn how to use our product.";
export const HELP_SEARCH_PLACEHOLDER = "Search for help articles...";
