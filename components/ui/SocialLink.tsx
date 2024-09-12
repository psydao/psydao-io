import { Icon, Link } from "@chakra-ui/react";
import { type ReactElement } from "react";

interface SocialLinkProps {
  href: string;
  icon: ReactElement;
  color: string;
  hoverColor: string;
}

export const SocialLink = ({
  href,
  icon,
  color,
  hoverColor
}: SocialLinkProps) => (
  <Link
    href={href}
    target="_blank"
    p="30%"
    color={color}
    _hover={{
      color: hoverColor,
      backgroundImage:
        "linear-gradient(to bottom, #ffffff 0%, #f3ffe9 50.52%, #e7feff 100%)"
    }}
    transition="all 200ms ease"
  >
    <Icon as={icon.type as React.ElementType} boxSize="full" />
  </Link>
);
