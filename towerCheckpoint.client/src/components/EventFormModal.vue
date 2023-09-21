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
                    <form @submit="createEvent" class="row">
                        <div class="col-6">
                            <label for="cover-img">Cover Img</label>
                            <input class="form-control" type="url" maxlength="500" placeholder="ImgURL" id="cover-img" required>
                        </div>
                        <div class="col-6">
                            <label for="event-title">Event Title:</label>
                            <input type="text" maxlength="20" class="form-control" id="event-title" placeholder="Event Title" required>
                        </div>
                        <div class="col-12">
                            <label for="event-description">Description:</label>
                            <textarea class="form-control" name="event-description" id="event-description" maxlength="1000" placeholder="Event Description" required></textarea>
                        </div>
                        <div class="col-6">
                            <label for="event-location">Location:</label>
                            <input class="form-control" id="event-location" placeholder="Location of Event" type="text" maxlength="50" required>
                        </div>
                        <div class="col-6">
                            <label for="event-capacity">Capacity:</label>
                            <input class="form-control" type="number" max="1000" placeholder="Capacity" required>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Create Event</button>
                </div>
            </div>
        </div>
    </div>

</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
    setup(){
    return {  }
    }
};
</script>


<style lang="scss" scoped>

</style>