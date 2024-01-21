import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue';
import ReservationView from '@/views/ReservationView.vue';
import BillView from '@/views/BillView.vue';
import NewBillView from '@/views/NewBillView.vue';
import EditBillView from '@/views/EditBillView.vue';
import NewReservationView from '@/views/NewReservationView.vue';


const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/reservation', name: 'reservation', component: ReservationView },
  { path: '/bill', name: 'bill', component: BillView },
  { path: '/new-bill-form', name: 'newBillForm', component: NewBillView},
  { path: '/edit-bill-form/:billId', name: 'editBillForm', component: EditBillView},
  { path: '/new-reservation-form', name: 'newReservationForm', component: NewReservationView},
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
