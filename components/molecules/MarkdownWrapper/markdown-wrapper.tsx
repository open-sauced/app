import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

interface MarkdownWrapperProps {
  content: string;
  paragraphClassName?: string;
}

const MarkdownWrapper = ({ content, paragraphClassName }: MarkdownWrapperProps) => (
  <ReactMarkdown
    className={paragraphClassName}
    components={{
      p: ({ node, ...props }) => <p {...props} className={paragraphClassName} />,
      code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || "");
        return !inline && match ? (
          <SyntaxHighlighter
            {...props}
            style={atomOneDark}
            className="rounded-md my-2"
            language={match[1]}
            PreTag="div"
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        ) : (
          <code {...props} className={className}>
            {children}
          </code>
        );
      },
    }}
  >
    {content}
  </ReactMarkdown>
);

export default MarkdownWrapper;
