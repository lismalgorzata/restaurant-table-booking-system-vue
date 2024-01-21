<template>
    <div class="appHeader">
      <div class="left">
        <img @click="goToMainPage" src="@/assets/logo.png" alt="Logo" class="logo" />
      </div>
      <div class="header-title">
        <p class="title">Restaurant Table Booking System</p>
      </div>
      <div class="right">
        <div @click="goToMainPage" class="homeIcon icon">
          <svg xmlns="http://www.w3.org/2000/svg" 
              width="28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              class="feather feather-home">
              
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
        <div @click="goToReservationPage" class="reservationIcon icon">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="28" 
                height="28" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                class="feather feather-book-open">
                
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
        </div>
        <div @click="goToBillPage" class="billIcon icon">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="28" 
                height="28" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                class="feather feather-dollar-sign">
                
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
        </div>
      </div>
    </div>
</template>
  
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToMainPage = () => {
  router.push({ name: 'home' });
};

const goToReservationPage = () => {
  router.push({ name: 'reservation' });
};

const goToBillPage = () => {
  router.push({ name: 'bill' });
};

</script>
  
<style scoped>
.appHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 24px;
    border-bottom: 1px solid rgb(93, 74, 53);
    background-color: #F7F1E6;
    padding-right: 2.5%;
  }
  
.logo {
    cursor: pointer;
    width: 180px;
    height: 120px;
  }
  
.left {
    display: flex;
    align-items: center;
  }
  
.header-title {
  font-size: 200%;
  font-family: Helvetica,sans-serif;
  padding-top: 15px;
}

.title {
  color: #332920;
}
.right {
    display: flex;
    gap: 50px; 
  }
  
.reservationIcon, .homeIcon, .billIcon {
    cursor: pointer;
}

.icon {
  color: #8A7A6B;
  transition: background-color 0.2s ease;
  transition: color 1s ease;
  transition: transform 0.2s ease-in-out;
}

.icon:hover {
  color: #332920;
  transform: scale(1.2);
}
</style>
  