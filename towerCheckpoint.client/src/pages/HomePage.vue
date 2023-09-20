<template>
  <div class="container-fluid bg-dark">
    <div class="card main-img justify-content-center">
        <p class="ms-5 fs-4">Get ahead of the scalpers</p>
        <p class="ms-5 fs-4">Reserve your seats now with</p>
        <p class="ms-5 fs-4">real events for real people</p>
      </div>
    <section class="row my-2 justify-content-around">
      <button class="btn col col-md-2 btn-outline-light" @click="filterBy='' ">All</button>
      <button class="btn col col-md-2 btn-outline-light" @click="filterBy='concert' ">Concerts</button>
      <button class="btn col col-md-2 btn-outline-light" @click="filterBy='convention' ">Conventions</button>
      <button class="btn col col-md-2 btn-outline-light" @click="filterBy='sport' ">Sports</button>
      <button class="btn col col-md-2 btn-outline-light" @click="filterBy='digital' ">Digital</button>
    </section>
    <section class="row">
      <div v-for="event in events" :key="event.id" class="col-6 col-md-3">
        <EventCard :event="event"/>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import EventCard from '../components/EventCard.vue';
import Pop from '../utils/Pop.js';
import {eventsService} from '../services/EventsService.js'
import { AppState } from '../AppState.js';

export default {
    setup() {
      onMounted(() => {
        getEvents()
      });
      const filterBy = ref('')
      async function getEvents(){
        try {
          await eventsService.getEvents()
        } catch (error) {
          Pop.error(error)
        }
      }
        return {
          filterBy,
          events: computed(()=> {
            if(!filterBy.value){
              return AppState.events
            } else{
              return AppState.events.filter(event => event.type == filterBy.value)
            }
          })
        };
    },
    components: { EventCard }
}
</script>

<style scoped lang="scss">
.main-img{
  background-image: url(https://images.unsplash.com/photo-1559171667-74fe3499b5ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29udmVudGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60) ;
  background-position: center;
  background-size: cover;
  height: 400px;
}

.glass{
      /* From https://css.glass */
    background: rgba(255, 255, 255, 0.43);
    border-radius: 5px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7.4px);
    -webkit-backdrop-filter: blur(7.4px);
}
</style>
