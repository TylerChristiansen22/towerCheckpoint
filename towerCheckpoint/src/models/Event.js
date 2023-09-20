import { Schema } from "mongoose";



export const EventSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    name: { type: String, required: true, maxLength: 50 },
    description: { type: String, required: true, maxLength: 1000 },
    coverImg: { type: String, required: true, maxLength: 1000 },
    location: { type: String, required: true, maxLength: 50 },
    capacity: { type: Number, required: true, min: 1, max: 1000 },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, default: false },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'] }
}, { timestamps: true, toJSON: { virtuals: true } })


EventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})

EventSchema.virtual('ticketCount', {
    localField: '_id',
    foreignField: 'eventId',
    ref: 'Ticket',
    count: true
})