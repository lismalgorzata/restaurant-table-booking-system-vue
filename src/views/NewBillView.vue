<template>
    <div>
        <h2>New bill form</h2>
        <form @submit.prevent="addBill">
            <label for="listOfDishes">Select Dishes:</label>
            <select v-model="bill.listOfDishes" multiple required>
                <option v-for="dish in dishes" :key="dish.dishId" :value="dish">
                {{ dish.dishName }} - {{ dish.dishPrice }} PLN
                </option>
            </select>

            <label for="totalPrice">Total Price:</label>
            <p> {{ calculateTotalPrice() }} PLN</p>

            <label for="billPrice">Bill Price:</label>
            <input v-model="bill.billPrice" type="number" step="0.01" required />

            <label for="isPayed">Payment Status:</label>
            <select v-model="bill.isPayed" required>
                <option value="true">Payed</option>
                <option value="false">Not payed</option>
            </select>

            <label for="reservation">Reservation ID:</label>
            <input v-model="bill.reservation" type="text" />

            <label for="date">Date:</label>
            <input v-model="bill.date" type="date" required />

            <label for="waiter">Waiter ID:</label>
            <input v-model="bill.waiter" type="text" required />

            <button type="submit">Add Bill</button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api.js';

const dishes = ref([]);

const bill = {
    billPrice: null,
    isPayed: false,
    listOfDishes: '',
    reservation: '',
    date: '',
    waiterId: ''
};

const addBill = async () => {
    try {
        const response = await api.addBill(bill);
        console.log('New bill added:', response.data);
    } catch (error) {
        console.error('Error adding bill:', error);
    }
};

const fetchDishes = async () => {
    try {
        const response = await api.getAllDishes();
        dishes.value = response.data;
    } catch (error) {
        console.error("Error while fetching dishes:", error);
    }
};

const calculateTotalPrice = () => {
    return selectedDishes.value.reduce((total, dish) => total + dish.dishPrice, 0);
};

onMounted(fetchDishes);
</script>

<style scoped>
    /* Dodaj stylizację według potrzeb */
</style>
