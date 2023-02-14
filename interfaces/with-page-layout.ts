import type { NextPage } from "next";
import { SEOobject } from "./seo-type";

export type WithPageLayout = NextPage & {
    PageLayout?: React.ComponentType<any>;
    SEO?: SEOobject;
    updateSEO?: (SEO: SEOobject) => void;
};
