<template>
  <div class="row">
    <div class="col-md-6">
      <ul class="list-group">
        <li class="list-group-item" v-for="dish in dishes" :key="dish.id">
          <div class="row">
            <div class="col-md-6">
              <div class="col text-start ps-0">
                {{ dish.dishName }}
              </div>
            </div>
            <div class="col-md-6">
              <div class="col text-end">
                <button @click="addDishToList(dish)" class="btn btn-secondary" type="submit">Dodaj danie</button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div class="row">
        <h2 class="mb-5">Edytuj rachunek</h2>
        {{ bill }}
        <div v-if="isEditSuccess" class="alert alert-success alert-dismissible fade show" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
          </svg>
          Rachunek pomyślnie <strong>zaktualizowany</strong>.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
      <form @submit.prevent="editBill" class="row g-3 was-validated">
        <div class="row mb-3">
          <label for="waiterName" class="form-label">Kelner</label>
          <select v-model="bill.waiterId" class="form-select" required aria-label="select example">
            <option value="">Wybierz kelnera</option>
            <option v-for="waiter in waiters" :key="waiter.waiterId" :value="waiter.waiterId">
              {{ waiter.waiterName }} {{ waiter.waiterSurname }}
            </option>
          </select>
          <div class="invalid-feedback">Proszę wybrać kelnera</div>
        </div>
        <div class="row">
          <label for="listOfDishes" class="form-label">Lista dań</label>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"></li>
            <li class="list-group-item " v-for="dish in bill.listOfDishes" :key="dish.dishId">
              <div class="row">
                <div class="col-md-6">
                  <div class="col text-start ps-0">
                    {{ dish.dishName }}
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="col text-end">
                    {{ dish.dishPrice }}
                  </div>
                </div>
              </div>
            </li>
          </ul>

        </div>
        <div class="row mb-3">
          <label for="billPrice" class="form-label">Łączny koszt</label>
          <div class="input-group">
            <input v-model="bill.billPrice" type="number" id="billPrice" class="form-control" placeholder="00,00"
                   readonly>
            <span class="input-group-text">PLN</span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="form-check mt-2">
            <input class="form-check-input is-invalid" type="checkbox" value="" v-model="bill.isPayed" id="isPayed"
                   aria-describedby="invalidCheck3Feedback">
            <label class="form-check-label" for="isPayed">Rozliczony</label>
          </div>
          <div class="form-check mt-2">
            <input class="form-check-input is-invalid" type="checkbox" v-model="hasReservation" value="" id="hasReservation"
                   aria-describedby="invalidCheck3Feedback" >
            <label class="form-check-label" for="hasReservation">Rezerwacja</label>
          </div>
          <div v-if="hasReservation">
            <select v-model="bill.reservationId" class="form-select mt-3" aria-label="select example" required>
              <option value="">Wybierz rezerwację</option>
              <option v-for="reservation in reservations" :key="reservation.reservationId" :value="reservation.reservationId">
                {{ formatDate(reservation.date) }} - {{ reservation.customerSurname }} - Stolik numer {{ reservation.table.tableId }}
              </option>
            </select>
            <div class="invalid-feedback mb-3">Proszę wybrać rezerwację</div>
          </div>
          <div v-else>

          </div>
        </div>
        <div class="row mb-3">
          <button class="btn btn-secondary" type="submit">Zapisz zmiany</button>
        </div>
        <div class="row mb-3">
          <button class="btn btn-secondary" @click="goToAllBills">Powrót</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import { useRoute } from 'vue-router';

export default {
  data() {
    return {
      bill: {
        billPrice: null,
        isPayed: false,
        listOfDishes: [],
        date: '',
        waiterId: null,
        reservationId: null
      },
      waiters: [],
      dishes: [],
      reservations: [],
      hasReservation: false,
      isEditSuccess: false,
    };
  },

  methods: {
    async editBill() {
      try {
        const response = await api.editBill(this.bill.billId, this.bill);
        console.log('Bill edited', response.data);
        this.isEditSuccess = true;
      } catch (error) {
        console.error('Error during adding bill', error);
        this.isEditSuccess = false;
      }
    },
    async fetchWaitersNames() {
      try {
        const response = await api.getAllWaiterNames();
        this.waiters = response.data;
        console.log(this.waiters);
      } catch (error) {
        console.error('Error during fetching waiters names', error);
      }
    },
    async fetchAllDishes() {
      try {
        const response = await api.getAllDishes();
        this.dishes = response.data;
        console.log(this.dishes);
      } catch (error) {
        console.error('Error during fetching dishes', error);
      }
    },
    async fetchAllReservations() {
      try {
        const response = await api.getAllReservations();
        this.reservations = response.data;
        console.log(this.reservations);
      } catch (error) {
        console.error('Error during fetching reservations', error);
      }
    },
    goToAllBills() {
      this.$router.push({name: 'bill'});
    },

    addDishToList(dish) {
      this.bill.listOfDishes.push(dish);
      this.bill.billPrice += dish.dishPrice;
    },

    async getBill(billId) {
      try {
        const response = await api.getBill(billId);
        this.bill = response.data;
        console.log(this.bill);
      } catch (error) {
        console.error('Error during getting bill by id', error);
      }
    },

    toggleReservation() {
      this.hasReservation = !this.hasReservation;
    },

    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString('pl-PL', options);
    }
  },

  mounted() {
    this.fetchAllDishes();
    this.fetchWaitersNames();
    this.fetchAllReservations();
    const route = useRoute();
    const billId = route.params.billId;
    if (billId) {
      this.getBill(billId);
    }
  }
};
</script>
