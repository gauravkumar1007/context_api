import axios from 'axios';

import { Types } from "../types"
import networkFetch from "../network";
// import { useStore, Store } from "../index.js";
import { fullPageLoader } from "../actions/component";
import { getProp } from "../../utility";

export const applyMiddleware = dispatch => action => {

	switch (action.type) {
		case Types.FETCH_DATA: {
			const {onSuccessRedirect,onSuccess,ownLoading,onError,append,uniqueId,responseDataId} = action.payload;
            console.log("applyMiddleware")
            if(ownLoading || append){
                const extraProps = {};
                if(append){
                    extraProps.showFooterLoading = true;
                } else {
                    extraProps.showLoading = true;
                }
                dispatch({
                    ...action,
                    payload: {...action.payload,...extraProps}
                });
            } else {
                dispatch(fullPageLoader({showFullPageLoading: true, opacity: 1}));
            }

			return networkFetch({
                ...action.payload
            }).then(response => {
            	console.log("Middleware data :-")
                let _data = JSON.parse(response);

            	if(ownLoading){
                    /* will be handled with setting data in reducer */
                } else {
                    dispatch(fullPageLoader({showFullPageLoading: false, opacity: 1}));
                }

                if(onSuccess && typeof onSuccess === "function"){
                    onSuccess(_data);
                }
                
            	return dispatch({
            		...action,
                    payload: {...action.payload, data: responseDataId ? getProp(_data,responseDataId)  : _data,showLoading:false,showFooterLoading:false}
                });
            }).catch(e => {
            	console.log("Network err :-",e)
            });        	
			break;
		}
		default: {

		}
	}
}
