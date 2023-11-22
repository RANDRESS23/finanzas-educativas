import { z } from "zod";

export const baseUserSchema = z.object({
  password: z
    .string()
    .min(8, {
      message: "La contraseña debe tener al menos 8 caracteres.",
    })
    .max(50, {
      message: "La contraseña debe tener un máximo de 50 caracteres.",
    }),

  confirmPassword: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres.",
  }),
});

export const userPasswordsSchema = baseUserSchema
  .extend({
    password: z
      .string()
      .min(8, {
        message: "La contraseña debe tener al menos 8 caracteres.",
      })
      .max(50, {
        message: "La contraseña debe tener un máximo de 50 caracteres.",
      }),

    confirmPassword: z.string().min(8, {
      message: "La contraseña debe tener al menos 8 caracteres.",
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

export const signUpSchema = baseUserSchema
  .extend({
    documentType: z.string(),

    document: z
      .string()
      .min(7, {
        message: "El número de documento debe tener al menos 7 caracteres.",
      })
      .max(12, {
        message:
          "El número de documento debe tener un máximo de 12 caracteres.",
      }),

    firstName: z
      .string()
      .min(4, {
        message: "Los nombres deben tener al menos 4 caracteres.",
      })
      .max(50, {
        message: "Los nombres deben tener un máximo de 50 caracteres.",
      }),

    lastName: z
      .string()
      .min(4, {
        message: "Los apellidos deben tener al menos 4 caracteres.",
      })
      .max(50, {
        message: "Los apellidos deben tener un máximo de 50 caracteres.",
      }),

    email: z.string().email({
      message: "El correo electrónico debe ser válido.",
    }),

    phoneNumber: z
      .string()
      .min(8, {
        message: "El número de teléfono debe tener al menos 8 caracteres.",
      })
      .max(12, {
        message: "El número de teléfono debe tener un máximo de 12 caracteres.",
      }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirm_password"],
  });

export const userMoreInfoSchema = z.object({
  documentType: z.string(),

  document: z
    .string()
    .min(7, {
      message: "El número de documento debe tener al menos 7 caracteres.",
    })
    .max(12, {
      message: "El número de documento debe tener un máximo de 12 caracteres.",
    }),

  firstName: z
    .string()
    .min(4, {
      message: "Los nombres deben tener al menos 4 caracteres.",
    })
    .max(50, {
      message: "Los nombres deben tener un máximo de 50 caracteres.",
    }),

  lastName: z
    .string()
    .min(4, {
      message: "Los apellidos deben tener al menos 4 caracteres.",
    })
    .max(50, {
      message: "Los apellidos deben tener un máximo de 50 caracteres.",
    }),

  phoneNumber: z
    .string()
    .min(8, {
      message: "El número de teléfono debe tener al menos 8 caracteres.",
    })
    .max(12, {
      message: "El número de teléfono debe tener un máximo de 12 caracteres.",
    }),

  email: z.string().email({
    message: "El correo electrónico debe ser válido.",
  }),

  // age: [0, 0],
  // civilStatus: "",
  // educationLevel: "",
  // residenceArea: "",
  // typeOfHousing: "",
  // houseServices: [],
  // socioeconomicLevel: 0,
  // numberPeopleContributing: 0,
  // incomeComeFrom: "",
  // isInAPensionFund: false,
  // healthSystemAffiliation: "",
  // numberPeopleDependFinancially: 0,
  // financialProducts: [],
});
