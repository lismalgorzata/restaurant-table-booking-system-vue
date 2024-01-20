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
        <h2 class="mb-5">Nowy rachunek</h2>
      </div>
      <form @submit.prevent="addBill" class="row g-3 was-validated">
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
            <label class="form-check-label" for="invalidCheck3">Rozliczony</label>
          </div>
          <div class="form-check mt-2">
            <input class="form-check-input is-invalid" type="checkbox" v-model="hasReservation" value="" id="isPayed"
                   aria-describedby="invalidCheck3Feedback" >
            <label class="form-check-label" for="invalidCheck3">Rezerwacja</label>
          </div>
          <div v-if="hasReservation">
            <select v-model="bill.reservationId" class="form-select mt-3" required aria-label="select example">
              <option value="">Wybierz rezerwację</option>
              <option v-for="reservation in reservations" :key="reservation.reservationId" :value="reservation.reservationId">
                {{ formatDate(reservation.date) }} - {{ reservation.customerSurname }} - Stolik numer {{ reservation.table.tableId }}
              </option>
            </select>
            <div class="invalid-feedback mb-3">Proszę wybrać rezerwację</div>
          </div>
        </div>
        <div class="row mb-3">
          <button class="btn btn-secondary" type="submit">Dodaj rachunek</button>
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
import {ref} from "vue";

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
      hasReservation: false
    };
  },

  methods: {
    async addBill() {
      try {
        const response = await api.addBill(this.bill);
        console.log('Bill added', response.data);
        // Reset form
        this.bill = {
          billPrice: null,
          isPayed: false,
          listOfDishes: '',
          date: '',
          waiterId: null,
          reservationId: null
        };
        this.goToAllBills();
      } catch (error) {
        console.error('Error during adding bill', error);
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
  }
};
</script>
