<template>
    <div class="card event-card background m-2 justify-content-end">
        <img :src="ticket.event.coverImg" alt="">
        <div class="col-12">
            <div class="glass p-2">
                <p class="text-start fw-bold m-0">{{ ticket.event.name }}</p>
                <p class="text-start m-0">{{ ticket.event.type }}</p>
                <p class="text-start m-0">{{ ticket.startDate }}</p>
                <button @click="deleteTicket" class="btn btn-danger">Delete Ticket</button>
            </div>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Ticket } from '../models/Ticket.js';
import Pop from '../utils/Pop.js';
import { ticketsService } from '../services/TicketsService.js';
export default {
    props: { ticket: { type: Ticket || Object, required: true } },
    setup(props) {
        return {
            ticketEventCover: computed(() => `url(${props.ticket.event.coverImg}`),
            async deleteTicket() {
                try {
                    if (await Pop.confirm('Are you sure you want to delete this ticket?')) {
                        await ticketsService.deleteTicket(props.ticket.id)
                        Pop.success('Ticket was deleted')
                    }
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped>
.event-card {
    height: 30vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
    overflow: hidden;
}

.glass {
    /* From https://css.glass */
    background: rgba(255, 255, 255, 0.43);
    border-radius: 5px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7.4px);
    -webkit-backdrop-filter: blur(7.4px);
}

.background {
    background-image: v-bind(ticketEventCover);
    background-position: center;
    background-size: cover;
}
</style>