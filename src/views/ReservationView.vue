<template>
    <div class="container">
        <div class="reservations">
            <div @click="goToAddForm" class="addReservation">
                Add New Reservation
            </div>
    
            <div class="allReservations">
                <h1>All Reservations</h1>
                <ul class="ul">
                  <li class="li" v-for="reservation in reservations" :key="reservation.reservationId">
                    <span>
                      Reservation ID: {{ reservation.reservationId }}, Date: {{ reservation.date }}
                    </span>
                    <div class="btn">
                      <button class="deleteBtn" @click="deleteReservation(reservation.reservationId)">Delete</button>
                    </div>
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

    const goToAddForm = () => {
      router.push({ name: 'newReservationForm' });
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

    onMounted(fetchReservations);
  </script>
  
  <style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 20px; /* Adjust as needed */
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
