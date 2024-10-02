type TSelectStatus = "init" | "open" | "filter" | "close";
type TListStatus = "shut" | "open";

interface SelectProps {
  name: string;
  id: string;
  debounceTime?: number;
  options: {
    label: string;
    value: string;
  }[];
}

export type { SelectProps, TSelectStatus, TListStatus };
