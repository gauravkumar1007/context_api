import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

import { applyMiddleware } from "./middleware";
import { getProp, combineReducers } from "../utility";
import { reducer } from "./reducer";

const initialState = {};

export const Store = createContext(initialState);

export const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer(combineReducers(reducer), initialState);

  const enhancedDispatch = applyMiddleware(dispatch);
  return <Store.Provider value={{ state, enhancedDispatch, dispatch }}>{children}</Store.Provider>;
};

export const useStore = (key) => {
  const _store = useContext(Store);
  if(key){
    return getProp(_store, key, _store)
  }
  return _store;  
}


StateProvider.propTypes = {
  /**
   * @return {React.Node}
   */
  children: PropTypes.node.isRequired
};