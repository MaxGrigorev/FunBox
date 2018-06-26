import React, {
	Component
} from 'react';
import {
	Map,
	InfoWindow,
	Marker,
	GoogleApiWrapper,
	Polyline,
} from 'google-maps-react';
export class MapContainer extends Component {
	state = {
		activeMarker: {},
		selectedPlace: {},
		activeMarkerName:'',
		showingInfoWindow: false,
		positionM:67.439192,

	};
	render() {
		let {markers,centr,markerDrag}=this.props

		let polyline=[]

		if (markers.length!==0){
//			polyline = [
//    { lat: 37.789411, lng: -122.422116 },
//    { lat: 37.785757, lng: -122.421333 },
//    { lat: 37.789352, lng: -122.415346 }
//  ];
			polyline=markers.map((item, index) => (item.position))
		}

		let it=null
		if (markers.length!==0){it=markers.map((item, index) => (<Marker key={item.id}
		id={item.id}
			onClick = {this.onMarkerClick}
			name = {item.content}
			draggable={true}
			position={item.position}
			onDragend={markerDrag}
			/>))}
//		<InfoWindow
//                      marker={this.state.activeMarker}
//                      onClose={this.onInfoWindowClose}
//                      visible={this.state.showingInfoWindow}>
//                      <div>
//                        <h1>name</h1>
//                      </div>
//                </InfoWindow>



		console.log('markers', markers)

		return (<div className='map'>
				<Map google={ this.props.google} zoom={ 14 } onClick={this.onMapClicked} initialCenter={{
            lat: 40.854885,
            lng: -88.081807
          }} onDragend={centr}>




					{it}

				<InfoWindow
                      marker={this.state.activeMarker}
                      onClose={this.onInfoWindowClose}
                      visible={this.state.showingInfoWindow}>
                      <div>
                        <h1>{this.state.activeMarkerName}</h1>
                      </div>
                </InfoWindow>

				<Polyline
        fillColor="#0000FF"
        fillOpacity={0.35}
        path={polyline}
        strokeColor="#0000FF"
        strokeOpacity={0.8}
        strokeWeight={2}
      />

				</Map>
			</div>


		);
	}
	onMarkerClick = (props, marker) => {
			console.log("onMarkerClick", props)
			this.setState({
				activeMarker: marker,
				activeMarkerName:props.name,
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



}
export default GoogleApiWrapper({
	apiKey: ('AIzaSyCCMgV6rNeRGouUp7vlhgZMC2n9mzA_Ltc')
})(MapContainer)
