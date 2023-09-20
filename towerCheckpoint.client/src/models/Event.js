

export class Event{
    constructor(data){
        this.id = data.id
        this.creatorId = data.creatorId
        this.creator = data.creator
        this.description = data.description
        this.coverImg = data.coverImg
        this.location = data.location
        this.capacity = data.capacity
        this.startDate = new Date(data.startDate).toLocaleDateString()
        this.isCanceled = data.isCanceled
        this.type = data.type
        this.ticketCount = data.ticketCount
        this.createdAt = data.createdAt
        this.updatedAt = data.updatedAt
    }
}