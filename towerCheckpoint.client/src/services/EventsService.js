import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { Event } from "../models/Event.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class EventsService{
    async getEvents(){
        const res = await api.get('api/events')
        logger.log('Got Events', res.data)
        AppState.events = res.data.map(event => new Event(event))
    }

    async getEventById(eventId){
        const res = await api.get(`api/events/${eventId}`)
        AppState.activeEvent = new Event(res.data)
    }
    async getCommentsByEventId(eventId){
        const res = await api.get(`api/events/${eventId}/comments`)
        logger.log(res.data)
        AppState.activeEventComments = res.data.map(comment => new Comment(comment))
    }

    async getTicketsByEventId(eventId){
        const res = await api.get(`api/events/${eventId}/tickets`)
        logger.log(res.data)
        AppState.activeEventTickets = res.data.map(ticket => new Ticket(ticket))
    }

    async createEvent(eventData){
        const res = await api.post('api/events', eventData)
        logger.log('created event', res.data)
        const newEvent = new Event(res.data)
        AppState.events.unshift(newEvent)
        return newEvent
    }

    async cancelEvent(eventId){
        const res = await api.delete(`api/events/${eventId}`)
        logger.log(res.data)
        AppState.activeEvent = new Event(res.data)
        return 'Event has been canceled'
    }
}


export const eventsService = new EventsService()