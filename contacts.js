const fs = require('fs').promises;
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, './db/contacts.json');

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    const res = JSON.parse(contacts);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async contactId => {
  try {
    const res = await listContacts();
    return res.find(contact => String(contact.id) === contactId);
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async contactId => {
  try {
    const res = await listContacts();
    const newArr = res.filter(contact => String(contact.id) !== contactId);
    const newContacts = JSON.stringify(newArr);
    await fs.writeFile(contactsPath, newContacts);
    return removeContact;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const res = await listContacts();
    const newContact = { id: v4(), name, email, phone };
    const newContacts = JSON.stringify([...res, newContact]);
    await fs.writeFile(contactsPath, newContacts);
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
