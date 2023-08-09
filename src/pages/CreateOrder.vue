<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import HashIds from 'hashids';
import router from '../router';
import { JwtPayload, User, UserTypeEnum } from '../types';
import { whoami } from '../services/auth.service';
import {
  createOrder,
  fetchLastOrderId,
  fetchTransporters
} from '../services/order.service';

const idEncoder = new HashIds("salt", 8);

const orderId = ref<string>();
const newOrderForm = ref();
const from = ref('');
const to = ref('');
const quantity = ref();
const address = ref('');
const transporterId = ref('');
const transporterOptions = ref<User[]>([]);

const rules = {
  required: (v: string) => !!v || 'Required'
};

onBeforeMount(async () => {
  const user: JwtPayload = await whoami();
  if (user?.type === UserTypeEnum.TRANSPORTER) {
    router.push('/dashboard');
  }
  orderId.value = idEncoder.encode((await fetchLastOrderId()) + 1);
  address.value = user?.address || 'Unknown';
  transporterOptions.value = (await fetchTransporters()).map((user: User) => {
    return {
      ...user,
      text: `${user.companyName} - ${user.type}`,
      value: user.id
    };
  });
});

const generateQuantityOptions = () =>
  Array.from({ length: 50 }, (_, i) => ({
    text: `${i + 1} Ton${i === 0 ? '' : 's'}`,
    value: i + 1
  }));

const validateForm = async (): Promise<{
  valid: boolean;
  errors: ProxyConstructor[];
}> => {
  return await newOrderForm.value?.validate();
};

const prepareCreateOrder = async () => {
  validateForm().then(
    async (res: { valid: boolean; errors: ProxyConstructor[] }) => {
      if (!res.valid) return;
    }
  );
  const orderCreated = await createOrder({
    id: orderId.value ? +idEncoder.decode(orderId?.value) : 0,
    from: from.value,
    to: to.value,
    quantity: quantity.value,
    pickupAddress: address.value,
    transporterId: transporterId.value
  });
  if (orderCreated) {
    router.push('/dashboard');
  }
};
</script>
<template>
  <v-container grid-list-md>
    <v-card>
      <v-card-title primary-title> Create a new order </v-card-title>
      <v-card-text>
        <v-form ref="newOrderForm">
          <v-text-field
            label="Order ID"
            required
            v-model="orderId"
            variant="outlined"
            :disabled="true"
          ></v-text-field>
          <v-text-field
            label="From"
            required
            v-model="from"
            variant="outlined"
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            label="To"
            required
            v-model="to"
            variant="outlined"
            :rules="[rules.required]"
          ></v-text-field>
          <v-select
            label="Quantity"
            required
            v-model="quantity"
            :items="generateQuantityOptions()"
            item-title="text"
            item-value="value"
            variant="outlined"
            :rules="[rules.required]"
          ></v-select>
          <v-text-field
            label="Pickup"
            required
            v-model="address"
            variant="outlined"
            :disabled="true"
          ></v-text-field>
          <v-select
            v-model="transporterId"
            :items="transporterOptions"
            item-title="text"
            item-value="value"
            label="Transporter"
            variant="outlined"
            :rules="[rules.required]"
          >
          </v-select>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn flat color="primary" @click="prepareCreateOrder"
          >Create Order</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped></style>

