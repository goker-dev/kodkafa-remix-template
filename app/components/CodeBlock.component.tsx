import type { Language } from "prism-react-renderer";
import { Highlight } from "prism-react-renderer";
import { useMemo, useState } from "react";

function isLanguageSupported(language: string): language is Language {
  return (
    language === "markup" ||
    language === "bash" ||
    language === "c" ||
    language === "cpp" ||
    language === "css" ||
    language === "javascript" ||
    language === "jsx" ||
    language === "git" ||
    language === "graphql" ||
    language === "handlebars" ||
    language === "json" ||
    language === "makefile" ||
    language === "markdown" ||
    language === "python" ||
    language === "reason" ||
    language === "tsx" ||
    language === "typescript" ||
    language === "yaml"
  );
}

export const CodeBlock = ({
  language = "bash",
  children,
}: {
  language?: Language;
  children: string;
}) => {
  if (!isLanguageSupported(language))
    throw Error(`CodeBlock: language ${language} is not supported`);

  // TODO click copy
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const handleCopy = async () => {
    await navigator?.clipboard?.writeText(children);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 500);
  };

  const code = useMemo(
    () => (
      <Highlight code={children.trim()} language={language}>
        {({ className, tokens, getLineProps, getTokenProps }) => (
          <pre className={`overflow-scroll w-full ${className}`} style={{}}>
            <code className={className} style={{}}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} style={{}}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} style={{}} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    ),
    [children, language]
  );
  return (
    <div className="relative">
      <h3
        title={`a ${language} code sample`}
        className="absolute right-0 top-0 text-[.6rem] py-0.5 px-1.5 bg-white/5 rounded-bl-lg
        cursor-pointer"
        onClick={handleCopy}
      >
        {language}
        <i className={isCopied ? "icon-ok" : "icon-copy"} />
      </h3>

      {code}
    </div>
  );
};
