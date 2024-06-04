import type {
  UseFieldArrayAppend,
  UseFieldArrayInsert,
  UseFieldArrayPrepend,
  UseFieldArrayReplace,
  UseFieldArrayUpdate,
  FieldValues,
} from "react-hook-form";

type AppendAction<TFormValues extends FieldValues> = {
  method: "append",
  value: Parameters<UseFieldArrayAppend<TFormValues>>;
};
type PrependAction<TFormValues extends FieldValues> = {
  method: "prepend";
  value: Parameters<UseFieldArrayPrepend<TFormValues>>;
};
type InsertAction<TFormValues extends FieldValues> = {
  method: "insert"; 
  value: Parameters<UseFieldArrayInsert<TFormValues>>;
};
type SwapAction = {
  method: "swap";
  value: [number, number];
};
type MoveAction = {
  method: "move"; 
  value: [number, number];
};
type UpdateAction<TFormValues extends FieldValues> = {
  method: "update"; 
  value: Parameters<UseFieldArrayUpdate<TFormValues>>;
};
type ReplaceAction<TFormValues extends FieldValues> = { 
  method: "replace"; 
  value: Parameters<UseFieldArrayReplace<TFormValues>>;
};
type RemoveAction = { 
  method: "remove"; 
  value: number | number[];
};

// TODO: check defualt is working properly
export type FormAction<TFormValues extends FieldValues = FieldValues> = AppendAction<TFormValues> |
  PrependAction<TFormValues> |
  InsertAction<TFormValues> |
  SwapAction |
  MoveAction |
  UpdateAction<TFormValues> |
  ReplaceAction<TFormValues> |
  RemoveAction |
  null;
