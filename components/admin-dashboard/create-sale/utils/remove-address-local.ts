export const handleDeleteWhitelistedAddresses = (
  addressesToRemove: string[],
  whitelistedArray: string[]
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
};
