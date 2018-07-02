import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import MapContainer from './MapComponent.jsx'

//Перестановка элементов в списке
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);

	result.splice(endIndex, 0, removed);
	//	console.log ('list ',list)
	//	console.log ('result ',result)
	//	console.log ('startIndex ',startIndex)
	//	console.log ('endIndex ',endIndex)

	return result;
};

const grid = 8;

//Стили для списка
const getItemStyle = (isDragging, draggableStyle) => ({
	userSelect: 'none',
	padding: `0 16px`,
	margin: `0 0 ${grid}px 0`,
	height: 56,
	background: isDragging ? 'lightgreen' : 'grey',
	...draggableStyle,
});

//Стили для background списка
const getListStyle = isDraggingOver => ({
	background: isDraggingOver ? 'lightblue' : 'lightgrey',
	padding: 0,
});

class App extends Component {

  constructor(props) {
  	super(props)

  	this.state = {
  		items: [], //Список
  		value: '', //value input
  		mapCenter: {
  			lat: 40.854885,
  			lng: -88.081807
  		}, //начальные координаты центра карты
  		count: 0, //Счетчик - id списка

  	};
  	this.onDragEnd = this.onDragEnd.bind(this); //handler перетаскивания элемента списка
  	this.handleChange = this.handleChange.bind(this); //handler input
  }

  render() {
    return (
		<div className='container'>
			<div className='row1'>
				<div className='list'>
					<input type="text" className='text' value={this.state.value} onKeyPress={this.handleKeyPress} onChange={this.handleChange} placeholder="Введи название точки" />
					<DragDropContext onDragEnd={this.onDragEnd}>
						<Droppable droppableId="droppable">
							{(provided, snapshot) => (
							<div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>

								{(this.state.items.length!==0) && this.state.items.map((item, index) => (
									<Draggable key={item.id} draggableId={item.id} index={index}>
										{(provided, snapshot) => (
										<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle( snapshot.isDragging, provided.draggableProps.style )}>
											<div className="item">
												<div className="item-content">{item.content}</div>
												<button onClick={this.onButtonClick(item.id)} className="btn btn-primary float-right">
													Delete
												</button>
											</div>
										</div>
										)}
									</Draggable>
								))}

								{provided.placeholder}
							</div>
							)}
						</Droppable>
					</DragDropContext>
				</div>

				<MapContainer markers={this.state.items} centr={this.centerChangeMap} markerDrag={this.markerDraggen}/>
			</div>
		</div>
    );
  }

//Обработчик перетаскивания элемента списка
onDragEnd(result) {
	// dropped outside the list
	if (!result.destination) {
		return;
	}

	const items = reorder(
		this.state.items,
		result.source.index,
		result.destination.index
	);

	this.setState({
		items,
	});
}

//Обработчик onKeyPress input (при нажатии Enter)
handleKeyPress = (event) => {

	if (event.key === 'Enter') {
		//console.log('enter press here! ', this.state.items.length)

		let nextItem = {}
		nextItem.id = this.state.count
		nextItem.content = this.state.value
		nextItem.position = this.state.mapCenter
		this.setState({
			count: this.state.count + 1
		})
		//console.log('nextItem ',nextItem)
		this.state.items.push(nextItem)
		this.setState({
			items: this.state.items
		})
		//console.log('this.state.items ',this.state.items)
		this.setState({
			value: ""
		})
	}
}

//Обработчик onChange изменения input
handleChange = (event) => {
	this.setState({
		value: event.target.value
	});
	//console.log('handleChange')

}

//Обработчик нажатия кнопки удаления элемента списка
onButtonClick = (butid) => (event) => {
	//this.setState({value: event.target.value});
	//console.log('onButtonClick',event.target)
	//console.log('onButtonClick',butid)
	let index = this.state.items.findIndex(el => el.id === butid); //ищем в списке индекс элемента по id
	this.state.items.splice(index, 1) //удаляем
	this.setState({
		items: this.state.items
	})

}

//Обработчик callbackа из MapComponent- обновляем значение координат центра карты
centerChangeMap = (mapProps, map) => {
	this.setState({
		mapCenter: {
			lat: map.center.lat(),
			lng: map.center.lng()
		}
	});
	//console.log("centerMoved ", this.state.mapCenter)

}

//Обработчик callbackа из MapComponent обновляем значение координат у перетаскиваемого на карте элемента
markerDraggen = (prop, marker) => {
	//console.log("markerDraggen", {lat:marker.position.lat(),lng:marker.position.lng()})
	//console.log("markerDraggen", prop)
	//console.log("this.state.items[prop.id]", this.state.items)

	let index = this.state.items.findIndex(el => el.id === prop.id);
	this.state.items[index].position = {
		lat: marker.position.lat(),
		lng: marker.position.lng()
	}
	this.setState({
		items: this.state.items
	})
}

}

export default App
export default getListStyle
