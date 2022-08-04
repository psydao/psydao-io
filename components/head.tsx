import NextHead from "next/head";

interface HeadProps {
  title?: string;
  image?: string;
  children?: React.ReactNode;
}

export const Head = ({
  title = "PsyDAO - A Psychedelics Research DAO",
  image = "/psydao-seo-image.png",
  children = null,
}: HeadProps) => {
  return (
    <NextHead>
      <title>{title}</title>
      <meta content={title} property="og:title" />
      <meta content={title} property="twitter:title" />
      <meta
        name="description"
        content="PsyDAO is forming a decentralised organisation with the goal of funding research at the intersection of psychedelics and mental health."
      />
      <meta content={image} property="og:image" />
      <meta content={image} property="twitter:image" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
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
      {children}
    </NextHead>
  );
};
