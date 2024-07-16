import { useState } from "react";

export const useFormState = () => {
  const [timeInputType, setTimeInputType] = useState("text");
  const [focusedDate, setFocusedDate] = useState(false);
  const [focusedTime, setFocusedTime] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [floorPrice, setFloorPrice] = useState("");
  const [ceilingPrice, setCeilingPrice] = useState("");
  const [newWhitelistedAddresses, setNewWhitelistedAddresses] = useState("");
  const [addressesToRemove, setAddressesToRemove] = useState<string[]>([]);
  const [width] = useState(window.innerWidth);

  return {
    timeInputType,
    setTimeInputType,
    focusedDate,
    setFocusedDate,
    focusedTime,
    setFocusedTime,
    isSubmitting,
    setIsSubmitting,
    startDate,
    setStartDate,
    startTime,
    setStartTime,
    floorPrice,
    setFloorPrice,
    ceilingPrice,
    setCeilingPrice,
    newWhitelistedAddresses,
    setNewWhitelistedAddresses,
    addressesToRemove,
    setAddressesToRemove,
    width
  };
};
