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
import { useGlobalContext } from "@/contexts/globalContext";
import { useWindowManager } from "../ui/window-manager";
import SkeletonLoader from "../ui/skeleton-loader";

const GeneralSettingsSection = () => {
  const { setUpdateNftSaleTrigger } = useGlobalContext() as {
    setUpdateNftSaleTrigger: React.Dispatch<React.SetStateAction<number>>;
  };

  const triggerNftSaleUpdate = () => {
    setUpdateNftSaleTrigger((prev) => prev + 1);
  };

  const { address } = useAccount();
  const { handleSaveSettings, isSubmitting, loading, error } =
    useGeneralSettingsForm(address, triggerNftSaleUpdate);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }
  const { dispatch } = useWindowManager();

  const handleCloseDashboard = () => {
    dispatch({ type: "close", id: "general-dashboard" });
  };

  return (
    <form onSubmit={handleSaveSettings}>
      <Box position="relative" height="100%" mb={12} overflowY="auto">
        <RoyaltiesRevenueSection onDashboardClose={handleCloseDashboard} />
        <OpenPublicSaleSection />
        <BuyLimitSection />
        <Box
          width="100%"
          p={6}
          borderY="1px"
          fontWeight="bold"
          borderColor="#F2BEBE"
        >
          Revenue Splits
        </Box>
        <RoyaltiesSection />
        <NftOwnersSection />
        <TreasurySection />
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
