<template>
    <div>
      <div @click="goToAddForm" class="addBill">
        Add New Bill
      </div>
  
      <div class="allBills">
        <h1>All Bills</h1>
        <ul class="ul">
          <li class="li" v-for="(item, index) in items" :key="index">
            {{ item }}
            <div class="btn">
              <button class="editBtn" @click="editBill(index)">Edit</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const editingIndex = ref(null);
  const items = ref(['Item 1', 'Item 2', 'Item 3']);
  
  const goToAddForm = () => {
    router.push({ name: 'newBillForm' });
  };
  
  const editBill = (index) => {
    editingIndex.value = index;
    // później do dodania jeszcze /billId czy cos
    router.push({ name: 'editBillForm'});
  };
  </script>
  
  <style scoped>
  .addBill {
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
  .addBill:hover {
    background-color: antiquewhite;
  }
  
  .allBills {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  } 
  
  .ul{
    width: 85%;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }
  .ul li{
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-radius: 5px;
    padding-left: 1rem;
    background-color: rgb(204, 204, 204);
  }
  .btn{
    display: flex;
    justify-content: center;
    gap: 7px;
  }
  .editBtn{
    background-color: rgb(93, 74, 53);
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  .editBtn:hover{
    background-color:antiquewhite;
    color:rgb(93, 74, 53);
  }
  </style>
  