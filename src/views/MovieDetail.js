import React, { useEffect } from "react";
import * as uuid from "uuid";

import Header from "../Header";
import { fetchData, removeData } from "../store/actions/data";
import { timeConvert, getProp } from "../utility";
import WithStoreData from "../components/WithStoreData";

const UniqueId = uuid.v4();

const MovieDetail = (props) => {
	console.log("MovieDetail props :-",props);
	const { enhancedDispatch, dispatch, state, match: {params} } = props;

	useEffect(() => {
		const loadData = () => {
			console.log("MovieDetail loadData");
			const {movieId} = params;
			enhancedDispatch(fetchData({
				uniqueId: UniqueId,
		        method:'GET',
				uri: `/3/movie/${movieId}`
		    }));
		};
	    console.log("MovieDetail mount")
    	loadData();

    	return () => {
			console.log("MovieDetail unmount");
			dispatch(removeData({
	            uniqueId: UniqueId
	        }));
    	};

  	},[]);

	const data = getProp(state, `data.${UniqueId}.data`);
	const {
		title,
		overview,
		poster_path,
		vote_average,
		release_date,
		runtime,
		director="Director", // Unable to find from the api response
		cast=["Actor 1", "Actor 2"]
	} = data || {};

	return <div className="container">
        <Header title="Movie Details"/>
    	<section id="infinite-list" className="wrapper">
    		<div className="movie_poster full_width">
				<img height="200px" src={poster_path} alt={title}/>
			</div>
    		<div className="movie_detail_wrapper full_width">
    			<div style={{marginBottom:5}}>
					<span style={{color:"#4A4A4A",fontSize:16,fontWeight:600}}>{title}</span>
	  				<span style={{color:"#9B9B9B",fontSize:16,marginLeft:5}}>({vote_average})</span>
				</div>
				<div style={{marginBottom:5,color:"#9B9B9B",fontSize:16}}>
					{release_date} | {timeConvert(runtime)} | {director}
				</div>
				<div style={{marginBottom:5,color:"#9B9B9B",fontSize:16}}>
					Cast: {cast.join(", ")}
				</div>
				<p style={{color:"#9B9B9B",fontSize:16}}>Description: {overview}</p>
    		</div>
    	</section>
    </div>
}

export default WithStoreData(MovieDetail);

// class MovieDetail extends React.Component{
//     constructor(props) {
//         super(props);
// 		this.loadData = this.loadData.bind(this);
// 	}

// 	componentDidMount(){
// 		this.loadData()
// 	}

// 	componentWillUnmount(){
//         const {removeData} = this.props;
//         removeData && removeData({
//             uniqueId:UniqueId
//         });
//     }

// 	loadData(){
// 		const {fetchData,match: {params}} = this.props;
// 		const {movieId} = params;
// 		fetchData && fetchData({
// 	        uniqueId: UniqueId,
// 	        method:'GET',
// 			uri: `/3/movie/${movieId}`
// 	    });
// 	}

//     render(){
//     	const {data} = this.props;

//     	if(!data){
//             return null;
//         }

// 		const {
// 			title,
// 			overview,
// 			poster_path,
// 			vote_average,
// 			release_date,
// 			runtime,
// 			director="Director", // Unable to find from the api response
// 			cast=["Actor 1", "Actor 2"]
// 		} = data || {};

// 		return <div className="container">
//             <Header title="Movie Details"/>
//         	<section id="infinite-list" className="wrapper">
//         		<div className="movie_poster full_width">
// 					<img height="200px" src={poster_path} alt={title}/>
// 				</div>
//         		<div className="movie_detail_wrapper full_width">
//         			<div style={{marginBottom:5}}>
// 						<span style={{color:"#4A4A4A",fontSize:16,fontWeight:600}}>{title}</span>
// 		  				<span style={{color:"#9B9B9B",fontSize:16,marginLeft:5}}>({vote_average})</span>
// 					</div>
// 					<div style={{marginBottom:5,color:"#9B9B9B",fontSize:16}}>
// 						{release_date} | {timeConvert(runtime)} | {director}
// 					</div>
// 					<div style={{marginBottom:5,color:"#9B9B9B",fontSize:16}}>
// 						Cast: {cast.join(", ")}
// 					</div>
// 					<p style={{color:"#9B9B9B",fontSize:16}}>Description: {overview}</p>
//         		</div>
//         	</section>
//         </div>
//     }
// }
