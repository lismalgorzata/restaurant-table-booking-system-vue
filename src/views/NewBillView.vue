<template>
    <div class="container">
      <h2 class="mb-5">Dodaj rachunek</h2>
      <form @submit.prevent="addBill" class="row g-3 was-validated">
        <div class="col-md-4">
          <label for="listOfDishes" class="form-label">Lista dań</label>
          <input v-model="bill.listOfDishes" type="text" class="form-control is-valid" id="listOfDishes" required>
        </div>
        <div class="col-md-4">
          <label for="waiterName" class="form-label">Kelner</label>
          <select v-model="bill.waiterId" class="form-select" required aria-label="select example">
            <option value="">Wybierz kelnera</option>
            <option v-for="waiter in waiters" :key="waiter.waiterId" :value="waiter.waiterId">
              {{ waiter.waiterName }} {{ waiter.waiterSurname }}
            </option>
          </select>
          <div class="invalid-feedback">Proszę wybrać kelnera</div>
        </div>
        <div class="col-md-4">
          <label for="billPrice" class="form-label">Łączny koszt</label>
          <div class="input-group">
            <span class="input-group-text">PLN</span>
            <input v-model="bill.billPrice" type="number" id="billPrice" class="form-control" placeholder="Łączny koszt" required>
          </div>
        </div>
        <div class="col-md-4">
        </div>
        <div class="col-md-4">
        </div>
        <div class="col-md-4">

        </div>
        <div class="col-12">
          <div class="form-check">
            <input class="form-check-input is-invalid" type="checkbox" value="" v-model="bill.isPayed" id="isPayed" aria-describedby="invalidCheck3Feedback">
            <label class="form-check-label" for="invalidCheck3">Rozliczony</label>
          </div>
        </div>
        <div class="col-12">
          <button class="btn btn-primary" type="submit">Dodaj rachunek</button>
        </div>
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
      waiters: [],
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
    goToAllBills() {
        this.$router.push({ name: 'bill' });
    },
  },

  mounted() {
    this.fetchWaitersNames();
  }
};
</script>
