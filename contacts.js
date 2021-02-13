const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = () => {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    console.table(JSON.parse(data.toString()));
  });
};

const getContactById = (contactId) => {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      console.log(error);
      return;
    }

    const contacts = JSON.parse(data.toString());

    const result = contacts.filter((el) => el.id === contactId);
    if (result.length === 0) {
      console.log("Nothing was found !");
      return;
    }
    console.table(result);
  });
};

const removeContact = (contactId) => {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    const result = JSON.parse(data.toString());

    const newContacts = result.filter((el) => el.id !== contactId);

    if (newContacts.length === result.length) {
      console.log("this ID wasn't found !");
      return;
    }

    fs.writeFile(contactsPath, JSON.stringify(newContacts), (error) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log("Contact was deleted !");
    });
  });
};

const addContact = (name, email, phone) => {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    let contacts = JSON.parse(data.toString());

    const newContact = {
      id: Date.now(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);

    fs.writeFile(contactsPath, JSON.stringify(contacts), (error) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log("New contact was added !");
    });
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
