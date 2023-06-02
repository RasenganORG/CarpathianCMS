import React, { Component, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import BlockFrame from '../blocks/editBlock/BlockFrame';
import ParagraphBlock from '../widgetsLocally/Paragraph/ParagraphBlock';
import PropTypes from 'prop-types';
import ImageBlock from '../widgetsLocally/Image/ImageBlock';
import ListBlock from '../widgetsLocally/List/ListBlock';
import ImagesBlock from '../widgetsLocally/Images/ImagesBlock';


// reorders items
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

//create the style of an item
const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  margin: `0 0 ${grid}px 0`,

  // change background colour when dragging
  border: isDragging ? '15px solid #74b6ec' : '15px solid white',
  borderRadius: '10px',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? '#dbecff' : '#f5f9ff',
  padding: grid,
  width: '100%',
});

DraggableList.propTypes = {
  startEditBlock: PropTypes.func,
  onDeleteBlock: PropTypes.func,
  fields: PropTypes.array,
  updateBlocksPlaces: PropTypes.func,
};

export default function DraggableList({ startEditBlock, onDeleteBlock, fields, updateBlocksPlaces, onFormFinish }) {
  const [items, setItems] = useState(fields);

  useEffect(() => {
    setItems(fields);
  }, [fields]);

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index,
    );

    //updates the place value of every block with the new place
    let updatedPlacesNewItems = [];
    for (let index in newItems) {
      let copy = JSON.parse(JSON.stringify(newItems[index]));
      copy.value.metadata.place = parseInt(index) + 1;
      updatedPlacesNewItems.push(copy);
    }

    updateBlocksPlaces(updatedPlacesNewItems);
    setItems(updatedPlacesNewItems);
  };


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='droppable block list'>
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
                      {field.value.metadata.type === 'paragraph' ?
                        <ParagraphBlock
                          content={field.value.data}
                          isEdit={true}
                          key={field.name[0]}
                          id={field.name[0]} /> : null}
                      {field.value.metadata.type === 'image' ?
                        <ImageBlock
                          content={field.value.data}
                          isEdit={true}
                          key={field.name[0]}
                          id={field.name[0]} /> : null}
                      {field.value.metadata.type === 'list' ?
                        <ListBlock
                          content={field.value.data}
                          isEdit={true}
                          key={field.name[0]}
                          id={field.name[0]} /> : null}
                      {field.value.metadata.type === 'images' ?
                        <ImagesBlock
                          content={field.value.data}
                          isEdit={true}
                          key={field.name[0]}
                          id={field.name[0]} /> : null}
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

