<template>    
    <!-- Modal Body -->
    <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
    <div class="modal fade" id="modalId" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-dark" id="modalTitleId">Create an Event</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-dark">
                    <form @submit.prevent="createEvent" class="row">
                        <div class="col-6">
                            <label for="cover-img">Cover Img</label>
                            <input v-model="eventData.coverImg" class="form-control" type="url" maxlength="500" placeholder="ImgURL" id="cover-img" required>
                        </div>
                        <div class="col-6">
                            <label for="event-name">Event Name:</label>
                            <input v-model="eventData.name" type="text" maxlength="20" class="form-control" id="event-name" placeholder="Event Name" required>
                        </div>
                        <div class="col-12">
                            <label for="event-description">Description:</label>
                            <textarea v-model="eventData.description" class="form-control" name="event-description" id="event-description" maxlength="1000" placeholder="Event Description" required></textarea>
                        </div>
                        <div class="col-6">
                            <label for="event-location">Location:</label>
                            <input v-model="eventData.location" class="form-control" id="event-location" placeholder="Location of Event" type="text" maxlength="50" required>
                        </div>
                        <div class="col-6">
                            <label for="event-capacity">Capacity:</label>
                            <input v-model="eventData.capacity" class="form-control" type="number" max="1000" placeholder="Capacity" required>
                        </div>
                        <div class="col-6">
                            <label for="start-date">Start Date:</label>
                            <input v-model="eventData.startDate" type="date" class="form-control" id="start-date" placeholder="Start Date" required>
                        </div>
                        <div class="col-6">
                            <label for="event-type">Event Type</label>
                            <select v-model="eventData.type" class="form-control" id="event-type">
                                <option disabled selected value="">Select a Category</option>
                                <option value="concert">Concert</option>
                                <option value="convention">Convention</option>
                                <option value="sport">Sport</option>
                                <option value="digital">Digital</option>
                            </select>
                        </div>
                        <div class="col-2">
                            <button type="button" class="btn btn-primary mt-5">Create Event</button>
                        </div>
                    </form>
                    </div>
                </div>
        </div>
    </div>

</template>


<script>
import { useRouter } from 'vue-router';
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js';
import { Modal } from 'bootstrap';
export default {
    setup(){
        const eventData = ref({})
        const router = useRouter()
        function resetForm(){
            eventData.value = {}
        }
        onMounted(()=>{
            resetForm()
        })
    return {
        eventData,
        async createEvent(){
            try {
                let newEvent = await eventsService.createEvent(eventData.value)
                Pop.toast('Event Created!', 'success')
                resetForm()
                Modal.getOrCreateInstance('#modalId').hide()
                router.push({name: 'Event Details', params: {eventId: newEvent.id}})
            } catch (error) {
                Pop.error(error)
            }
        }
    }
    }
};
</script>


<style lang="scss" scoped>

</style>