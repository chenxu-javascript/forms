import React from "react";
import { useForm, FormContext } from "react-hook-form";

interface Iprops {
  children: React.ReactChild;
  handSubmit?: (data: any) => {};
  defaultValues?: any;
}

export default function App(props: Iprops) {
  const { children, handSubmit, defaultValues } = props;
  const methods = useForm({ defaultValues });
  const watch = methods.watch();
  console.log(watch);
  const onSubmit = (data: any) => {
    console.log(data);
    handSubmit && handSubmit(data);
  };

  return (
    <FormContext {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormContext>
  );
}
