import { BRAND_PURPLE } from "./tokens";

/** Who gets called out in comments; rendered as a mention wherever it appears. */
export const MENTION = "@Product Manager";

/**
 * A comment body is a list of blocks rather than a string, because agents write
 * structured replies — a lead-in, a bulleted set of questions, a sign-off.
 */
export type CommentBlock =
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] };

export const paragraph = (text: string): CommentBlock => ({ kind: "p", text });
export const bullets = (...items: string[]): CommentBlock => ({
  kind: "ul",
  items,
});

type Run = { text: string; mention?: boolean; bold?: boolean };

/**
 * Splits text into plain, `**bold**` and `@mention` runs.
 *
 * A partially typed mention still reads as one — while a composer is mid-word
 * the tail is a prefix of `MENTION`, so it highlights as it is typed rather than
 * snapping to purple on the last character.
 */
const splitRuns = (text: string): Run[] => {
  const runs: Run[] = [];
  let index = 0;

  while (index < text.length) {
    const bold = text.indexOf("**", index);
    const at = text.indexOf("@", index);

    // Whichever marker comes first wins; -1 means "not present".
    const next =
      bold === -1 ? at : at === -1 ? bold : Math.min(bold, at);

    if (next === -1) {
      runs.push({ text: text.slice(index) });
      break;
    }

    if (next > index) {
      runs.push({ text: text.slice(index, next) });
    }

    if (next === bold) {
      const close = text.indexOf("**", bold + 2);

      if (close === -1) {
        runs.push({ text: text.slice(bold) });
        break;
      }

      runs.push({ text: text.slice(bold + 2, close), bold: true });
      index = close + 2;
      continue;
    }

    const candidate = text.slice(at, at + MENTION.length);

    if (candidate === MENTION || MENTION.startsWith(candidate)) {
      runs.push({ text: candidate, mention: true });
      index = at + candidate.length;
    } else {
      runs.push({ text: "@" });
      index = at + 1;
    }
  }

  return runs;
};

/** Body text with mentions in the brand colour and `**bold**` promoted. */
export const RichText: React.FC<{ text: string }> = ({ text }) => (
  <>
    {splitRuns(text).map((run, index) => (
      <span
        key={index}
        style={{
          color: run.mention ? BRAND_PURPLE : undefined,
          fontWeight: run.mention || run.bold ? 700 : undefined,
          backgroundColor: run.mention ? "#f1eefc" : undefined,
          borderRadius: run.mention ? 7 : undefined,
          padding: run.mention ? "1px 5px 2px" : undefined,
          // A mention is one token: never let a line break land inside the name.
          whiteSpace: run.mention ? "nowrap" : undefined,
        }}
      >
        {run.text}
      </span>
    ))}
  </>
);

/** Renders a whole comment body at the caller's type scale. */
export const CommentBlocks: React.FC<{
  blocks: CommentBlock[];
  fontSize: number;
  lineHeight?: number;
}> = ({ blocks, fontSize, lineHeight = 1.62 }) => (
  <>
    {blocks.map((block, index) =>
      block.kind === "p" ? (
        <div
          key={index}
          style={{
            marginTop: index === 0 ? 0 : fontSize,
            fontSize,
            lineHeight,
            color: "#2f333c",
          }}
        >
          <RichText text={block.text} />
        </div>
      ) : (
        <div key={index} style={{ marginTop: fontSize * 0.8 }}>
          {block.items.map((item) => (
            <div
              key={item}
              style={{
                marginTop: fontSize * 0.7,
                display: "flex",
                gap: fontSize * 0.8,
                paddingLeft: fontSize,
                fontSize,
                lineHeight,
                color: "#2f333c",
              }}
            >
              <span style={{ color: "#6b7280" }}>•</span>
              <span>
                <RichText text={item} />
              </span>
            </div>
          ))}
        </div>
      ),
    )}
  </>
);
