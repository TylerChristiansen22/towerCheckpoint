<template>
    <RouterLink :to="{path: `events/${event.id}`}">
        <div class="card event-card background-img m-2 justify-content-end">
            <div class="col-12">
                <div class="glass">
                    <p class="text-start fw-bold m-0">{{ event.name }}</p>
                    <p class="text-start m-0">{{ event.type }}</p>
                    <p class="text-start m-0">{{ event.startDate }}</p>
                    <p class="text-end m-0">{{ event.capacity - event.ticketCount }} tickets left</p>
                </div>
            </div>
        </div>
    </RouterLink>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Event } from '../models/Event.js'; 
import { RouterLink } from 'vue-router';
export default {
    props: { event: { type: Event || Object, required: true } },
    setup(props) {
        return {
            eventCover: computed(() => `url(${props.event.coverImg}`)
        };
    },
    components: { RouterLink }
};
</script>


<style lang="scss" scoped>
.event-card{
    height: 30vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
    overflow: hidden;
}
.glass{
    /* From https://css.glass */
    background: rgba(255, 255, 255, 0.43);
    border-radius: 5px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7.4px);
    -webkit-backdrop-filter: blur(7.4px);
}
.background-img{
    background-image: v-bind(eventCover);
    background-position: center;
    background-size: cover;
}

</style>