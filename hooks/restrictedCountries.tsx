import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const RESTRICTED_COUNTRIES = [
  { name: "United States of America", code: "US" },
  { name: "Belarus", code: "BY" },
  { name: "Myanmar", code: "MM" },
  { name: "Côte d'Ivoire", code: "CI" },
  { name: "Cuba", code: "CU" },
  { name: "Democratic Republic of the Congo", code: "CD" },
  { name: "Iran (Islamic Republic of)", code: "IR" },
  { name: "Iraq", code: "IQ" },
  { name: "Liberia", code: "LR" },
  { name: "Korea (Democratic People's Republic of)", code: "KP" },
  { name: "Syrian Arab Republic", code: "SY" },
  { name: "Zimbabwe", code: "ZW" },
];

export const useRestrictedCountries = () => {
  const [isRestricted, setIsRestricted] = useState(false);
  const [cookies, setCookie] = useCookies(["countryCode"]);

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
    if (
      cookies?.countryCode &&
      RESTRICTED_COUNTRIES.some(
        (country) => country.code === cookies.countryCode
      )
    ) {
      setIsRestricted(true);
    }
  }, [cookies]);

  return isRestricted;
};
