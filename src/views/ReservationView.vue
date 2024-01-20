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
  <div class="row mt-3">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4 mt-2" v-for="reservation in reservations" :key="reservation.reservationId">
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
                    <div class="col-md-6">
                      <h6 class="text-start">{{ reservation.customerSurname }}</h6>
                    </div>
                    <div class="col-md-6">
                      <h7 class="text-start">{{ reservation.customerPhone }}</h7>
                    </div>
                  </li>
                  <li class="list-group-item">
                    <div class="text-end">{{ formatDate(reservation.date) }}</div>
                  </li>
                </ul>
              </div>
              <div class="row">
                <div class="col-md-2">
                  <button class="editBtn btn btn-primary" @click="editReservation(index)">Edit</button>
                </div>
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
const editingIndex = ref(null);
const items = ref([
  {text: 'Item 1', deleted: false},
  {text: 'Item 2', deleted: false},
  {text: 'Item 3', deleted: false},
]);

const goToAddForm = () => {
  router.push({name: 'newReservationForm'});
};

const editReservation = (index) => {
  editingIndex.value = index;
  router.push({name: 'editReservationForm'});
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
.container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px; /* Adjust as needed */
}

.tables,
.dates,
.reservations {
  width: calc(33.33% - 10px); /* Adjust the width and margin as needed */
  margin-right: 10px; /* Adjust as needed */
}

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

.allReservations {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.ul {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
}

.ul li {
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  padding-left: 1rem;
  background-color: rgb(204, 204, 204);
}

.btn {
  display: flex;
  justify-content: center;
  gap: 7px;
}

.editBtn {
  background-color: rgb(93, 74, 53);
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.editBtn:hover {
  background-color: antiquewhite;
  color: rgb(93, 74, 53);
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

.crossedOut {
  text-decoration: line-through;
}
</style>
