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
  font-size: 24px;
  color: #332920;
  font-family: Helvetica,sans-serif;
}

.button-container {
  display: flex;
  justify-content: space-around;
}

.button {
  padding: 30px 60px;
  font-size: 24px;
  background-color: #F7F1E6;
  border: 2px solid #332920;
  border-radius: 20px;
  color: #574F47;
  border-radius: 20px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease;
}
.button:hover {
  background-color: #BD946D;
  color: #332920;
}

.reservation {
  margin-right: 10px;
}

.bill {
  margin-left: 10px;
}
</style>
