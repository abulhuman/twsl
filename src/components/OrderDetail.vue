<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { capitalize } from 'lodash';
import Hashids from 'hashids';
import { OrderDetail } from '../types';
import { fetchOrderById, sendPriceQuote } from '../services/order.service';
import router from '../router';
const idEncoder = new Hashids('salt', 8);

let order = ref<OrderDetail | null>(null);
const isTransporter = ref(false);
const price = ref(0);

const route = useRoute();

onMounted(async () => {
  const orderID = route.params.id;
  const id = Array.isArray(orderID) ? orderID[0] : orderID;
  order.value = await fetchOrderById(+idEncoder.decode(id));
  order.value.id = idEncoder.encode(order.value.id.toString());
});
const quotePriceForOrder = () => {
  const orderID = route.params.id;
  const id = Array.isArray(orderID) ? orderID[0] : orderID;
  sendPriceQuote(+idEncoder.decode(id), price.value);
  router.push('/dashboard');
};
</script>
<template>
  <v-card>
    <v-card-title primary-title> Order ID: {{ order?.id }} </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              v-text="`Created: ${order?.created_date}`"
              class="font-weight-black"
            ></v-list-item-title>
            <v-list-item-subtitle
              v-text="`Status: ${capitalize(order?.status)}`"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              v-text="`From: ${order?.from}`"
              class="font-weight-black"
            ></v-list-item-title>
            <v-list-item-subtitle
              v-text="`To: ${order?.to}`"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              v-text="`Quantity: ${order?.quantity} Tons`"
              class="font-weight-black"
            ></v-list-item-title>
            <v-list-item-subtitle
              v-text="`Transporter: ${order?.transporter}`"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              v-text="`Price: ${order?.price}`"
              class="font-weight-black"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-text v-if="isTransporter">
      <v-btn
        color="primary"
        text="true"
        @click="quotePriceForOrder()"
        v-if="order?.status === 'created'"
      >
        Quote Price
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>

