import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class EventsService{
    async getEvents(){
        const res = await api.get('api/events')
        logger.log('Got Events', res.data)
        AppState.events = res.data.map(event => new Event(event))
    }
}


export const eventsService = new EventsService()