import { v4 as uuidv4 } from'uuid';
import fs from 'fs/promises';
import path from 'path';
import contacts from './contacts.json';
import { fileURLToPath } from 'url';


const __dirname = path.dirname(fileURLToPath(import.meta.url))

const listContacts = async () => {
  return contacts
}

const getContactById = async (contactId) => {
    const contact = contacts.find(contact => contact.id === contactId)
    return contact
}

const removeContact = async (contactId) => {
    const deleteContact = contacts.findIndex(contact => contact.id === contactId)
    if (deleteContact !== -1) {
      const [result] = contacts.splice(deleteContact, 1)
      await fs.writeFile(path.join(__dirname, 'contacts.json'),
        JSON.stringify(contacts, null, 2),
      )
      return result
  } 
  return null
    }

const addContact = async (userData) => {
    const{name, email, phone}=userData
    if (!Object.values(userData).every((userData) => userData)) {
        return "operation failed, user data is missing!"
    }    
    const newContact = { name, email, phone, id: uuidv4()}
    contacts.push(newContact)
    await fs.writeFile(path.join(__dirname, 'contacts.json'),
        JSON.stringify(contacts, null, 2),
    )
  return newContact
}

const updateContact = async (contactId, body) => {
  const index = contacts.findIndex((contact) => contact.id === contactId)
  if (index !== -1) {
    const updatedContact = { id: contactId, ...contacts[index], ...body }
    contacts[index] = updatedContact
    await fs.writeFile(path.join(__dirname, 'contacts.json'),
      JSON.stringify(contacts, null, 2))
    return updatedContact
  }
  return null
}

export default {listContacts, getContactById, removeContact, addContact, updateContact}