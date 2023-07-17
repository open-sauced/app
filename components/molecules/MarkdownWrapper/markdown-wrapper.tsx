import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

interface MarkdownWrapperProps {
  content: string;
  pClassName?: string;
}

const MarkdownWrapper = ({ content, pClassName }: MarkdownWrapperProps) => (
  <ReactMarkdown
    // eslint-disable-next-line react/no-children-prop
    children={content}
    className=""
    components={{
      p: ({ node, ...props }) => <p {...props} className={pClassName} />,
      code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || "");
        return !inline && match ? (
          <SyntaxHighlighter
            {...props}
            // eslint-disable-next-line react/no-children-prop
            children={String(children).replace(/\n$/, "")}
            style={atomOneDark}
            className="rounded-md my-2"
            language={match[1]}
            PreTag="div"
          />
        ) : (
          <code {...props} className={className}>
            {children}
          </code>
        );
      },
    }}
  />
);

export default MarkdownWrapper;
