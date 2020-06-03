import React from "react";

import { hideToast } from "../store/actions/component";
import WithStoreData from "./WithStoreData";

const Toast = (props) => {
	const { dispatch, state={} } = props;
	const { duration, showToast, text, style, textStyle } = state.component || {};
	console.log("Toast props :-",props);

	const autoHide = () => {
		setTimeout( _=> {
            dispatch(hideToast());
        }, 5000);
	}

	if(showToast){
		autoHide();
		return <div className="toast">
			<div className="toast_text_wrapper">
				<span>{text}</span>
			</div>
		</div>
	}
	return null
}

export default WithStoreData(Toast);