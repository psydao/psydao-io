export const getDeadlineTimeStamp = (
  startTime: number,
  minimumDeadline: string
): string => {
  const deadline = (startTime + parseInt(minimumDeadline) + 10).toString();

  console.log({ deadline });

  return deadline;
};
