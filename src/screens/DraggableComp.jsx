import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialContacts = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Alice Johnson' },
  // Add more contacts as needed
];

const DraggableComp = () => {
  const [contacts, setContacts] = useState(initialContacts);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If the item is dropped outside the list
    if (!destination) {
      return;
    }

    // Reorder the list
    const reorderedContacts = Array.from(contacts);

    console.log(">>>>>>>>>>>>>",reorderedContacts)
    const [movedContact] = reorderedContacts.splice(source.index, 1);
    reorderedContacts.splice(destination.index, 0, movedContact);

    setContacts(reorderedContacts);

    // TODO: Send the updated order to the backend
    // fetch('/api/update-contacts-order', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(reorderedContacts),
    // });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="contacts">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ listStyleType: 'none', padding: 0 }}
          >
            {contacts.map((contact, index) => (
              <Draggable key={contact.id} draggableId={contact.id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      userSelect: 'none',
                      padding: '16px',
                      margin: '0 0 8px 0',
                      backgroundColor: '#fff',
                      border: '1px solid #ddd',
                      ...provided.draggableProps.style,
                    }}
                  >
                    {contact.name}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableComp;
