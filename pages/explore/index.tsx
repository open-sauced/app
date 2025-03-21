import Title from "components/atoms/Typography/title";
import Text from "components/atoms/Typography/text";

export const FEATURED_WORKSPACES = [
  "b355ecef-76a5-4451-972a-281e16ccf2e4", // Brandon's "Angular"
  "0950814d-ed16-4201-add8-d17479cfdc1f", // Zeu's "OSS Companies"
  "190972f6-caa8-4a90-a21d-2322259b90c7", // Bekah's "CNCF Top 30"
  "4835f232-ec69-474d-9b88-b2b779015e08", // John's "Go Hotness"
  "7b540a5d-a767-4f8f-8295-2eccf31ca568", // Brian's "Vite Ecosystem"
  "380d1129-cd99-4958-83c7-f5d8c4f778af", // Nick's "Daishi's Greatest Hits"
];

export default function ExplorePage() {
  return (
    <section className="flex flex-col items-center justify-center w-full py-20">
      <Title className="!text-4xl !leading-none mb-6" level={1}>
        Goodbye World
      </Title>
      <Text className="text-xl">The API is currently offline. This is a static placeholder page.</Text>
    </section>
  );
}
