import { Link } from "@chakra-ui/react";

export const WhitepaperLink = () => (
  <Link
    h={"100%"}
    py={{ base: 2, md: 3 }}
    px={{ base: 2, md: 4 }}
    cursor={"pointer"}
    href="/documents/psydao-whitepaper.pdf"
    target="_blank"
    rel="noreferrer noopener"
    bg={"#AF52DE26"}
    borderRadius={"50px"}
    color={"#AF52DE"}
    fontFamily={"Inter Medium"}
    fontSize={{ base: 12, md: 14 }}
    _hover={{ textDecoration: "none" }}
  >
    Whitepaper
  </Link>
);
