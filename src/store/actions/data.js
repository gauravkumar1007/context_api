import { Types } from "../types"

export const fetchData = payload => ({
    type: Types.FETCH_DATA,
    payload
});

export const removeData = payload => ({
    type: Types.REMOVE_DATA,
    payload
});

export const saveUser = payload => ({
	type: Types.SAVE_USER,
	payload
})