<script setup>
import { ref } from "vue";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { useToast } from "primevue/usetoast";
import { z } from "zod";
import { useRouter } from "vue-router";

const toast = useToast();
const router = useRouter();

const initialValues = ref({
  name: "",
  username: "",
  password: "",
  role: null,
});

const roles = ref([
  { name: "Direktur", code: "direktur" },
  { name: "Konsolidator", code: "konsolidator" },
  { name: "PKRT", code: "pkrt" },
  { name: "PKLNPRT", code: "pklnprt" },
  { name: "PMTB", code: "pmtb" },
  { name: "PI", code: "pi" },
  { name: "XM", code: "xm" },
  { name: "DNPeng", code: "dnpeng" },
  { name: "Lapres", code: "lapres" },
]);

const resolver = ref(
  zodResolver(
    z.object({
      name: z.string().min(1, { message: "Name is required." }),
      username: z
        .string()
        .min(1, { message: "Email is required." })
        .email({ message: "Invalid email address." }),
      password: z
        .string()
        .min(3, { message: "Minimum 3 characters." })
        .max(8, { message: "Maximum 8 characters." })
        .refine((value) => /[a-z]/.test(value), {
          message: "Must have a lowercase letter.",
        })
        .refine((value) => /[A-Z]/.test(value), {
          message: "Must have an uppercase letter.",
        })
        .refine((value) => /\d/.test(value), {
          message: "Must have a number.",
        }),
      role: z.union([
        z.object({
          code: z.string().min(1, "Role is required."),
        }),
        z.any().refine((val) => false, { message: "Role is required." }),
      ]),
    }),
  ),
);

const onFormSubmit = ({ valid, values }) => {
  if (valid) {
    console.log(values);

    toast.add({
      severity: "success",
      summary: "Registration is success. Go to login page!",
      life: 3000,
    });
  }
};
</script>

<template>
  <div class="auth-container">
    <Toast />

    <Form
      v-slot="$form"
      :initialValues
      :resolver
      @submit="onFormSubmit"
      class="flex flex-col gap-10 w-full sm:w-56"
    >
      <div class="flex flex-col items-center gap-1">
        <h1>Register Here!</h1>
        <p class="text-center">Please input your password and username.</p>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <InputText name="name" type="text" placeholder="Name" fluid />
          <Message
            v-if="$form.name?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.name.error?.message }}</Message
          >
        </div>
        <div class="flex flex-col gap-1">
          <InputText name="username" type="text" placeholder="Email" fluid />
          <Message
            v-if="$form.username?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.username.error?.message }}</Message
          >
        </div>
        <div class="flex flex-col gap-1">
          <Password
            name="password"
            placeholder="Password"
            :feedback="false"
            toggleMask
            fluid
          />
          <template v-if="$form.password?.invalid">
            <Message
              v-for="(error, index) of $form.password.errors"
              :key="index"
              severity="error"
              size="small"
              variant="simple"
              >{{ error.message }}</Message
            >
          </template>
        </div>
        <div class="flex flex-col gap-1">
          <Select
            name="role"
            :options="roles"
            optionLabel="name"
            placeholder="Select a Role"
            fluid
          />
          <Message
            v-if="$form.role?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.role.error?.message }}</Message
          >
        </div>
      </div>
      <div class="flex flex-col items-center gap-1">
        <Button
          type="submit"
          variant="outlined"
          severity="contrast"
          label="Register"
          class="w-full"
        />
        <!-- <p class="text-xs">
          Already have an account?
          <router-link :to="{ name: 'login' }">Login</router-link>
          here
        </p> -->
      </div>
    </Form>
  </div>
</template>
