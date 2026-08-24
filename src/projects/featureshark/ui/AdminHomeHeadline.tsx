import React from "react";
import { Interactive } from "remotion";
import { REM, type PartProps } from "./tokens";

export const HEADLINE =
  "Good to have you back, Faiyaz Samin. Where shall we start?";

const WORDS = HEADLINE.split(" ");

/**
 * Greeting headline (`text-3xl leading-tight tracking-tight`). Pass `wordStyle`
 * to animate it word by word, otherwise it renders as one static block of text.
 */
export const AdminHomeHeadline: React.FC<
  PartProps & { wordStyle?: (index: number) => React.CSSProperties }
> = ({ style, wordStyle }) => (
  <Interactive.H1
    name="Headline"
    style={{
      margin: 0,
      textAlign: "center",
      fontSize: 1.875 * REM,
      lineHeight: 1.25,
      color: "#252d42",
      letterSpacing: "-0.025em",
      fontWeight: 700,
      ...style,
    }}
  >
    {wordStyle
      ? WORDS.map((word, index) => (
          // The space lives outside the inline-block so it is not trimmed.
          <React.Fragment key={index}>
            <span style={{ display: "inline-block", ...wordStyle(index) }}>
              {word}
            </span>
            {index < WORDS.length - 1 ? " " : null}
          </React.Fragment>
        ))
      : HEADLINE}
  </Interactive.H1>
);
