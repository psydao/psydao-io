const updateWhitelist = (
  whitelistedArray: string[],
  addressesToRemove: string[],
  splitNewWhitelistedAddresses: string[]
) => {
  let newArray: string[] = whitelistedArray;

  addressesToRemove.forEach((addressToRemove) => {
    if (
      addressesToRemove.length > 0 &&
      whitelistedArray.includes(addressToRemove)
    ) {
      newArray = newArray.filter((address) => address !== addressToRemove);
    }
  });

  if (whitelistedArray.length > 0 && newArray.length > 0) {
    localStorage.setItem(
      "whitelistedAddresses",
      JSON.stringify([...newArray, ...splitNewWhitelistedAddresses])
    );
  } else if (whitelistedArray.length > 0 && newArray.length === 0) {
    localStorage.setItem(
      "whitelistedAddresses",
      JSON.stringify([...whitelistedArray, ...splitNewWhitelistedAddresses])
    );
  } else {
    localStorage.setItem(
      "whitelistedAddresses",
      JSON.stringify([...splitNewWhitelistedAddresses])
    );
  }
};
export default updateWhitelist;
