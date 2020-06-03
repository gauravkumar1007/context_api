import { Types } from "../types";

export const fullPageLoader = payload => ({
    type: Types.FULL_PAGE_LOADER,
    payload
});

export const showToast = payload => ({
    type: Types.SHOW_TOAST,
    payload
});

export const hideToast = payload => ({
    type: Types.HIDE_TOAST,
    payload
});

export const showPopup = payload => ({
    type: Types.SHOW_POPUP,
    payload
});

export const hidePopup = payload => ({
    type: Types.HIDE_POPUP,
    payload
});