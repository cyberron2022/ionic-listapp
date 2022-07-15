import { useState } from "react";

export const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  // const handleChange = async (e) => {
  //   // const tempValue = e.target.value.replace(/\D/g, "");
  //   // setValue(tempValue);
  //   // const re = /^[0-9\b]+$/;
  //   // console.log("change", re.test(e.target.value));
  //   // if (re.test(e.target.value)) {
  //   //   console.log("true");
  //   //   const tempValue = await e.currentTarget.value;
  //   //   setValue(tempValue);
  //   // } else {
  //   //   console.log("false");
  //   // }
  // };

  const handleChange = async (e) => {
    const tempValue = await e.currentTarget.value;
    setValue(tempValue);
  };

  return {
    value,
    reset: (newValue) => setValue(newValue),
    onIonChange: handleChange,
    onKeyUp: handleChange,
  };
};

export const validateForm = (fields) => {
  let errors = [];

  fields.forEach((field) => {
    if (field.required) {
      const fieldValue = field.input.state.value;

      const fieldId = field.id;
      const fieldLabel = field.label;
      if (fieldValue === "") {
        const error = {
          id: field.id,
          message: `Please check your ${fieldLabel}`,
        };

        errors.push(error);
      } else {
        // input has value

        const pattern =
          /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        const result = pattern.test(fieldValue.trim());
        if (fieldId == "email" && result === false) {
          const error = {
            id: field.id,
            message: `Invalid email address`,
          };
          errors.push(error);
        }

        if (
          fieldId === "username" ||
          fieldId === "firstname" ||
          fieldId === "lastname"
        ) {
          if (fieldValue.toString().length <= 5) {
            const error = {
              id: field.id,
              message: "Must be greater than 5",
            };
            errors.push(error);
          }
          if (fieldValue.toString().length >= 20) {
            const error = {
              id: field.id,
              message: "Must be less than 20",
            };
            errors.push(error);
          }
        }

        if (fieldId === "password") {
          if (fieldValue.toString().length <= 7) {
            const error = {
              id: field.id,
              message: "Must be greater than 8",
            };
            errors.push(error);
          }
          if (fieldValue.toString().length >= 20) {
            const error = {
              id: field.id,
              message: "Must be less than 20",
            };
            errors.push(error);
          }
        }

        if (fieldId === "phone_number") {
          if (fieldValue.toString().length !== 11) {
            const error = {
              id: field.id,
              message: "Must be 11 numbers",
            };
            errors.push(error);
          }
        }
      }
    }
  });

  return errors;
};
