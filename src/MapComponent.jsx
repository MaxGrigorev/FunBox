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
		showingInfoWindow: false,
		positionM:67.439192

	};
	render() {
		return (
				<Map google={ this.props.google} zoom={ 14 } onClick={this.onMapClicked} initialCenter={{
            lat: 40.854885,
            lng: -88.081807
          }} onDragend={this.centerMoved}>

					<Marker onClick = {this.onMarkerClick}
					name = {'Current location'}
					draggable={true}
					position={{lat: this.state.positionM, lng: -122.439192}}
					onDragend={this.markerDraggen}
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
			console.log("onMarkerClick", marker.position.lng())
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

	centerMoved(mapProps, map) {
	  console.log("centerMoved", map.center.lng())
	}


	markerDraggen(prop,marker) {
		console.log("markerDraggen", marker.position.lng())
	}
}
export default GoogleApiWrapper({
	apiKey: ('AIzaSyCCMgV6rNeRGouUp7vlhgZMC2n9mzA_Ltc')
})(MapContainer)
