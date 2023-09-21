<template>
  <div class="container-fluid bg-dark">
    <section class="row">
      <div v-for="ticket in tickets" :key="ticket.id">
        <MyEventsCard :ticket="ticket"/>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop.js';
import { ticketsService } from '../services/TicketsService.js';
import { accountService } from '../services/AccountService.js';
export default {
  setup() {
    onMounted(()=> {
      getMyTickets()
    })
    async function getMyTickets(){
      try {
        await accountService.getMyTickets()
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      account: computed(() => AppState.account),
      tickets: computed(()=> AppState.myTickets)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
