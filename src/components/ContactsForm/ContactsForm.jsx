import { useState } from 'react';
import s from './ContactsForm.module.css';

export default function ContactsForm({ addContact, dublicateName }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onHandleSubmit = e => {
    e.preventDefault();
    dublicateName(name)
      ? alert(`${name} is already in contacts`)
      : addContact({ name, number });
    setName('');
    setNumber('');
  };

  const onHandleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  return (
    <form className={s.form} onSubmit={onHandleSubmit}>
      <label className={s.label}>
        Name
        <input
          className={s.data}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={onHandleChange}
        />
      </label>
      <label className={s.title}>
        Number
        <input
          className={s.data}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={onHandleChange}
        />
      </label>

      <button className={s.addBtn} type="submit">
        add contact
      </button>
    </form>
  );
}
