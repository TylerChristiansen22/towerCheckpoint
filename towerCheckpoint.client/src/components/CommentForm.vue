<template>
    <div class="container-fluid">
        <form @submit.prevent="createComment" class="row justify-content-center p-1">
            <div class="col-12 col-md-10">
                <label for="comment-body">Comment:</label>
                <textarea v-model="commentData.body" class="form-control" id="comment-body" placeholder="Comment Body"></textarea>
            </div>
            <div class="row justify-content-end p-1">
                <div class="col-6 col-md-3">
                    <button class="btn btn-success ms-md-5">Post Comment</button>
                </div>
            </div>
        </form>
    </div>
</template>


<script>
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import {commentsService} from '../services/CommentsService.js'
export default {
    setup(){
        const commentData = ref({})
        const route = useRoute()
    return {
        commentData,
        async createComment(){
            try {
                commentData.value.eventId = route.params.eventId
                await commentsService.createComment(commentData.value)
                Pop.toast('Added comment', 'success')
                commentData.value= {}
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