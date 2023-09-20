import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"



class EventService {
    async getEventById(eventId) {
        const event = await dbContext.Events.findById(eventId).populate('creator ticketCount')
        if (!event) {
            throw new BadRequest(`No event at id: ${eventId}`)
        }
        return event
    }

    async getEvents(query) {
        const events = await dbContext.Events.find(query).sort('-createdAt').populate('creator ticketCount')
        return events
    }
    async createEvent(eventBody) {
        const event = await dbContext.Events.create(eventBody)
        await event.populate('creator ticketCount')
        return event
    }
    async editEvent(eventId, updates) {
        const originalEvent = await dbContext.Events.findById(eventId)
        if (!originalEvent) throw new BadRequest(`No event at id ${eventId}`)
        if (originalEvent.isCanceled) throw new BadRequest('This event is cancelled already')
        originalEvent.name = updates.name || originalEvent.name
        originalEvent.description = updates.description || originalEvent.description
        originalEvent.coverImg = updates.coverImg || originalEvent.coverImg
        originalEvent.location = updates.location || originalEvent.location
        originalEvent.capacity = updates.capacity || originalEvent.capacity
        originalEvent.startDate = updates.startDate || originalEvent.startDate
        originalEvent.type = updates.type || originalEvent.type

        await originalEvent.save()
        return originalEvent
    }
    async cancelEvent(eventId, userId) {
        const event = await this.getEventById(eventId)
        if (event.creatorId != userId) throw new Forbidden('This is not your event to cancel!')

        if (!event.isCanceled) {
            event.isCanceled = !event.isCanceled
        } else {
            throw new BadRequest('This event is already canceled')
        }
        await event.save()
        return event
    }
}
export const eventService = new EventService()