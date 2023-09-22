<template>
    <EventFormModal />
    <div class="container-fluid bg-dark">
        <section v-if="event" class="row bg-dark">
            <div class="col-12 col-md-4">
                <img class="sizing" :src="event.coverImg" :alt="event.name">
            </div>
            <div class="col-8">
                <p>{{ event.name }}</p>
                <p>{{ event.location }}</p>
                <p>{{ event.description }}</p>
                <p v-if="!event.isCanceled" :class="{ 'danger': (event.capacity - event.ticketCount) == 0 }">{{
                    event.capacity
                    - event.ticketCount }} tickets left</p>
                <p v-else class="text-danger">This event has been canceled</p>
                <div>
                    <button
                        v-if="!hasTicket && user.isAuthenticated && !event.isCanceled && (event.capacity != event.ticketCount)"
                        :disabled="inProgress" @click="createTicket" class="btn btn-success">Attend</button>
                    <button v-if="account.id == event.creatorId && !event.isCanceled" @click="cancelEvent"
                        class="btn btn-danger ms-1">Cancel Event</button>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-10">
                    <p>People attending:</p>
                    <img :title="ticket.profile.name" class="attendee" v-for="ticket in tickets" :key="ticket.id"
                        :src="ticket.profile.picture" alt="">
                </div>
            </div>
            <div class="row justify-content-center">
                <CommentForm />
                <div v-if="comments.length">
                    <div v-for="comment in comments" :key="comment.id">
                        <CommentCard :comment="comment" />
                    </div>
                </div>
                <div v-else>
                    <p class="vh-100 ms-5 ps-5">Be the first to comment!</p>
                </div>
            </div>
        </section>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, watchEffect, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js';
import { useRoute } from 'vue-router';
import { ticketsService } from '../services/TicketsService.js'
export default {
    setup() {
        const route = useRoute();
        const inProgress = ref(false)
        watchEffect(() => {
            getEventById();
            getCommentsByEventId();
            getTicketsByEventId();
        });
        async function getEventById() {
            try {
                await eventsService.getEventById(route.params.eventId)
            } catch (error) {
                Pop.error(error)
            }
        }
        async function getCommentsByEventId() {
            try {
                await eventsService.getCommentsByEventId(route.params.eventId)
            } catch (error) {
                Pop.error(error)
            }
        }
        async function getTicketsByEventId() {
            try {
                await eventsService.getTicketsByEventId(route.params.eventId)
            } catch (error) {
                Pop.error(error)
            }
        }
        return {
            inProgress,
            user: computed(() => AppState.user),
            account: computed(() => AppState.account),
            event: computed(() => AppState.activeEvent),
            comments: computed(() => AppState.activeEventComments),
            tickets: computed(() => AppState.activeEventTickets),
            hasTicket: computed(() => AppState.activeEventTickets.find(ticket => ticket.accountId == AppState.account.id)),

            async createTicket() {
                try {
                    inProgress.value = true
                    let ticketData = { eventId: route.params.eventId }
                    await ticketsService.createTicket(ticketData)
                } catch (error) {
                    Pop.error(error)
                }
            },
            async cancelEvent() {
                try {
                    await eventsService.cancelEvent(route.params.eventId)
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped>
.sizing {
    height: 400px;
    width: 100%;
    object-fit: cover;
    object-position: center;
}

.danger {
    color: red;
}

.attendee {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
}
</style>