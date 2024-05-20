import { Fragment, type ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { type FormBuilderProps, type CardCreatorProps } from "./types";
import { Grid, Box, Paper } from "@mui/material";
import ListForm from "./list-form";
import { renderInput } from "./render-input";
import { gridProps } from "./components/configs";

const sx = {
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
  }
};
const createCard = ({
  formMethods, title, action, name,
}: CardCreatorProps) => {
  return (nodes: ReactNode, ) => {
    return (
      <Grid item {...gridProps.item}>
        <Paper>
        <Grid container {...gridProps.container}>
          {/* HEAD */}
          <Grid item xs={12} sx={sx.row}>
            <Box>
              {title}
            </Box>

            {action ? (
              <Box>
                {action({formMethods, name})}
              </Box>
            ) : null}
          </Grid>
          {/* BODY */}
          {nodes}
        </Grid>
        </Paper>
      </Grid>
    );
  };
};

const FormBuilder = ({onSubmit, cards, formId}: FormBuilderProps) => {
  const form = useForm({
    // defaultValues: {
    //   data: {
    //     price: [12, 18],
    //   }
    // } as any,
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id={formId}>
        <Grid container {...gridProps.container}>
          {cards.map(({isList, ...card}, i) => {
            // TODO: use card id as react key
            if(isList) {
              return (
                <ListForm
                  key={i}
                  inputs={card.inputs}
                  name={card.name}
                  formMethods={form}
                  createContainer={createCard({...card, formMethods: form, })}
                />
              );
            }else {
              return (
                <Fragment key={i}>
                  {createCard({ ...card, formMethods: form, })((
                    <Fragment>
                    {/* <Grid item xs={12}> */}
                      {card.inputs.map((input) => renderInput(form, input, card.name))}
                    {/* </Grid> */}
                    </Fragment>
                  ))}
                </Fragment>
              )
            }
          })}
        </Grid>
      </form>
    </FormProvider>
  );
};

export default FormBuilder;
