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
}

.button-container {
  display: flex;
  justify-content: space-around;
}

.button {
  padding: 30px 60px;
  font-size: 24px;
  background-color: white;
  border: 2px solid rgb(93, 74, 53);
  border-radius: 20px;
  color: rgb(93, 74, 53);
  border-radius: 20px;
  cursor: pointer;
  text-align: center;
}
.button:hover {
  background-color: antiquewhite;
}

.reservation {
  margin-right: 10px;
}

.bill {
  margin-left: 10px;
}
</style>
