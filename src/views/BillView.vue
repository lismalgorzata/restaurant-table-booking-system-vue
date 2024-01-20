<template>
  <div class="row">
    <div class="col-md-9">
      <div class="col-md-9">
        <h1 class="text-end">All Bills</h1>
      </div>
      <div class="col-md-3">
      </div>
    </div>
    <div class="col-md-3">
      <div @click="goToAddForm" class="addBill">
        Add New Bill
      </div>
    </div>
  </div>

  <div class="row mt-3">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4 mt-2" v-for="bill in bills" :key="bill.billId">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-md-10">
                  <p class="card-text text-start">{{ formatDate(bill.date) }}</p>
                </div>
                <div class="col-md-2">
                    <button v-if="bill.isPayed" type="button" class="btn btn-outline-danger" data-bs-toggle="tooltip" data-bs-placement="top" title="Rachunek nie został opłacony">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                      </svg>
                    </button>
                </div>
              </div>
              <div class="row">
                <p class="card-text text-start">{{ bill.waiter.waiterName }} {{ bill.waiter.waiterSurname }}</p>
              </div>
              <div class="row">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                  </li>
                  <li class="list-group-item">
                    <p class="card-text">{{ bill.listOfDishes }}</p>
                  </li>
                  <li class="list-group-item">
                    <div class="col-md-6">
                      <div class="form-check text-start" v-if="bill.reservationId != null">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked disabled>
                        <label class="form-check-label" for="flexCheckDefault">
                            Rezerwacja: {{ bill.reservationId }}
                        </label>
                      </div>
                      <div class="form-check text-start" v-else>
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" disabled>
                        <label class="form-check-label" for="flexCheckDefault">Rezerwacja</label>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-check text-start" v-if="bill.isPayed != true">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked disabled>
                        <label class="form-check-label" for="flexCheckDefault">
                          Rozliczony {{ bill.reservationId }}
                        </label>
                      </div>
                      <div class="form-check text-start" v-else>
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" disabled>
                        <label class="form-check-label" for="flexCheckDefault">
                          Rozliczony
                        </label>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="row">
                <h5 class="card-text text-end">{{ bill.billPrice }}</h5>
              </div>
              <div class="text-start">
                <button class="editBtn" @click="editBill(index)">Edit</button>
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
import ApiService from "@/services/api";

const router = useRouter();
const editingIndex = ref(null);
const items = ref(['Item 1', 'Item 2', 'Item 3']);

const goToAddForm = () => {
  router.push({name: 'newBillForm'});
};

const editBill = (index) => {
  editingIndex.value = index;
  // później do dodania jeszcze /billId czy cos
  router.push({name: 'editBillForm'});
};

const bills = ref([]);

const fetchBills = async () => {
  try {
    const response = await ApiService.getAllBills();
    bills.value = response.data;
  } catch (error) {
    console.error("Error while fetching bills:", error);
  }
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('pl-PL', options);
};

onMounted(fetchBills);
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

.ul {
  width: 85%;
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
</style>
  