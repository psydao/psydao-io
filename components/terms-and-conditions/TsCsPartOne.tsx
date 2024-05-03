import { Flex, Text, Image } from "@chakra-ui/react";
const TsCsPartOne = () => {
  return (
    <>
      <Text
        textTransform={"uppercase"}
        justifySelf={{ base: "center", md: "start" }}
        textAlign={{ base: "center", md: "start" }}
        fontSize={{ base: "16px", md: "18px" }}
        fontWeight={600}
      >
        TERMS AND CONDITIONS RELATING TO THE PSY TOKEN SALE
      </Text>
      <Text fontSize={16} fontStyle={"italic"}>
        April 2024
      </Text>
      <Text>
        Please read these Terms and Conditions (“T&Cs”) carefully. By making a
        contribution to the Company (as defined below) for the purchase of PSY
        tokens (“PSY”) during the Token Sale (as defined below), you will be
        bound by these T&Cs and all terms incorporated herein by reference.
      </Text>
      <Text>
        By accepting these T&Cs, you will be entering into a binding agreement
        with the Company. These T&Cs contain provisions which affect your legal
        rights. If you do not agree to these T&Cs, do not make a contribution
        for the purchase of PSY.
      </Text>
      <Text>PARTIES TO THESE T&Cs</Text>
      <Text>
        PsyDAO Association is an association registered in Switzerland, with
        registered address at Weinberghöhe 21 CH-6340 Baar, Switzerland (the
        “Company”, “we”, “our”, or “us”), and the creator of its proprietary
        token known as PSY under these T&Cs. PsyDAO Association is also the
        developer of the commons where the PSY tokens created under these T&Cs
        will be used.
      </Text>
      <Text>
        There may be other entities within the group of companies from time to
        time to which the Company belongs (“PsyDAO Group”) that will develop,
        manage and/or operate the PsyDAO Commons (as defined below) (or any
        parts thereof).
      </Text>
      <Text>
        References in these T&Cs to “Contributor”, “you” or “your” are to the
        person/entity who accepts these T&Cs and agrees to and makes a
        contribution to the Company as set out in and on the terms of these
        T&Cs. You, personally, and the Company are together referred to as the
        “Parties” and references to a “Party” are to the relevant one of them as
        the context requires.
      </Text>
      <Text>
        If you have any questions relating to these T&Cs, please contact us at
        info@psydao.com.
      </Text>
      <Text>THE PARTIES HEREBY AGREE AS FOLLOWS:</Text>
      <Flex
        direction={"column"}
        gap={2}
        color={"#591D6D"}
        justifyContent={"flex-start"}
        textAlign={"start"}
      >
        <Text fontWeight={600}>1. PsyDAO Commons</Text>
        <Text>
          1.1 PsyDAO has developed a membership commons, PsyDAO, that enables
          researchers, creators, artists and enthusiasts to connect with each
          other to accelerate psychedelic science. The commons empowers
          community centered around shared resources, including intellectual
          property, cash and cash equivalents, and physical goods (together,
          “PsyDAO Commons”).
        </Text>
        <Text>
          1.2 For a more detailed description of the PsyDAO Commons and the
          utility of PSY in the PsyDAO Commons, please refer to:
        </Text>
        <Text>{`    a) the PsyDAO website at https://paydao.com/ (“PsyDAO Website”);`}</Text>
        <Text>{`    b) the PsyDAO Whitepaper, as may be amended from time to time, which can be found at https://psydao.com/ (“PsyDAO Whitepaper”); (together, “Project Documentation”).`}</Text>
        <Text>
          1.3 Except as otherwise agreed in these T&Cs, the information
          contained in the Project Documentation is of descriptive nature only,
          is not binding on the Company and does not form part of these T&Cs.
        </Text>
      </Flex>
      <Flex
        direction={"column"}
        gap={2}
        color={"#591D6D"}
        justifyContent={"flex-start"}
        textAlign={"start"}
      >
        <Text fontWeight={600}>2. T&Cs Scope</Text>
        <Text>
          2.1 Save as otherwise set out in these T&Cs, these T&Cs (including any
          terms incorporated herein by reference) govern only your contribution
          to the Company for the purchase of PSY during the Token Sale (as
          defined in clause 3 below).
        </Text>
        <Text>
          2.2 Any potential future use of PSY in connection with the provision
          or receipt of services within the PsyDAO Commons will be subject to
          and governed by such other applicable terms, conditions and policies
          relating to the PsyDAO Commons (the “Commons Rules”).
        </Text>
      </Flex>
      <Flex
        direction={"column"}
        gap={2}
        color={"#591D6D"}
        justifyContent={"flex-start"}
        textAlign={"start"}
      >
        <Text fontWeight={600}>3. Token Sale</Text>
        <Text>
          3.1 You may make contributions during the public sale of PSY (the
          “Token Sale”) as described in these T&Cs.
        </Text>
        <Text>
          3.2 The total number of PSY available for purchase during the Token
          Sale is 10,233,415.5 tokens.
        </Text>
        <Text>
          3.3 The Token Sale commences on April 19, 2024 and ends on
          satisfaction of one of the following conditions (whichever is the
          earlier):
        </Text>
        <Text>{`a) 10,233,415.5 PSY (or any other quantity of PSY as may be determined by the Company at its sole discretion) are purchased after the start of the Token Sale; or`}</Text>
        <Text>{`b) A supermajority of holders of PSY purchased during the sale vote to end the sale.`}</Text>
      </Flex>
      <Flex
        direction={"column"}
        gap={2}
        color={"#591D6D"}
        justifyContent={"flex-start"}
        textAlign={"start"}
      >
        <Text fontWeight={600}>4. PSY price</Text>
        <Text>
          4.1 During the Token Sale, the price payable by Contributors per one
          PSY is USD 0.10. PSY purchased during the Token Sale will be locked
          for the duration of the Token Sale period, following which the PSY
          will be unlocked and freely transferable.
        </Text>
        <Text>
          4.2 The price per PSY is payable in Ether (“ETH”) at the applicable
          USDC price determined by Chainlink oracle at the time of payment.
        </Text>
      </Flex>
      <Flex
        direction={"column"}
        gap={2}
        color={"#591D6D"}
        justifyContent={"flex-start"}
        textAlign={"start"}
      >
        <Text fontWeight={600}>5. Unsold PSY</Text>
        <Text>
          In the event that not all PSY available for purchase are sold in the
          Token Sale, the unsold PSY will either be (i) burned and/or (ii) used
          for marketing purposes, e.g., to reward community members, acquire new
          users or incentivize other communities, the relevant decision is made
          in the sole discretion of the Company. In the event that the Company
          decides to burn the unsold PSY, the total number of PSY will be
          reduced accordingly.
        </Text>
      </Flex>
      <Flex
        direction={"column"}
        gap={2}
        color={"#591D6D"}
        justifyContent={"flex-start"}
        textAlign={"start"}
      >
        <Text fontWeight={600}>6. Right to request information</Text>
        <Text>
          6.1 Before you are able to make a contribution to the Company or at
          any time after making a contribution, we may (in our sole and absolute
          discretion) request you to provide certain information and
          documentation for the purposes of satisfying any “know your customer”
          (“KYC”) or similar obligations as determined by the Company.
        </Text>
        <Text>
          6.2 You agree that you will, promptly upon the Company’s request,
          supply such information and documentation as may be reasonably
          requested by us pursuant to clause 6.1 in order for us to:
        </Text>

        <Text>{`a) carry out, to our satisfaction, all KYC and other similar checks as determined by the Company; and`}</Text>
        <Text>{`b) ensure, to our satisfaction, that we have complied with all applicable laws and regulations in connection with the creation and issue of PSY to you as contemplated by these T&Cs.`}</Text>
      </Flex>
      <Flex
        direction={"column"}
        gap={2}
        color={"#591D6D"}
        justifyContent={"flex-start"}
        textAlign={"start"}
      >
        <Text fontWeight={600}>7. Method of contribution</Text>
        <Text>
          7.1 You must contribute to the Company during the Token Sale in the
          manner described in this clause 7.
        </Text>
        <Text>
          7.2 Contributions to be made in ETH must be sent from your wallet used
          for signing in on our website in respect of which you can identify
          your private key. Your wallet will be required to verify your ETH
          contribution to the Company and to enable the Company to issue PSY to
          you through the Smart Contract System (as further described in clause
          8). ETH contributions must be sent to the Company’s respective wallet
          address specified on the website https://token.PSY.com/. You must have
          enough funds in your wallet for the payment, gas and transaction fee
          prior to participating in the Token Sale.
        </Text>
        <Text>
          7.3 Contributions must be sent to the Company’s wallet addresses, as
          described in clause 7.2. To the extent that any third-party website,
          service or smart-contract offers to receive contributions and issues
          PSY or facilitates the allocation or transfer of PSY in any way during
          the Token Sale, such third-party websites or services are, unless
          expressly set out in these T&Cs or mentioned on the PSY Website, not
          authorised by the Company nor do they have any legal or commercial
          relationship in any way with the Company, the PsyDAO Commons or PSY.
        </Text>
        <Text>7.4 Contributors that send contributions:</Text>
        <Text>{`a) in (i) any crypto-currency other than ETH or (ii) a manner that does not otherwise conform with the methods of contribution described in these T&Cs; or`}</Text>
        <Text>{`b) b) to any third-party website, wallet address, bank account, service or smart contract that offers PSY in the manner described in this clause 7; risk losing their entire contribution. The Company will not be responsible or liable for recovering or returning any such contributions to the Contributor, nor will the Company be responsible or liable for any losses incurred by the Contributor in this respect.`}</Text>
      </Flex>
      <Flex
        direction={"column"}
        gap={2}
        color={"#591D6D"}
        justifyContent={"flex-start"}
        textAlign={"start"}
      >
        <Text fontWeight={600}>
          8. Creation and issue of PSY through the Smart Contract System
        </Text>
        <Text>
          8.1 The Company has deployed a smart contract system (the “Smart
          Contract System”) on the Ethereum blockchain for the purposes of
          creating PSY and issuing such PSY to the Contributor’s Ethereum
          wallet. PSY will be based on the ERC20 token standard and is intended
          to have the utility set out in the PsyDAO Whitepaper.
        </Text>
        <Text>8.2 The Company will keep a record of:</Text>

        <Text>{`a) all ETH contributions received by the Company’s wallet;`}</Text>
        <Text>{`b) the time the contribution was received;`}</Text>
        <Text>{`c) the amount of the contribution; and`}</Text>
        <Text>{`d) the wallet address from which the contribution was sent (as the case may be), (“Contribution Records”).`}</Text>
        <Text>
          8.3 In order to receive PSY, Contributors must have and must notify
          the Company in accordance with the procedures specified by the Company
          on the PSY Website of the address of an Ethereum wallet that supports
          the ERC20 token standard. In other words, the Contributor’s Ethereum
          wallet must possess technical infrastructure that is compatible with
          the receipt, storage and transfer of PSY, being tokens that are
          created based on the ERC20 token standard. The Company reserves the
          right to prescribe additional conditions relating to specific wallet
          requirements at any time acting in its sole and absolute discretion.
        </Text>
        <Text>
          8.4 Immediately following your contribution, the Company will
          undertake an automated contribution verification procedure by
          reference to the Contribution Records. Subject to clause 6, provided
          the Company is successfully able to verify your contribution, the
          Company will send instructions to the Smart Contract System to
          initiate the creation and issue of PSY to the Ethereum wallet address
          which you send us automated notice of through the Smart Contract
          System pursuant to clause 8.3.
        </Text>
        <Text>
          8.5 Subject to compliance with clauses 6, 7 and 8, the Smart Contract
          System will distribute the applicable number of PSY to the Ethereum
          wallet address notified to it under clause 8.3, upon confirmation by
          the Company of its receipt of the relevant contribution in accordance
          with these T&Cs. The unlocking of transferability of PSY occurs after
          the completion of the Token Sale.
        </Text>
        <Text>
          8.6 Without limiting the grounds upon which the Company may refuse to
          distribute tokens, if distribution of PSY to you, or the holding of
          PSY by you, is or becomes impossible or a violation of any applicable
          legal or regulatory requirements, or the Company suspects this may be
          the case, then: a) the Company need not distribute any PSY or return
          any contribution or its equivalent to you nor, in either case, to any
          other person or entity; b) the Company may request, require or
          facilitate steps to be taken to ensure the full return of any PSY that
          you hold; c) the Company reserves the right to terminate its
          relationship with you and take any actions considered necessary or
          desirable for the Company to meet its legal and regulatory
          obligations; and d) such actions will be irrespective of any
          contribution that has been made by you to the Company and/or any other
          third party, and the Company is not required to provide reasons.
        </Text>
        <Text>
          8.7 On initial distribution during the sale, PSY will be inactive
          (which means they are not transferable) and must be activated by the
          Company at the conclusion of the sale in order to be transferable to
          any third party in accordance with clause 9.
        </Text>
        <Text>
          8.8 On receipt of your contribution, such contribution will
          immediately become the sole and exclusive property of the Company,
          which will be entitled to apply the contribution towards the operating
          expenses relating to the business of any entity within the PsyDAO
          Group to which the Company belongs. The application of your
          contribution will be determined by us acting in our sole and absolute
          discretion and we are not under any obligation to inform you or
          otherwise verify how your contribution is used.
        </Text>
      </Flex>
      <Flex
        direction={"column"}
        gap={2}
        color={"#591D6D"}
        justifyContent={"flex-start"}
        textAlign={"start"}
      >
        <Text fontWeight={600}>9. Transferability</Text>
        <Text>
          9.1 Subject to any applicable lock-up and vesting periods and the
          Company’s sole discretion, activation of PSY will be made on or around
          the conclusion of the Token Sale, subject to completion of any
          verification measures undertaken by the Company and other relevant
          factors at the Company’s discretion.
        </Text>
        <Text>
          9.2 PSY that are purchased by you may be claimed by you only. PSY are
          not transferable to any blockchain address prior to activation. Prior
          to activation of any PSY, you cannot transfer nor attempt to transfer
          (whether by assignment, trust, charge, sub-contract, novation or
          otherwise), PSY or any part or the whole of your rights, title or
          interest under these T&Cs, including your right to claim those PSY, to
          any other person or entity, whether with or without consideration. All
          such transfers and attempted transfers are strictly prohibited, will
          be deemed void and will not be recognised by, nor binding on, the
          Company.
        </Text>
        <Text>
          9.3 PSY are transferable, after activation by the Company, subject to
          any applicable lock-up and vesting periods and other conditions set
          out in these T&Cs.
        </Text>
        <Text>
          9.4 After activation, you may transfer to another wallet or address
          any PSY which you lawfully hold. Such transfer will be deemed
          effective, and a transfer of any PSY will only be effective, as at the
          time and date of the relevant transaction being included in a block on
          the Ethereum blockchain which has received such number of
          confirmations as the Company considers necessary for that transaction
          to be considered irreversible.
        </Text>
        <Text>
          9.5 If you transfer PSY to a wallet or address owned by another
          person, then that person and the owner of each other wallet or address
          to which that PSY is further transferred (each, “New Holder”) are each
          deemed to be bound by these T&Cs as Contributors for the period of
          time they hold such PSY, and you irrevocably and unconditionally
          undertake to ensure that each New Holder, prior to the transfer of PSY
          to them, expressly agrees to be bound by these T&Cs as a Contributor
          for the period of time they hold PSY.
        </Text>
        <Text>
          9.6 By transferring any PSY you assign all your rights, title and
          interest under these T&Cs to the owner of the wallet or address to
          which you transfer that PSY.
        </Text>
        <Text>
          9.7 The owner of the wallet in which any PSY is held will (except as
          otherwise required by law or as ordered by a court of competent
          jurisdiction) be treated as the absolute owner of that PSY for all
          purposes (regardless of any notice of any trust or any other interest,
          or the theft or loss of any private key) and neither the Company nor
          any other person will be liable for so treating that person as
          absolute owner.
        </Text>
        <Text>
          9.8 The Company agrees that, if any rule of law (including any
          legislation, rule of common law, rule of equity or customary law)
          requires written notice to effect the transfer of any PSY, such notice
          is deemed given as an electronic record by inclusion of the relevant
          transaction on a block on the Ethereum blockchain in accordance with
          clause 9.4 above.
        </Text>
        <Text>
          9.9 Notwithstanding any other provision in this clause 9, the Company
          reserves the right to treat as void any transfer of a PSY which the
          Company reasonably believes to be unlawful for any reason.
        </Text>
        <Text>
          9.10 Notwithstanding any of the above, there is no guarantee or
          assurance of the availability of any market for transfer of PSY or any
          such market’s liquidity.
        </Text>
      </Flex>
      <Flex
        direction={"column"}
        gap={2}
        color={"#591D6D"}
        justifyContent={"flex-start"}
        textAlign={"start"}
      >
        <Text fontWeight={600}>
          10. Refunds, refusals, suspension and termination of contributions
        </Text>
        <Text>
          10.1 You accept any contribution that may, as provided in these T&Cs,
          be returned will be less such gas (being an amount of ETH which is
          expended in the transfer of ETH as a transaction cost for using the
          Ethereum network), transaction fees, costs, charges or other expenses
          the Company has incurred or reasonably expects to incur (whether or
          not directly attributable to your contribution or such return). For
          the avoidance of doubt, no interest will accrue on the value of any
          contribution, including any contribution which is in fact returned.
          You acknowledge and agree that you are unlikely to receive an amount
          equivalent to your contribution by way of a refund and that such
          refunded amount may be significantly lower than the amount contributed
          by you, and it could be nil.
        </Text>
        <Text>
          10.2 The Company reserves the right to refuse or reject any
          contributions made at any time in the Company’s sole and absolute
          discretion. To the extent that we refuse or reject a contribution, we
          will exercise reasonable endeavours to procure that the contribution
          is returned to the Contributor to the Ethereum wallet, or to the bank
          account from which the contribution was made (as the case may be),
          subject to clause 10.1. However, we do not warrant, represent or offer
          any assurances that we will successfully be able to recover and/or
          return any such contributions.
        </Text>
        <Text>
          10.3 Subject to clauses 10.1 and 10.2 and except to the extent
          required by applicable law, all contributions received by the Company
          under these T&Cs are final and Contributors will not be entitled to
          claim any refund or reimbursement of contributions from the Company.
        </Text>
        <Text>
          10.4 At any time prior to satisfaction of the Completion Conditions,
          the Company may either temporarily suspend or permanently end the
          Token Sale in whole or part, and with respect to all or certain
          persons, at any time if:
        </Text>
        <Text>{`a) any change occurs to the Ethereum network, which in the Company’s opinion is likely to materially prejudice the success of the Token Sale or the development of the PsyDAO Commons in any respect;`}</Text>
        <Text>{`b) any change occurs to any local, national or international regulatory, financial, political or economic conditions, which in the Company’s opinion is likely to materially prejudice the success of the Token Sale or the PsyDAO Commons in any respect;`}</Text>
        <Text>{`c) with or without reasons, PsyDAO elects to cease support for the PsyDAO website or participation in the PsyDAO Commons;`}</Text>
        <Text>{`d) the Token Sale or the Company is required by any applicable law or regulation to be licensed or approved or fundamentally restructured;`}</Text>
        <Text>{`e) the Company is notified by any government, quasi-government, authority or public body (including any regulatory body of any jurisdiction) in any jurisdiction that the Token Sale or PsyDAO Commons is under investigation, or prohibited, banned or must cease, or the Company is otherwise required by law to end the Token Sale;`}</Text>
        <Text>{`f) the Token Sale is discontinued due to any force majeure event and the Company cannot reasonably expect the Token Sale to be resumed within 90 days;`}</Text>
        <Text>{`g) the Company considers there are security reasons for doing so; or`}</Text>
        <Text>{`h) with or without reasons, the Company elects to terminate the Token Sale.`}</Text>
        <Text>
          10.5 Any suspension, abortion or end of the Token Sale will be deemed
          to commence from the moment that the Company publishes a notice to
          that effect on the PSY Website.
        </Text>
        <Text>
          10.6 During any period of suspension or in the event that the Token
          Sale is ended, the Smart Contract System will no longer be able to
          receive and accept contributions, create PSY and/or issue PSY to
          Contributors. Contributors who send us contributions (after we publish
          a notice that the Token Sale has been suspended, aborted or ended in
          accordance with clause 10.5) risk losing their entire contribution and
          we will not be responsible or liable for recovering or returning any
          such contributions to the Contributor nor will we be responsible or
          liable for any losses incurred by such contributors in this respect.
          Contributors are therefore strongly advised to check the PSY Website
          before sending a contribution to the Smart Contract System.
        </Text>
      </Flex>
      <Flex
        direction={"column"}
        gap={2}
        color={"#591D6D"}
        justifyContent={"flex-start"}
        textAlign={"start"}
      >
        <Text fontWeight={600}>11. Token utility</Text>
        <Text>
          11.1 Ownership of PSY carries no rights, whether express or implied,
          other than a limited delegated authority to govern, use, and interact
          with the PsyDAO Commons and treasury as may be made available from
          time to time (as further described in the PsyDAO Whitepaper), and to
          the extent the PsyDAO Commons is developed to further such right. Any
          potential future right or expectation relating to the provision and
          receipt of services in the PsyDAO Commons will be subject to any
          restrictions and limitations set out in these T&Cs and/or the Commons
          Rules (as applicable).
        </Text>
        <Text>
          11.2 You acknowledge and accept that PSY do not represent or
          constitute:
        </Text>
        <Text>{`a) any ownership right or stake, share, equity, security, collective investment scheme, managed fund, financial derivative, futures contract, deposit, commercial paper, negotiable instrument, investment contract, note, commodity, bond, warrant, certificate debt or hybrid instrument or any other financial instrument or investment entitling the holder to interest, dividends or any kind or return or carrying equivalent rights (including in respect of the Company, PsyDAO or the PsyDAO Commons);`}</Text>
        <Text>{`b) any right to receive future revenues, shares or any other form of participation or governance right from, in or relating to the Company, PsyDAO and/or the PsyDAO Commons;`}</Text>
        <Text>{`c) any form of currency, money, deposit or legal tender, whether fiat or otherwise, in any jurisdiction, nor do they constitute any substitute or representation of currency, money, deposit or legal tender (including electronic money); or`}</Text>
        <Text>{`d) right, title, interest or benefit whatsoever in whole or in part, in the PsyDAO Commons, the Company, PsyDAO or any assets related to them, except that PSY may in future be used in connection with transaction on the PsyDAO Commons, subject to these T&Cs and the terms and conditions of the PsyDAO Commons.`}</Text>
        <Text>
          11.3 Protections offered by applicable law in relation to the
          acquisition, storage, sale and/or transfer of the instruments and/or
          investments of the types referred to in the sub-clauses of clause 11.2
          do not apply to any contribution made under these T&Cs for the
          acquisition of PSY or to your storage, sale and/or transfer of PSY.
        </Text>
        <Text>
          11.4 The Company makes no warranties or representations and offers no
          assurances (in each case whether express or implied) that PSY will
          confer any actual and/or exercisable rights of use, functionality,
          features, purpose or attributes in connection with the PsyDAO Commons.
        </Text>
        <Text>11.5 You acknowledge and agree that:</Text>
        <Text>{`a) the intended services, features or attributes of the PsyDAO Commons may change significantly or fundamentally between the opening of the Token Sale and the time (if any) at which PSY may be used in connection with the PsyDAO Commons;`}</Text>
        <Text>{`b) you have no expectation of obtaining any governance rights over the PsyDAO Commons or of influencing the development of the PsyDAO Commons except as otherwise agreed in writing by the Company;`}</Text>
        <Text>{`c) the number of PSY required for any particular transaction in respect of the PsyDAO Commons will be determined by the Company; and`}</Text>
        <Text>{`d) there is no guarantee or assurance of the quality, nature or standard of the services, features and/or attributes (if any) that will be made available through the PsyDAO Commons.`}</Text>
      </Flex>
      <Flex
        direction={"column"}
        gap={2}
        color={"#591D6D"}
        justifyContent={"flex-start"}
        textAlign={"start"}
      >
        <Text fontWeight={600}>
          12. Contributor’s representations and warranties
        </Text>
        <Text>
          12.1 By participating in the Token Sale and sending a contribution to
          the Company, you hereby represent and warrant the matters set out in
          SCHEDULE 2 of these T&Cs.
        </Text>
        <Text>
          12.2 You undertake and agree to notify the Company immediately if any
          of the representations and warranties set out in SCHEDULE 2 of these
          T&Cs becomes untrue, incomplete, invalid or misleading in any respect.
        </Text>
        <Text>
          12.3 If you cannot make all of the representations and warranties set
          out in SCHEDULE 2 of these T&Cs, you must not seek to purchase or hold
          PSY or make a contribution. Any PSY distributed to you or held by you
          in violation of this clause are deemed void and will not be recognised
          by nor be binding on the Company.
        </Text>
        <Text>
          12.4 The Company reserves the rights to deny and invalidate
          contributions made by, and/or withhold the distribution of PSY from,
          any Contributor who has made a false, incomplete or misleading
          representation, in the opinion of the Company or which may, in the
          Company’s view, otherwise breach applicable law.
        </Text>
      </Flex>
      <Flex
        direction={"column"}
        gap={2}
        color={"#591D6D"}
        justifyContent={"flex-start"}
        textAlign={"start"}
      >
        <Text fontWeight={600}>13. Risks</Text>
        <Text>
          13.1 You acknowledge and agree that sending a contribution to the
          Company, the creation and issue of PSY and the deployment of PSY on
          the PsyDAO Commons carries significant financial, regulatory and
          reputational risks, including but not limited to those set out in
          Schedule 3 of these T&Cs.
        </Text>
        <Text>
          13.2 By making a contribution to the Company and accepting these T&Cs,
          you expressly and finally acknowledge, accept and assume the risks set
          out in SCHEDULE 3 of these T&Cs and that the risk factors set out in
          SCHEDULE 3 are not, and are not intended to constitute, a
          comprehensive or exhaustive list of risk factors.
        </Text>
      </Flex>
      <Flex
        direction={"column"}
        gap={2}
        color={"#591D6D"}
        justifyContent={"flex-start"}
        textAlign={"start"}
      >
        <Text fontWeight={600}>14. Audit of the Smart Contract System</Text>
        <Text>
          14.1 The Company will exercise reasonable endeavours to have the Smart
          Contract System audited and approved by technical experts with regard
          to both accuracy and security of the underlying code.
        </Text>
        <Text>
          14.2 Notwithstanding clause 14.1, smart contract technology is still
          in an early stage of development and its application is currently of
          an experimental nature, which carries significant operational,
          technological, financial, regulatory and reputational risks.
          Accordingly, while any audit conducted may raise the level of security
          and accuracy of the Smart Contract System, you acknowledge, understand
          and accept that the audit does not amount to any form of warranty,
          representation or assurance (in each case whether express or implied)
          that the Smart Contract System and/or PSY are fit for a particular
          purpose or that they are free from any defects, weaknesses,
          vulnerabilities, viruses or bugs which could cause, inter alia, the
          complete loss of ETH contributions and/or PSY.
        </Text>
      </Flex>
      <Flex
        direction={"column"}
        gap={2}
        color={"#591D6D"}
        justifyContent={"flex-start"}
        textAlign={"start"}
      >
        <Text fontWeight={600}>15. Security</Text>
        <Text>
          15.1 You are responsible for implementing all reasonable and
          appropriate measures for securing the wallet, vault or other storage
          mechanism you use to send a contribution to the Company and to receive
          and store PSY that are issued to you by the Smart Contract System,
          including any requisite private key(s) or other credentials necessary
          to access such storage mechanism(s). If your private key(s) or other
          access credentials are lost, you may lose access to your PSY. The
          Company is not responsible for any security measures relating to your
          receipt, possession, storage, transfer or potential future use of PSY
          nor will we be under any obligation to recover or return any PSY.
        </Text>
        <Text>
          15.2 The Company excludes (to the fullest extent permitted under
          applicable law) any and all liability for any security breaches or
          other acts or omissions which result in your loss of (including your
          loss of access to) PSY issued to you.
        </Text>
      </Flex>
      <Flex
        direction={"column"}
        gap={2}
        color={"#591D6D"}
        justifyContent={"flex-start"}
        textAlign={"start"}
      >
        <Text fontWeight={600}>16. Intellectual property</Text>
        <Text>
          16.1 In this clause 16, “IP Rights” means in relation to the Company,
          PsyDAO, PSY, the Token Sale, the PsyDAO Commons, PSY Website and the
          PsyDAO Website, all: (i) patents, inventions, designs, copyright and
          related rights, database rights, knowhow and confidential information,
          trademarks and related goodwill, trade names (whether registered or
          unregistered), and rights to apply for registration; (ii) all other
          rights of a similar nature or having an equivalent effect anywhere in
          the world which currently exist or are recognised in the future; and
          (iii) all applications, extensions and renewals in relation to any
          such rights.
        </Text>
        <Text>
          16.2 Except as expressly set out in these T&Cs, and otherwise voted on
          and implemented by the Company and the PsyDAO Commons from time to
          time, you are not entitled, for any purpose, to any of the IP Rights.
          We and PsyDAO at all times retain ownership, including all rights,
          title and interests in and to the IP Rights. There are no implied
          licences under these T&Cs. You understand and accept that by making a
          contribution for the purchase of PSY pursuant to these T&Cs you will
          not:
        </Text>
        <Text>{`a) acquire or otherwise be entitled to any IP Rights, except those that may be delegated to you by resolutions of voters in the PsyDAO Commons;`}</Text>
        <Text>{`b) make a claim in respect of any IP Rights or any other equivalent rights. except those that may be delegated to you by resolutions of voters in the PsyDAO Commons; or`}</Text>
        <Text>{`c) use, attempt to use, copy, imitate or modify (whether in whole or in part) any IP Rights, except with our prior written consent.`}</Text>
      </Flex>
      <Flex
        direction={"column"}
        gap={2}
        color={"#591D6D"}
        justifyContent={"flex-start"}
        textAlign={"start"}
      >
        <Text fontWeight={600}>17. Indemnity</Text>
        <Text>
          17.1 To the fullest extent permitted by applicable law, you will
          indemnify, defend and hold harmless the Company and our respective
          past, present and future employees, officers, directors, contractors,
          consultants, equity holders, suppliers, vendors, service providers,
          parent companies, subsidiaries, associates, affiliates, agents,
          representatives, predecessors, successors and assigns (together,
          “Company Indemnified Parties”) from and against any and all claims,
          demands, actions, damages, losses, costs and expenses (including
          reasonable professional and legal fees) that arise from or relate to:
        </Text>
        <Text>{`a) your acquisition or use of PSY under these T&Cs;`}</Text>
        <Text>{`b) the performance or non-performance of your responsibilities, representations, warranties or obligations under these T&Cs;`}</Text>
        <Text>{`c) your breach of any of the terms and conditions set out in these T&Cs; or`}</Text>
        <Text>{`d) your breach of any rights of any other person or entity.`}</Text>
        <Text>
          17.2 The Company reserves the right to exercise sole control over the
          defence, at your sole cost and expense, of any claim subject to an
          indemnity set out in clause 17.1.
        </Text>
        <Text>
          17.3 The indemnity set out in this clause 17 is in addition to, and
          not in lieu of, any other remedies that may be available to the
          Company under applicable law.
        </Text>
      </Flex>
      <Flex
        direction={"column"}
        gap={2}
        color={"#591D6D"}
        justifyContent={"flex-start"}
        textAlign={"start"}
      >
        <Text fontWeight={600}>18. Disclaimers</Text>
        <Text>
          18.1 To the fullest extent permitted by applicable law and except as
          otherwise specified in writing by us:
        </Text>
        <Text>{`a) PSY are sold on an “as is” and “as available” basis, without any warranties or representations of any kind, and we expressly disclaim all warranties and representations relating to PSY (whether express or implied), including, without limitation, any implied warranties of merchantability, fitness for a particular purpose, title and non-infringement;`}</Text>
        <Text>{`b) we do not represent or warrant that PSY are reliable, current or defect-free, meet your requirements, or that any defects will be corrected; and`}</Text>
        <Text>{`c) we cannot and do not represent or warrant that PSY or the distribution mechanism for PSY are free of viruses or other harmful components.`}</Text>
        <Text>
          18.2 Neither these T&Cs nor the Project Documentation constitute a
          prospectus or offering document, and are not an offer to sell, nor the
          solicitation of an offer to buy any investment or financial instrument
          in any jurisdiction. PSY should not be acquired for speculative or
          investment purposes with the expectation of making a profit on
          immediate or future re-sale.
        </Text>
        <Text>
          18.3 No regulatory authority has approved any of the information set
          out in these T&Cs and/or the Project Documentation. No such action
          will be taken under the laws, regulatory requirements or rules of any
          jurisdiction.
        </Text>
      </Flex>
      <Flex
        direction={"column"}
        gap={2}
        color={"#591D6D"}
        justifyContent={"flex-start"}
        textAlign={"start"}
      >
        <Text fontWeight={600}>19. Limitation of liability</Text>
        <Text>
          19.1 To the fullest extent permitted by applicable law, in no
          circumstances will:
        </Text>
        <Text>{`a) the Company or any of the Company Indemnified Parties be liable for any, indirect, special, incidental or consequential loss of any kind (including, but not limited to, loss of revenue, income, business or profits, loss of contract or depletion of goodwill, loss of anticipated savings, loss of use or data, or damages for business interruption or any like loss) arising out of or in any way related to the acquisition, storage, transfer or use of PSY or otherwise related to these T&Cs, regardless of the cause of action, whether based in contract, tort (including negligence), breach of statutory duty, restitution or any other basis (even if the Company or any of the Company Indemnified Parties have been advised of the possibility of such losses and regardless of whether such losses were foreseeable); and`}</Text>
        <Text>{`b) the aggregate liability of the Company and the Company Indemnified Parties (jointly), whether in contract, tort (including negligence), breach of statutory duty, restitution or any other basis, arising out of or relating to these T&Cs or the use of or inability to use PSY, exceed the amount of your contribution.`}</Text>
        <Text>
          19.2 Without limiting any other disclaimer in these T&Cs or elsewhere,
          the Company is not liable for any loss, liability, costs or expenses
          arising in connection with the exercise or attempted exercise of,
          failure to exercise, or delay in exercising, a right, power or remedy
          in connection with these T&Cs.
        </Text>
        <Text>
          19.3 The limitations and exclusions of liability set out in clause
          19.1 do not limit or exclude liability for fraud or wilful misconduct
          of any Company Indemnified Party, nor will it limit or exclude any
          losses for which, as a matter of applicable law, it would be unlawful
          to limit or exclude liability.
        </Text>
      </Flex>
      <Flex
        direction={"column"}
        gap={2}
        color={"#591D6D"}
        justifyContent={"flex-start"}
        textAlign={"start"}
      >
        <Text fontWeight={600}>20. Assignment and novation</Text>
        <Text>
          20.1 The Company may assign, transfer, novate or otherwise deal in any
          manner, all or any part of the benefit of these T&Cs and any of its
          rights, remedies, powers, duties and obligations under these T&Cs to
          any person, without your consent and in any way the Company considers
          appropriate.
        </Text>
        <Text>
          20.2 You agree that you may not claim against any assignee, transferee
          or any other person who has an interest in these T&Cs, any right of
          set off or other rights that you have against the Company.
        </Text>
      </Flex>
      <Flex
        direction={"column"}
        gap={2}
        color={"#591D6D"}
        justifyContent={"flex-start"}
        textAlign={"start"}
      >
        <Text fontWeight={600}>21. Termination and right of withdrawal</Text>
        <Text>
          21.1 Notwithstanding any other provision of these T&Cs, the Company
          may at any time and for any reason immediately terminate these T&Cs as
          between you and it without prior notice or need to specify reasons,
          including if:
        </Text>
        <Text>{`a) you have breached any provision of these T&Cs or acted in a manner which clearly shows that you do not intend to or are unable to comply with any provision in these T&Cs;`}</Text>
        <Text>{`b) the Company reasonably considers it is required to do so by the application of any laws or regulations or by any government, quasi-government, authority or public body (including any regulatory body of any jurisdiction); or`}</Text>
        <Text>{`c) the Company determines that performing its obligations under these T&Cs is no longer commercially viable.`}</Text>
        <Text>
          21.2 Subject to these T&Cs, nothing in this clause affects your rights
          to any PSY of which you are the absolute owner.
        </Text>
      </Flex>
      <Flex
        direction={"column"}
        gap={2}
        color={"#591D6D"}
        justifyContent={"flex-start"}
        textAlign={"start"}
      >
        <Text fontWeight={600}>22. Survival</Text>
        <Text>
          The following clauses survive termination of these T&Cs and remain
          binding and effective at all times:
        </Text>
        <Text>{`a) this clause;`}</Text>
        <Text>{`b) clause 10 (Refunds, refusals, suspension and termination of contributions);`}</Text>
        <Text>{`c) clause 11 (Token utility);`}</Text>
        <Text>{`d) clause 12 (Contributor’s representations and warranties);`}</Text>
        <Text>{`e) clause 16 (Intellectual property);`}</Text>
        <Text>{`f) clause 17 (Indemnity);`}</Text>
        <Text>{`g) clause 19 (Limitation of liability);`}</Text>
        <Text>{`h) clause 23 (Waiver of set-off);`}</Text>
        <Text>{`i) clause 25 (Personal Data); and`}</Text>
        <Text>{`j) clause 26 (Governing law and dispute resolution).`}</Text>
      </Flex>
      <Flex
        direction={"column"}
        gap={2}
        color={"#591D6D"}
        justifyContent={"flex-start"}
        textAlign={"start"}
      >
        <Text fontWeight={600}>23. Waiver of set-off</Text>
        <Text>
          You acknowledge and agree unconditionally and irrevocably to waive any
          right of set-off, netting, counterclaim, abatement or other similar
          remedy which you might otherwise have in respect of PSY or under these
          T&Cs under the laws of any jurisdiction.
        </Text>
      </Flex>
      <Flex
        direction={"column"}
        gap={2}
        color={"#591D6D"}
        justifyContent={"flex-start"}
        textAlign={"start"}
      >
        <Text fontWeight={600}>24. Taxation</Text>
        <Text>
          24.1 You are solely responsible for determining whether your
          contribution to the Company for the purposes described hereunder, the
          transfer of ETH, the creation, ownership, use, sale, transfer or
          liquidation of PSY, the potential appreciation or depreciation in the
          value of PSY over time (if any), the allocation of PSY and/or any
          other action or transaction contemplated by these T&Cs or related to
          the PsyDAO Commons will give rise to any tax implications on your
          part.
        </Text>
        <Text>
          24.2 You are solely responsible for withholding, collecting,
          reporting, paying, settling and/or remitting any and all taxes to the
          appropriate tax authorities in such jurisdiction(s) in which you may
          be liable to pay tax. The Company is not responsible for withholding,
          collecting, reporting, paying, settling and/or remitting any taxes
          (including, but not limited to, any income, capital gains, sales,
          value added or similar tax) which may arise from your contribution and
          acquisition of PSY under or in connection with these T&Cs.
        </Text>
        <Text>
          24.3 You agree not to hold the Company or any of the Company
          Indemnified Parties liable for any tax liability associated with or
          arising from the creation, ownership, use or liquidation of PSY or any
          other action or transaction related to the PsyDAO Commons or the Token
          Sale.
        </Text>
      </Flex>
      <Flex
        direction={"column"}
        gap={2}
        color={"#591D6D"}
        justifyContent={"flex-start"}
        textAlign={"start"}
      >
        <Text fontWeight={600}>25. Personal Data</Text>
        <Text>
          25.1 If we make an information request in accordance with clause 6, we
          may require you to provide information and documents relating to
          (without limitation to any other information and documents as may be
          required to be provided for the purposes of compliance with applicable
          law):
        </Text>
        <Text>{`a) your identity;`}</Text>
        <Text>{`b) your address;`}</Text>
        <Text>{`c) the source of your wealth;`}</Text>
        <Text>{`d) the source of funds used for the purposes of purchasing PSY; and/or`}</Text>
        <Text>{`e) any other documents or data from which you can be identified; (together, your “Personal Data”).`}</Text>
        <Text>
          25.2 We will not disclose your Personal Data except as expressly
          permitted under these T&Cs and otherwise only with your prior consent.
          However, we may be required to disclose your Personal Data and/or
          certain other information about you to the extent required by
          applicable law or by an order of a court or competent governmental or
          regulatory authority. By accepting these T&Cs, you understand that
          your Personal Data can be disclosed to third parties to any extent
          required for the purposes of compliance with applicable law.
        </Text>
        <Text>
          25.3 We will process your Personal Data in accordance with the
          Personal Data Protection Act and Regulation (EU) 2016/679 of the
          European Parliament and of the Council of 27 April 2016 on the
          protection of natural persons with regard to the processing of
          personal data and on the free movement of such data, and repealing
          Directive 95/46/EC (General Data Protection Regulation), each as may
          be amended (together, “Data Protection Regulations”), and you agree
          that we, as the data controller, may directly or through our service
          providers or agents process your Personal Data for any one or more of
          the following purposes:
        </Text>
        <Text>{`a) the purchase of PSY and the processing of transactions related to the Token Sale pursuant to these T&Cs;`}</Text>
        <Text>{`b) providing you with information about us and our range of services;`}</Text>
        <Text>{`c) compliance with any requirement imposed by applicable law or by an order of a court or competent governmental or regulatory authority;`}</Text>
        <Text>{`d) management of enquiries and complaints;`}</Text>
        <Text>{`e) opening, maintaining or operating a bank account in the Company’s name;`}</Text>
        <Text>{`f) subject to clause 26, resolving any Disputes with you;`}</Text>
        <Text>{`g) producing summary information for statistical, regulatory and audit purposes; and/or`}</Text>
        <Text>{`h) any other reasonable purposes in accordance with applicable law.`}</Text>
        <Text>
          25.4 Under the Data Protection Regulations, you have a right to access
          your Personal Data held by us, and it is your responsibility to inform
          us of any changes to your Personal Data to ensure such data remains
          accurate. You also have a right to object to your Personal Data being
          processed for the purposes of direct marketing. You agree to provide a
          written request to us should you wish to enforce these rights.
        </Text>
        <Text>
          25.5 You agree that we may, for the purposes set out in clause 25.3,
          permit the transfer of your Personal Data to any jurisdiction with an
          adequate level of data protection, whether or not inside the European
          Economic Area, and that by accepting these T&Cs you authorise and
          expressly consent to the processing of your Personal Data by us, our
          agents and/or our service providers, provided that where your Personal
          Data is processed by entities other than us, our agents or our service
          providers, we shall seek your prior written consent in respect of such
          processing.
        </Text>
        <Text>
          25.6 You acknowledge, accept and understand that these T&Cs, insofar
          as they relate to the controlling and processing of your Personal Data
          by the Company, our agents and/or service providers, are only relevant
          to the processing of your Personal Data for the purposes set out in
          25.3, In order to access the PsyDAO Commons and provide or receive
          services therein or otherwise use and interact with the PsyDAO
          Commons, you will be required to accept the Commons Rules which shall
          also set out the terms and conditions under which your Personal Data
          is collected, stored and processed (as well as your individual rights
          under applicable data protection laws) in connection with your
          participation in the PsyDAO Commons.
        </Text>
      </Flex>
      <Flex
        direction={"column"}
        gap={2}
        color={"#591D6D"}
        justifyContent={"flex-start"}
        textAlign={"start"}
      >
        <Text fontWeight={600}>26. Governing law and dispute resolution</Text>
        <Text fontWeight={600}>26.1 Governing law:</Text>
        <Text>
          These T&Cs, including non-contractual claims arising out of or related
          to these T&Cs, and any business relationship hereunder shall be
          governed by and construed in accordance with the laws of Switzerland,
          excluding the conflict of law rules.
        </Text>
        <Text fontWeight={600}>26.2 Jurisdiction (if you are a Consumer):</Text>
        <Text>
          If you are a Consumer, you and the Company each irrevocably submit
          with respect to any Dispute arising out of or related to these T&Cs to
          the exclusive jurisdiction of the Swiss courts.
        </Text>
      </Flex>
      <Flex
        direction={"column"}
        gap={2}
        color={"#591D6D"}
        justifyContent={"flex-start"}
        textAlign={"start"}
      >
        <Text fontWeight={600}>27. Miscellaneous</Text>
        <Text>
          27.1 Amendments. The Company may amend these T&Cs from time to time,
          including where there are changes to the intended utility of PSY,
          where adjustments are required to give effect to the intended
          operation of PSY within the PsyDAO Commons, to make any essential
          corrections, or as may be otherwise required by any laws or regulatory
          requirements to which the Company is subject. If the Company makes any
          amendments to these T&Cs, it will publish a notice together with the
          updated T&Cs on the PSY Website. Any amended T&Cs become effective
          immediately upon the publication of notice and updated T&Cs on the PSY
          Website. It is your responsibility to regularly check the PSY Website
          for any such notices and updated T&Cs.
        </Text>
        <Text>
          27.2 Severability. If any term, clause or provision of these T&Cs is
          found to be illegal, void or unenforceable (in whole or in part), then
          such term, clause or provision will be severable from these T&Cs
          without affecting the validity or enforceability of any remaining part
          of that term, clause or provision, or any other term, clause or
          provision of these T&Cs, which remains in full force and effect.
        </Text>
        <Text>
          27.3 Entire agreement. These T&Cs constitute the entire agreement and
          understanding between the Parties in relation to its subject matter.
          These T&Cs replace and extinguish any and all prior agreements, draft
          agreements, arrangements, warranties, statements, assurances,
          representations and undertakings of any nature made by, or on behalf
          of the Parties, whether oral or written, public or private, in
          relation to that subject matter.
        </Text>
        <Text>
          27.4 Pre-contractual statements. You acknowledge that by accepting
          these T&Cs, you have not relied on any oral or written statements,
          warranties, assurances, representations or undertakings which were or
          may have been made by or on behalf of the Company in relation to the
          subject matter of these T&Cs at any time before your acceptance of
          them (“Pre-Contractual Statements”), other than those set out in these
          T&Cs. You hereby waive any and all rights and remedies which might
          otherwise be available in relation to such Pre-Contractual Statements.
        </Text>
        <Text>
          27.5 Independent contractors. Nothing in these T&Cs creates any form
          of partnership, joint venture or any other similar relationship
          between you and the Company and/or other individuals or entities
          involved with the development and deployment of the Smart Contract
          System and/or the Company Indemnified Parties and/or the PsyDAO
          Commons.
        </Text>
        <Text>
          27.6 Severability. Any term, clause or provision of these T&Cs which
          is prohibited held invalid or unenforceable in any jurisdiction shall,
          as to such jurisdiction, be ineffective to the extent of such
          prohibition, invalidity or unenforceability without invalidating the
          remaining terms, clauses or provisions of these T&Cs, and any such
          prohibition, invalidity or unenforceability in any jurisdiction shall
          not invalidate or render unenforceable such term, clause or provision
          in any other jurisdiction.
        </Text>
        <Text>
          27.7 Prevailing language. The English language version of these T&Cs
          shall be controlling in all respects and shall prevail in case of any
          inconsistencies with translated versions, if any. Any other language
          versions of these T&Cs are provided for convenience only.
        </Text>
      </Flex>
      <Text
        textTransform={"uppercase"}
        justifySelf={"center"}
        textAlign={"center"}
        fontSize={{ base: "16px", md: "18px" }}
        fontWeight={600}
      >
        schedule 1
      </Text>
      <Text
        textTransform={"uppercase"}
        justifySelf={"center"}
        textAlign={"center"}
        fontSize={{ base: "16px", md: "18px" }}
        fontWeight={600}
      >
        psy creation and intended distribution
      </Text>
      <Flex
        direction={"column"}
        gap={2}
        color={"#591D6D"}
        justifyContent={"flex-start"}
        textAlign={"start"}
      >
        <Text>
          A total of 102,334,155.00 (the 40th band of the Fibonacci number
          sequence) PSY were created, to be distributed in accordance with the
          following table:
        </Text>
        <Image
          src="/terms-conditions-graph.png"
          alt="psy distribution graph"
          h={"100%"}
          w={"100%"}
        />
        <Text>
          The PsyDAO Association will oversee the distribution of the treasury
          funds, including the amount of PSY to be used for liquidity after the
          PSY Token Sale, taking into account the community voice exercised
          through PSY voting and ratified by PSYC holders. Vesting terms for PSY
          allocated to Molecule, bio.xyz, Pretopia, and PSYC holders will be
          determined by community vote exercised through PSY voting and ratified
          by PSYC holders. PSY purchased during the Genesis Sale will be fully
          vested and unlocked at the conclusion of the Genesis Sale.
        </Text>
      </Flex>
    </>
  );
};

export default TsCsPartOne;
