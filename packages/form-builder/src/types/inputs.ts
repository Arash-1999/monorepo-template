import type { ReactNode } from "react";
import type { FieldValues } from "react-hook-form";

type BaseInput = {
  name: string;
  label: string;
};

/* TODO: add other input types
* checkbox
* color
* date, time(month, week, range)
* text(email, number, password, tel, url)
* file
* radio
* range/slider
* select, multiselect
* auto-complete
* chip
* rating
* country(visual -> d3 geo, dropdown)
* map/location(leaflet)
*/

/* Generated Input Types (start) */
type TextInput = {
  type: "text";
};
type CountryInput = {
  type: "country";
};
/* Generated Input Types (end) */

type ListInput<T extends FieldValues> = {
  type: "list";
  inputs: Input<T>[];
  createContainer?: (input: ListInput<T> & BaseInput) => (nodes: ReactNode) => ReactNode;
}

type Input<T extends FieldValues> = (
  TextInput |
  CountryInput |
  ListInput<T>
) & BaseInput;


export type {
  Input,
}
