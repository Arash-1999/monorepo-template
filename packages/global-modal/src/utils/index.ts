const cls = (cls: Record<string, boolean>): string => {
  return Object.entries(cls).filter(([_, v]) => v).map(([k]) => k).join(" ");
};

export {
  cls,
};
