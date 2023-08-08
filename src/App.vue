<script setup lang="ts">
import router from './router';

const logout = () => {
  localStorage.removeItem('token');
  router.push('/');
};

const tokenExists = () => {
  const authPayload: string | null = JSON.parse(
    JSON.stringify(localStorage.getItem('auth-payload'))
  );

  return authPayload !== null;
};
</script>

<template>
  <v-app>
    <v-toolbar title="Three-way Studio Logistics">
      <v-spacer></v-spacer>
      <template v-if="tokenExists()">
        <v-btn to="/">Home</v-btn>
        <v-btn @click="logout">Logout</v-btn>
      </template>
    </v-toolbar>

    <v-main class="mt-3">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>

