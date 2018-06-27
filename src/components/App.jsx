import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import MapContainer from './MapComponent.jsx'
//import './styles.css';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
	console.log ('list ',list)
	console.log ('result ',result)
	console.log ('startIndex ',startIndex)
	console.log ('endIndex ',endIndex)
  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
});

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      	items: [],//getItems(10),
		value: '',//value input
		mapCenter: {lat: 40.854885,lng: -88.081807},
		count:0,

    };
    this.onDragEnd = this.onDragEnd.bind(this);
	this.handleChange = this.handleChange.bind(this);//handler input
  }

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


  render() {
    return (
	<div className='container'>
	<div className='list'>
	<input type="text" value={this.state.value} onKeyPress={this.handleKeyPress} onChange={this.handleChange}/>
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >

              {this.state.items.length && this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}

						<button onClick={this.onButtonClick(item.id)} className = "">
								Delete
							</button>

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
    );
  }


//input
handleKeyPress = (event) => {

  if(event.key === 'Enter'){
    console.log('enter press here! ',this.state.items.length)

	let nextItem={}
	//nextItem.id=this.state.items.length
	nextItem.id=this.state.count
	nextItem.content=this.state.value
	nextItem.position=this.state.mapCenter
	 this.setState({count: this.state.count+1})
	console.log('nextItem ',nextItem)
	//this.state.items[this.state.items.length]=nextItem
	this.state.items.push(nextItem)
	 this.setState({items: this.state.items})
	console.log('this.state.items ',this.state.items)
  }
}

handleChange=(event)=> {
    this.setState({value: event.target.value});
	console.log('handleChange')

  }

onButtonClick=(butid)=>(event)=> {
    //this.setState({value: event.target.value});
	console.log('onButtonClick',event.target)
	console.log('onButtonClick',butid)
	let index = this.state.items.findIndex(el => el.id === butid);
	this.state.items.splice(index,1)
	this.setState({items: this.state.items})

  }

//callback из MapComponent
centerChangeMap=(mapProps, map)=>{
    this.setState({
		mapCenter:
			{
				lat: map.center.lat(),
				lng: map.center.lng()
			}
	});
	console.log("centerMoved ", this.state.mapCenter)

  }

markerDraggen=(prop,marker)=> {
		console.log("markerDraggen", {lat:marker.position.lat(),lng:marker.position.lng()})
		console.log("markerDraggen", prop)
	console.log("this.state.items[prop.id]", this.state.items)
	let index = this.state.items.findIndex(el => el.id === prop.id);
		this.state.items[index].position={lat:marker.position.lat(),lng:marker.position.lng()}
		this.setState({items: this.state.items})
	}

}

export default App
// Put the thing into the DOM!
//ReactDOM.render(<App />, document.getElementById('root'));

