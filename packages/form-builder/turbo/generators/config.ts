import type { PlopTypes } from "@turbo/gen";

// Learn more about Turborepo Generators at https://turbo.build/repo/docs/core-concepts/monorepos/code-generation

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // A simple generator to add a new React component to the internal UI library
  plop.setGenerator("Input", {
    description: "Adds a component with form-builder types and controller",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the component?",
      },
    ],
    actions: [
      {
        // create input file
        type: "add",
        path: "src/components/{{kebabCase name}}.tsx",
        templateFile: "templates/input/input.hbs",
      },
      {
        // create type for new input
        type: "append",
        pattern: "/* Generated Input Types (start) */",
        path: "src/types/inputs.ts",
        templateFile: "templates/input/append-type.hbs"
      },
      {
        // add input to form builder input types
        type: "append",
        pattern: "type Input<T extends FieldValues> = (",
        path: "src/types/inputs.ts",
        template: "  {{ pascalCase name }}Input |",
      },
      {
        // import new input in render input
        type: "append",
        pattern: "/* import Inputs (start) */",
        path: "src/render-input.tsx",
        template: "import {{ pascalCase name }}Input from \"./components/{{ kebabCase name}}\"",
      },
      {
        // use new input in render input switch case
        type: "append",
        pattern: "/* Generated Inputs (start) */",
        path: "src/render-input.tsx",
        templateFile: "templates/input/render-case.hbs",
      },
    ],
  });
}
