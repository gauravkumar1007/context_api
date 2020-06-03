import React from "react";
import * as uuid from "uuid";

import Header from "../Header";
import { fetchData, removeData } from "../store/actions/data";
import { showToast, showPopup, hidePopup } from "../store/actions/component";
import MovieCard from "../components/MovieCard";
// import InfiniteScroll from "../components/InfiniteScroll";
import { debounce } from "../utility";
import { Store } from "../store";
import WithStoreData from "../components/WithStoreData";

const UniqueId = uuid.v4();

class Home extends React.Component{

	constructor(props) {
        super(props);
		this.onInputChange = this.onInputChange.bind(this);
		this.loadData = this.loadData.bind(this);
		this.loadMore = this.loadMore.bind(this);
		this.onCardTap = this.onCardTap.bind(this);
		this.onToastPress = this.onToastPress.bind(this);
		this.onPopupPress = this.onPopupPress.bind(this);
		this.page = 1;
		this.query = "";
	}

	componentDidMount(){
		this.loadData(false)
	}

	componentWillUnmount(){
		let { dispatch } = this.props;
        dispatch(removeData({
            uniqueId: UniqueId
        }));
    }
    
	loadData(append){
		let { enhancedDispatch, dispatch } = this.props;
		let uri = "/3/movie/upcoming";
		let ownLoading = false;
		if(this.query){
			ownLoading = true;
			uri = "/3/search/movie";
		}

		enhancedDispatch(fetchData({
			uniqueId: UniqueId,
			ownLoading,
	        method: 'GET',
	        responseDataId: "results",
			uri: uri,
			params:{
				page: this.page,
				query: this.query
			},
	        append:append,
	    }));
	}

	loadMore(){
		if(this.props.dataProps.hasNoMoreData){
            return;
        }
		this.page += 1;
		this.loadData(true);
	}

	onInputChange = debounce((e)=>{
		const input = document.getElementById("search_query");
		this.query = input.value;
		this.loadData()
	},50)

	onCardTap(e){
		if(e && e.target && e.target.parentElement && e.target.parentElement.dataset){
			const {movie} = e.target.parentElement.dataset;
			if(movie){
				this.props.history.push(`/movie/${movie}`);
			}
		}
	}

	onToastPress(){
		const { dispatch } = this.props;
		dispatch(showToast({text:"Something went wrong!!"}))
	}

	onPopupPress(){
		const { dispatch } = this.props;
		dispatch(showPopup({
            renderComponent:()=>{ return(<div style={{backgroundColor:"#fff",borderRadius:4,padding:10,maxWidth:450}}>
            	<div>
            		<h3>What is Lorem Ipsum?</h3>
            	</div>
            	<div>
            		<h5>
            		Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            		Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            		when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
            		It has survived not only five centuries, but also the leap into electronic typesetting, 
            		remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
            		and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            		</h5>
            	</div>
            	<div>
            		<button onClick={()=> dispatch(hidePopup({}))}>
            			ok
            		</button>
            	</div>
            </div>);},
            hideClose: true,
            backdropClose: true,
            showBackdrop: true,
            popupContainerStyle: {
                justifyContent: "center"
            }
        }));
	}

	render(){
		console.log("Home props :-",this.props)
		const { dataProps={}, state={} } = this.props;
		const data = state.data && state.data[UniqueId] && state.data[UniqueId]["data"];
		if(!data){
            return null;
        }

		let list = data || [];
		list = list.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
		const showFooter = !dataProps.hasNoMoreData;

		return <div className="container">
			<Header 
				onInputChange={this.onInputChange} 
				onToastPress={this.onToastPress} 
				onPopupPress={this.onPopupPress}
				search
			/>
			<div onClick={this.onCardTap} id="infinite-list" className="wrapper view_center">
				{
					list.map((item,i)=> {
						return <MovieCard key={item.id} {...item}/>
					})
				}
			</div>
			{	
				showFooter && <div className="view_center footer">
					{dataProps.showFooterLoading ? <span className="footer_loading">Loading...</span> : <div className="load_more" onClick={this.loadMore}>Load More</div>}
				</div>
			}
		</div>
	}
}

// Home.contextType = Store;

export default WithStoreData(Home);