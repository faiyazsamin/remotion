import { FONT_STACK } from "./tokens";

type Run = { text: string; bold?: boolean; code?: boolean };

/**
 * Splits `**bold**` and `` `code` `` out of a line.
 *
 * Unterminated markers are left as plain text rather than swallowed, so a line
 * being revealed a character at a time never flickers between styles.
 */
export const splitRuns = (text: string): Run[] => {
  const runs: Run[] = [];
  let plain = "";

  const flush = () => {
    if (plain) {
      runs.push({ text: plain });
      plain = "";
    }
  };

  let index = 0;

  while (index < text.length) {
    const bold = text.startsWith("**", index)
      ? text.indexOf("**", index + 2)
      : -1;

    if (bold > -1) {
      flush();
      runs.push({ text: text.slice(index + 2, bold), bold: true });
      index = bold + 2;
      continue;
    }

    const code =
      text[index] === "`" ? text.indexOf("`", index + 1) : -1;

    if (code > -1) {
      flush();
      runs.push({ text: text.slice(index + 1, code), code: true });
      index = code + 1;
      continue;
    }

    plain += text[index];
    index += 1;
  }

  flush();

  return runs;
};

/** One line of article markup, with the caret when it is the line being typed. */
export const MarkupText: React.FC<{ text: string; caret?: boolean }> = ({
  text,
  caret,
}) => (
  <>
    {splitRuns(text).map((run, index) =>
      run.code ? (
        <span
          key={index}
          style={{
            fontFamily:
              'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
            fontSize: "0.92em",
            backgroundColor: "#f1f2f6",
            borderRadius: 4,
            padding: "1px 5px",
            color: "#2b2f3a",
          }}
        >
          {run.text}
        </span>
      ) : (
        <span
          key={index}
          style={{
            fontFamily: FONT_STACK,
            fontWeight: run.bold ? 700 : undefined,
            color: run.bold ? "#20242f" : undefined,
          }}
        >
          {run.text}
        </span>
      ),
    )}
    {caret ? (
      <span
        style={{
          display: "inline-block",
          width: 2,
          height: "1em",
          marginLeft: 1,
          verticalAlign: "text-bottom",
          backgroundColor: "#20242f",
        }}
      />
    ) : null}
  </>
);
