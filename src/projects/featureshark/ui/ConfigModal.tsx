import { Interactive } from "remotion";
import {
  IconArrowLeftSmall,
  IconArrowRightSmall,
  IconCalendar,
  IconChevronDown,
  IconClose,
  IconPaperPlane,
  IconPencil,
  IconStatusDone,
  IconStatusClosed,
} from "./icons";
import { FONT_STACK, SITE_WIDTH, type PartProps } from "./tokens";

export const CONFIG_WIDTH = 602;
/**
 * Pinned rather than centred: the dialog grows as fields appear, and a centred
 * dialog would slide every control a scene is aiming at.
 */
export const CONFIG_TOP = 236;
export const CONFIG_LEFT = (SITE_WIDTH - CONFIG_WIDTH) / 2;

const HEADER_HEIGHT = 96;
const PADDING = 26;
const BODY_TOP = 24;
const LABEL_HEIGHT = 22;
const LABEL_GAP = 12;
const FIELD_HEIGHT = 50;
const FIELD_GAP = 24;
const EMPTY_IMAGE_HEIGHT = 74;
const IMAGE_HEIGHT = 134;

const FIELD_WIDTH = CONFIG_WIDTH - PADDING * 2;

/** Where the featured-image slot sits, given whether it is filled. */
export const configImageCentre = ({
  hasImage = false,
}: { hasImage?: boolean } = {}) => {
  const top = CONFIG_TOP + HEADER_HEIGHT + BODY_TOP + LABEL_HEIGHT + LABEL_GAP;
  const height = hasImage ? IMAGE_HEIGHT : EMPTY_IMAGE_HEIGHT;

  return { x: CONFIG_LEFT + CONFIG_WIDTH / 2, y: top + height / 2, top, height };
};

/** Top of the Status field, which everything below is measured from. */
const statusTop = (hasImage: boolean) => {
  const image = configImageCentre({ hasImage });

  return image.top + image.height + FIELD_GAP + LABEL_HEIGHT + LABEL_GAP;
};

export const configStatusCentre = ({
  hasImage = false,
}: { hasImage?: boolean } = {}) => ({
  x: CONFIG_LEFT + CONFIG_WIDTH / 2,
  y: statusTop(hasImage) + FIELD_HEIGHT / 2,
});

const OPTION_HEIGHT = 40;
const MENU_PADDING = 6;

/** Centre of one option in the Status dropdown. */
export const configStatusOptionCentre = (
  index: number,
  { hasImage = false }: { hasImage?: boolean } = {},
) => ({
  x: CONFIG_LEFT + PADDING + 120,
  y:
    statusTop(hasImage) +
    FIELD_HEIGHT +
    4 +
    MENU_PADDING +
    index * OPTION_HEIGHT +
    OPTION_HEIGHT / 2,
});

const dateTop = (hasImage: boolean) =>
  statusTop(hasImage) + FIELD_HEIGHT + FIELD_GAP + LABEL_HEIGHT + LABEL_GAP;

export const configDateCentre = ({
  hasImage = false,
}: { hasImage?: boolean } = {}) => ({
  x: CONFIG_LEFT + CONFIG_WIDTH / 2,
  y: dateTop(hasImage) + FIELD_HEIGHT / 2,
});

export const configCloseCentre = () => ({
  x: CONFIG_LEFT + CONFIG_WIDTH - PADDING - 9,
  y: CONFIG_TOP + 34,
});

/* ---- the date picker ------------------------------------------------ */

const CAL_LEFT_INSET = 26;
const CAL_PADDING = 12;
const CAL_HEADER = 34;
const CAL_WEEKDAYS = 26;
const CAL_CELL_W = 32;
const CAL_CELL_H = 30;

/** Where a given day sits in the calendar popover. */
export const configDayCentre = (
  day: number,
  {
    hasImage = false,
    firstWeekday = 1,
  }: { hasImage?: boolean; firstWeekday?: number } = {},
) => {
  const slot = firstWeekday + day - 1;
  const row = Math.floor(slot / 7);
  const column = slot % 7;
  const top = dateTop(hasImage) + FIELD_HEIGHT + 6;

  return {
    x:
      CONFIG_LEFT +
      CAL_LEFT_INSET +
      CAL_PADDING +
      column * CAL_CELL_W +
      CAL_CELL_W / 2,
    y:
      top +
      CAL_PADDING +
      CAL_HEADER +
      CAL_WEEKDAYS +
      row * CAL_CELL_H +
      CAL_CELL_H / 2,
  };
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const STATUS_ICONS: Record<string, React.ReactNode> = {
  Draft: <IconPencil size={17} />,
  Scheduled: <IconCalendar />,
  Published: <IconPaperPlane size={17} />,
};

const Calendar: React.FC<
  PartProps & {
    month: string;
    days: number;
    firstWeekday: number;
    highlighted?: number;
    top: number;
  }
> = ({ style, month, days, firstWeekday, highlighted, top }) => (
  <Interactive.Div
    name="Date picker"
    style={{
      position: "absolute",
      left: CAL_LEFT_INSET,
      top,
      width: CAL_PADDING * 2 + CAL_CELL_W * 7,
      borderRadius: 12,
      backgroundColor: "#ffffff",
      boxShadow: "0 16px 44px rgba(24, 28, 45, 0.2)",
      padding: CAL_PADDING,
      boxSizing: "border-box",
      transformOrigin: "20% 0%",
      ...style,
    }}
  >
    <div
      style={{
        height: CAL_HEADER,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "#3d4353",
      }}
    >
      <IconArrowLeftSmall size={17} />
      <span style={{ fontSize: 17, fontWeight: 700, color: "#20242f" }}>
        {month}
      </span>
      <IconArrowRightSmall size={17} />
    </div>

    <div style={{ height: CAL_WEEKDAYS, display: "flex" }}>
      {WEEKDAYS.map((day) => (
        <span
          key={day}
          style={{
            width: CAL_CELL_W,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            color: "#8b91a3",
          }}
        >
          {day}
        </span>
      ))}
    </div>

    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {/* Leading blanks so the first of the month lands on its weekday. */}
      {Array.from({ length: firstWeekday }, (_, index) => (
        <span key={`pad-${index}`} style={{ width: CAL_CELL_W, height: CAL_CELL_H }} />
      ))}
      {Array.from({ length: days }, (_, index) => index + 1).map((day) => (
        <span
          key={day}
          style={{
            width: CAL_CELL_W,
            height: CAL_CELL_H,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            color: "#20242f",
            borderRadius: 7,
            backgroundColor: day === highlighted ? "#eeecfb" : "transparent",
          }}
        >
          {day}
        </span>
      ))}
    </div>

    <div
      style={{
        marginTop: 10,
        borderTop: "1px solid #eef0f6",
        paddingTop: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span style={{ fontSize: 15, color: "#4d5462" }}>Clear</span>
      <span
        style={{
          height: 32,
          borderRadius: 8,
          backgroundColor: "#a99cf5",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          padding: "0 18px",
          fontSize: 15,
          fontWeight: 700,
        }}
      >
        Set
      </span>
    </div>
  </Interactive.Div>
);

/**
 * The release's configuration dialog.
 *
 * Every field's presence is a prop, and the geometry helpers above are derived
 * from the same constants this lays out with — so a scene can aim a cursor at a
 * control whose position depends on whether the fields above it exist yet.
 */
export const ConfigModal: React.FC<
  PartProps & {
    status: string;
    /** The featured slot is filled, which makes the dialog taller. */
    hasImage?: boolean;
    imageBackground?: string;
    imageStyle?: React.CSSProperties;
    /** Status dropdown, open over the field. */
    statusOptions?: string[];
    statusOpen?: boolean;
    statusMenuStyle?: React.CSSProperties;
    /** Publish date, which only a published release has. */
    showDate?: boolean;
    dateLabel?: string;
    dateStyle?: React.CSSProperties;
    /** Date picker, open under the date field. */
    calendarOpen?: boolean;
    calendarStyle?: React.CSSProperties;
    calendarMonth?: string;
    calendarDays?: number;
    calendarFirstWeekday?: number;
    calendarHighlighted?: number;
    scrimStyle?: React.CSSProperties;
    cardStyle?: React.CSSProperties;
  }
> = ({
  style,
  status,
  hasImage,
  imageBackground,
  imageStyle,
  statusOptions = [],
  statusOpen,
  statusMenuStyle,
  showDate,
  dateLabel = "Select date",
  dateStyle,
  calendarOpen,
  calendarStyle,
  calendarMonth = "June 2026",
  calendarDays = 30,
  calendarFirstWeekday = 1,
  calendarHighlighted,
  scrimStyle,
  cardStyle,
}) => {
  const label: React.CSSProperties = {
    height: LABEL_HEIGHT,
    fontSize: 16.5,
    color: "#3d4353",
  };
  const field: React.CSSProperties = {
    marginTop: LABEL_GAP,
    height: FIELD_HEIGHT,
    borderRadius: 11,
    border: "1.4px solid #e3e5ed",
    display: "flex",
    alignItems: "center",
    gap: 11,
    padding: "0 16px",
    boxSizing: "border-box",
    fontSize: 16.5,
    color: "#2b2f3a",
  };

  return (
    <Interactive.Div
      name="Configuration modal"
      style={{
        position: "absolute",
        inset: 0,
        fontFamily: FONT_STACK,
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(70, 60, 120, 0.28)",
          ...scrimStyle,
        }}
      />

      <Interactive.Div
        name="Configuration card"
        style={{
          position: "absolute",
          left: CONFIG_LEFT,
          top: CONFIG_TOP,
          width: CONFIG_WIDTH,
          borderRadius: 16,
          backgroundColor: "#ffffff",
          boxShadow: "0 30px 90px rgba(24, 20, 60, 0.26)",
          ...cardStyle,
        }}
      >
        <div
          style={{
            height: HEADER_HEIGHT,
            borderBottom: "1px solid #eef0f6",
            padding: `22px ${PADDING}px 0`,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#1f232e" }}>
              Configuration
            </div>
            <div style={{ marginTop: 6, fontSize: 16.5, color: "#6b7280" }}>
              Manage status, scheduling, and featured image.
            </div>
          </div>
          <span style={{ color: "#8b91a3", display: "flex", marginTop: 4 }}>
            <IconClose size={17} />
          </span>
        </div>

        <div
          style={{
            padding: `${BODY_TOP}px ${PADDING}px 30px`,
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          <div style={label}>Featured Gallery</div>

          {hasImage ? (
            <div
              style={{
                marginTop: LABEL_GAP,
                height: IMAGE_HEIGHT,
                borderRadius: 11,
                background: imageBackground,
                position: "relative",
                ...imageStyle,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  backgroundColor: "rgba(255, 255, 255, 0.88)",
                  color: "#4d5462",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconStatusClosed size={16} />
              </span>
            </div>
          ) : (
            <div
              style={{
                marginTop: LABEL_GAP,
                height: EMPTY_IMAGE_HEIGHT,
                borderRadius: 11,
                border: "1.6px dashed #d6d9e2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16.5,
                color: "#4d5462",
              }}
            >
              Add a featured image
            </div>
          )}

          <div style={{ marginTop: FIELD_GAP, ...label }}>Status</div>
          <div style={{ ...field, position: "relative" }}>
            <span style={{ color: "#6b7280", display: "flex" }}>
              {STATUS_ICONS[status]}
            </span>
            {status}
            <span
              style={{
                marginLeft: "auto",
                color: "#9aa0ad",
                scale: 1.3,
                display: "flex",
                rotate: statusOpen ? "180deg" : "0deg",
              }}
            >
              <IconChevronDown />
            </span>
          </div>

          {statusOpen ? (
            <div
              style={{
                position: "absolute",
                left: PADDING,
                top:
                  statusTop(Boolean(hasImage)) - CONFIG_TOP - HEADER_HEIGHT +
                  FIELD_HEIGHT +
                  4,
                width: FIELD_WIDTH,
                borderRadius: 12,
                backgroundColor: "#ffffff",
                boxShadow: "0 16px 44px rgba(24, 28, 45, 0.2)",
                padding: MENU_PADDING,
                boxSizing: "border-box",
                transformOrigin: "20% 0%",
                ...statusMenuStyle,
              }}
            >
              {statusOptions.map((option) => (
                <div
                  key={option}
                  style={{
                    height: OPTION_HEIGHT,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "0 12px",
                    boxSizing: "border-box",
                    fontSize: 16.5,
                    fontWeight: option === status ? 700 : 500,
                    color: "#20242f",
                  }}
                >
                  <span style={{ color: "#6b7280", display: "flex" }}>
                    {STATUS_ICONS[option]}
                  </span>
                  {option}
                  {option === status ? (
                    <span
                      style={{
                        marginLeft: "auto",
                        color: "#9aa0ad",
                        display: "flex",
                      }}
                    >
                      <IconStatusDone size={17} />
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}

          {showDate ? (
            <div style={dateStyle}>
              <div style={{ marginTop: FIELD_GAP, ...label }}>Publish Date</div>
              <div style={{ ...field, backgroundColor: "#fafafc" }}>
                <span style={{ color: "#6b7280", display: "flex" }}>
                  <IconCalendar />
                </span>
                {dateLabel}
                <span
                  style={{
                    marginLeft: "auto",
                    color: "#9aa0ad",
                    scale: 1.3,
                    display: "flex",
                    rotate: calendarOpen ? "180deg" : "0deg",
                  }}
                >
                  <IconChevronDown />
                </span>
              </div>
            </div>
          ) : null}

          {calendarOpen ? (
            <Calendar
              month={calendarMonth}
              days={calendarDays}
              firstWeekday={calendarFirstWeekday}
              highlighted={calendarHighlighted}
              top={
                dateTop(Boolean(hasImage)) - CONFIG_TOP - HEADER_HEIGHT +
                FIELD_HEIGHT +
                6
              }
              style={calendarStyle}
            />
          ) : null}
        </div>
      </Interactive.Div>
    </Interactive.Div>
  );
};
