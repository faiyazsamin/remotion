import { loadFont } from "@remotion/google-fonts/Manrope";

/**
 * Shared design tokens for the `1.htm` clone. Everything here is derived from
 * the real page rather than eyeballed, so a value can be checked against the
 * Tailwind class it came from.
 */

/** Delivery frame. Every composition in this project renders at 1080p60. */
export const SITE_WIDTH = 1920;
export const SITE_HEIGHT = 1080;
export const FPS = 60;

/** The viewport `1.htm` was captured at, which all its measurements are in. */
const CAPTURE_WIDTH = 1552;

/**
 * The admin page renders at the delivery frame like everything else. Its
 * capture is 2.02:1 against a 1.78:1 frame, so it cannot simply be scaled up —
 * it re-lays-out, and the extra height goes to the vertically-centred hero.
 */
export const ADMIN_HOME_WIDTH = SITE_WIDTH;
export const ADMIN_HOME_HEIGHT = SITE_HEIGHT;

/**
 * Capture pixels → frame pixels. Width-driven, so the page keeps exactly the
 * horizontal proportions it was captured with. Without this the whole surface
 * (a 46px rail, 11px labels) would keep its capture size inside a much larger
 * frame and read as a tiny UI floating in white.
 */
export const ADMIN_SCALE = SITE_WIDTH / CAPTURE_WIDTH;

/** Scales one capture-space measurement into frame space. */
export const scaled = (px: number) => px * ADMIN_SCALE;

/** FeatureShark's purple, shared by the admin rail and the embedded widget. */
export const BRAND_PURPLE = "#5c45df";

/**
 * The purple ground every admin surface floats on, and the gap between it and
 * the cards. Shared so Admin Home and the Feedback board cannot drift apart.
 */
export const ADMIN_GROUND =
  "linear-gradient(160deg, #4a35d6 0%, #3f2cc0 100%)";
export const ADMIN_GUTTER = 12;
/** Corner radius of the cards sitting on that ground. */
export const ADMIN_CARD_RADIUS = 14;

/**
 * Widget geometry. These live here rather than inside the widget because a
 * scene has to aim a cursor at controls buried inside the panel, and every
 * target has to be derived from the same numbers the panel lays out with.
 */
export const WIDGET_WIDTH = 520;
export const WIDGET_HEIGHT = 884;
export const WIDGET_RIGHT = 36;
export const WIDGET_TOP = 90;

/** Tab bar and credit line, which the list view has and the form view drops. */
export const WIDGET_NAV_HEIGHT = 74;
export const WIDGET_CREDIT_HEIGHT = 34;

export const FAB_SIZE = 52;
export const FAB_INSET = 18;

/** Centre of the panel's floating action button, in frame coordinates. */
export const fabCentre = (frameWidth: number) => ({
  x: frameWidth - WIDGET_RIGHT - FAB_INSET - FAB_SIZE / 2,
  y:
    WIDGET_TOP +
    WIDGET_HEIGHT -
    WIDGET_NAV_HEIGHT -
    WIDGET_CREDIT_HEIGHT -
    FAB_INSET -
    FAB_SIZE / 2,
});

/**
 * `1.htm` sets `html { font-size: var(--font-size-base, 0.92rem) }`, so one rem
 * on that page is 0.92 * 16px. Tailwind's rem-based spacing and type scale are
 * resolved through this, which is why e.g. `max-w-2xl` (42rem) is 618 capture
 * pixels rather than 672.
 *
 * Carried through `scaled` so every rem-derived size lands in frame space.
 */
export const REM = scaled(0.92 * 16);

/**
 * 1.htm loads Manrope (variable, 200-800). Falling back to Inter/Segoe made the
 * glyphs wider, which wrapped card titles onto a second line and pushed the
 * body copy down over the card art.
 */
const { fontFamily: MANROPE } = loadFont("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const FONT_STACK = `${MANROPE}, ui-sans-serif, system-ui, sans-serif`;

/** `max-w-2xl` on the hero column. */
export const HERO_MAX_WIDTH = 42 * REM;

/**
 * Every part of the page takes an optional `style` that is merged on top of its
 * layout style, so a scene can drive opacity, translate and scale without
 * forking the markup.
 */
export type PartProps = {
  style?: React.CSSProperties;
};
