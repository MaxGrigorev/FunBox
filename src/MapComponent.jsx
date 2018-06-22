import React, {
	Component
} from 'react';
import {
	Map,
	InfoWindow,
	Marker,
	GoogleApiWrapper
} from 'google-maps-react';
export class MapContainer extends Component {
	state = {
		activeMarker: {},
		selectedPlace: {},
		showingInfoWindow: false
	};
	render() {
		return (
				<Map google={ this.props.google} zoom={ 14 } onClick={this.onMapClicked}>

					<Marker onClick = {this.onMarkerClick}
					name = {'Current location'}
					/>

				<InfoWindow
					  marker={this.state.activeMarker}
					  onClose={this.onInfoWindowClose}
					  visible={this.state.showingInfoWindow}>
					  <div>
						<h1>name</h1>
					  </div>
				</InfoWindow>
				</Map>


		);
	}
	onMarkerClick = (props, marker) => {
			console.log("onMarkerClick")
			this.setState({
				activeMarker: marker,
				selectedPlace: props,
				showingInfoWindow: true

			});
	}
	onInfoWindowClose = () => this.setState({
		activeMarker: null,
		showingInfoWindow: false
	});
	onMapClicked = () => {
		if (this.state.showingInfoWindow) this.setState({
			activeMarker: null,
			showingInfoWindow: false
		});
	};
}
export default GoogleApiWrapper({
	apiKey: ('AIzaSyCCMgV6rNeRGouUp7vlhgZMC2n9mzA_Ltc')
})(MapContainer)
