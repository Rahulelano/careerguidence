import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
}

const SEO = ({
    title = "Wise Wave Edu Solutions",
    description = "Expert career guidance, admission assistance, and educational consulting services.",
    keywords = "career guidance, admission, study abroad, education, counseling",
    image = "/og-image.jpg",
    url = "https://wisewaveedusolutions.com"
}: SEOProps) => {
    const siteTitle = title === "Wise Wave Edu Solutions" ? title : `${title} | Wise Wave Edu Solutions`;

    return (
        <Helmet>
            {/* Basic Metadata */}
            <title>{siteTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={siteTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
        </Helmet>
    );
};

export default SEO;
