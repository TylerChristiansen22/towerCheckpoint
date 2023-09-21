

export class Comment{
    constructor(data){
        this.id = data.id
        this.creatorId = data.creatorId
        this.eventId = data.eventId
        this.body = data.body
        this.creator = data.creator
        this.createdAt = data.createdAt
        this.updatedAt = data.updatedAt
    }
}