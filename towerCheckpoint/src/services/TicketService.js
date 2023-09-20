import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventService } from "./EventService.js"



class TicketService {
    async createTicket(ticketBody) {
        const ticket = await dbContext.Tickets.create(ticketBody)
        await ticket.populate('event')
        await ticket.populate('profile', '-email')
        return ticket
    }

    async getMyTickets(accountId) {
        const tickets = await dbContext.Tickets.find({ accountId }).populate({ path: 'event', populate: { path: 'creator ticketCount', select: '-email' } })
        return tickets
    }
    async getEventTickets(eventId) {
        await eventService.getEventById(eventId)
        const tickets = await dbContext.Tickets.find({ eventId }).populate('profile event', '-email')
        return tickets
    }
    async deleteTicket(ticketId, userId) {
        const ticketToDelete = await dbContext.Tickets.findById(ticketId)
        if (!ticketToDelete) throw new BadRequest(`No ticket at id ${ticketId}`)

        if (ticketToDelete.accountId != userId) {
            throw new Forbidden('This is not your ticket to delete!')
        }

        await ticketToDelete.remove()

    }
}

export const ticketService = new TicketService()