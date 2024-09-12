export const getWindowTop = (fullScreenWindow: boolean) => ({
  base: fullScreenWindow ? "0" : "60%",
  sm: fullScreenWindow ? "0" : "58%",
  md: fullScreenWindow ? "0" : "56%"
});
