<template>
    <div class="container">
        <div class="tables">
            Tables
        </div>
        <div class="dates">
            Dates
        </div>
        <div class="reservations">
            <div @click="goToAddForm" class="addReservation">
                Add New Reservation
            </div>
    
            <div class="allReservations">
                <h1>All Reservations</h1>
                <ul class="ul">
                <li class="li" v-for="(item, index) in items" :key="index">
                    <span :class="{ crossedOut: item.deleted }">{{ item.text }}</span>
                    <div class="btn">
                    <button class="editBtn" @click="editReservation(index)">Edit</button>
                    <button class="deleteBtn" @click="deleteReservation(index)">Delete</button>
                    </div>
                </li>
                  <li class="li" v-for="reservation in reservations" :key="reservation.reservationId">
                    <!-- Tutaj wyświetlamy szczegóły rezerwacji -->
                    Reservation ID: {{ reservation.reservationId }}, Date: {{ reservation.date }}
                    <!-- Możesz dodać więcej informacji o rezerwacji tutaj -->
                  </li>
                </ul>
            </div>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import ApiService from '@/services/api';
  
  const router = useRouter();
  const editingIndex = ref(null);
  const items = ref([
    { text: 'Item 1', deleted: false },
    { text: 'Item 2', deleted: false },
    { text: 'Item 3', deleted: false },
  ]);
  
  const goToAddForm = () => {
    router.push({ name: 'newReservationForm' });
  };
  
  const editReservation = (index) => {
    editingIndex.value = index;
    router.push({ name: 'editReservationForm' });
  };
  
  const deleteReservation = (index) => {
    items.value[index].deleted = true;
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
