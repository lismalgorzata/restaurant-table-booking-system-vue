<template>
  <div>
    <h2>Dodaj rezerwację</h2>
    <form @submit.prevent="addReservation">
      <input v-model="reservation.date" type="datetime-local" />
      <input v-model="reservation.tableId" type="number" placeholder="Id Stolika" />
      <input v-model="reservation.customerSurname" type="text" placeholder="Nazwisko klienta" />
      <input v-model="reservation.customerPhone" type="number" placeholder="Telefon klienta" />
      <button type="submit">Dodaj rezerwację</button>
    </form>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      reservation: {
        date: '',
        tableId: null,
        customerId: null,
        customerSurname:'',
        customerPhone: null,
      },
    };
  },
  methods: {
    async addReservation() {
      try {
        // Ensure customerSurname is not null or empty
        if (!this.reservation.customerSurname) {
          console.error('Nazwisko klienta nie może być puste.');
          return; // Exit the method if customerSurname is not provided
        }

        // First, add the customer
        const customerResponse = await api.addCustomer({
          customerSurname: String(this.reservation.customerSurname),
          customerPhone: String(this.reservation.customerPhone),
        });

        // Now, add the reservation
        const reservationResponse = await api.addReservation(this.reservation);

        console.log('Rezerwacja dodana', reservationResponse.data);
        
        // Reset form
        this.reservation = {
          date: '',
          tableId: null,
          customerId: null,
          customerSurname:'',
          customerPhone: null,
        };
      } catch (error) {
        console.error('Błąd podczas dodawania rezerwacji', error);
      }
    },
  },
};
</script>