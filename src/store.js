import React, {createContext, useReducer} from 'react';

const initialState = {user: {name:"Sonu"}};
const Store = createContext(initialState);
const { Provider } = Store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    console.log("StateProvider action:-",action);
    switch(action.type) {
      case 'SET_USER':
       const { data } = action.payload;
        const newState = {...state, ...data} // do something with the action
        return newState;
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { Store, StateProvider }