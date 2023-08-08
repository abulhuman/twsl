<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import hashIds from 'hashids';
import router from '../router';
import { User, UserTypeEnum } from '../types';
import api from '../services/api.service';

const idEncoder = new hashIds(undefined, 8);

const orderId = ref<string>();
const newOrderForm = ref();
const to = ref('');
const quantity = ref('');
const address = ref('');
const transporterId = ref('');
const transporterOptions = ref<User[]>([]);

const rules = {
  required: (v: string) => !!v || 'Required'
};

onBeforeMount(async () => {
  const authPayload = localStorage.getItem('auth-payload');
  if (!authPayload) {
    router.push('/');
  }
  const user = JSON.parse(JSON.stringify(authPayload));
  if (user?.type === UserTypeEnum.TRANSPORTER) {
    router.push('/dashboard');
  }
  orderId.value = idEncoder.encode((await fetchLastOrderId()) + 1);
  address.value = user.address;
  transporterOptions.value = (await fetchTransporters()).map((user: User) => {
    return {
      ...user,
      text: `${user.companyName} - ${user.address}`,
      value: user.id
    };
  });
});

const fetchTransporters = async (): Promise<User[]> => {
  const response = await api.get('/users?type=transporter');
  return response.data;
};

const fetchLastOrderId = async (): Promise<number> => {
  const response = await api.get('/orders?_sort=id&_order=desc&_limit=1');
  return response.data[0].id;
};

const validateForm = async (): Promise<{
  valid: boolean;
  errors: ProxyConstructor[];
}> => {
  return await newOrderForm.value?.validate();
};

const createOrder = async () => {
  validateForm().then(
    async (res: { valid: boolean; errors: ProxyConstructor[] }) => {
      if (!res.valid) return;
    }
  );
  const response = await api.post('/orders', {
    id: orderId.value ? idEncoder.decode(orderId?.value) : 0,
    from: newOrderForm.value,
    to: to.value,
    quantity: quantity.value,
    address: address.value,
    transporterId: transporterId.value,
    status: 'pending'
  });
  if (response.data) {
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
            v-model="newOrderForm"
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
          <v-text-field
            label="Quantity"
            required
            v-model="quantity"
            type="numeric"
            variant="outlined"
            :rules="[rules.required]"
          ></v-text-field>
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
        <v-btn flat color="primary" @click="createOrder">Create Order</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped></style>

