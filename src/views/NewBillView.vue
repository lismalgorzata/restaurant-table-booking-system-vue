<template>
  <div>
    <h2>Dodaj rachunek</h2>
    <form @submit.prevent="addBill">
      <input v-model="bill.listOfDishes" type="text" placeholder="Lista dań" />
      <input v-model="bill.date" type="datetime-local" />
      <input v-model="bill.waiterId" type="number" placeholder="Id Kelnera" />
      <input v-model="bill.billPrice" type="number" placeholder="Łączny koszt" />
      <input v-model="bill.isPayed" type="checkbox" /> Zapłacony
      <button type="submit">Dodaj rachunek</button>
    </form>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      bill: {
        billPrice: null,
        isPayed: false,
        listOfDishes: '',
        date: '',
        waiterId: null,
      },
    };
  },
  methods: {
    async addBill() {
      try {
        const response = await api.addBill(this.bill);
        console.log('Rachunek dodany', response.data);
        // Reset form
        this.bill = {
          billPrice: null,
          isPayed: false,
          listOfDishes: '',
          date: '',
          waiterId: null,
        };
      } catch (error) {
        console.error('Błąd podczas dodawania rachunku', error);
      }
    },
  },
};
</script>
