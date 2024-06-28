import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialContacts = [
  { id: '1', name: 'John Doe' , number :"03100674640"},
  { id: '2', name: 'Jane Smith' ,number :"03136400456"},
  { id: '3', name: 'Alice Johnson' ,number :"03014865240"},
  { id: '4', name: 'Alice 1',number :"03090674640" },
  { id: '5', name: 'Alice 2' ,number :"0569561255"},
  { id: '6', name: 'Alice 3' ,number :"5165120355"},
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
   <div className='px-16 py-10   ml-10 ' >
     <DragDropContext  onDragEnd={onDragEnd}>
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
                  <div
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
                    <p >{contact.name}</p>
                    <p>{contact.number}</p>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
   </div>
  );
};

export default DraggableComp;
