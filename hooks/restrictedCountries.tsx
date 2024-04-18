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
  { name: "Zimbabwe", code: "ZW" }
];

interface apiData {
  ip: string;
  country_code: string;
  country_name: string;
  region_code: string;
  region_name: string;
  city: string;
  zip_code: string;
  time_zone: string;
  latitude: number;
  longitude: number;
  metro_code: number;
}

export const useRescrictedCountries = () => {
  const [isRestricted, setIsRestricted] = useState(false);
  const [cookies, setCookie] = useCookies(["countryCode"]);

  useEffect(() => {
    const fetchCountryCode = async () => {
      try {
        const response = await fetch("https://api.ipbase.com/v1/json/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = (await response.json()) as apiData;
        if (data?.country_code) {
          const countryCode = data.country_code;
          setCookie("countryCode", countryCode, { path: "/" });
        }
      } catch (error) {
        console.error("Failed to fetch country code:", error);
      }
    };

    if (!cookies.countryCode) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
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
