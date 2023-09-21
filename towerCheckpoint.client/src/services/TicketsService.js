import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"



class TicketsService{
    async createTicket(ticketData){
        const res = await api.post('api/tickets', ticketData)
        logger.log('attending event', res.data)
        AppState.activeEventTickets.push(new Ticket(res.data))
        AppState.activeEvent.ticketCount++
    }

    async deleteTicket(ticketId){
        const res = await api.delete(`api/tickets/${ticketId}`)
        logger.log(res.data)
        let indexToRemove = AppState.myTickets.findIndex(ticket => ticket.id == ticketId)
        AppState.myTickets.splice(indexToRemove, 1)
    }
}

export const ticketsService = new TicketsService()