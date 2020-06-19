import React from 'react';
import Contacts from './../contacts/Contacts';
import ConctactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';

const Home = () => {
  return (
    <div className="grid-2">
      {/**contact from */}
      <div>
        <ConctactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
