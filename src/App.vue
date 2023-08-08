<script setup lang="ts"></script>

<template>
  <v-app>
    <v-toolbar title="Three-way Studio Logistics">
      <v-btn to="/">Home</v-btn>
      <v-btn to="/login">Login</v-btn>
      <v-btn to="/register">Register</v-btn>
      <v-spacer></v-spacer>
      <v-btn to="/logout">Logout</v-btn>
    </v-toolbar>

    <v-main class="mt-3">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>

