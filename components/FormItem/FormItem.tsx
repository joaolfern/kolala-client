import type { ReactNode } from "react";
import type { FieldError } from "react-hook-form";
import { StyleSheet } from "react-native";

import ErrorDescription from "../ErrorDescription/ErrorDescription";
import Label from "../Label/Label";
import Span from "../Span/Span";

interface IFormItem {
  label: ReactNode | undefined;
  children: ReactNode;
  error: FieldError | undefined;
}

function FormItem({ label, error, children }: IFormItem) {
  return (
    <Span style={styles.Container}>
      {label && <Label>{label}</Label>}
      {children}
      <ErrorDescription error={error} />
    </Span>
  );
}

export default FormItem;

const styles = StyleSheet.create({
  Container: {},
});
