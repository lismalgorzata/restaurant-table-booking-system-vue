<template>
  <div class="row">
    <div class="col-md-9">
      <div class="col-md-10">
        <h1 class="text-end title-allReservations">All Reservations</h1>
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
  <div class="row mt-3">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4 mt-2" v-for="reservation in reservations" :key="reservation.reservationId">
          <div class="card card-setting">
            <div class="card-body">
                <span :class="{ 'crossedOut': reservation.deleted }">
                  <div class="row">
                    <div class="col-md-10">
                      <h6 class="card-text text-start">Stolik numer {{ reservation.table.tableId }}</h6>
                    </div>
                  </div>
                </span>
              <div class="row">
                <ul class="list-group list-group-flush card-setting">
                  <li class="list-group-item">
                  </li>
                  <li class="list-group-item">
                    <div class="row">
                      <p class="text-start">{{ reservation.customerSurname }}</p>
                    </div>
                    <div class="row">
                      <h6 class="text-start">Numer telefonu: {{ reservation.customerPhone }}</h6>
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

onMounted(fetchReservations);
</script>

<style scoped>
.title-allReservations {
  color: #332920;
  text-transform: uppercase;
  font-family: Copperplate,fantasy;
}
.addReservation {
  padding: 15px 30px;
  font-size: 17px;
  background-color: #574F47;
  border: 2px #332920;
  border-radius: 20px;
  color: #F7F1E6;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.addReservation:hover {
  background-color: #F7F1E6;
  color: #574F47;
}
.card-setting, .list-group {
  background-color: #f5f1eb;
  --bs-list-group-bg: #f5f1eb;
  border: 0px;
}
.btn {
  display: flex;
  justify-content: center;
  gap: 7px;
  padding: 7px 30px;
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
