import React from "react";
import { ErrorMessage, useField } from "formik";

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input
        autocomplete="off"
        {...field}
        {...props}
        className={`peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 ${
          meta.touched && meta.error
        } `}
      />
      <p className="text-red-600 text-sm">
        {" "}
        <ErrorMessage className="error" name={field.name} />
      </p>
    </>
  );
};
