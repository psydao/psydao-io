import {
  Box,
  Button,
  CloseButton,
  Divider,
  Flex,
  Text,
} from "@chakra-ui/react";
import { ModalContainer } from "./modal";

type TsAndCsProps = {
  isOpen: boolean;
  onClose: () => void;
};

const TermsAndConditionsModal = (props: TsAndCsProps) => {
  return (
    <ModalContainer isOpen={props.isOpen} onClose={props.onClose}>
      <CloseButton
        position={"absolute"}
        top={5}
        right={5}
        onClick={props.onClose}
      />
      <Flex
        direction={"column"}
        alignItems={"flex-start"}
        w="100%"
        gap={4}
        pb={4}
      >
        <Flex direction={"column"} alignItems={"flex-start"}>
          <Text color="#9835BA" fontWeight={600} fontSize={"24px"}>
            psyDAO Token Sale
          </Text>
          <Text color="#9835BA" fontWeight={500} fontSize={"18px"}>
            Terms and Conditions
          </Text>
        </Flex>
        <Divider h={"2px"} border={0} bg={"gray.700"} w={"100%"} />
        <Flex
          direction={"column"}
          overflowY={"scroll"}
          maxW={{ base: "400px", lg: "600px" }}
          maxH={{ base: "300px", lg: "500px" }}
          gap={4}
        >
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat
            est velit egestas dui id ornare arcu odio. Arcu odio ut sem nulla
            pharetra diam. Vestibulum lectus mauris ultrices eros in cursus
            turpis massa. A arcu cursus vitae congue mauris. Tristique nulla
            aliquet enim tortor. Tincidunt tortor aliquam nulla facilisi cras
            fermentum odio. Odio morbi quis commodo odio. Vitae proin sagittis
            nisl rhoncus mattis rhoncus. Sodales neque sodales ut etiam. At
            tellus at urna condimentum mattis pellentesque id. Rhoncus aenean
            vel elit scelerisque mauris pellentesque pulvinar pellentesque
            habitant. Dolor purus non enim praesent elementum facilisis. Quam
            quisque id diam vel quam elementum pulvinar etiam.
          </Text>
          <Text>
            Suscipit adipiscing bibendum est ultricies integer quis. Purus sit
            amet luctus venenatis lectus magna fringilla urna porttitor. Orci ac
            auctor augue mauris augue neque gravida. Eu feugiat pretium nibh
            ipsum consequat. Vulputate enim nulla aliquet porttitor lacus
            luctus. Semper quis lectus nulla at volutpat. Sit amet consectetur
            adipiscing elit pellentesque habitant morbi. Diam maecenas sed enim
            ut sem. Mauris cursus mattis molestie a iaculis at erat pellentesque
            adipiscing. Orci sagittis eu volutpat odio facilisis mauris. Nunc
            eget lorem dolor sed. Nibh praesent tristique magna sit amet purus.
            Semper auctor neque vitae tempus quam pellentesque. Leo duis ut diam
            quam nulla porttitor massa. Commodo sed egestas egestas fringilla
            phasellus faucibus scelerisque. Tellus id interdum velit laoreet id
            donec. In egestas erat imperdiet sed. Aliquam ut porttitor leo a
            diam sollicitudin tempor id eu. Neque egestas congue quisque egestas
            diam. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor
            sit amet.
          </Text>
          <Text>
            Nullam non nisi est sit amet facilisis magna etiam tempor.
            Ullamcorper sit amet risus nullam eget felis eget nunc lobortis.
            Venenatis tellus in metus vulputate. Et netus et malesuada fames ac
            turpis egestas integer eget. Felis donec et odio pellentesque diam
            volutpat commodo. Vitae suscipit tellus mauris a diam maecenas.
            Fames ac turpis egestas maecenas pharetra convallis posuere morbi.
            Libero nunc consequat interdum varius sit amet mattis. Eget lorem
            dolor sed viverra ipsum. Tempus quam pellentesque nec nam aliquam
            sem. Gravida rutrum quisque non tellus. Vivamus at augue eget arcu
            dictum. Facilisis gravida neque convallis a cras semper auctor neque
            vitae. Est pellentesque elit ullamcorper dignissim cras tincidunt
            lobortis feugiat vivamus. Ut enim blandit volutpat maecenas
            volutpat. Diam vulputate ut pharetra sit amet aliquam id. Metus
            aliquam eleifend mi in nulla. Vitae aliquet nec ullamcorper sit amet
            risus nullam. Ipsum suspendisse ultrices gravida dictum fusce.
            Tellus mauris a diam maecenas sed enim ut sem viverra.
          </Text>
          <Text>
            Tincidunt nunc pulvinar sapien et ligula. Pretium aenean pharetra
            magna ac placerat. Diam donec adipiscing tristique risus nec feugiat
            in fermentum posuere. Faucibus interdum posuere lorem ipsum dolor.
            Ipsum consequat nisl vel pretium lectus quam. Lobortis feugiat
            vivamus at augue. Sem fringilla ut morbi tincidunt augue interdum
            velit euismod in. Justo donec enim diam vulputate ut. Bibendum at
            varius vel pharetra. Vitae congue mauris rhoncus aenean. Accumsan in
            nisl nisi scelerisque eu. Massa eget egestas purus viverra.
          </Text>
          <Text>
            Sed odio morbi quis commodo. Enim eu turpis egestas pretium aenean
            pharetra magna ac placerat. Phasellus faucibus scelerisque eleifend
            donec pretium. Lorem ipsum dolor sit amet consectetur adipiscing
            elit ut aliquam. Ornare quam viverra orci sagittis eu volutpat.
            Lectus mauris ultrices eros in cursus turpis massa tincidunt. Quis
            vel eros donec ac odio tempor. Montes nascetur ridiculus mus mauris
            vitae ultricies leo. Ullamcorper eget nulla facilisi etiam dignissim
            diam quis enim lobortis. At augue eget arcu dictum varius. Phasellus
            faucibus scelerisque eleifend donec pretium vulputate sapien. Sed
            velit dignissim sodales ut eu sem. Mattis vulputate enim nulla
            aliquet porttitor lacus. Ultrices dui sapien eget mi proin sed
            libero.
          </Text>
          <Flex w={"100%"} justifyContent={"center"}>
            <Button
              onClick={props.onClose}
              variant={"solid"}
              bg={"purple"}
              color={"white"}
              _hover={{
                backgroundColor: "purple.300",
                // color: "black",
              }}
            >
              Accept Terms and Conditions
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </ModalContainer>
  );
};

export default TermsAndConditionsModal;
