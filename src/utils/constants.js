
export const BASE_URL=location.hostname=="localhost" ? import.meta.env.VITE_API_URL : "/api"

//["ignored", "interested"];
export const CONNECTION_REQUESTS = {
    ACCEPTED:"accepted",
    REJECTED:"rejected",
    INTERESTED:"interested",
    IGNORED:"ignored"
}