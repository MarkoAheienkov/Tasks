const createDateFromNow = (ms: number): Date => {
  const current = Date.now();
  return new Date(current + ms);
};

export default createDateFromNow;
