<template>
  <div class="row">
    <div class="col-md-9">
      <div class="col-md-9">
        <h1 class="text-end title-allBills">All Bills</h1>
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
  <div class="row mt-4 mb-4">
    <div class="col-md-2 mb-2">
      <input v-model="filterDate" type="date" class="form-control" id="validationTooltip01" value="" required>
    </div>
    <div class="col-md-2 mb-2">
      <select v-model="filterWaiterId" class="form-select" required aria-label="select example">
        <option v-for="waiter in waiters" :key="waiter.waiterId" :value="waiter.waiterId">
          {{ waiter.waiterName }} {{ waiter.waiterSurname }}
        </option>
      </select>
    </div>
    <div class="col-md-1 mb-2 mt-2 d-flex">
      <input class="form-check-input mx-2" type="checkbox" value="" v-model="filterIsPayed">
      <label class="form-check-label">Rozliczony</label>
    </div>
    <div class="col-md-2 mb-1 mx-3">
      <button type="button" class="btn btn-outline-dark" @click="fetchBillsByParameters">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"/>
          </svg>
        </div>
        <div>
          Filtruj
        </div>
      </button>
    </div>
  </div>
  <div class="row mt-3">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4 mt-2" v-for="bill in bills" :key="bill.billId">
          <div class="card card-setting">
            <div class="card-body">
              <div class="row">
                <div class="col-md-8">
                  <p class="card-text text-start">{{ formatDate(bill.date) }}</p>
                </div>
                <div class="col-md-4">
                  <div class="d-flex justify-content-end">
                    <button v-if="bill.reservation != null" type="button" class="btn btn-outline-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Rezerwacja stolika">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar2-check" viewBox="0 0 16 16">
                        <path d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/>
                        <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5z"/>
                      </svg>
                    </button>
                    <button v-if="bill.isPayed === false" type="button" class="btn btn-outline-danger mx-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Rachunek nie został opłacony">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                      </svg>
                    </button>
                  </div>
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
                    <div class="col-md-10">
                      <div class="form-check text-start" v-if="bill.reservation">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked style="pointer-events: none; opacity: 1;">
                        <label class="form-check-label" for="flexCheckDefault">
                            Rezerwacja
                        </label>
                        <div class="row">
                          <h8>Stolik numer {{ bill.reservation.table.tableId }}</h8>
                        </div>
                        <div class="row">
                          <h8>{{ formatDate(bill.reservation.date) }}</h8>
                        </div>
                        <div class="row">
                          <h8>{{ bill.reservation.customerSurname }}</h8>
                        </div>
                      </div>
                      <div class="form-check text-start form-bill-input" v-else>
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" style="pointer-events: none; opacity: 1;">
                        <label class="form-check-label" for="flexCheckDefault" style="opacity: 1;">Rezerwacja</label>
                      </div>
                    </div>
                    <div class="col-md-8">
                      <div class="form-check text-start form-bill-input" v-if="bill.isPayed === true">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked style="pointer-events: none; opacity: 1;">
                        <label class="form-check-label" for="flexCheckDefault">
                          Rozliczony
                        </label>
                      </div>
                      <div class="form-check text-start form-bill-input" v-else>
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" style="pointer-events: none; opacity: 1;">
                        <label class="form-check-label" for="flexCheckDefault">
                          Rozliczony
                        </label>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="row">
                <h5 class="card-text text-end">{{ bill.billPrice }} PLN</h5>
              </div>
              <div class="text-start">
                <button class="editBtn" @click="editBill(bill.billId)">Edit</button>
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

const goToAddForm = () => {
  router.push({name: 'newBillForm'});
};

const editBill = (billId) => {
  router.push({name: 'editBillForm', params: { billId }});
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

const waiters = ref([]);

const fetchWaitersNames = async () => {
  try {
    const response = await ApiService.getAllWaiterNames();
    waiters.value = response.data;
    console.log(waiters.value);
  } catch (error) {
    console.error('Error during fetching waiters names', error);
  }
};

const filterDate = ref(null);
const filterWaiterId = ref(null);
const filterIsPayed = ref(null);
const filterReservationId = ref(null);

const fetchBillsByParameters = async () => {
  try {
    const response = await ApiService.getBillsByFilter(
        filterDate.value,
        filterWaiterId.value,
        filterIsPayed.value,
        filterReservationId.value
    );
    bills.value = response.data;
  } catch (error) {
    console.error("Error while fetching bills with filters:", error);
  }
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('pl-PL', options);
};


onMounted(fetchBills);
onMounted(fetchWaitersNames);
</script>

<style scoped>
.title-allBills {
  color: #332920;
  text-transform: uppercase;
  font-family: Copperplate,fantasy;
}
.addBill {
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

.addBill:hover {
  background-color: #F7F1E6;
  color: #574F47;
}

.allBills {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.card-setting {
  background-color: #f5f1eb;
  --bs-list-group-bg: #f5f1eb;
  border: 0px;
}

.form-bill-input {
  padding-left: 0%;
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
  padding: 7px 30px;
  background-color: rgb(93, 74, 53);
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.editBtn:hover {
  background-color: antiquewhite;
  color: rgb(93, 74, 53);
}
</style>
  