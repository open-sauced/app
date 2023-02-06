import Head from "next/head";

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    twitterCard?: string;
    noindex?: boolean;
}

export default function SEO({description, image, title, twitterCard, noindex}: SEOProps) {

    return (
        <Head>
            <title key="title">{title || "OpenSauced Insights"}</title>
            <meta name="title" content={title || "OpenSauced Insights"} key="metatitle" />
            <meta name="description" content={description || "The open-source intelligence platform for developers and maintainers. Unlock the power of open source with project insights by the slice."} key="description" />

            <meta property="og:title" content={title || "OpenSauced Insights"} key="og:title" />
            <meta property="og:description" content={description || "The open-source intelligence platform for developers and maintainers. Unlock the power of open source with project insights by the slice."} key="og:description" />
            {image && <meta property="og:image" content={image} key="og:image" />}
            <meta property="og:site_name" content="OpenSauced Insights" key="og:site_name" />
            <meta property="og:type" content="website" key="og:type" />

            <meta name="twitter:title" content={title || "OpenSauced Insights"} key="twitter:title" />
            <meta name="twitter:description" content={description || "The open-source intelligence platform for developers and maintainers. Unlock the power of open source with project insights by the slice."} key="twitter:description" />
            {image && <meta name="twitter:image" content={image} key="twitter:image" />}
            <meta name="twitter:card" content={twitterCard || "summary"} key="twitter:card" />

            {noindex && <meta name="robots" content="noindex" key="noindex" />}
        </Head>
    )
}
