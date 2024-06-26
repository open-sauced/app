import * as Sentry from "@sentry/nextjs";

export interface WidgetDefinition {
  name: string;
  arguments?: Record<string, Record<string, any>>;
}

/**
 * This function renders a StarSearch widget component based on the widget definition provided.
 * The function will look up the widget component in the component registry and render it with the provided arguments (component props).
 *
 * @param widgetDefinition - The widget definition object that contains the name of the widget and the arguments to pass to the widget.
 *
 * @returns The rendered widget component or null if the widget component is not found.
 *
 */
export function StarSearchWidget({
  componentRegistry,
  widgetDefinition,
}: {
  widgetDefinition: WidgetDefinition;
  componentRegistry: Map<string, React.ComponentType<any>>;
}) {
  const Component = componentRegistry.get(widgetDefinition.name);
  if (Component == null) {
    Sentry.captureException(
      new Error(
        `Component not found in the StarSearch component  registry. Widget definition: ${JSON.stringify(
          widgetDefinition
        )}`
      )
    );

    return null;
  }

  return (
    <div className="w-full pt-2" style={{ maxWidth: "440px" }}>
      <Component {...widgetDefinition.arguments} />
    </div>
  );
}
