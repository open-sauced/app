import type { NextPage } from "next";

export type WithPageLayout = NextPage & {
    PageLayout?: React.ComponentType<any>;
    SEO?: SEOobject;
    updateSEO?: (SEO: SEOobject) => void;
};
