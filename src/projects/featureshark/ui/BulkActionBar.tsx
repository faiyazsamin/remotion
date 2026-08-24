import { Interactive } from "remotion";
import {
  IconCalendar,
  IconChevronDown,
  IconClipboard,
  IconClock,
  IconEllipsis,
  IconMap,
  IconPerson,
  IconStatusDone,
  IconTrash,
} from "./icons";
import { SITE_HEIGHT, SITE_WIDTH, type PartProps } from "./tokens";

export const BULK_BAR_WIDTH = 1300;
export const BULK_BAR_HEIGHT = 62;
export const BULK_BAR_BOTTOM = 28;
export const BULK_BAR_LEFT = (SITE_WIDTH - BULK_BAR_WIDTH) / 2;
export const BULK_BAR_TOP = SITE_HEIGHT - BULK_BAR_BOTTOM - BULK_BAR_HEIGHT;

/**
 * The bar's items are laid out at explicit offsets rather than by flex, so a
 * scene can aim a cursor at any of them from the same numbers the bar draws
 * with. Flex would put the positions out of reach.
 */
export const BULK_ITEMS = [
  { label: "Status", left: 180, width: 110, icon: <IconStatusDone size={17} />, menu: true },
  { label: "Board", left: 302, width: 105, icon: <IconClipboard />, menu: true },
  { label: "Assign...", left: 419, width: 130, icon: <IconPerson size={17} />, menu: true },
  { label: "Category", left: 561, width: 125, icon: <IconEllipsis size={16} />, menu: true },
  { label: "Roadmap", left: 698, width: 125, icon: <IconMap />, menu: true },
  { label: "ETA", left: 835, width: 85, icon: <IconClock size={17} />, menu: true },
  { label: "Spam", left: 932, width: 95, icon: <IconCalendar />, menu: false },
  { label: "Delete", left: 1039, width: 105, icon: <IconTrash size={16} />, menu: false },
  { label: "Deselect", left: 1156, width: 115, icon: null, menu: false },
];

/** Centre of one of the bar's controls, in frame coordinates. */
export const bulkItemCentre = (label: string) => {
  const item = BULK_ITEMS.find((entry) => entry.label === label);

  if (!item) {
    throw new Error(`No bulk action called ${label}`);
  }

  return {
    x: BULK_BAR_LEFT + item.left + item.width / 2,
    y: BULK_BAR_TOP + BULK_BAR_HEIGHT / 2,
  };
};

export const BULK_MENU_WIDTH = 230;
export const BULK_MENU_ITEM_HEIGHT = 40;
export const BULK_MENU_PADDING = 8;

/**
 * The status menu opens upward out of the bar, so its bottom is pinned just
 * above it and its items are measured up from there.
 */
export const bulkMenuItemCentre = (index: number, itemCount: number) => {
  const item = BULK_ITEMS[0];
  const height = itemCount * BULK_MENU_ITEM_HEIGHT + BULK_MENU_PADDING * 2;
  const top = BULK_BAR_TOP - 8 - height;

  return {
    x: BULK_BAR_LEFT + item.left + 115,
    y:
      top +
      BULK_MENU_PADDING +
      index * BULK_MENU_ITEM_HEIGHT +
      BULK_MENU_ITEM_HEIGHT / 2,
  };
};

/** A menu opened out of one of the bar's controls. */
export const BulkMenu: React.FC<
  PartProps & {
    items: { label: string; icon: React.ReactNode }[];
    itemStyle?: (label: string, index: number) => React.CSSProperties;
  }
> = ({ style, items, itemStyle }) => {
  const height = items.length * BULK_MENU_ITEM_HEIGHT + BULK_MENU_PADDING * 2;

  return (
    <Interactive.Div
      name="Bulk menu"
      style={{
        position: "absolute",
        left: BULK_BAR_LEFT + BULK_ITEMS[0].left,
        top: BULK_BAR_TOP - 8 - height,
        width: BULK_MENU_WIDTH,
        borderRadius: 12,
        backgroundColor: "#ffffff",
        boxShadow: "0 14px 40px rgba(24, 28, 45, 0.18)",
        padding: BULK_MENU_PADDING,
        boxSizing: "border-box",
        // Grows out of its own bottom edge, where the bar it belongs to sits.
        transformOrigin: "20% 100%",
        ...style,
      }}
    >
      {items.map((item, index) => (
        <div
          key={item.label}
          style={{
            height: BULK_MENU_ITEM_HEIGHT,
            display: "flex",
            alignItems: "center",
            gap: 11,
            padding: "0 12px",
            boxSizing: "border-box",
            fontSize: 16.5,
            color: "#20242f",
            ...itemStyle?.(item.label, index),
          }}
        >
          {item.icon}
          {item.label}
        </div>
      ))}
    </Interactive.Div>
  );
};

/**
 * The dark bar that appears when rows are selected. It floats over the board
 * rather than displacing it, which is why it is an overlay rather than part of
 * the card.
 */
export const BulkActionBar: React.FC<PartProps & { selected: number }> = ({
  style,
  selected,
}) => (
  <Interactive.Div
    name="Bulk actions"
    style={{
      position: "absolute",
      left: BULK_BAR_LEFT,
      top: BULK_BAR_TOP,
      width: BULK_BAR_WIDTH,
      height: BULK_BAR_HEIGHT,
      borderRadius: 999,
      backgroundColor: "#3b3f4a",
      color: "#ffffff",
      boxShadow: "0 12px 34px rgba(20, 24, 40, 0.28)",
      ...style,
    }}
  >
    <div
      style={{
        position: "absolute",
        left: 18,
        top: 0,
        height: BULK_BAR_HEIGHT,
        display: "flex",
        alignItems: "center",
        gap: 11,
        fontSize: 16.5,
      }}
    >
      <span
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          backgroundColor: "#5c45df",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 15,
          fontWeight: 700,
        }}
      >
        {selected}
      </span>
      selected
    </div>

    <span
      style={{
        position: "absolute",
        left: 160,
        top: 16,
        width: 1,
        height: 30,
        backgroundColor: "rgba(255, 255, 255, 0.18)",
      }}
    />

    {BULK_ITEMS.map((item) => (
      <div
        key={item.label}
        style={{
          position: "absolute",
          left: item.left,
          top: 0,
          width: item.width,
          height: BULK_BAR_HEIGHT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          fontSize: 16.5,
          color:
            item.label === "Delete"
              ? "#ff8080"
              : item.label === "Deselect"
                ? "rgba(255, 255, 255, 0.72)"
                : "#ffffff",
        }}
      >
        {item.icon}
        {item.label}
        {item.menu ? (
          <span style={{ opacity: 0.75, scale: 1.15, display: "flex" }}>
            <IconChevronDown />
          </span>
        ) : null}
      </div>
    ))}
  </Interactive.Div>
);
