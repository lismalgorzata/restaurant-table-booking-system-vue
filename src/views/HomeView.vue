<template>
  <div>
    <div class="welcome">
      Welcome to the Restaurant Table Booking System
    </div>

    <div class="button-container">
      <div @click="goToReservationPage" class="button reservation">
        Reservation
      </div>

      <div @click="goToBillPage" class="button bill">
        Bill
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToBillPage = () => {
  router.push({ name: 'bill' });
};

const goToReservationPage = () => {
  router.push({ name: 'reservation' });
};
</script>

<style scoped>
.welcome {
  text-align: center;
  margin-bottom: 50px;
  font-size: 60px;
  color: #332920;
  font-family: Copperplate,fantasy;
}

.button-container {
  padding-top: 10%;
  display: flex;
  justify-content: space-around;
}

.button {
  padding: 30px 60px;
  font-size: 25px;
  background-color: #574F47;
  border: 2px #332920;
  border-radius: 25px;
  color: #F7F1E6;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.button:hover {
  background-color: #F7F1E6;
  color: #574F47;
}

.reservation {
  margin-right: 10px;
}

.bill {
  margin-left: 10px;
  padding: 30px 110px;
}
</style>
