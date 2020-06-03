import React, { createContext, useReducer } from 'react';

import { Types } from "../types"

export default function(state = {}, action = {}) {
	switch(action.type) {
      
      	case Types.SAVE_USER: {

       		const { user={} } = action.payload;
       		let _currentState = { ...state.user, ...user };
        	const newState = {...state, user: _currentState}
        	return newState;
    	}
        
      	case Types.FETCH_DATA:{
            const {uniqueId,dataId,data,error,showLoading,append,showFooterLoading} = action.payload;
            let _currentState = state[uniqueId] || {};
            if(dataId){
                if(append){
                    if(Array.isArray(data)){
                        /* handle when required*/

                    } else {
                        let hasNoMoreData;
                        let newData;
                        if(data){
                            const previousData = _currentState[dataId] && _currentState[dataId][append] ? _currentState[dataId][append]: [];
                            hasNoMoreData = !!(data[append] &&  data[append].length === 0);
                            newData = {...data,[append]:[...previousData,...data[append]]}
                        } else {
                            newData = _currentState[dataId];
                        }
                        _currentState = {..._currentState,
                            [dataId]: {...newData,hasNoMoreData},
                            showLoading,showFooterLoading
                        };

                    }


                } else {
                    _currentState = {..._currentState, [dataId]: data,showLoading,showFooterLoading};
                }
            } else {
                if(append){
                    if(typeof append === "boolean"){
                        if(Array.isArray(data)){
                            const _previousData = _currentState["data"] ||[];
                            _currentState = {
                                data: [..._previousData, ...data],
                                hasNoMoreData:data.length === 0,
                                showFooterLoading
                            }
                        } else {
                            _currentState = {
                                ..._currentState,
                                showFooterLoading
                            }
                        }


                    } else {
                        let hasNoMoreData;
                        let newData;
                        if(data){
                            const previousData = _currentState["data"] && _currentState["data"][append] ? _currentState["data"][append]: [];
                            hasNoMoreData = !!(data[append] &&  data[append].length === 0);
                            newData = {...data,[append]:[...previousData,...data[append]]}
                        } else {
                            newData = _currentState["data"];
                        }
                        _currentState = {..._currentState,
                            ["data"]: {...data,...newData,hasNoMoreData},
                            showLoading,showFooterLoading
                        };
                    }
                } else {
                    const _prevData = _currentState["data"];
                    _currentState = {..._currentState, data:data || _prevData,showLoading,showFooterLoading};
                }
            }
            return {...state,
                [uniqueId]:{..._currentState,error}
            };
        }

        case Types.REMOVE_DATA:{
            const {uniqueId} = action.payload;
            let newState = {...state};
            delete newState[uniqueId];
            return newState;
        }
        
      	default:
        	return state;
    };
}