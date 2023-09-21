import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { api } from "./AxiosService.js"



class CommentsService{
    async createComment(commentData){
        const res = await api.post('api/comments', commentData)
        AppState.activeEventComments.push(new Comment(res.data))
    }
    async deleteComment(commentId){
        const res = await api.delete(`api/comments/${commentId}`)
        let indexToRemove = AppState.activeEventComments.findIndex(comment => comment.id == commentId)
        if(indexToRemove >= 0){
            AppState.activeEventComments.splice(indexToRemove,1)
        }
    }
}


export const commentsService = new CommentsService()