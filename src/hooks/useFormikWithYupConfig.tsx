import { useFormik, FormikConfig, FormikHelpers, FormikValues } from "formik";
import * as Yup from "yup";

type FormikWithYupConfig<T> = Omit<
  FormikConfig<T>,
  "initialValues" | "validationSchema" | "onSubmit"
> & {
  initialValues: T;
  validationSchema: Yup.ObjectSchema<any>;
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<any>;
};

export function useFormikWithYup<T extends FormikValues>({
  initialValues,
  validationSchema,
  onSubmit,
  ...config
}: FormikWithYupConfig<T>) {
  const formik = useFormik<T>({
    initialValues,
    validationSchema,
    onSubmit,
    ...config,
  });

  return formik;
}
