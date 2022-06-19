import NextHead from "next/head";

export const Head = () => {
  return (
    <NextHead>
      <title>PsyDAO - A Psychedelics Research DAO</title>
      <meta
        content="PsyDAO - A Psychedelics Research DAO"
        property="og:title"
      />
      <meta content="/psydao-seo-image.jpg" property="og:image" />
      <meta
        content="PsyDAO - A Psychedelics Research DAO"
        property="twitter:title"
      />
      <meta content="/psydao-seo-image.jpg" property="twitter:image" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link
        href="/psydao-favicon-black.png"
        rel="shortcut icon"
        type="image/x-icon"
      />
      <link href="/psydao-webclip.png" rel="apple-touch-icon" />
    </NextHead>
  );
};
