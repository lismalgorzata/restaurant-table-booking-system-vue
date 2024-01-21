<template>
  <div class="mt-3 form-reservation">
    <form @submit.prevent="addReservation" class="row g-3 was-validated">
      <div class="row mb-3">
        <label for="validationTooltip01" class="form-label">Data</label>
        <input v-model="reservation.date" type="datetime-local" class="form-control is-valid" id="validationTooltip01" value="" required>
      </div>
      <div class="row mb-5">
        <label for="validationTooltip01" class="form-label">Dostępne stoliki</label>
        <div class="d-flex mx-5" v-if="reservation.date">
          <button class="btn table-rectangle" v-for="table in tables" :key="table.tableId"
                  @click="selectTable(table.tableId)"
                  :class="[getTableClass(table.numberOfSeats), { 'selected': reservation.tableId === table.tableId }]"
                  :disabled="!isTableFree(table.tableId)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
            </svg>
            {{ table.numberOfSeats }}
          </button>
        </div>
      </div>
      <div class="row mb-3">
        <label for="customerSurname" class="form-label">Nazwisko klienta</label>
        <input type="text" v-model="reservation.customerSurname" class="form-control is-valid" id="validationTooltip01" value="" required>
        <div class="invalid-feedback">Proszę wpisać nazwisko</div>
      </div>
      <div class="row mb-3">
        <label for="validationTooltip01" class="form-label">Telefon klienta</label>
        <input type="text" v-model="reservation.customerPhone" class="form-control is-valid" id="validationTooltip01" value="" required>
        <div class="invalid-feedback">Proszę wpisać numer telefonu</div>
      </div>
      <div class="row mb-3">
        <button class="button-add" type="submit">Dodaj rezerwację</button>
      </div>
      <div class="invalid-feedback">Proszę wybrać datę</div>
      <div class="row mb-3">
        <button class="btn btn-secondary" @click="goToAllReservations">Powrót</button>
      </div>
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
      tables: [],
      freeTables: [],
    };
  },
  computed: {
    sortedTables() {
      return this.tables.sort((a, b) => a.seats - b.seats);
    }
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

        this.goToAllReservations();
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
    setFullHour(dateString) {
      const date = new Date(dateString);
      if (date.getMinutes() !== 0 || date.getSeconds() !== 0 || date.getMilliseconds() !== 0) {
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        this.reservation.date = date.toISOString().slice(0, 16);
      }
    },
    goToAllReservations() {
      this.$router.push({name: 'reservation'});
    },
    async fetchAllTables() {
      try {
        const response = await api.getAllTables();
        this.tables = response.data;
      } catch (error) {
        console.error('Błąd podczas pobierania wszystkich stolików:', error);
      }
    },

    async fetchAllFreeTables() {
      try {
        const response = await api.getAllFreeTables(this.reservation.date);
        this.freeTables = response.data;
      } catch (error) {
        console.error('Błąd podczas pobierania wolnych stolików:', error);
      }
    },
    isTableFree(tableId) {
      return this.freeTables.some(freeTable => freeTable.tableId === tableId);
    },
    selectTable(tableId) {
      if (this.isTableFree(tableId)) {
        this.reservation.tableId = tableId;
      }
    },
    getTableClass(seats) {
      return `table-seats-${seats}`;
    },
  },
  mounted() {
    this.fetchAllTables();
    this.fetchAllFreeTables();
  },
  watch: {
    'reservation.date': function(newDate) {
      if (newDate) {
        this.setFullHour(newDate);
        this.fetchAllFreeTables();
      }
    }
  },
};
</script>

<style>
.button-add {
  background-color: #6FBF32;
  color: #1C1C1C;
  border-radius: 5px;
  padding-top: 0.7%;
  padding-bottom: 0.7%;
  border: none;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.button-add:hover {
  background-color: #40661A;
  color: #FAFAFA;
}

.form-reservation {
  background-color: #F7F1E6;
  padding-left: 2.2%;
  border-radius: 20px;
  padding-top:2.2%;
}
.was-validated {
  padding-top: 2%;
  padding-bottom: 0.5%;
}
.table-rectangle {
  border: 1px solid #000;
  margin: 10px;
  padding: 20px;
  width: 100px;
  height: 50px;
  line-height: 50px;
  background-color: #f0f0f0;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}
.table-rectangle.selected {
  background-color: rgb(93, 74, 53);
  color: white;
}
.table-rectangle.selected:hover {
  background-color: rgb(93, 74, 53);
  color: white;
}
.table-seats-2 {
  width: 60px;
}

.table-seats-3 {
  width: 75px;
  height: 60px;
}

.table-seats-4 {
  width: 70px;
}

.table-seats-5 {
  width: 90px;
}

.table-seats-6 {
  width: 130px;
}

</style>