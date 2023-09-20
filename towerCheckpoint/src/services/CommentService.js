import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventService } from "./EventService.js"



class CommentService {
    async createComment(commentBody) {
        const comment = await dbContext.Comments.create(commentBody)
        await comment.populate('creator', '-email')
        return comment
    }
    async getEventComments(eventId) {
        await eventService.getEventById(eventId)
        const comments = await dbContext.Comments.find({ eventId }).populate('creator', '-email')
        return comments
    }
    async deleteComment(commentId, userId) {
        const commentToDelete = await dbContext.Comments.findById(commentId)
        if (!commentToDelete) throw new BadRequest(`No comment at id ${commentId}`)
        if (commentToDelete.creatorId != userId) {
            throw new Forbidden('This is not your comment to delete!')
        }
        await commentToDelete.remove()
    }

}

export const commentService = new CommentService()