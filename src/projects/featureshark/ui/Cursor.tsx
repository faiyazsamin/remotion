import { Interactive } from "remotion";
import { CURSOR_TIP, HAND_TIP, IconCursor, IconHandPointer } from "./icons";
import type { PartProps } from "./tokens";

export const CURSOR_SIZE = 58;

/**
 * Oversized pointer, positioned by where its *tip* should land rather than by
 * its box — pass the target point and the offset is worked out from the active
 * shape's tip. Deliberately larger than a real cursor so it reads at video
 * scale.
 *
 * `hand` swaps the arrow for the pointing hand a browser shows over a control.
 * The two shapes have different tips, so the offset changes with it and the
 * point stays on target across the swap.
 */
export const Cursor: React.FC<
  PartProps & { x: number; y: number; size?: number; hand?: boolean }
> = ({ style, x, y, size = CURSOR_SIZE, hand }) => {
  const tip = hand ? HAND_TIP : CURSOR_TIP;
  const width = hand ? size : (size * 24) / 32;

  return (
    <Interactive.Div
      name="Cursor"
      style={{
        position: "absolute",
        left: x - width * tip.x,
        top: y - size * tip.y,
        // Scale about the tip so a click dip does not slide the point off target.
        transformOrigin: `${tip.x * 100}% ${tip.y * 100}%`,
        filter: "drop-shadow(0 3px 6px rgba(15, 18, 30, 0.28))",
        ...style,
      }}
    >
      {hand ? <IconHandPointer size={size} /> : <IconCursor size={size} />}
    </Interactive.Div>
  );
};
