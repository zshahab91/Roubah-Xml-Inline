import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

class MapViewer extends Component{
	constructor(props){
		super(props);
		this.state={
			zoom: 15,
			lat: 26.579929,
			lng: 59.636452
		};
		this.getCurrentLocationUser = this.getCurrentLocationUser.bind(this);
	}
	componentWillMount(){
		this.getCurrentLocationUser();
	}
	getCurrentLocationUser(){
		navigator.geolocation.getCurrentPosition((location) =>{
			this.setState({lat: location.coords.latitude});
			this.setState({lng: location.coords.longitude});

		});
	}
	render(){
		const center = { lat: this.state.lat, lng: this.state.lng };
		return(

			<div>
				<h1>map page</h1>
				<div className='google-map'>
					<GoogleMapReact
						defaultCenter={ center  }
						defaultZoom={ this.state.zoom }>
					</GoogleMapReact>
				</div>
			</div>
		);
	}
}
export default MapViewer;