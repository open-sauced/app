import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ErrorBoundary } from "@sentry/nextjs";
import clsx from "clsx";
import Card from "components/atoms/Card/card";
import AvatarHoverCard, { Avatar } from "components/atoms/Avatar/avatar-hover-card";
import { ChatAvatar } from "./ChatAvatar";
import { StarSearchWidget, WidgetDefinition } from "./StarSearchWidget";

export type StarSearchChatMessage =
  | { author: "You"; content: string }
  | { author: "StarSearch"; content: string | WidgetDefinition };

export function Chatbox({
  message,
  userId,
  componentRegistry,
}: {
  message: StarSearchChatMessage;
  userId?: number;
  componentRegistry: Map<string, React.ComponentType<any>>;
}) {
  if (typeof message.content == "string") {
    // Breaking all words so that the rendered markdown doesn't overflow the container
    // in certain cases where the content is a long string.
    return (
      <div className="grid items-start w-full gap-2 my-4 md:flex md:justify-center">
        <ChatAvatar author={userId ? message.author : "Guest"} userId={userId} />
        <Card className="flex flex-col grow bg-white p-2 lg:p-4 w-full max-w-xl lg:max-w-5xl" focusable>
          <h3 className="font-semibold text-sauced-orange">{message.author}</h3>
          <div aria-label="chat message">
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                a(props) {
                  switch (true) {
                    case typeof props.children === "string" && props.children.startsWith("@"): {
                      return (
                        <span className="inline-flex items-baseline self-center gap-1">
                          <span className="self-center">
                            <AvatarHoverCard
                              contributor={props.children.replace("@", "")}
                              repositories={[]}
                              size="xsmall"
                            />
                          </span>
                          <a {...props} />
                        </span>
                      );
                    }

                    // a repo page URL
                    case props.href && /s\/[^\/]+\/[^\/]+/.test(new URL(props.href).pathname): {
                      return (
                        <a
                          {...props}
                          className={clsx(props.className, "relative inline-flex items-baseline self-center gap-1")}
                        >
                          <span className="absolute" style={{ top: 6 }}>
                            <Avatar contributor={new URL(props.href).pathname.split("/")[2]} size="xxsmall" />
                          </span>
                          <span className="ml-5 ">{props.children}</span>
                        </a>
                      );
                    }

                    default:
                      return <a {...props} />;
                  }
                },
              }}
              className="star-search-chat-box prose break-words"
            >
              {message.content}
            </Markdown>
          </div>
        </Card>
      </div>
    );
  }

  if (!componentRegistry.has(message.content.name)) {
    return null;
  }

  // No fallback is being used for the dynamic widget because if it fails for some reason, it's better to not render it than cause
  // noise with a message like, unable to render the lotto factor widget. The widgets are additive to the textual response which
  // is still valuable.
  return (
    <ErrorBoundary>
      <li className="grid items-start w-full gap-2 my-4 md:flex md:justify-center">
        <ChatAvatar author={message.author} userId={userId} />
        <Card className="flex flex-col grow bg-white p-2 lg:p-4 w-full max-w-xl lg:max-w-5xl [&_a]:text-sauced-orange [&_a:hover]:underline">
          <h3 className="font-semibold text-sauced-orange">{message.author}</h3>
          <StarSearchWidget widgetDefinition={message.content} componentRegistry={componentRegistry} />
        </Card>
      </li>
    </ErrorBoundary>
  );
}
