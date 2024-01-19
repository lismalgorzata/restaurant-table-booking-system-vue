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
        customerSurname: '',
        customerPhone: null,
      },
    };
  },
  methods: {
    async addReservation() {
      try {
        // Convert to string
        const customerSurname = String(this.reservation.customerSurname);
        const customerPhone = String(this.reservation.customerPhone);

        const reservationResponse = await api.addReservation({
          date: this.reservation.date,
          tableId: this.reservation.tableId,
          customerSurname: customerSurname,
          customerPhone: customerPhone,
        });

        console.log('Rezerwacja dodana', reservationResponse.data);

        // Reset form
        this.reservation = {
          date: '',
          tableId: null,
          customerSurname: '',
          customerPhone: null,
        };
      } catch (error) {
        console.error('Błąd podczas dodawania rezerwacji', error);
      }
    },
  },
};
</script>
