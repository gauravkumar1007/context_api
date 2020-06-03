import { Types } from "../types"

export const saveUser = payload => ({
	type: Types.SAVE_USER,
	payload
})