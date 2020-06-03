import React from "react";

import { hidePopup } from "../store/actions/component";
import WithStoreData from "./WithStoreData";

const Popup = (props) => {
	const { dispatch, state={} } = props;
	const { 
		renderComponent,
		hideClose,
		popupContainerStyle = {},
		backdropClose,
		showBackdrop 
	} = state.component && state.component.popupState || {};
	console.log("Popup props :-",props);

	if (!renderComponent) {
        return null;
    }

    const onBackdropClick = (event) => {
    	if(backdropClose){
    		dispatch(hidePopup({}));
    		event.stopPropagation();
    	}
    }

    popupContainerStyle.height = "fit-content";
    if(showBackdrop){
    	popupContainerStyle.height = "auto";
    }
    return <div className="modal" style={popupContainerStyle}>
        {renderComponent({hidePopup})}
    </div>
}

export default WithStoreData(Popup);

const style = {
    container:{
        position:"absolute",
        top:0,
        right:0,
        bottom:0,
        left:0,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"rgba(0,0,0,0.7)"
    },
};