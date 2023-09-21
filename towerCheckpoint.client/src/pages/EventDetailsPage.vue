<template>
    <div class="container-fluid bg-dark">
        <section v-if="event" class="row bg-dark">
            <div class="col-4">
                <img class="sizing" :src="event.coverImg" :alt="event.name">
            </div>
            <div class="col-8">
                <p>{{ event.name }}</p>
                <p>{{ event.location }}</p>
                <p>{{ event.description }}</p>
                <p :class="{'danger': (event.capacity - event.ticketCount) == 0}" >{{ event.capacity - event.ticketCount }} tickets left</p>
                <div class="justify-content-end">
                    <button class="btn btn-success">Attend</button>
                </div>
            </div>
            <div class="row justify-content-center">
                <CommentForm/>
                <div v-for="comment in comments" :key="comment.id" class="col-3">
                    {{ comments.body }}
                </div>
            </div>
        </section>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, watchEffect } from 'vue';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js';
import { useRoute } from 'vue-router';
export default {
    setup(){
        const route = useRoute();
        watchEffect(()=> {
            getEventById();
            getCommentsByEventId();
        });
        async function getEventById(){
            try {
                await eventsService.getEventById(route.params.eventId)
            } catch (error) {
                Pop.error(error)
            }
        }
        async function getCommentsByEventId(){
            try {
                await eventsService.getCommentsByEventId(route.params.eventId)
            } catch (error) {
                Pop.error(error)
            }
        }
    return { 
        user: computed(()=> AppState.user),
        event: computed(()=> AppState.activeEvent),
        comments: computed(()=> AppState.activeEventComments)
    }
    }
};
</script>


<style lang="scss" scoped>
.sizing{
    height: 400px;
    width: 100%;
    object-fit: cover;
    object-position: center;
}

.danger{
    color: red;
}
</style>