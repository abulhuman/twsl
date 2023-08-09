<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import HashIds from 'hashids';
import { capitalize } from 'lodash';
import { Order, UserTypeEnum, JwtPayload } from '../types';
import router from '../router';
import { fetchOrders } from '../services/order.service';
import { whoami } from '../services/auth.service';

const idEncoder = new HashIds('salt', 8);

const isManufacturer = ref<boolean>(false);

let items = ref<Order[]>([
  {
    id: idEncoder.encode(-1),
    created_date: '2021-08-01',
    status: 'pending'
  }
]);

const search = ref('');

onBeforeMount(async () => {
  const user: JwtPayload = await whoami();
  if (user?.type === UserTypeEnum.MANUFACTURER) {
    isManufacturer.value = true;
  }
  const orders = await fetchOrders();
  items.value = orders.map((order: Order) => {
    return {
      ...order,
      id: idEncoder.encode(+order.id)
    };
  });
});

const handleOrderClicked = (order: Order) => {
  router.push(`/dashboard/order/${order.id}`);
};
</script>

<template>
  <v-container grid-list-md>
    <v-card
      v-if="isManufacturer"
      class="mx-auto mb-2 elevation-0"
      max-width="1080"
      row
      wrap
    >
      <v-spacer></v-spacer>
      <v-btn
        text=""
        color="primary"
        @click="router.push('/dashboard/order/new')"
      >
        New Order
      </v-btn>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card>
    <v-card class="mx-auto" max-width="1080">
      <v-card-title primary-title> Orders </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :value="item"
            @click="handleOrderClicked(item)"
          >
            <v-list-item-content>
              <v-list-item-title
                v-text="`Order ID: ${item.id}`"
                class="font-weight-black"
              ></v-list-item-title>
              <v-list-item-subtitle
                v-text="`Created: ${item.created_date}`"
              ></v-list-item-subtitle>
              <v-list-item-subtitle
                v-text="`Status: ${capitalize(item.status)}`"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped></style>

