import NextHead from "next/head";

interface HeadProps {
  title?: string;
  description?: string;
  image?: string;
  children?: React.ReactNode;
}

export const Head = ({
  title = "PsyDAO - A Psychedelics bioDAO",
  description = "PsyDAO is a decentralized autonomous organization promoting progress in psychedelic science and art using tokenization.",
  image = "https://psydao.io/psydao-seo-image.png",
  children = null
}: HeadProps) => {
  return (
    <NextHead>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <title>{title}</title>
      <meta content={title} property="og:title" />
      <meta content={title} property="twitter:title" />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta content={image} property="og:image" />
      <meta content={image} property="twitter:image" />
      <meta name="twitter:card" content="summary" />
      <link
        href="/psydao-favicon-light-mode.png"
        rel="shortcut icon"
        type="image/x-icon"
        media="(prefers-color-scheme: light)"
      />
      <link
        href="/psydao-favicon-dark-mode.png"
        rel="shortcut icon"
        type="image/x-icon"
        media="(prefers-color-scheme: dark)"
      />
      <link href="/psydao-apple-touch.png" rel="apple-touch-icon" />
      <link
        rel="preload"
        href="/fonts/amiri-latin-400-italic.woff2"
        as="font"
        type="font/woff2"
      />
      <link
        rel="preload"
        href="/fonts/amiri-latin-400.woff2"
        as="font"
        type="font/woff2"
      />
      <link
        rel="preload"
        href="/fonts/amiri-latin-700-italic.woff2"
        as="font"
        type="font/woff2"
      />
      <link
        rel="preload"
        href="/fonts/amiri-latin-700.woff2"
        as="font"
        type="font/woff2"
      />
      {children}
    </NextHead>
  );
};
