import { useFormInput } from "./utils";

export const useSignupFields = () => {
  return [
    {
      id: "firstname",
      label: "Firstname",
      required: true,
      input: {
        props: {
          type: "text",
          placeholder: "Juan",
        },
        state: useFormInput(""),
      },
    },
    {
      id: "lastname",
      label: "Lastname",
      required: true,
      input: {
        props: {
          type: "text",
          placeholder: "Dela Cruz",
        },
        state: useFormInput(""),
      },
    },
    {
      id: "email",
      label: "Email",
      required: true,
      input: {
        props: {
          type: "email",
          placeholder: "juandelacruz@gmail.com",
        },
        state: useFormInput(""),
      },
    },
    {
      id: "username",
      label: "Username",
      required: true,
      input: {
        props: {
          type: "text",
          placeholder: "JuanDelaCruz",
        },
        state: useFormInput(""),
      },
    },
    {
      id: "password",
      label: "Password",
      required: true,
      input: {
        props: {
          type: "password",
          placeholder: "*********",
        },
        state: useFormInput(""),
      },
    },
  ];
};

export const useLoginFields = () => {
  return [
    {
      id: "username",
      label: "Username",
      required: true,
      input: {
        props: {
          type: "text",
          placeholder: "JuanDelaCruz",
        },
        state: useFormInput(""),
      },
    },
    {
      id: "password",
      label: "Password",
      required: true,
      input: {
        props: {
          type: "password",
          placeholder: "*******",
        },
        state: useFormInput(""),
      },
    },
  ];
};

export const useContactFields = () => {
  return [
    {
      id: "firstname",
      label: "First name",
      required: true,
      input: {
        props: {
          type: "text",
          placeholder: "Juan",
        },
        state: useFormInput(""),
      },
    },
    {
      id: "lastname",
      label: "Last name",
      required: true,
      input: {
        props: {
          type: "text",
          placeholder: "Dela Cruz",
        },
        state: useFormInput(""),
      },
    },
    {
      id: "phone_number",
      label: "Mobile Number",
      required: true,
      input: {
        props: {
          type: "numeric",
          placeholder: "09191234567",
          maxlength: 11,
        },
        state: useFormInput(""),
      },
    },
  ];
};

export const useUpdateContactFields = () => {
  return [
    {
      id: "firstname",
      label: "First name",
      required: true,
      input: {
        props: {
          type: "text",
          placeholder: "Juan",
        },
        state: useFormInput(""),
      },
    },
    {
      id: "lastname",
      label: "Last name",
      required: true,
      input: {
        props: {
          type: "text",
          placeholder: "Dela Cruz",
        },
        state: useFormInput(""),
      },
    },
    {
      id: "phone_number",
      label: "Mobile Number",
      required: true,
      input: {
        props: {
          type: "numeric",
          placeholder: "09191234567",
          maxlength: 11,
        },
        state: useFormInput(""),
      },
    },
  ];
};
