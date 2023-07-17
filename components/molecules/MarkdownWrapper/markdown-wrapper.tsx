import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

interface MarkdownWrapperProps {
  content: string;
  paragraphClassName?: string;
}

const MarkdownWrapper = ({ content, paragraphClassName }: MarkdownWrapperProps) => (
  <ReactMarkdown
    components={{
      p: ({ node, ...props }) => <p {...props} className={paragraphClassName} />,
      h1: ({ node, ...props }) => <h1 {...props} className="text-3xl" />,
      h2: ({ node, ...props }) => <h2 {...props} className="text-2xl" />,
      h3: ({ node, ...props }) => <h3 {...props} className="text-xl" />,
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
