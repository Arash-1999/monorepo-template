import { ReactNode } from "react";
import { type UseFormReturn } from "react-hook-form";

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
* range
* select, multiselect
* auto-complete
* chip
* rating
* country(visual -> d3 geo, dropdown)
* map/location(leaflet)
*/
type TextInput = {
  type: "text";
};
type CountrySelector = {
  type: "country";
};
type ListInput = {
  type: "list";
  inputs: Input[];
  createContainer?: (input: ListInput & BaseInput) => (nodes: ReactNode) => ReactNode;
}

export type Input = (
  TextInput |
  CountrySelector |
  ListInput
) & BaseInput;

type ListCard = {
  isList: false;
};
type NormalCard = {
  isList: true;
};

export type ActionCreator = (actionArg: {
  formMethods: UseFormReturn;
  name: string;
  path?: string;
}) => ReactNode;

export type Card = (ListCard | NormalCard) & {
  title: ReactNode;
  name: string;
  inputs: Input[];
  action?: ActionCreator;
};

export type FormBuilderProps = {
  onSubmit: (v: unknown) => void;
  cards: Card[];
  formId: string;
};

export type CardCreatorProps = Omit<Card, "isList"> & {
  formMethods: UseFormReturn;
};

type AppendAction = { method: "append", value: unknown };
type PrependAction = { method: "prepend", value: unknown };
type InsertAction = { method: "insert", value: [number, unknown] };
type SwapAction = { method: "swap", value: [number, number] };
type MoveAction = { method: "move", value: [number, number] };
type UpdateAction = { method: "update", value: [number, unknown] };
type ReplaceAction = { method: "replace", value: unknown };
type RemoveAction = { method: "remove", value: number | number[] };

export type FormAction = AppendAction |
  PrependAction |
  InsertAction |
  SwapAction |
  MoveAction |
  UpdateAction |
  ReplaceAction |
  RemoveAction |
  null;
