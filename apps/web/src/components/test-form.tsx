"use client";
import { FormBuilder } from "@lib/form-builder";
import type { Card } from "@lib/form-builder/types";

const cards: Card[] = [
  {
    title: "Card 1",
    isList: false,
    inputs: [
      {
        type: "text",
        name: "title",
        label: "Title",
      },
      {
        type: "text",
        name: "key",
        label: "Key",
      },
      {
        type: "country",
        name: "country",
        label: "Country",
      },
    ],
    name: "data",
  },
];

const TestForm = () => {

  const onSubmit = (v: unknown) => {
    console.log(v);
  };

  return (
    <FormBuilder
      formId="TEST_FORM"
      onSubmit={onSubmit}
      cards={cards}
    />
  );
};

export default TestForm;
