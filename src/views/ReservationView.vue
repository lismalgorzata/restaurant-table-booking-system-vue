<template>
  <div class="row">
    <div class="col-md-9">
      <div class="col-md-10">
        <h1 class="text-end">All Reservations</h1>
      </div>
      <div class="col-md-2">
      </div>
    </div>
    <div class="col-md-3">
      <div @click="goToAddForm" class="addReservation">
        Add New Reservation
      </div>
    </div>
  </div>
  <div class="row mt-4 mb-4">
    <div class="col-md-2 mb-2">
      <input v-model="filterDate" type="date" class="form-control" id="validationTooltip01" value="" required>
    </div>
    <div class="col-md-2 mb-1">
      <button type="button" class="btn btn-outline-dark" @click="fetchReservationsByDate">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"/>
          </svg>
        </div>
        <div>
          Filtruj
        </div>
      </button>
    </div>
  </div>
  <div class="row mt-3">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4 mt-2" v-for="(reservation, index) in reservations" :key="reservation.reservationId">
          <div class="card">
            <div class="card-body">
                <span :class="{ 'crossedOut': reservation.deleted }">
                  <div class="row">
                    <div class="col-md-10">
                      <h6 class="card-text text-start">Stolik numer {{ reservation.table.tableId }}</h6>
                    </div>
                  </div>
                </span>
              <div class="row">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                  </li>
                  <li class="list-group-item">
                    <div class="row">
                      <p class="text-start">{{ reservation.customerSurname }}</p>
                    </div>
                    <div class="row">
                      <h7 class="text-start">Numer telefonu: {{ reservation.customerPhone }}</h7>
                    </div>
                  </li>
                  <li class="list-group-item">
                    <div class="text-end">{{ formatDate(reservation.date) }}</div>
                  </li>
                </ul>
              </div>
              <div class="row">
                <div class="col-md-2">
                  <button class="deleteBtn btn btn-danger" @click="deleteReservation(reservation.reservationId)">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import ApiService from '@/services/api';

const router = useRouter();

const goToAddForm = () => {
  router.push({name: 'newReservationForm'});
};

const deleteReservation = async (reservationId) => {
  try {
    // Call the deleteReservation function from the API
    await ApiService.deleteReservation(reservationId);
    console.log(`Reservation with ID ${reservationId} deleted successfully.`);

    // Update the reservations list by removing the deleted reservation
    reservations.value = reservations.value.filter(
        (reservation) => reservation.reservationId !== reservationId
    );
  } catch (error) {
    console.error(`Error deleting reservation with ID ${reservationId}:`, error);
    // Handle errors or show a notification to the user.
  }
};

const reservations = ref([]);

const fetchReservations = async () => {
  try {
    const response = await ApiService.getAllReservations();
    reservations.value = response.data;
  } catch (error) {
    console.error("Error while fetching reservations:", error);
  }
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('pl-PL', options);
};

const filterDate = ref(null);

const fetchReservationsByDate = async () => {
  if (filterDate.value) {
    try {
      const response = await ApiService.getReservationsByDate(filterDate.value);
      reservations.value = response.data;
    } catch (error) {
      console.error("Error while fetching reservations by date:", error);
    }
  }
};

onMounted(fetchReservations);
</script>

<style scoped>

.addReservation {
  padding: 15px 30px;
  font-size: 16px;
  background-color: white;
  border: 2px solid rgb(93, 74, 53);
  border-radius: 20px;
  color: rgb(93, 74, 53);
  border-radius: 20px;
  cursor: pointer;
  text-align: center;
}

.addReservation:hover {
  background-color: antiquewhite;
}

.btn {
  display: flex;
  justify-content: center;
  gap: 7px;
}


.deleteBtn {
  background-color: rgb(93, 74, 53);
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.deleteBtn:hover {
  background-color: rgb(255, 0, 0);
}
</style>
