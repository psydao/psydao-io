import Router from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const RESTRICTED_COUNTRIES = [""];

export const useRestrictedCountries = () => {
  const [cookies, setCookie] = useCookies(["countryCode"]);

  const isRestricted =
    cookies.countryCode && RESTRICTED_COUNTRIES.includes(cookies.countryCode);

  useEffect(() => {
    const fetchCountryCode = async () => {
      try {
        const response = await fetch("https://api.ipbase.com/v1/json/");
        const data = await response.json();
        const countryCode = data.country_code || null;
        setCookie("countryCode", countryCode, { path: "/" });
      } catch (error) {
        console.error("Failed to fetch country code:", error);
      }
    };

    if (!cookies.countryCode) {
      fetchCountryCode();
    }
  }, [cookies.countryCode, setCookie]);

  useEffect(() => {
    if (isRestricted) {
      Router.push("/restricted");
    }
  }, [isRestricted]);

  return null;
};
