import type { NextPage } from "next";

export type WithPageLayout<Q = {}> = NextPage<Q> & {
  PageLayout?: React.ComponentType<any>;
  SEO?: SEOobject;
  updateSEO?: (SEO: SEOobject) => void;
  isPrivateRoute?: boolean;
};
