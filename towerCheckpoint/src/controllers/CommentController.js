import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentService } from "../services/CommentService.js";



export class CommentController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
            .delete('/:commentId', this.deleteComment)
    }

    async createComment(req, res, next) {
        try {
            const commentBody = req.body
            commentBody.creatorId = req.userInfo.id
            const comment = await commentService.createComment(commentBody)
            res.send(comment)
        } catch (error) {
            next(error)
        }
    }

    async deleteComment(req, res, next) {
        try {
            const commentId = req.params.commentId
            const userId = req.userInfo.id
            await commentService.deleteComment(commentId, userId)
            res.send('Comment deleted!')
        } catch (error) {
            next(error)
        }
    }
}