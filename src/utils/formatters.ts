// Utility functions for Bengali formatting

export const toBengaliNumber = (num: number | string): string => {
  if (num === undefined || num === null) return "";
  const englishToBengaliMap: { [key: string]: string } = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
    '.': '.'
  };
  return num.toString().replace(/[0-9.]/g, (match) => englishToBengaliMap[match] || match);
};

export const formatUnit = (unit: string): string => {
  if (!unit) return "";
  const unitLower = unit.toLowerCase();
  if (unitLower === "kg") return "প্রতি কেজি";
  if (unitLower === "liter" || unitLower === "litre") return "প্রতি লিটার";
  if (unitLower === "piece" || unitLower === "pc") return "প্রতি পিস";
  if (unitLower === "hali") return "প্রতি হালি";
  if (unitLower === "dozen") return "প্রতি ডজন";
  if (unitLower === "gram" || unitLower === "gm") return "প্রতি গ্রাম";
  return `প্রতি ${unit}`;
};

export const getUnitShortName = (unit: string): string => {
  if (!unit) return "";
  const unitLower = unit.toLowerCase();
  if (unitLower === "kg") return "কেজি";
  if (unitLower === "liter" || unitLower === "litre") return "লিটার";
  if (unitLower === "piece" || unitLower === "pc") return "পিস";
  if (unitLower === "hali") return "হালি";
  if (unitLower === "dozen") return "ডজন";
  if (unitLower === "gram" || unitLower === "gm") return "গ্রাম";
  return unit;
};


