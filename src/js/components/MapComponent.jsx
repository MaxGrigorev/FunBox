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
		activeMarker: {},//маркер по которому произошел клик (для InfoWindow)
		//selectedPlace: {},
		activeMarkerName: '',//имя активного маркера
		showingInfoWindow: false,//Условие показа InfoWindow

	};
	render() {
		let {
			markers,//массив объектов маркеров переданный из App
			centr,//callback в App при изменении центра карты
			markerDrag//callback в App при завершении перетаскивания маркера
		} = this.props

		let polyline = []//Массив из координат элементов списка

		if (markers.length !== 0) {
			polyline = markers.map((item, index) => (item.position))
		}

		//Собираем список маркеров для рендера
		let markerList = null

		if (markers.length !== 0) {
			markerList = markers.map((item, index) => (
				< Marker
					key={ item.id }
					id={ item.id }
					onClick={ this.onMarkerClick }
					name={ item.content }
					draggable={ true }
					position={ item.position }
					onDragend={ markerDrag } />
			)
			)
		}

		return (
			<div className='map'>
				<Map
					google={ this.props.google}
					zoom={ 8 }
					onClick={this.onMapClicked}
					initialCenter={{ lat: 40.854885, lng: -88.081807 }}
					onDragend={centr}>

				{markerList}

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

	//Обработчик нажатия на маркер (показываем infoWindow)
	onMarkerClick = (props, marker) => {
		//console.log("onMarkerClick", props)
		this.setState({
			activeMarker: marker,
			activeMarkerName: props.name,
			//selectedPlace: props,
			showingInfoWindow: true //(показываем infoWindow)

		});
	}

	//Обработчик закрытия infoWindow
	onInfoWindowClose = () => this.setState({
		activeMarker: null,
		showingInfoWindow: false,
	});

	//Обработчик нажатия на карту (закрываем infoWindow если открыт)
	onMapClicked = () => {
		if (this.state.showingInfoWindow) this.setState({
			activeMarker: null,
			showingInfoWindow: false
		});
	};
}


export default GoogleApiWrapper({
	apiKey: ('AIzaSyCCMgV6rNeRGouUp7vlhgZMC2n9mzA_Ltc')//ключ к API Google Maps
})(MapContainer)
