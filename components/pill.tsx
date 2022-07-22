import { MotionBox } from "components/motion-box";

export const Pill = (
  props: React.ComponentPropsWithoutRef<typeof MotionBox>
) => {
  return (
    <MotionBox
      px="8"
      border="2px solid #f2bebe"
      borderRadius="full"
      boxShadow="4px 4px 13px 0px #F2BEBEA1"
      background="#fffafa"
      color="#f2bebe"
      fontSize="24px"
      fontStyle="italic"
      fontWeight="700"
      textAlign="center"
      // @ts-expect-error https://chakra-ui.com/getting-started/with-framer#chakra-factory
      transition={{ duration: 0.1 }}
      _hover={{
        color: "#9835BA",
        border: "2px solid #9835BA",
      }}
      whileTap={{ scale: 0.95 }}
      {...props}
    />
  );
};
