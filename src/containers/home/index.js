import React,{ Component } from "react";
import { connect } from "react-redux";
import {getDataInline} from "../../modules/actions/dataInline";
import renderHTML from "react-render-html";
import validateForm from "../../modules/services/validation";
// import MapViewer from '../map'




const mapStateToProps = ({ state }) => ({
	data: state
});

const mapDispatchToProps = dispatch => {
	return {
		getDataDispatch : (data) => {
			return dispatch(getDataInline(data));
		}
	};
};

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
			typeApi: "image",
			isHeader: false,
			isForm: false,
			isValidate: false,
			path: null,
			rate: 0,
			fileImage: null
		};

		this.getDataFunc = this.getDataFunc.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.sendPath = this.sendPath.bind(this);
		this.handleChangeApi = this.handleChangeApi.bind(this);
	}

	handleChangeApi(event){
		this.setState({typeApi: event.target.value});
	}
	getDataFunc(event) {
		event.preventDefault();
		this.props.getDataDispatch(this.state.typeApi).then(
			res => {
				let dataHtml = res.data.innerHTML;
				this.setState({data: dataHtml});
				this.setState({isHeader: dataHtml.includes("<header")});
				this.setState({isForm: dataHtml.includes("<input") || document.getElementsByClassName("rating").length !== 0});
				let btn = document.getElementsByTagName("button");
				let btnStar = document.getElementsByClassName("star-input");
				let btnUploadImage = document.getElementsByClassName("uploader");

				for( let i=0, max= btn.length; i< max;i++){
					btn[i].addEventListener("click", (e) => { this.sendPath(e,btn[i].getAttribute("href"),btn[i].getAttribute("validate")); }, false);
				}
				for( let i=0, max= btnStar.length; i< max;i++){
					btnStar[i].addEventListener("click", (e) => { this.setState({rate: e.target.value}); }, false);
				}

			}
		);
	}
	sendPath(e,href,isValidate){
		this.setState({
			path: href,
			isValidate: isValidate
		});
	}
	handleSubmit(event,) {
		event.preventDefault();
		let obj ={};
		let sendForm = false;
		let div_ele=document.getElementById("form").childNodes;
		for (let i=0, max=div_ele.length; i < max; i++) {
			if(div_ele[i].getAttribute("isValidate")){
				sendForm = validateForm(div_ele[i].getAttribute("field"),div_ele[i].value);
			}
			if(div_ele[i].getAttribute("field") !== null){
				if(div_ele[i].getAttribute("field") === "score"){
					obj[div_ele[i].getAttribute("field")] = this.state.rate;
				}else{
					obj[div_ele[i].getAttribute("field")] = div_ele[i].value;
				}

			}
			let checking = document.getElementById(div_ele[i].getAttribute("field"));
			if(checking !== null){
				obj[div_ele[i].getAttribute("field")] = checking.checked;
			}
		}
		if(this.state.isValidate) {
			if(sendForm){
				this.props.history.push(this.state.path);
			}
		}else{
			this.props.history.push(this.state.path);
		}

	}

	render() {
		return (
			<div className="bodyContent">
				{/*<MapViewer lat="123258963" lng="654"></MapViewer>*/}
				<div>
					<div>
						<form onSubmit={this.getDataFunc}>
							<input type="text" value={this.state.typeApi} name="typeApi" onChange={this.handleChangeApi} onClick={() => {this.setState({typeApi: ""});}} />
							<input type="submit" value="Submit" className="btn btn-info" />
						</form>
					</div>
					{this.state.data !== null ?
						<div>
							{!this.state.isHeader ?
								<header className="header">تیتر پیش فرض</header>
								: ""}
							<br/>
							{!this.state.isForm ? renderHTML(this.state.data):
								<form onSubmit={this.handleSubmit} id="form">
									{renderHTML(this.state.data)}
								</form>
							}
						</div>
						: ""}
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
