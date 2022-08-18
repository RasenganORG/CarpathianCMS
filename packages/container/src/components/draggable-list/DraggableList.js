import React, { Component, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import BlockFrame from '../blocks/edit/BlockFrame';
import Paragraph from '../widgets-locally/Paragraph';


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  console.log("Reorder",list)
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  border:  isDragging ? '15px solid #74b6ec' : '15px solid white',
  borderRadius: '10px',

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "#dbecff" : "#f5f9ff",
  padding: grid,
  width: '100%'
});

const DraggableList = ({startEditBlock, onDeleteBlock,fields}) => {
  const [items,setItems] = useState(fields)
  console.log(items)

  useEffect(()=> {
    setItems(fields)
  },[fields])

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    console.log("Result",result)

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    console.log("final", newItems)

    setItems(newItems)
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable block list">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items && items.map((field, index) => (
                <Draggable key={field.name[0]} draggableId={field.name[0]} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                      )}
                    >
                      <BlockFrame
                        key={field.name[0]}
                        id={field.name[0]}
                        name={field.value.metadata.title}
                        onClickEdit={startEditBlock}
                        onClickDelete={onDeleteBlock}
                      >
                        <Paragraph
                          content={field.value.data}
                          isEdit={true}
                          key={field.name[0]}
                          id={field.name[0]} />
                      </BlockFrame>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );

}

export default DraggableList