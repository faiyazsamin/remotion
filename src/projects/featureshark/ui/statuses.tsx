import {
  IconStatusClosed,
  IconStatusDone,
  IconStatusPlanned,
  IconStatusProgress,
  IconStatusReview,
} from "./icons";

/**
 * The workspace's statuses, in the order every surface lists them, with the one
 * definition of how each looks.
 *
 * `tint` is the glyph on its own — filter rows, kanban headers, menu items.
 * `pill` is the filled badge a feedback row wears. These used to be written out
 * separately in the table, the filter column and the roadmap, which meant a
 * status could look like three different colours depending on where you saw it.
 */
export type StatusMeta = {
  label: string;
  tint: string;
  pill: { color: string; background: string; border: string };
  Icon: React.FC<{ size?: number }>;
};

export const STATUS_META: StatusMeta[] = [
  {
    label: "Under Review",
    tint: "#e5a13a",
    pill: { color: "#c98a1e", background: "#fffaf0", border: "#f0d49a" },
    Icon: IconStatusReview,
  },
  {
    label: "Planned",
    tint: "#7c6cf0",
    pill: { color: "#6353d8", background: "#f4f3fe", border: "#d3cef8" },
    Icon: IconStatusPlanned,
  },
  {
    label: "In Progress",
    tint: "#6f7cf3",
    pill: { color: "#5b63e0", background: "#f2f3fe", border: "#d2d6fa" },
    Icon: IconStatusProgress,
  },
  {
    label: "Completed",
    tint: "#2fb47c",
    pill: { color: "#1f8a5b", background: "#eafaf2", border: "#b3e5cd" },
    Icon: IconStatusDone,
  },
  {
    label: "Closed",
    tint: "#9aa0ad",
    pill: { color: "#6b7280", background: "#f6f7f9", border: "#dfe2e8" },
    Icon: IconStatusClosed,
  },
];

export const statusMeta = (label: string): StatusMeta => {
  const meta = STATUS_META.find((entry) => entry.label === label);

  if (!meta) {
    throw new Error(`No status called ${label}`);
  }

  return meta;
};

/** The glyph for a status, in its own colour. */
export const StatusIcon: React.FC<{ label: string; size?: number }> = ({
  label,
  size = 17,
}) => {
  const meta = statusMeta(label);

  return (
    <span style={{ color: meta.tint, display: "flex" }}>
      <meta.Icon size={size} />
    </span>
  );
};
