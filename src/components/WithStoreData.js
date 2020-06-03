import React from "react";

import { useStore } from '../store/index.js';

export default (Component, filter) => {
    
    const WithStoreData = (props={}) => {

        const state = useStore(filter) || {};
        const _props = {...props, ...state};
        return <Component
            {..._props}
        />
    }

    return WithStoreData;
}