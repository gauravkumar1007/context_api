import { Types } from "../types"

const createSession = payload => ({
    type: Types.CREATE_SESSION,
    payload
});