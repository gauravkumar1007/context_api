import { Types } from "../types"

export default function (state = {}, action = {}) {

    switch (action.type){

        case Types.FULL_PAGE_LOADER: {
            const { showFullPageLoading, opacity } = action.payload;
            return {
                ...state, 
                showFullPageLoading, 
                opacity
            }
        }

        case Types.SHOW_TOAST: {
            const { duration, text, style, textStyle } = action.payload;
            return {
                ...state,
                duration, 
                text, 
                style, 
                textStyle, 
                showToast: true
            }
        }

        case Types.HIDE_TOAST: {
            return {
                ...state,
                text: null, 
                style: null, 
                textStyle: null,
                showToast: false,
                duration: null
            }
        }

        case Types.SHOW_POPUP: {
            const {renderComponent,hideClose,backdropClose,showBackdrop,popupContainerStyle} = action.payload;
            const popupState = state["popupState"] || {};
            return {
                ...state,
                popupState: {
                    ...popupState, 
                    renderComponent,
                    hideClose,
                    backdropClose,
                    showBackdrop,
                    popupContainerStyle
                }

            };
        }

        case Types.HIDE_POPUP:{
            const popupState = state["popupState"] || {};
            return {
                ...state,
                popupState: {
                    ...popupState, 
                    renderComponent: null, 
                    hideClose: undefined, 
                    backdropClose: undefined, 
                    showBackdrop: undefined, 
                    popupContainerStyle: undefined 
                }
            };
        }

        default:
            return state
    }
}