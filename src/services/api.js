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

    getReservationsByDate(date) {
        return axios.get(`${baseURL}/reservation/byDate`, {
            params: {
                date: date
            }
        });
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

    getBillsByFilter(date, waiterId, isPayed, reservationId) {
        return axios.get(`${baseURL}/bill/filter`, {
            params: {
                date: date,
                waiterId: waiterId,
                isPayed: isPayed,
                reservationId: reservationId
            }
        });
    },

    getAllDishes() {
        return axios.get(`${baseURL}/dish/all`);
    },

    getAllTables() {
        return axios.get(`${baseURL}/table/all`);
    },

    getAllFreeTables(date) {
        return axios.get(`${baseURL}/table/allFree?date=${date}`);
    },

    getAllWaiterNames() {
        return axios.get(`${baseURL}/waiter/allNames`)
    }
};
