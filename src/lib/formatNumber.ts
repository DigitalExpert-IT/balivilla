export const formatBigNumb = (value: any) => {
  if (isNaN(value)) return;
  return (Number(value) / 10 ** 18).toFixed(2);
};
