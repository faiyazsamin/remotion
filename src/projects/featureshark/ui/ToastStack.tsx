import { Interactive } from "remotion";
import { IconBulb, IconClose, IconInfo, IconSpinner } from "./icons";
import type { PartProps } from "./tokens";

export const TOAST_WIDTH = 404;
export const TOAST_HEIGHT = 76;
export const TOAST_GAP = 12;

export type Toast = {
  title: string;
  body: string;
  /**
   * `info` for per-item confirmations, `tip` for a summary, `agent` for one an
   * agent raises — those carry its avatar and keep spinning while it works.
   */
  kind: "info" | "tip" | "agent";
  avatar?: React.ReactNode;
  /** Still working: shows a spinner where the others show nothing. */
  working?: boolean;
  style?: React.CSSProperties;
};

/**
 * Confirmations stacked up from the bottom-left corner, newest lowest — which is
 * the order they arrive, each pushing the previous one up.
 *
 * Positioned from the bottom so a toast appearing does not move the ones already
 * on screen: index 0 is the lowest.
 */
export const ToastStack: React.FC<
  PartProps & { toasts: Toast[]; spinnerAngle?: number }
> = ({ style, toasts, spinnerAngle = 0 }) => (
  <Interactive.Div
    name="Toasts"
    style={{ position: "absolute", inset: 0, ...style }}
  >
    {toasts.map((toast, index) => (
      <div
        key={toast.title + toast.body}
        style={{
          position: "absolute",
          left: 38,
          bottom: 30 + index * (TOAST_HEIGHT + TOAST_GAP),
          width: TOAST_WIDTH,
          minHeight: TOAST_HEIGHT,
          borderRadius: 14,
          backgroundColor: "#ffffff",
          boxShadow: "0 10px 34px rgba(24, 28, 45, 0.16)",
          padding: "16px 18px",
          boxSizing: "border-box",
          display: "flex",
          gap: 13,
          ...toast.style,
        }}
      >
        <span
          style={{
            color: toast.kind === "info" ? "#6b7280" : "#e0a63a",
            display: "flex",
            marginTop: 2,
            flexShrink: 0,
          }}
        >
          {toast.kind === "agent" ? (
            toast.avatar
          ) : toast.kind === "info" ? (
            <IconInfo size={18} />
          ) : (
            <IconBulb size={18} />
          )}
        </span>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 16.5, fontWeight: 700, color: "#1f232e" }}>
            {toast.title}
          </div>
          <div style={{ marginTop: 4, fontSize: 15, color: "#6b7280" }}>
            {toast.body}
          </div>
        </div>

        <span
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 10,
            flexShrink: 0,
          }}
        >
          <span style={{ color: "#b9bec9", display: "flex", marginTop: -6 }}>
            <IconClose size={13} />
          </span>
          {toast.working ? (
            <span
              style={{
                color: "#8b91a3",
                rotate: `${spinnerAngle}deg`,
                display: "flex",
              }}
            >
              <IconSpinner size={17} />
            </span>
          ) : null}
        </span>
      </div>
    ))}
  </Interactive.Div>
);
