<template>
  <div class="container-fluid">
    <section class="row">
      <div v-for="event in events" :key="event.id" class="col-6 col-md-3">
        <EventCard :event="event"/>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import EventCard from '../components/EventCard.vue';
import Pop from '../utils/Pop.js';
import {eventsService} from '../services/EventsService.js'
import { AppState } from '../AppState.js';

export default {
    setup() {
      onMounted(() => {
        getEvents()
      })
      async function getEvents(){
        try {
          await eventsService.getEvents()
        } catch (error) {
          Pop.error(error)
        }
      }
        return {
          events: computed(()=> AppState.events)
        };
    },
    components: { EventCard }
}
</script>

<style scoped lang="scss"></style>
