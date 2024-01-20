<template>
  <div class="mt-3">
    <form @submit.prevent="addReservation" class="row g-3 was-validated">
      <div class="row mb-3">
        <label for="validationTooltip01" class="form-label">Data</label>
        <input v-model="reservation.date" type="datetime-local" class="form-control is-valid" id="validationTooltip01" value="" required>
      </div>
      <div class="row mb-5">
        <label for="validationTooltip01" class="form-label">Dostępne stoliki</label>
        <div class="d-flex" v-if="reservation.date">
          <button class="btn table-rectangle" v-for="table in tables" :key="table.tableId"
                  @click="selectTable(table.tableId)"
                  :class="[getTableClass(table.numberOfSeats), { 'selected': reservation.tableId === table.tableId }]"
                  :disabled="!isTableFree(table.tableId)">
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
        <button class="btn btn-secondary" type="submit">Dodaj rezerwację</button>
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
