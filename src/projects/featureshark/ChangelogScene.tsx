import {
  AbsoluteFill,
  Composition,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import {
  CHANGELOG_MAIN_LEFT,
  CHANGELOG_RAIL_ACTIVE,
  CHANGELOG_TABLE_TOP,
  ChangelogBoard,
  ChangelogDetail,
  configCloseCentre,
  configDateCentre,
  configDayCentre,
  configImageCentre,
  ConfigModal,
  configStatusCentre,
  configStatusOptionCentre,
  configurationCentre,
  countsFor,
  Cursor,
  DARK_MODE_ROW,
  FeedbackBoard,
  FPS,
  INTEGRATIONS_ROW,
  MEDIA_PLACEHOLDERS,
  PublicChangelogPost,
  MediaGalleryModal,
  mediaTileCentre,
  railSlotCentre,
  RELEASE_AUTHOR,
  RELEASE_ENTRIES,
  RELEASE_PUBLISH_DATE,
  RELEASE_PUBLISH_DATE_LONG,
  RELEASE_STATUS,
  RELEASE_STATUSES,
  RELEASE_TITLE,
  releaseTitleCentre,
  visitSiteCentre,
  SITE_HEIGHT,
  SITE_WIDTH,
  saveCentre,
  ToastStack,
  type FeedbackRow,
  type Release,
} from "./ui";

export const FeatureSharkChangelogSceneComposition = () => (
  <Composition
    id="FeatureSharkChangelogScene"
    component={ChangelogScene}
    durationInFrames={1920}
    fps={FPS}
    width={SITE_WIDTH}
    height={SITE_HEIGHT}
  />
);

const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);

const arrive = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

const press = (frame: number, at: number, low: number) =>
  interpolate(frame, [at - 4, at, at + 7], [1, low, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

/** Beat 1 — the rail takes us from the feedback board to the changelog. */
const RAIL_REACH_START = 44;
const RAIL_REACH_END = 92;
const RAIL_CLICK = 100;
const NAV = RAIL_CLICK + 4;
const NAV_LENGTH = 36;
const LIST = NAV + NAV_LENGTH;

/** Beat 2 — the drafted release is opened. */
const ROW_REACH_START = LIST + 60;
const ROW_REACH_END = LIST + 110;
const ROW_CLICK = LIST + 118;
const DETAIL = ROW_CLICK + 4;
const DETAIL_LENGTH = 34;

/** Beat 3 — Configuration opens over it. */
const CONFIG_REACH_START = DETAIL + 90;
const CONFIG_REACH_END = DETAIL + 136;
const CONFIG_CLICK = DETAIL + 144;
const MODAL = CONFIG_CLICK + 4;
const MODAL_LENGTH = 26;

/** Beat 4 — the featured slot opens the media gallery. */
const IMAGE_REACH_START = 520;
const IMAGE_REACH_END = 566;
const IMAGE_CLICK = 574;
const GALLERY = IMAGE_CLICK + 4;
const GALLERY_LENGTH = 26;

/** Beat 5 — a tile is picked, which fills the slot and closes the gallery. */
const TILE_REACH_START = GALLERY + 66;
const TILE_REACH_END = GALLERY + 112;
const TILE_CLICK = GALLERY + 120;
const PICKED = TILE_CLICK + 4;
const PICKED_LENGTH = 24;

/** Beat 6 — the status field opens its dropdown. */
const STATUS_REACH_START = PICKED + 66;
const STATUS_REACH_END = PICKED + 112;
const STATUS_CLICK = PICKED + 120;
const STATUS_MENU = STATUS_CLICK + 4;
const STATUS_MENU_LENGTH = 18;

/** Beat 7 — Published is chosen, which reveals the Publish Date field. */
const PUBLISHED_REACH_START = STATUS_MENU + 62;
const PUBLISHED_REACH_END = STATUS_MENU + 106;
const PUBLISHED_CLICK = STATUS_MENU + 114;
const PUBLISHED = PUBLISHED_CLICK + 4;
const PUBLISHED_LENGTH = 26;

/** Beat 8 — the date field opens the picker. */
const DATE_REACH_START = PUBLISHED + 70;
const DATE_REACH_END = PUBLISHED + 116;
const DATE_CLICK = PUBLISHED + 124;
const CALENDAR = DATE_CLICK + 4;
const CALENDAR_LENGTH = 18;

/** Beat 9 — a day is picked. */
const DAY_REACH_START = CALENDAR + 62;
const DAY_REACH_END = CALENDAR + 106;
const DAY_CLICK = CALENDAR + 114;
const DATE_SET = DAY_CLICK + 4;

/** Beat 10 — the dialog is dismissed and the release saved. */
const CLOSE_REACH_START = DATE_SET + 66;
const CLOSE_REACH_END = DATE_SET + 112;
const CLOSE_CLICK = DATE_SET + 120;
const CLOSED = CLOSE_CLICK + 4;
const CLOSE_LENGTH = 20;

const SAVE_REACH_START = CLOSED + 66;
const SAVE_REACH_END = CLOSED + 112;
const SAVE_CLICK = CLOSED + 120;
/** Saving closes the editor and puts us back on the list, now published. */
const SAVED = SAVE_CLICK + 4;
const SAVED_LENGTH = 30;

/** Beat 11 — visit the public site. */
const VISIT_REACH_START = SAVED + 82;
const VISIT_REACH_END = SAVED + 128;
const VISIT_CLICK = SAVED + 136;
const PUBLIC = VISIT_CLICK + 4;
const PUBLIC_LENGTH = 34;

/** Beat 12 — scroll down the published post. */
const SCROLL_START = PUBLIC + 118;
const SCROLL_END = SCROLL_START + 110;
const SCROLL_DISTANCE = 372;

/** June 2026 opens on a Monday, and the release goes out on the 28th. */
const CAL_MONTH = "June 2026";
const CAL_DAYS = 30;
const CAL_FIRST_WEEKDAY = 1;
const CAL_PICKED_DAY = 28;
const PUBLISH_DATE = "Jun 28, 2026";

/** Both requests are done by now — that is why there is a release to write. */
const BOARD_ROWS: FeedbackRow[] = [
  { ...DARK_MODE_ROW, status: "Completed", time: "6 hours ago" },
  { ...INTEGRATIONS_ROW, status: "Completed", time: "8 hours ago" },
];

/** One release, still a draft: the entries the agent generated. */
const RELEASES: Release[] = [
  {
    title: RELEASE_TITLE,
    types: RELEASE_ENTRIES.map((entry) => entry.type),
    status: RELEASE_STATUS,
    views: 0,
    date: "Not published",
  },
];

/** The same release after the save: published, dated, on the public site. */
const PUBLISHED_RELEASE: Release = {
  ...RELEASES[0],
  status: "Published",
  date: RELEASE_PUBLISH_DATE,
};

const RAIL_CHANGELOG = railSlotCentre(CHANGELOG_RAIL_ACTIVE);
const ROW_TITLE = (() => {
  const centre = releaseTitleCentre({ left: CHANGELOG_MAIN_LEFT });

  return { x: centre.x, y: CHANGELOG_TABLE_TOP + centre.y };
})();
const CONFIG_BUTTON = configurationCentre(SITE_WIDTH);

/*
  Every target below is measured by the modal itself, so it stays right as the
  dialog grows: `hasImage` makes the featured slot taller and pushes Status and
  Publish Date down, and each helper accounts for that.
*/
const EMPTY_IMAGE = configImageCentre();
const MEDIA_TILE = mediaTileCentre(0);
const STATUS_FIELD = configStatusCentre({ hasImage: true });
const PUBLISHED_OPTION = configStatusOptionCentre(
  RELEASE_STATUSES.indexOf("Published"),
  { hasImage: true },
);
const DATE_FIELD = configDateCentre({ hasImage: true });
const CAL_DAY = configDayCentre(CAL_PICKED_DAY, {
  hasImage: true,
  firstWeekday: CAL_FIRST_WEEKDAY,
});
const CLOSE_BUTTON = configCloseCentre();
const SAVE_BUTTON = saveCentre(SITE_WIDTH, SITE_HEIGHT);
const VISIT_BUTTON = visitSiteCentre(SITE_WIDTH);

const CURSOR_FROM = { x: -140, y: SITE_HEIGHT + 130 };
/** Clear of the editor once the release is open. */
const DETAIL_REST = { x: 570, y: 190 };
/** Off to the side once the dialog is up, not over its fields. */
const MODAL_REST = { x: 1500, y: 220 };
/** Inside the gallery but off the tiles, while it settles. */
const GALLERY_REST = { x: 1420, y: 300 };
/** Left of the post's body, out of the way while the page scrolls. */
const PUBLIC_REST = { x: 490, y: 850 };

const CURSOR_TIMES = [
  RAIL_REACH_START,
  RAIL_REACH_END,
  ROW_REACH_START,
  ROW_REACH_END,
  DETAIL + 8,
  DETAIL + 52,
  CONFIG_REACH_START,
  CONFIG_REACH_END,
  MODAL + 6,
  MODAL + 46,
  IMAGE_REACH_START,
  IMAGE_REACH_END,
  GALLERY + 6,
  GALLERY + 40,
  TILE_REACH_START,
  TILE_REACH_END,
  STATUS_REACH_START,
  STATUS_REACH_END,
  PUBLISHED_REACH_START,
  PUBLISHED_REACH_END,
  DATE_REACH_START,
  DATE_REACH_END,
  DAY_REACH_START,
  DAY_REACH_END,
  CLOSE_REACH_START,
  CLOSE_REACH_END,
  SAVE_REACH_START,
  SAVE_REACH_END,
  VISIT_REACH_START,
  VISIT_REACH_END,
  PUBLIC + 10,
  PUBLIC + 54,
];
const CURSOR_X = [
  CURSOR_FROM.x,
  RAIL_CHANGELOG.x,
  RAIL_CHANGELOG.x,
  ROW_TITLE.x,
  ROW_TITLE.x,
  DETAIL_REST.x,
  DETAIL_REST.x,
  CONFIG_BUTTON.x,
  CONFIG_BUTTON.x,
  MODAL_REST.x,
  MODAL_REST.x,
  EMPTY_IMAGE.x,
  EMPTY_IMAGE.x,
  GALLERY_REST.x,
  GALLERY_REST.x,
  MEDIA_TILE.x,
  MEDIA_TILE.x,
  STATUS_FIELD.x,
  STATUS_FIELD.x,
  PUBLISHED_OPTION.x,
  PUBLISHED_OPTION.x,
  DATE_FIELD.x,
  DATE_FIELD.x,
  CAL_DAY.x,
  CAL_DAY.x,
  CLOSE_BUTTON.x,
  CLOSE_BUTTON.x,
  SAVE_BUTTON.x,
  SAVE_BUTTON.x,
  VISIT_BUTTON.x,
  VISIT_BUTTON.x,
  PUBLIC_REST.x,
];
const CURSOR_Y = [
  CURSOR_FROM.y,
  RAIL_CHANGELOG.y,
  RAIL_CHANGELOG.y,
  ROW_TITLE.y,
  ROW_TITLE.y,
  DETAIL_REST.y,
  DETAIL_REST.y,
  CONFIG_BUTTON.y,
  CONFIG_BUTTON.y,
  MODAL_REST.y,
  MODAL_REST.y,
  EMPTY_IMAGE.y,
  EMPTY_IMAGE.y,
  GALLERY_REST.y,
  GALLERY_REST.y,
  MEDIA_TILE.y,
  MEDIA_TILE.y,
  STATUS_FIELD.y,
  STATUS_FIELD.y,
  PUBLISHED_OPTION.y,
  PUBLISHED_OPTION.y,
  DATE_FIELD.y,
  DATE_FIELD.y,
  CAL_DAY.y,
  CAL_DAY.y,
  CLOSE_BUTTON.y,
  CLOSE_BUTTON.y,
  SAVE_BUTTON.y,
  SAVE_BUTTON.y,
  VISIT_BUTTON.y,
  VISIT_BUTTON.y,
  PUBLIC_REST.y,
];
const CURSOR_EASINGS = CURSOR_TIMES.slice(1).map(() => EASE_OUT);

/**
 * Scene: the release the agent drafted, opened, configured and shipped.
 *
 * Changelog in the rail swaps the feedback board for the release list — the rail
 * is common to both, so it holds still and only its highlight moves. The one
 * draft opens into the editor, which takes the whole card rather than a pane,
 * because opening a release is going somewhere. Then Configuration opens over
 * it, and the release is dressed: a featured image out of the media gallery, the
 * status moved off Draft to Published, and a publish date off the calendar the
 * new status brings with it. Close, Save, done. Still from ~frame 1430.
 */
export const ChangelogScene: React.FC = () => {
  const frame = useCurrentFrame();

  const nav = arrive(frame, NAV, NAV + NAV_LENGTH);
  const modal = arrive(frame, MODAL, MODAL + MODAL_LENGTH);
  const gallery = arrive(frame, GALLERY, GALLERY + GALLERY_LENGTH);
  /* The gallery unwinds on the pick rather than cutting. */
  const galleryOut = arrive(frame, PICKED, PICKED + PICKED_LENGTH);
  const modalOut = arrive(frame, CLOSED, CLOSED + CLOSE_LENGTH);

  const saved = arrive(frame, SAVED, SAVED + SAVED_LENGTH);
  const public_ = arrive(frame, PUBLIC, PUBLIC + PUBLIC_LENGTH);

  const hasImage = frame >= PICKED;
  const status = frame >= PUBLISHED ? "Published" : RELEASE_STATUS;
  const showDate = frame >= PUBLISHED;

  const releases = (frame >= SAVED ? [PUBLISHED_RELEASE] : RELEASES).map(
    (release) => ({
      ...release,
      /* Nothing is selected once we are back from the editor. */
      selected: frame >= ROW_CLICK && frame < SAVED,
      style: {
        opacity:
          frame >= SAVED ? saved : arrive(frame, LIST - 16, LIST + 14),
      },
    }),
  );

  return (
    <AbsoluteFill
      name="Changelog scene"
      style={{ backgroundColor: "#3f2cc0" }}
    >
      {/* The board we are leaving, still there until the list covers it. */}
      {frame < LIST ? (
        <AbsoluteFill name="Feedback board">
          <FeedbackBoard rows={BOARD_ROWS} counts={countsFor(BOARD_ROWS)} />
        </AbsoluteFill>
      ) : null}

      {/*
        The list arrives over it. Both pages share the ground and the rail in the
        same place, so the only visible change is the highlight moving one slot.
      */}
      {(frame >= NAV && frame < DETAIL) || frame >= SAVED ? (
        <AbsoluteFill
          name="Changelog list"
          style={{
            opacity: frame >= SAVED ? saved : nav,
            scale: interpolate(frame, [NAV, NAV + NAV_LENGTH], [1.015, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE_OUT,
            }),
          }}
        >
          <ChangelogBoard releases={releases} />
        </AbsoluteFill>
      ) : null}

      {/* The editor replaces the list outright — it is a page, not a pane. */}
      {frame >= DETAIL && frame < SAVED + SAVED_LENGTH ? (
        <AbsoluteFill
          name="Release editor"
          style={{
            opacity: arrive(frame, DETAIL, DETAIL + 16),
            scale: interpolate(
              frame,
              [DETAIL, DETAIL + DETAIL_LENGTH],
              [1.02, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: EASE_OUT,
              },
            ),
            /*
              Pushed out of focus behind whatever is over it rather than hidden,
              and pulled back into focus once both dialogs are gone.
            */
            filter: `blur(${Math.max(modal - modalOut, gallery - galleryOut) * 6}px)`,
            /* And it steps back as the list returns over it. */
            translate: `0px ${saved * -14}px`,
          }}
        >
          <ChangelogDetail
            style={{ opacity: 1 - saved }}
            title={RELEASE_TITLE}
            entries={RELEASE_ENTRIES}
            bodyStyle={{ opacity: arrive(frame, DETAIL + 10, DETAIL + 32) }}
            entryStyle={(index) => {
              const at = DETAIL + 20 + index * 12;
              const shown = arrive(frame, at, at + 22);

              return {
                opacity: shown,
                translate: `0px ${(1 - shown) * 12}px`,
              };
            }}
          />
        </AbsoluteFill>
      ) : null}

      {frame >= MODAL && frame < CLOSED + CLOSE_LENGTH ? (
        <ConfigModal
          status={status}
          hasImage={hasImage}
          imageBackground={MEDIA_PLACEHOLDERS[0]}
          /* The picked tile lands in the slot rather than appearing in it. */
          imageStyle={{
            opacity: galleryOut,
            scale: interpolate(galleryOut, [0, 1], [1.06, 1]),
          }}
          statusOptions={RELEASE_STATUSES}
          statusOpen={frame >= STATUS_MENU && frame < PUBLISHED}
          statusMenuStyle={{
            opacity: arrive(frame, STATUS_MENU, STATUS_MENU + 12),
            scale: interpolate(
              frame,
              [STATUS_MENU, STATUS_MENU + STATUS_MENU_LENGTH],
              [0.96, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: EASE_OUT,
              },
            ),
          }}
          showDate={showDate}
          dateLabel={frame >= DATE_SET ? PUBLISH_DATE : "Select date"}
          /* The new field opens the dialog taller instead of popping in. */
          dateStyle={{
            opacity: arrive(frame, PUBLISHED + 4, PUBLISHED + 22),
            overflow: "hidden",
            height: interpolate(
              arrive(frame, PUBLISHED, PUBLISHED + PUBLISHED_LENGTH),
              [0, 1],
              [0, 108],
            ),
          }}
          calendarOpen={frame >= CALENDAR && frame < DATE_SET}
          calendarStyle={{
            opacity: arrive(frame, CALENDAR, CALENDAR + 12),
            scale: interpolate(
              frame,
              [CALENDAR, CALENDAR + CALENDAR_LENGTH],
              [0.96, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: EASE_OUT,
              },
            ),
          }}
          calendarMonth={CAL_MONTH}
          calendarDays={CAL_DAYS}
          calendarFirstWeekday={CAL_FIRST_WEEKDAY}
          calendarHighlighted={frame >= DAY_CLICK ? CAL_PICKED_DAY : undefined}
          scrimStyle={{
            opacity: arrive(frame, MODAL, MODAL + 16) - modalOut,
          }}
          cardStyle={{
            opacity: arrive(frame, MODAL, MODAL + 14) - modalOut,
            /* Comes forward out of the button that opened it. */
            scale:
              interpolate(frame, [MODAL, MODAL + MODAL_LENGTH], [0.955, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: EASE_OUT,
              }) * interpolate(modalOut, [0, 1], [1, 0.97]),
          }}
        />
      ) : null}

      {/* The media picker, over the dialog it was opened from. */}
      {frame >= GALLERY && frame < PICKED + PICKED_LENGTH ? (
        <MediaGalleryModal
          scrimStyle={{ opacity: gallery - galleryOut }}
          cardStyle={{
            opacity: gallery - galleryOut,
            scale:
              interpolate(gallery, [0, 1], [0.965, 1]) *
              interpolate(galleryOut, [0, 1], [1, 0.985]),
          }}
          /* The picked tile brightens as it is taken; the other steps back. */
          tileStyle={(index) =>
            index === 0
              ? { scale: press(frame, TILE_CLICK, 0.97) }
              : { opacity: 1 - galleryOut * 0.6 }
          }
        />
      ) : null}

      {/*
        What the save leaves behind. Index 0 is the lowest, so the entry update
        lands first and the save confirmation stacks under it.
      */}
      {frame >= SAVED && frame < PUBLIC ? (
        <ToastStack
          toasts={[
            {
              title: "Saved",
              body: "Changelog saved",
              kind: "info",
              style: {
                opacity: arrive(frame, SAVED + 10, SAVED + 26),
                translate: `0px ${(1 - arrive(frame, SAVED + 10, SAVED + 32)) * 18}px`,
              },
            },
            {
              title: "Success",
              body: "Changelog entry updated successfully.",
              kind: "info",
              style: {
                opacity: arrive(frame, SAVED, SAVED + 16),
                translate: `0px ${(1 - arrive(frame, SAVED, SAVED + 22)) * 18}px`,
              },
            },
          ]}
        />
      ) : null}

      {/*
        The customer-facing post. A hard cut to white rather than a transition —
        this is leaving the admin for the public site, and the release it shows is
        the one just configured, image and date included.
      */}
      {frame >= PUBLIC ? (
        <AbsoluteFill
          name="Published post"
          style={{
            opacity: public_,
            scale: interpolate(public_, [0, 1], [1.012, 1]),
          }}
        >
          <PublicChangelogPost
            title={RELEASE_TITLE}
            date={RELEASE_PUBLISH_DATE_LONG}
            author={RELEASE_AUTHOR}
            views={1}
            entries={RELEASE_ENTRIES}
            imageBackground={MEDIA_PLACEHOLDERS[0]}
            scroll={
              arrive(frame, SCROLL_START, SCROLL_END) * SCROLL_DISTANCE
            }
          />
        </AbsoluteFill>
      ) : null}

      <Cursor
        x={interpolate(frame, CURSOR_TIMES, CURSOR_X, {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: CURSOR_EASINGS,
        })}
        y={interpolate(frame, CURSOR_TIMES, CURSOR_Y, {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: CURSOR_EASINGS,
        })}
        hand
        style={{
          scale:
            press(frame, RAIL_CLICK, 0.88) *
            press(frame, ROW_CLICK, 0.88) *
            press(frame, CONFIG_CLICK, 0.88) *
            press(frame, IMAGE_CLICK, 0.88) *
            press(frame, TILE_CLICK, 0.88) *
            press(frame, STATUS_CLICK, 0.88) *
            press(frame, PUBLISHED_CLICK, 0.88) *
            press(frame, DATE_CLICK, 0.88) *
            press(frame, DAY_CLICK, 0.88) *
            press(frame, CLOSE_CLICK, 0.88) *
            press(frame, SAVE_CLICK, 0.88) *
            press(frame, VISIT_CLICK, 0.88),
        }}
      />
    </AbsoluteFill>
  );
};
