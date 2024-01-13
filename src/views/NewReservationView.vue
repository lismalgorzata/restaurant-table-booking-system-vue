<template>
    <div>
      <h2>New Reservation Form</h2>
      <form @submit.prevent="addReservation">
        <label for="customerId">Customer ID:</label>
        <input v-model="reservation.customerId" type="text" required />
  
        <label for="date">Date:</label>
        <input v-model="reservation.date" type="date" required />
  
        <label for="hour">Hour:</label>
        <input v-model="reservation.hour" type="time" required />
  
        <label for="tableId">Table ID:</label>
        <input v-model="reservation.tableId" type="text" required />
  
        <label for="billId">Bill ID:</label>
        <input v-model="reservation.billId" type="text" required />
  
        <button type="submit">Add Reservation</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import api from '@/services/api.js';
  
  const reservation = {
    customerId: '',
    date: '',
    hour: '',
    tableId: '',
    billId: ''
  };
  
  const addReservation = async () => {
    try {
      const response = await api.addReservation(reservation);
      console.log('New Reservation Added:', response.data);
      // Dodaj logikę do obsługi sukcesu, np. wyświetlanie komunikatu
    } catch (error) {
      console.error('Error adding reservation:', error);
      // Dodaj logikę do obsługi błędu, np. wyświetlanie komunikatu
    }
  };
  </script>
  
  <style scoped>
    /* Dodaj stylizację według potrzeb */
  </style>
  