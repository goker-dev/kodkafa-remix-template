import Markdoc, { type RenderableTreeNodes } from "@markdoc/markdoc";
import * as React from "react";
import { CodeBlock } from "~/components/CodeBlock.component";

type Props = { content: RenderableTreeNodes };
// SyntaxHighlighter.registerLanguage("javascript", js);

export function Fence({
  children,
  language,
}: {
  children: string;
  language: string;
}) {
  return <CodeBlock language={language}>{children}</CodeBlock>;
}

export function Markdown({ content }: Props) {
  return (
    // <>{renderers.react(content, React, { components: { Callout, Counter } })}</>
    <>
      {Markdoc.renderers.react(content, React, {
        components: {
          Fence,
        },
      })}
    </>
  );
}

//
// let content = parseMarkdown(`# Heading 1
//
// This is a **paragraph**.
//
// {% callout type="note" %}This is a callout.{% /callout %}
//
// {% counter initialValue=10 /%}
// `);
