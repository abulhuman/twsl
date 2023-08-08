<script setup lang="ts">
import { ref } from 'vue';
import api from '../services/api.service';
import router from '../router';
import { UserTypeEnum } from '../types';

const tabs = ref(2);
const loginForm = ref();
const registerForm = ref();
const companyName = ref('');
const loginEmail = ref('');
const loginPassword = ref('');
const registerEmail = ref('');
const registerPassword = ref('');
const repeatPassword = ref('');

const rules = {
  required: (v: string) => !!v || 'Required',
  minLen: (v: string) => (v && v.length >= 8) || 'Min 8 characters',
  email: (v: string) => /.+@.+/.test(v) || 'E-mail must be valid'
};

const userType = ref();
const userTypeOptions = ref(
  Object.values(UserTypeEnum).map((s) => {
    return {
      text: `${s.charAt(0).toUpperCase()}${s.toLowerCase().substring(1)}`,
      value: s
    };
  })
);
const address = ref('');

const showPasswordMismatchError = ref(false);

const login = () => {
  loginForm.value
    ?.validate()
    .then(async (res: { valid: boolean; errors: ProxyConstructor[] }) => {
      if (!res.valid) return;
      const response = await api.post('/auth/login', {
        email: loginEmail.value,
        password: loginPassword.value
      });
      if (response.data) {
        localStorage.setItem('auth-payload', JSON.stringify(response.data));
        router.push('/dashboard');
      }
    });
  return;
};

const passwordsMatch = () => loginPassword.value === repeatPassword.value;

const register = async () => {
  if (!passwordsMatch()) {
    showPasswordMismatchError.value = true;
    setTimeout(() => {
      showPasswordMismatchError.value = false;
    }, 3000);
    return;
  }
  registerForm.value
    ?.validate()
    .then(async (res: { valid: boolean; errors: ProxyConstructor[] }) => {
      if (!res.valid) return;
      const response = await api.post('/auth/register', {
        companyName: companyName.value,
        email: registerEmail.value,
        password: loginPassword.value,
        userType: userType.value,
        address: address.value
      });
      if (response.data) {
        localStorage.setItem('auth-payload', JSON.stringify(response.data));
        router.push('/dashboard');
      }
    });
};
</script>

<template>
  <v-container grid-list-md>
    <v-card>
      <v-tabs fixed-tabs v-model="tabs">
        <v-tab :value="1">Login</v-tab>
        <v-tab :value="2">Register</v-tab>
      </v-tabs>
      <template v-if="tabs == 1">
        <v-card-title primary-title>
          <div>
            <h3 class="headline my-4">Login</h3>
          </div>
        </v-card-title>
        <v-card-text>
          <v-form ref="loginForm">
            <v-text-field
              label="Email"
              required
              v-model="loginEmail"
              variant="outlined"
              :rules="[rules.required, rules.email]"
            ></v-text-field>
            <v-text-field
              label="Password"
              required
              type="password"
              v-model="loginPassword"
              variant="outlined"
              :rules="[rules.minLen, rules.required]"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="primary" @click="login">Login</v-btn>
        </v-card-actions>
      </template>
      <template v-else>
        <v-card-title primary-title>
          <div>
            <h3 class="headline my-4">Register</h3>
          </div>
        </v-card-title>
        <v-card-text>
          <v-form ref="registerForm">
            <v-text-field
              label="Company Name"
              required
              v-model="companyName"
              variant="outlined"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              label="Email"
              required
              v-model="registerEmail"
              variant="outlined"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              label="Password"
              required
              type="password"
              v-model="registerPassword"
              variant="outlined"
              :rules="[rules.minLen, rules.required]"
            ></v-text-field>
            <v-text-field
              label="Repeat Password"
              required
              type="password"
              v-model="repeatPassword"
              variant="outlined"
              :rules="[rules.minLen, rules.required]"
            ></v-text-field>
            <v-select
              v-model="userType"
              :items="userTypeOptions"
              item-title="text"
              item-value="value"
              label="User Type"
              variant="outlined"
              :rules="[rules.required]"
            >
            </v-select>
            <v-text-field
              v-if="userType === UserTypeEnum.MANUFACTURER"
              label="Address"
              required
              type="address"
              v-model="address"
              variant="outlined"
              :rules="[rules.required]"
            ></v-text-field>
            <p
              v-if="showPasswordMismatchError"
              class="ml-3 text-error"
              color="error"
            >
              Passwords do not match
            </p>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="primary" @click="register">Register</v-btn>
        </v-card-actions>
      </template>
    </v-card>
  </v-container>
</template>

<style scoped></style>
