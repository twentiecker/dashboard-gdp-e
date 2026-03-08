<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";

const toast = useToast();
const router = useRouter();

const initialValues = ref({
  username: "",
  password: "",
});

const resolver = ({ values }) => {
  const errors = { username: [], password: [] };

  if (!values.username) {
    errors.username.push({
      type: "required",
      message: "Username is required.",
    });
  }

  if (values.username?.length < 3) {
    errors.username.push({
      type: "minimum",
      message: "Username must be at least 3 characters long.",
    });
  }

  if (!values.password) {
    errors.password.push({
      type: "required",
      message: "Password is required.",
    });
  }

  if (values.password?.length < 5) {
    errors.password.push({
      type: "minimum",
      message: "Password must be at least 6 characters long.",
    });
  }

  return {
    values,
    errors,
  };
};

const onFormSubmit = ({ valid, values }) => {
  if (valid && values.username === "admin" && values.password === "admin") {
    localStorage.setItem("isLogin", "true");

    toast.add({
      severity: "success",
      summary: "Form is submitted.",
      life: 3000,
    });

    router.push("/");
  } else if (
    valid &&
    values.username !== "admin" &&
    values.password !== "admin"
  ) {
    toast.add({
      severity: "error",
      summary: "Authentication failed.",
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
        <h1>Welcome Back!</h1>
        <p class="text-center">Enter your password and username.</p>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <InputText name="username" type="text" placeholder="Username" fluid />
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
            :feedback="false"
            name="password"
            type="text"
            placeholder="Password"
            fluid
          />
          <Message
            v-if="$form.password?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.password.error?.message }}</Message
          >
        </div>
      </div>
      <div class="flex flex-col items-center gap-1">
        <Button
          type="submit"
          severity="secondary"
          label="Submit"
          class="w-full"
        />
        <p class="text-xs">
          Don't have an account?
          <router-link :to="{ name: 'register' }">Register</router-link>
          here
        </p>
      </div>
    </Form>
  </div>
</template>
