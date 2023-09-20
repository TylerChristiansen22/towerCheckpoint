import req from "express/lib/request.js";
import BaseController from "../utils/BaseController.js";
import { eventService } from "../services/EventService.js";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketService } from "../services/TicketService.js";
import { commentService } from "../services/CommentService.js";



export class EventController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getEvents)
            .get('/:eventId', this.getEventById)
            .get('/:eventId/tickets', this.getEventTickets)
            .get('/:eventId/comments', this.getEventComments)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:eventId', this.editEvent)
            .delete('/:eventId', this.cancelEvent)
    }

    async getEvents(req, res, next) {
        try {
            const events = await eventService.getEvents(req.query)
            res.send(events)
        } catch (error) {
            next(error)
        }
    }

    async getEventById(req, res, next) {
        try {
            const event = await eventService.getEventById(req.params.eventId)
            res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getEventTickets(req, res, next) {
        try {
            const tickets = await ticketService.getEventTickets(req.params.eventId)
            res.send(tickets)
        } catch (error) {
            next(error)
        }
    }

    async getEventComments(req, res, next) {
        try {
            const comments = await commentService.getEventComments(req.params.eventId)
            res.send(comments)
        } catch (error) {
            next(error)
        }
    }

    async createEvent(req, res, next) {
        try {
            let eventBody = req.body
            eventBody.creatorId = req.userInfo.id
            const event = await eventService.createEvent(eventBody)
            res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async editEvent(req, res, next) {
        try {
            const updates = req.body
            const eventId = req.params.eventId
            const userId = req.userInfo.id
            const editedEvent = await eventService.editEvent(eventId, updates, userId)
            res.send(editedEvent)
        } catch (error) {
            next(error)
        }
    }
    async cancelEvent(req, res, next) {
        try {
            const event = await eventService.cancelEvent(req.params.eventId, req.userInfo.id)
            res.send(event)
        } catch (error) {
            next(error)
        }
    }
}