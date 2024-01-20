import axios from 'axios';

const baseURL = 'http://localhost:8282/api'; // Adres Twojego backendu

export default {
    getAllReservations() {
        return axios.get(`${baseURL}/reservation/all`);
    },

    addReservation(reservation) {
        return axios.post(`${baseURL}/reservation/add`, reservation);
    },

    deleteReservation(reservationId) {
    return axios.delete(`${baseURL}/reservation/delete/${reservationId}`);
},


    getAllBills() {
        return axios.get(`${baseURL}/bill/all`);
    },

    addBill(bill) {
        return axios.post(`${baseURL}/bill/add`, bill);
    },

    editBill(billId, bill) {
        return axios.put(`${baseURL}/bill/edit/${billId}`, bill);
    },

    getBill(billId) {
        return axios.get(`${baseURL}/bill/${billId}`);
    },

    getAllDishes() {
        return axios.get(`${baseURL}/dish/all`);
    },

    getAllRestaurants() {
        return axios.get(`${baseURL}/restaurant/all`);
    },

    getAllTables() {
        return axios.get(`${baseURL}/table/all`);
    },

    getAllFreeTables(date) {
        return axios.get(`${baseURL}/table/allFree?date=${date}`);
    },

    getAllWaiters() {
        return axios.get(`${baseURL}/waiter/all`);
    },

    getAllWaiterNames() {
        return axios.get(`${baseURL}/waiter/allNames`)
    }
};
