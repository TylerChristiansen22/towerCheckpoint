import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class TicketsService{
    async createTicket(ticketData){
        const res = await api.post('api/tickets', ticketData)
        logger.log('attending event', res.data)
        AppState.activeEventTickets.push(new Ticket(res.data))
        AppState.activeEvent.ticketCount++
    }
}

export const ticketsService = new TicketsService()