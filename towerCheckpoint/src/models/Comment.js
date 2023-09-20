import { Schema } from "mongoose";



export const CommentSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, ref: 'account', required: true },
    eventId: { type: Schema.Types.ObjectId, ref: 'event', required: true },
    body: { type: String, minLength: 5, maxLength: 200, required: true }
}, { toJSON: { virtuals: true } })

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})