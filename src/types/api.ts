interface CreatePollResponse {
    success: boolean,
    pollId: string,
}

interface WebsocketPollResponse {
    pollOptionId: string,
    votes: number
}