import React from "react";

import WithStoreData from "../WithStoreData";

const FullPageLoader = (props) => {
    const { dispatch, state={} } = props;
    
	const { showFullPageLoading, opacity } = state.component || {};
	console.log("FullPageLoader props :-",state);
    
    if(showFullPageLoading){
        return <div
            style={{
                display: 'flex',
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999999999, /*increased because of fresh chat icon*/
                backgroundColor: opacity ? "rgba(239,239,239,1)" : "rgba(239,239,239,0.65)",
            }}
        > 
           <div className="global_loader"/>
        </div>
    }
    return null;
}

export default WithStoreData(FullPageLoader);