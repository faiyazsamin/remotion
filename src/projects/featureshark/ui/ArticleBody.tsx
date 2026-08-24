import type { ArticleBlock } from "./helpCenterContent";
import { MarkupText } from "./MarkupText";
import type { PartProps } from "./tokens";

/**
 * Splits the article into the blocks that are in so far.
 *
 * Reveal is counted over one running total for the whole article rather than per
 * block, so a body being typed reads as a single stream. `revealed: undefined`
 * means all of it — which is what every surface but the editor wants.
 */
export const revealBlocks = (
  blocks: ArticleBlock[],
  revealed?: number,
): { block: ArticleBlock; text: string; caret: boolean }[] => {
  let consumed = 0;

  return blocks
    .map((block) => {
      const start = consumed;

      consumed += block.text.length + 1;

      if (revealed === undefined) {
        return { block, text: block.text, caret: false };
      }

      const take = revealed - start;

      return {
        block,
        text: take <= 0 ? "" : block.text.slice(0, take),
        caret: take > 0 && take < block.text.length,
      };
    })
    .filter((entry) => entry.text.length > 0);
};

const Caret: React.FC<{ shown?: boolean }> = ({ shown }) =>
  shown ? (
    <span
      style={{
        display: "inline-block",
        width: 2,
        height: "0.9em",
        marginLeft: 2,
        verticalAlign: "text-bottom",
        backgroundColor: "#20242f",
      }}
    />
  ) : null;

/**
 * The article's blocks, rendered the same way everywhere it appears — the
 * editor, the wizard and the public page all read from this, so what is typed is
 * what ships.
 *
 * `scale` is the one knob: the public page sets the body a little larger than the
 * editor does, and the headings follow it.
 */
export const ArticleBody: React.FC<
  PartProps & {
    blocks: ArticleBlock[];
    /** Characters in so far, or `undefined` for the finished article. */
    revealed?: number;
    scale?: number;
    blockStyle?: (index: number) => React.CSSProperties;
  }
> = ({ style, blocks, revealed, scale = 1, blockStyle }) => {
  const shown = revealBlocks(blocks, revealed);
  /* Numbered over the whole article, so the sections read 1, 2, 3, 4. */
  let heading = 0;

  return (
    <div style={style}>
      {shown.map((entry, index) => {
        const own = blockStyle?.(index);

        if (entry.block.kind === "h2") {
          heading += 1;

          return (
            <div
              key={index}
              style={{
                marginTop: index ? 34 * scale : 0,
                fontSize: 27 * scale,
                fontWeight: 600,
                color: "#20242f",
                ...own,
              }}
            >
              {heading}. {entry.text}
              <Caret shown={entry.caret} />
            </div>
          );
        }

        if (entry.block.kind === "h3") {
          return (
            <div
              key={index}
              style={{
                marginTop: index ? 30 * scale : 0,
                fontSize: 23 * scale,
                fontWeight: 500,
                color: "#20242f",
                ...own,
              }}
            >
              {entry.text}
              <Caret shown={entry.caret} />
            </div>
          );
        }

        return (
          <div
            key={index}
            style={{
              marginTop: 16 * scale,
              paddingLeft: entry.block.kind === "li" ? 30 * scale : 0,
              position: "relative",
              fontSize: 19 * scale,
              lineHeight: 1.62,
              color: "#3d4353",
              ...own,
            }}
          >
            {entry.block.kind === "li" ? (
              <span
                style={{
                  position: "absolute",
                  left: 8 * scale,
                  top: 12 * scale,
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#3d4353",
                }}
              />
            ) : null}
            <MarkupText text={entry.text} caret={entry.caret} />
          </div>
        );
      })}
    </div>
  );
};
