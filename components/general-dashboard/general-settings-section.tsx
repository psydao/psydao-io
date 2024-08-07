import { Alert, AlertIcon, Box, Spinner } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { useGeneralSettingsForm } from "@/hooks/useGeneralSettingsForm";

import RoyaltiesRevenueSection from "./royalties-revenue-section";
import OpenPublicSaleSection from "./open-public-sale-section";
import BuyLimitSection from "./buy-limit-section";
import RoyaltiesSection from "./revenue-split/royalties-section";
import NftOwnersSection from "./revenue-split/nft-owners-section";
import TreasurySection from "./revenue-split/treasury-section";
import SubmitButtonContainer from "../commons/submit-button-container";
import SaveButton from "./save-settings-button";

const GeneralSettingsSection = ({
  triggerNftSaleUpdate,
  onDashboardClose
}: {
  triggerNftSaleUpdate: () => void;
  onDashboardClose: () => void;
}) => {
  const { address } = useAccount();
  const {
    revenue,
    buyLimit,
    setBuyLimit,
    royalties,
    setRoyalties,
    treasury,
    setTreasury,
    ownerPercentage,
    setOwnerPercentage,
    openPublicSale,
    setOpenPublicSale,
    handleSaveSettings,
    isSubmitting,
    loading,
    error
  } = useGeneralSettingsForm(address, triggerNftSaleUpdate);

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSaveSettings}>
      <Box position="relative" height="100%" mb={12} overflowY="auto">
        <RoyaltiesRevenueSection
          revenue={revenue}
          onDashboardClose={onDashboardClose}
        />
        <OpenPublicSaleSection
          openPublicSale={openPublicSale}
          setOpenPublicSale={setOpenPublicSale}
        />
        <BuyLimitSection buyLimit={buyLimit} setBuyLimit={setBuyLimit} />
        <Box
          width="100%"
          p={6}
          borderY="1px"
          fontWeight="bold"
          borderColor="#F2BEBE"
        >
          Revenue Splits
        </Box>
        <RoyaltiesSection royalties={royalties} setRoyalties={setRoyalties} />
        <NftOwnersSection
          ownerPercentage={ownerPercentage}
          setOwnerPercentage={setOwnerPercentage}
        />
        <TreasurySection treasury={treasury} setTreasury={setTreasury} />
        <SubmitButtonContainer>
          <SaveButton address={address} isSubmitting={isSubmitting}>
            Save
          </SaveButton>
        </SubmitButtonContainer>
      </Box>
    </form>
  );
};

export default GeneralSettingsSection;
