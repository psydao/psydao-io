import {
  Box,
  Flex,
  Icon,
  Image,
  Link,
  type ResponsiveValue,
  Text,
  useMediaQuery
} from "@chakra-ui/react";
import { IoIosPlay, IoIosPause } from "react-icons/io";
import { Window } from "@/components/ui/window";
import { useWindowManager } from "@/components/ui/window-manager";
import { useMemo } from "react";
import { MotionBox } from "@/components/ui/motion-box";
import { useAudio } from "@/hooks/useAudio";
import { manifestoPlayer } from "@/constants/manifestoPlayer";

const ManifestoSectionTitle = ({
  title,
  width
}: {
  title: string;
  width: string;
}) => (
  <Flex alignItems={"center"} justifyContent={"center"} gap={6} mt={8} mb={2}>
    <Image w={width} src="/decoration-frame.svg" />
    <Text as="h2" mr={2} fontSize={{ base: "16px", sm: "22px" }}>
      {title}
    </Text>
    <Image w={width} src="/decoration-frame.svg" />
  </Flex>
);

const ManifestoBoldText = ({ text }: { text: string }) => (
  <Text as="span" fontWeight={700}>
    {text}
  </Text>
);

export const Manifesto = () => {
  const { state } = useWindowManager();
  const [isLargerThanMd] = useMediaQuery("(min-width: 768px)");

  const { playing, toggle } = useAudio(manifestoPlayer);

  const fullScreenWindow = useMemo(() => {
    if (state.fullScreen === "manifesto") {
      return true;
    }

    return false;
  }, [state]);

  return (
    <Window
      id="manifesto"
      maxHeight={{
        base: fullScreenWindow ? "100%" : "90%",
        sm: fullScreenWindow ? "100%" : "80%",
        md: fullScreenWindow ? "100%" : "650px"
      }}
      height={"100%"}
      maxWidth={{
        base: fullScreenWindow ? "100%" : "95%",
        md: fullScreenWindow ? "100%" : "602px"
      }}
      width={"100%"}
      top={{
        base: fullScreenWindow ? "0" : "55%",
        sm: fullScreenWindow ? "0" : "58%",
        md: fullScreenWindow ? "0" : "50%"
      }}
      left={"50%"}
      transform={
        fullScreenWindow ? "translate(-50%, 0)" : "translate(-50%, -50%)"
      }
      fullScreenWindow={fullScreenWindow}
      defaultIsOpen
    >
      <Window.TitleBar />
      <Window.Content
        layerStyle="window"
        position="relative"
        zIndex="0"
        p={0}
        overflowX={"hidden"}
      >
        <Box>
          <Flex
            px={{ base: "4", md: "8" }}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Flex direction={"column"} gap={1.5} py={6}>
              <Text
                textColor="#269200"
                fontWeight="500"
                fontStyle="italic"
                fontSize={{ base: "20px", sm: "36px" }}
                lineHeight={{ base: "20px", sm: "36px" }}
                as="h1"
              >
                The PsyDAO Manifesto
              </Text>
              <Text
                as="h2"
                fontSize={{ base: "16px", sm: "20px" }}
                lineHeight={{ base: "16px", sm: "20px" }}
              >
                An Industrial Ego Death
              </Text>
            </Flex>
            <Box position={"relative"}>
              <Box position={"fixed"} right={"50px"} top={"55px"} zIndex={1}>
                <Image src="/alan_watts.svg" />
                {playing && (
                  <Box
                    w={"64px"}
                    h={"64px"}
                    position={"absolute"}
                    top={0}
                    borderRadius={"100%"}
                    opacity={0.7}
                    background={"#9835BA"}
                  >
                    <Flex
                      justifyContent="center"
                      h={"100%"}
                      alignItems="center"
                    >
                      <Flex height="15px" width="40px" gap={"4px"}>
                        {[1, 2, 3, 4, 5].map((num, index) => (
                          <MotionBox
                            style={{
                              transform: "scaleY(.4)",
                              height: "100%",
                              width: "8px",
                              background: "#FFF",
                              borderRadius: "8px"
                            }}
                            animate={{
                              scaleY: [
                                1, 0.6, 0.4, 0.8, 0.4, 0.6, 0.4, 0.6, 0.4, 1.2,
                                1
                              ]
                            }}
                            transition={
                              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                              {
                                duration: 1.2,
                                ease: "easeInOut",
                                loop: Infinity,
                                delay: index * 0.1
                              } as unknown as ResponsiveValue<any>
                            }
                          />
                        ))}
                      </Flex>
                    </Flex>
                  </Box>
                )}
              </Box>
              <Box
                position={"fixed"}
                p={1}
                background={"#FFF"}
                zIndex={2}
                right={"40px"}
                top={"58px"}
                border={"1px solid #9835BA"}
                borderRadius={"100%"}
                cursor={"pointer"}
                onClick={toggle}
              >
                <Icon
                  position={"relative"}
                  left={playing ? 0 : "1px"}
                  as={playing ? IoIosPause : IoIosPlay}
                  display="block"
                  w={4}
                  h={4}
                  color="gray.700"
                />
              </Box>
            </Box>
          </Flex>
          <Box position="relative" width="100%" paddingBottom="56.25%" mb={8}>
            <Box
              as="iframe"
              position="absolute"
              px={{ base: "4", md: "8" }}
              top="0"
              left="0"
              height="100%"
              width="100%"
              src={`https://www.youtube-nocookie.com/embed/OFIO5LJ8sP8?modestbranding=1&rel=0`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded YouTube"
            />
          </Box>
          <Box
            px={{ base: "4", md: "8" }}
            background={`rgba(255, 255, 255, 0.7) right url(/clouds.png)`}
            backgroundBlendMode="overlay"
            mb={16}
          >
            <ManifestoSectionTitle title="Set" width="248px" />
            <Flex>
              <Text as="span" fontSize="55px" lineHeight="50px">
                O
              </Text>
              <Text>
                ur species faces unprecedented challenges from pandemics,
                climate crises, discord, and war. Many require radical shifts in
                human consciousness to overcome.
              </Text>
            </Flex>
            <Text mb={6}>
              For millennia, psychedelics have provided the human race with
              exactly that. Plants like Amanita muscaria, Banisteriopsis caapi,
              and Cannabis sativa and preparations with psychedelic effects like
              ayahuasca, ergotized beer, and soma have extensive spiritual,
              medicinal, and recreational value to the human race, with the
              lines between those domains often blurred.
            </Text>
            <Text mb={6}>
              Scientific understanding of psychedelics, while growing, is
              lacking. Prosecution of psychedelics users remains rampant. The
              same draconian legislation made it quite impossible to continue
              the academic study of psychedelics from the 1960s has only
              recently begun to relax.
            </Text>
            <Text mb={6}>
              With the regulatory and legislative environment around
              psychedelics improving, the maw of capitalism yawns in
              anticipation of medicinal and recreational use becoming more
              accessible. Experts fear that if psychedelics fall exclusively
              into the hands of industry and big pharma, much of the current
              progress will be stymied. Big Pharma, Big Law, and the other big
              dogs will take these drugs down the wrong path, making them
              inaccessible.
            </Text>
            <Text>
              What if we collectively owned psychedelics? We want to democratize
              access.
            </Text>
            <Text>
              What if we made psychedelics unmonopolizable? We want to
              decentralize power.
            </Text>
            <Text mb={6}>
              Instead of the wrong path, we take the path less traveled. From
              Satoshi Nakamoto all the way back to the first ape to ever pick
              and eat a psychedelic mushroom, it has made all the difference.
            </Text>
            <Text>
              We aim to frontrun industry, fund and build the public domain, and
              use the magic of tokenization to ensure that psychedelic
              intellectual property is freely traded, collectively owned, and
              responsibly managed for all humankind. Leveraging open science and
              open-source business models, we will build the landscape of the
              psychedelic future that is owned and operated by users. Using
              pseudonymity and privacy-preserving technologies, we will exist at
              the place where cypherpunks and psychonauts overlap.
            </Text>
            <ManifestoSectionTitle title="Setting" width="230px" />
            <Text>
              The narrative thread tying together humanity and psychedelics is
              ancient, and perhaps even precedes the origin of our species.
            </Text>
            <Text mb={6}>
              Some posit that as apes prospered throughout the paleolithic, some
              apes&#39; brains developed in an accelerated fashion due to
              consumption of psilocybin-containing mushrooms, giving birth to
              the mind of Homo sapiens, tool-using{" "}
              <ManifestoBoldText text="wordcels" /> and{" "}
              <ManifestoBoldText text="shape rotators" />. For thousands of
              years, nature controlled our access to these plants.
            </Text>
            <Text mb={6}>
              Others suspect that the democratization of the mystical experience
              introduced by <ManifestoBoldText text="ergotized wine" /> sparked
              the most viral and powerful religious movement in history,
              changing human consciousness forever. For hundreds of years,
              religion controlled our access.
            </Text>
            <Text mb={6}>
              Some say that the psychedelic revolution of the 1960s crested in a
              wave you can see sometimes if you go far out in the desert near
              Las Vegas with a head full of mescaline and a lawyer, but the wave
              rolled back when <ManifestoBoldText text="The Man" /> crept in, as{" "}
              <ManifestoBoldText text="The Man" /> always tends to do in our
              temporary autonomous zones, pausing psychedelic research for
              decades. For decades, the state has controlled our access.
            </Text>
            <Text>
              For apes and scientists, Greeks and Romans, Egyptians and Mayans,
              Hindus and Hopis, Maori and Matsigenga, Sami and Shipibo, Chinese,
              Europeans, Americans, and more, psychedelics have played an
              extensive role in history. But that role is limited compared to
              what&#39;s to come with democratized access to psychedelics.
            </Text>
            <ManifestoSectionTitle title="Sage" width="240px" />
            <Text mb={6}>
              After the whole wide world banned psychedelics in the fallout of
              the revolution of the 1960s, research and usage were driven
              underground, where the secret search for new psychedelic drugs
              began in earnest. Some cryptic chemists looked for ways to produce
              new psychedelics with similar properties to the scheduled
              substances but, in some cases, legal to manufacture and sell,
              believing that these psychedelics had possible{" "}
              <ManifestoBoldText text="therapeutic applications" /> and wishing
              to extend the sphere of human knowledge in this area. An icon
              among them: <ManifestoBoldText text="Dr. Alexander Shulgin." />
            </Text>
            <Text mb={6}>
              Shulgin was a researcher at Dow Chemical in the 60s when he
              ingested mescaline (which was first isolated and identified by{" "}
              <ManifestoBoldText text="Arthur Heffter" />
              in 1897, popularized by{" "}
              <ManifestoBoldText text="Alduous Huxley" /> in the Doors of
              Perception in 1954, and contained within hikuri (peyote), and
              other psychedelic cacti like San Pedro) for the first time.
            </Text>
            <Text mb={6}>
              Shulgin found the experience so astonishing that he devoted the
              rest of his career to psychedelic chemistry. He was convinced that
              there is a wealth of information built into us, with miles of
              intuitive knowledge tucked away in genetic material. Something
              akin to a library containing uncountable reference volumes.
              Without some means of access, there is no way to even begin to
              guess at the extent and quality of what is there.
            </Text>
            <Text mb={6}>
              To the new psychedelic adventurers, Shulgin is a post modern
              Prometheus bearing the gift of chemical enlightenment. This is why
              Shulgin&#39;s work is mostly in the public domain, free for the
              people to use, published in{" "}
              <ManifestoBoldText
                text="TiHKAL (Tryptamines I Have Known and
            Loved)"
              />{" "}
              and{" "}
              <ManifestoBoldText text="PiHKAL (Phenethylamine I Have Known and Loved)" />{" "}
              in the 1990s. His legacy is an open-source wealth of information
              that allows people to access life-changing chemicals.
            </Text>
            <Text mb={6}>
              Alexander Shulgin is known for the discovery, synthesis, and
              personal bioassay of over{" "}
              <ManifestoBoldText text="230 psychoactive compounds" /> for their
              psychedelic and entactogenic potential, and did so in a way that
              made it impossible to patent them. In the context of our current
              system, many organizations have thus far lacked incentives to
              develop them and explore them further. There was only a brief
              period when they saw the light of day, through the world wide web
              beginning in the late 90s, with public domain sites such as{" "}
              <ManifestoBoldText text="Erowid." />
            </Text>
            <Text>
              Online communities formed around the work of Shulgin&#39;
              prompting intense curiosity. These communities self-organized to
              procure these substances and then spread them across our globe.
              Today, a curious researcher will find millions of anecdotal blog
              posts in forums from savvy users -{" "}
              <ManifestoBoldText text="fully open-source, anonymous and uncontrolled." />
            </Text>
            <ManifestoSectionTitle title="Substance" width="218px" />
            <Text mb={6}>
              PsyDAO will revolutionize R&#38;D and ownership of psychedelics IP
              using the permissionless, trustless, decentralized, and
              censorship-resistant web, web3. And, in a nod to Shulgin,
              we&#39;re starting with <ManifestoBoldText text="TiHKAL" /> and{" "}
              <ManifestoBoldText text="PiHKAL." />
            </Text>
            <Text mb={6}>
              Web3, crypto, enables users to get involved in funding and
              ownership of IP, like <ManifestoBoldText text="VitaDAO" /> or{" "}
              <ManifestoBoldText text="BAYC" />, for both the creator economy
              and the scientific community. PsyDAO is using crypto to create a
              decentralized and unmonopolizable future for psychedelic research.
              PsyDAO members will be able to vote to allocate funding towards
              the studies and research they believe is most relevant, choose
              which data is shared, and govern how the output of these studies
              will come to market.
            </Text>
            <Text>
              Membership in PsyDAO is open to anons, pseudonymous participation
              is encouraged, and privacy protection is paramount. Knowledge and
              research can be shared with zero knowledge of the identity of the
              sender or recipient.
            </Text>
            <Text mb={6}>
              PsyDAO utilizes new open-source models for{" "}
              <ManifestoBoldText text="IP tokenization, IPNFTs," />
              and <ManifestoBoldText text="IP rights distribution," /> with
              ethical encumbrances, through fungible tokens.
            </Text>
            <Text mb={6}>
              PsyDAO intends to be a hivemind - a literal collective
              consciousness for the ethical development of psychedelics. The
              goal of PsyDAO is to redesign incentives and access from the
              bottom up - focusing on people (patients, recreational users, and
              spiritual communities), as opposed to centralizing ownership
              within organizations that have intrinsically misaligned
              incentives.
            </Text>
            <Text mb={6}>
              We see two distinct, yet complementary approaches related to the
              governance of psychedelic knowledge and related intellectual
              property - open source and community-governed.
            </Text>
            <Text mb={6}>
              PsyDAO will directly hold IP rights in underlying research
              projects that it supports, where applicable. PsyDAO will develop a
              growing portfolio of IP assets attached to{" "}
              <ManifestoBoldText text="NFTs," /> which can then be made
              available open-source by the community, or commercialized where
              appropriate in fair ways, using fractional{" "}
              <ManifestoBoldText text="ERC20s" /> called{" "}
              <ManifestoBoldText text="FRENS" /> and{" "}
              <ManifestoBoldText text="FAM." />
            </Text>
            <Text mb={6}>
              For naturally-occurring compounds such as psilocybin, PsyDAO aims
              to create powerful, open-source data repositories that will be
              governed by the community. For compounds where intellectual
              property claims are possible, we will develop a portfolio that is
              actively managed by the community in an aligned way promoting
              democratized access.
            </Text>
            <Text>
              A mixture of meme magic and mathemagic, the IP tokenization system
              built with our friends at Molecule and VitaDAO enables PsyDAO to
              create open research and participation markets for known
              psychedelics, selectively distributing rights and benefits to
              partners and contributors.
            </Text>
            <ManifestoSectionTitle title="Summary" width="218px" />
            <Text mb={14}>
              We are on the precipice of either ruin and revolution. Our species
              needs a radical shift in consciousness to preserve its light for
              the future. Since that first ape ate a psychedelic mushroom many
              millennia ago, we have been coming back to this moment here, now,
              apes together strong and ready for a psychedelic session. With it
              comes the realization that these molecules open up a whole new
              level of human experience that should be available to everyone who
              wants it. We must ensure that this world is available to anyone.
            </Text>
            <Link
              border="1px solid #9835BA"
              borderRadius="full"
              display="block"
              margin="0 auto"
              textAlign="center"
              px={{ base: "10px", sm: "32px" }}
              py="18px"
              fontStyle="italic"
              fontSize={{ base: "20px", sm: "25px" }}
              transition="all 200ms ease"
              _hover={{
                background: "#9835BA",
                color: "#FFF",
                textDecor: "none"
              }}
              href="https://discord.gg/FJHQtBZYdp"
              target="_blank"
              color="#9835BA"
            >
              Contribute to PsyDAO on Discord
            </Link>
          </Box>
        </Box>
      </Window.Content>
    </Window>
  );
};
