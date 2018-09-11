import React, { Component } from "react";
import { connect } from "react-redux";
import {getDataInlineList} from "../../modules/actions/dataInline";
import renderHTML from "react-render-html";


const mapStateToProps = ({ state }) => ({
	data: state
});

const mapDispatchToProps = dispatch => {
	return {
		getDataListDispatch : (data) => {
			return dispatch(getDataInlineList(data));
		}
	};
};
class List extends Component{
	constructor(props){
		super(props);
		this.state = {
			list: null,
			isHeader: false,
			token: "1",
			path:"categories",
			loadingState: false,
			oldData:null
		};
		this.scrollingFun = this.scrollingFun.bind(this);
	}
	componentWillMount(){
		this.loadMoreItems();
	}

	scrollingFun(){
		if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >=this.refs.iScroll.scrollHeight){
			if(this.state.token !== ""){
				this.loadMoreItems();
			}
		}
	}


	loadMoreItems() {
		this.setState({ loadingState: true });
		let data = {
			token : this.state.token,
			path: this.state.path,
			oldData: this.state.oldData
		};
		setTimeout(() => {
			this.props.getDataListDispatch(data).then(
				res=>{
					let dataHtml = res.data.innerHTML;
					this.setState({
						list: dataHtml,
						isHeader: dataHtml.includes("<header")
					});

					if(this.state.list !== null){
						this.setState({
							token: res.attr.token,
							path: res.attr.path,
							oldData: res.xml,
							loadingState: false
						});
					}

				}
			);
		}, 2000);
	}
	render(){
		return(
			<div ref="iScroll" onScroll={this.scrollingFun} style={{ height: "1000px", overflowY: "auto",overflowX: "hidden" }}>
				{this.state.list !== null ?
					<div >
						<div>
							{!this.state.isHeader ?
								<header className="header">تیتر پیش فرض</header>
								: ""}
							{renderHTML(this.state.list)}
						</div>
						{this.state.loadingState ? <p className="loading"> loading More Items..</p> : ""}

					</div>
					: ""}
			</div>
		);
	}


}
export default connect(mapStateToProps,mapDispatchToProps)(List);
