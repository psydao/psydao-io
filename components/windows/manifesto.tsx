import { Box, Image, Link, Text } from "@chakra-ui/react";

import { Window } from "components/window";

export const Manifesto = () => {
  return (
    <Window
      id="manifesto"
      height={{ base: "80%", md: "70%" }}
      maxHeight="1000px"
      minHeight="350px"
      width="95%"
      maxWidth="650px"
      minWidth="240px"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
    >
      <Window.TitleBar />
      <Window.Content layerStyle="window" position="relative" zIndex="0" p={0}>
        <Box
          px={{ base: "4", md: "8" }}
          pb="32"
          background="no-repeat bottom -100px left 0px / 100% 369px linear-gradient(to top, #f2bebe 100px, transparent)"
        >
          <Text color="#269200" fontSize="24px" mt="20">
            The PsyDAO Manifesto
          </Text>
          <Text as="h1" mb="6">
            An Industrial Ego Death
          </Text>
          <Box position="relative" width="100%" paddingBottom="56.25%">
            <Box
              as="iframe"
              position="absolute"
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
          <Text as="h2">Set</Text>
          <Text>
            Our species faces unprecedented challenges from pandemics, climate
            crises, discord, and war. Many require radical shifts in human
            consciousness to overcome.
          </Text>
          <Text>
            For millennia, psychedelics have provided the human race with
            exactly that. Plants like Amanita muscaria, Banisteriopsis caapi,
            and Cannabis sativa and preparations with psychedelic effects like
            ayahuasca [1], ergotized beer [2], and soma [3] have extensive
            spiritual, medicinal, and recreational value to the human race, with
            the lines between those domains often blurred.
          </Text>
          <Image
            src="/colorized-dalle-shroom.jpg"
            alt=""
            position="absolute"
            right="0"
            transform="translateY(-20%)"
            zIndex="-1"
          />
          <Text>
            Scientific understanding of psychedelics, while growing, is lacking.
            Prosecution of psychedelics users remains rampant. The same
            draconian legislation made it quite impossible to continue the
            academic study of psychedelics from the 1960s has only recently
            begun to relax.
          </Text>
          <Text>
            With the regulatory and legislative environment around psychedelics
            improving, the maw of capitalism yawns in anticipation of medicinal
            and recreational use becoming more accessible. Experts fear that if
            psychedelics fall exclusively into the hands of industry and big
            pharma, much of the current progress will be stymied. Big Pharma,
            Big Law, and the other big dogs will take these drugs down the wrong
            path, making them inaccessible.
          </Text>
          <Text>
            What if we collectively owned psychedelics? We want to democratize
            access.
          </Text>
          <Text>
            What if we made psychedelics unmonopolizable? We want to
            decentralize power.
          </Text>
          <Text>
            Instead of the wrong path, we take the path less traveled. From
            Satoshi Nakamoto all the way back to the first ape to ever pick and
            eat a psychedelic mushroom, it has made all the difference.
          </Text>
          <Image
            src="/colorized-mind-cave.jpg"
            alt=""
            position="absolute"
            left="0"
            transform="translateY(20%)"
            zIndex="-1"
          />
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
          <Text as="h2">Setting</Text>
          <Text>
            The narrative thread tying together humanity and psychedelics is
            ancient, and perhaps even precedes the origin of our species.
          </Text>
          <Text>
            Some posit that as apes prospered throughout the paleolithic, some
            apes&#39; brains developed in an accelerated fashion due to
            consumption of psilocybin-containing mushrooms, giving birth to the
            mind of Homo sapiens, tool-using wordcels and shape rotators. For
            thousands of years, nature controlled our access to these plants.
          </Text>
          <Text>
            Others suspect that the democratization of the mystical experience
            introduced by ergotized wine sparked the most viral and powerful
            religious movement in history, changing human consciousness forever.
            For hundreds of years, religion controlled our access.
          </Text>
          <Text>
            Some say that the psychedelic revolution of the 1960s crested in a
            wave you can see sometimes if you go far out in the desert near Las
            Vegas with a head full of mescaline and a lawyer, but the wave
            rolled back when The Man crept in, as The Man always tends to do in
            our temporary autonomous zones [4], pausing psychedelic research for
            decades. For decades, the state has controlled our access.
          </Text>
          <Image
            src="/colorized-stamp-border.jpg"
            alt=""
            position="absolute"
            right="20%"
            transform="translateY(-30%)"
            zIndex="-1"
          />
          <Text>
            For apes and scientists, Greeks and Romans, Egyptians and Mayans,
            Hindus and Hopis, Maori and Matsigenga, Sami and Shipibo, Chinese,
            Europeans, Americans, and more, psychedelics have played an
            extensive role in history. But that role is limited compared to
            what&#39;s to come with democratized access to psychedelics.
          </Text>
          <Text as="h2">Sage</Text>
          <Text>
            After the whole wide world banned psychedelics in the fallout of the
            revolution of the 1960s, research and usage were driven underground,
            where the secret search for new psychedelic drugs began in earnest.
            Some cryptic chemists looked for ways to produce new psychedelics
            with similar properties to the scheduled substances but, in some
            cases, legal to manufacture and sell, believing that these
            psychedelics had possible therapeutic applications and wishing to
            extend the sphere of human knowledge in this area. An icon among
            them: Dr. Alexander Shulgin.
          </Text>
          <Text>
            Shulgin was a researcher at Dow Chemical in the 60s when he ingested
            mescaline (which was first isolated and identified by Arthur Heffter
            in 1897, popularized by Alduous Huxley in the Doors of Perception in
            1954, and contained within hikuri (peyote), and other psychedelic
            cacti like San Pedro) for the first time.
          </Text>
          <Image
            src="/colorized-pipe-man.jpg"
            alt=""
            position="absolute"
            left="0"
            transform="translateY(-30%)"
            zIndex="-1"
          />
          <Text>
            Shulgin found the experience so astonishing that he devoted the rest
            of his career to psychedelic chemistry. He was convinced that there
            is a wealth of information built into us, with miles of intuitive
            knowledge tucked away in genetic material. Something akin to a
            library containing uncountable reference volumes. Without some means
            of access, there is no way to even begin to guess at the extent and
            quality of what is there.
          </Text>
          <Text>
            To the new psychedelic adventurers, Shulgin is a post modern
            Prometheus bearing the gift of chemical enlightenment. This is why
            Shulgin&#39;s work is mostly in the public domain, free for the
            people to use, published in TiHKAL (Tryptamines I Have Known and
            Loved) and PiHKAL (Phenethylamine I Have Known and Loved) in the
            1990s. His legacy is an open-source wealth of information that
            allows people to access life-changing chemicals.
          </Text>
          <Text>
            Alexander Shulgin is known for the discovery, synthesis, and
            personal bioassay of over 230 psychoactive compounds for their
            psychedelic and entactogenic potential, and did so in a way that
            made it impossible to patent them. In the context of our current
            system, many organizations have thus far lacked incentives to
            develop them and explore them further. There was only a brief period
            when they saw the light of day, through the world wide web beginning
            in the late 90s, with public domain sites such as Erowid.
          </Text>
          <Image
            src="/colorized-computer.jpg"
            alt=""
            position="absolute"
            right="0"
            transform="translateY(-30%)"
            zIndex="-1"
          />
          <Text>
            Online communities formed around the work of Shulgin&#39; prompting
            intense curiosity. These communities self-organized to procure these
            substances and then spread them across our globe. Today, a curious
            researcher will find millions of anecdotal blog posts in forums from
            savvy users - fully open-source, anonymous and uncontrolled.
          </Text>
          <Text as="h2">Substance</Text>
          <Text>
            PsyDAO will revolutionize R&#38;D and ownership of psychedelics IP
            using the permissionless, trustless, decentralized, and
            censorship-resistant web, web3. And, in a nod to Shulgin, we&#39;re
            starting with TiHKAL and PiHKAL.
          </Text>
          <Text>
            Web3, crypto, enables users to get involved in funding and ownership
            of IP, like VitaDAO or BAYC, for both the creator economy and the
            scientific community. PsyDAO is using crypto to create a
            decentralized and unmonopolizable future for psychedelic research.
            PsyDAO members will be able to vote to allocate funding towards the
            studies and research they believe is most relevant, choose which
            data is shared, and govern how the output of these studies will come
            to market.
          </Text>
          <Image
            src="/colorized-human-network.jpg"
            alt=""
            position="absolute"
            right="20%"
            transform="translateY(-30%)"
            zIndex="-1"
          />
          <Text>
            Membership in PsyDAO is open to anons, pseudonymous participation is
            encouraged, and privacy protection is paramount. Knowledge and
            research can be shared with zero knowledge of the identity of the
            sender or recipient.
          </Text>
          <Text>
            PsyDAO utilizes new open-source models for IP tokenization, IPNFTs,
            and IP rights distribution, with ethical encumbrances, through
            fungible tokens.
          </Text>
          <Text>
            PsyDAO intends to be a hivemind - a literal collective consciousness
            for the ethical development of psychedelics. The goal of PsyDAO is
            to redesign incentives and access from the bottom up - focusing on
            people (patients, recreational users, and spiritual communities), as
            opposed to centralizing ownership within organizations that have
            intrinsically misaligned incentives. We see two distinct, yet
            complementary approaches related to the governance of psychedelic
            knowledge and related intellectual property - open source and
            community-governed.
          </Text>
          <Text>
            PsyDAO will directly hold IP rights in underlying research projects
            that it supports, where applicable. PsyDAO will develop a growing
            portfolio of IP assets attached to NFTs, which can then be made
            available open-source by the community, or commercialized where
            appropriate in fair ways, using fractional ERC20s called FRENS and
            FAM.
          </Text>
          <Image
            src="/colorized-molecule.jpg"
            alt=""
            position="absolute"
            left="0"
            transform="translateY(-30%)"
            zIndex="-1"
          />
          <Text>
            For naturally-occurring compounds such as psilocybin, PsyDAO aims to
            create powerful, open-source data repositories that will be governed
            by the community. For compounds where intellectual property claims
            are possible, we will develop a portfolio that is actively managed
            by the community in an aligned way promoting democratized access.
          </Text>
          <Text>
            A mixture of meme magic and mathemagic, the IP tokenization system
            built with our friends at Molecule and VitaDAO enables PsyDAO to
            create open research and participation markets for known
            psychedelics, selectively distributing rights and benefits to
            partners and contributors.
          </Text>
          <Text as="h2">Summary</Text>
          <Text>
            We are on the precipice of either ruin and revolution. Our species
            needs a radical shift in consciousness to preserve its light for the
            future. Since that first ape ate a psychedelic mushroom many
            millennia ago, we have been coming back to this moment here, now,
            apes together strong and ready for a psychedelic session. With it
            comes the realization that these molecules open up a whole new level
            of human experience that should be available to everyone who wants
            it. We must ensure that this world is available to anyone.
          </Text>
          <Box as="ul" listStyleType="none" mt="16" color="#269200">
            <Text as="li">
              [1] Jeremy Narby,{" "}
              <Text as="span" fontStyle="italic">
                The Cosmic Serpent: DNA and the Origins of Knowledge
              </Text>
              , 2006
            </Text>
            <Text as="li">
              [2] Brian Muraresku,{" "}
              <Text as="span" fontStyle="italic">
                The Immortality Key: The Secret History of the Religion With No
                Name
              </Text>
              , 2020
            </Text>
            <Text as="li">[3] Id.</Text>
            <Text as="li">[4] Hakim Bey</Text>
          </Box>
          <Text mt="8" color="#269200">
            {
              "Some images used in the design of this manifesto were created by OpenAI's"
            }{" "}
            <Link
              href="https://openai.com/dall-e-2"
              target="_blank"
              textDecoration="underline"
            >
              DALL-E 2
            </Link>
            .
          </Text>
          <Link
            border="1px solid #9835BA"
            borderRadius="full"
            display="block"
            margin="0 auto"
            maxWidth="max-content"
            textAlign="center"
            px="10"
            py="4"
            fontStyle="italic"
            fontSize="25px"
            mt="32"
            transition="all 200ms ease"
            _hover={{
              background: "#9835BA",
              color: "#fffafa",
              textDecor: "none",
            }}
            href="https://discord.gg/FJHQtBZYdp"
            target="_blank"
          >
            <Text as="span" display="inline-block">
              Contribute to
            </Text>{" "}
            <Text as="span" display="inline-block">
              PsyDAO on Discord
            </Text>
          </Link>
        </Box>
      </Window.Content>
    </Window>
  );
};
