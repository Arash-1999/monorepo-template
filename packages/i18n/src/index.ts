const rtlLangs = ["fa", ];

const getDirection = (locale: string): "rtl" | "ltr" => {
  return rtlLangs.includes(locale) ? "rtl" : "ltr";
};

export { getDirection };
