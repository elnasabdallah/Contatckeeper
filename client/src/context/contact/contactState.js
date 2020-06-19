import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import ContactContext from './contatctContext';
import contactReducer from './contactReducer';

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'jili johnson',
        email: 'jilil@gmail.com',
        phone: '111-211-222',
        type: 'personal'
      },
      {
        id: 2,
        name: 'john johnson',
        email: 'john@gmail.com',
        phone: '132-211-222',
        type: 'professional'
      },
      {
        id: 3,
        name: 'Nasir Abdullahi',
        email: 'nas@gmail.com',
        phone: '101-211-222',
        type: 'private'
      }
    ],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //the actions

  //Add contact
  const addContact = contact => {
    contact.id = uuid();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };
  //delete contatc
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };
  //set current contatc,
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  //clear currrent contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  //update contact
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };
  //filter contacts
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };
  //clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
