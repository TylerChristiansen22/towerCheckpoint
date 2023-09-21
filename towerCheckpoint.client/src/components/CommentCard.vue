<template>
    <section class="row justify-content-center my-2">
        <div class="col-9 col-md-1 border">
            <img class="profile-pic" :src="comment.creator.picture" :alt="comment.creator.name">
        </div>
        <div class="col-9 border">
            <p class="fw-bold">{{ comment.creator.name }}</p>
            <p>{{ comment.body }}</p>
            <button v-if="account.id == comment.creator.id" @click="deleteComment" class="btn btn-danger">Delete</button>
        </div>
    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Comment } from '../models/Comment.js';
import Pop from '../utils/Pop.js';
import { commentsService } from '../services/CommentsService.js';
export default {
    props: { comment: {type: Comment, required: true}},
    setup(props){
    return {
        account: computed(()=> AppState.account),
        async deleteComment(){
            try {
                if(await Pop.confirm('Are you sure you want to delete this comment?')){
                    await commentsService.deleteComment(props.comment.id)
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
.profile-pic{
    height: 100px;
    width: 100px;
    object-position: center;
    object-fit: cover;
    border-radius: 50%;
}
</style>