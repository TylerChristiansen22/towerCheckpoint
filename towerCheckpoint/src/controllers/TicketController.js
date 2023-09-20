import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketService } from "../services/TicketService.js";


export class TicketController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
            .delete('/:ticketId', this.deleteTicket)
    }

    async createTicket(req, res, next) {
        try {
            const ticketBody = req.body
            ticketBody.accountId = req.userInfo.id
            const ticket = await ticketService.createTicket(ticketBody)
            res.send(ticket)
        } catch (error) {
            next(error)
        }
    }

    async deleteTicket(req, res, next) {
        try {
            const ticketId = req.params.ticketId
            const userId = req.userInfo.id
            await ticketService.deleteTicket(ticketId, userId)
            res.send('Ticket was deleted!')
        } catch (error) {
            next(error)
        }
    }
}