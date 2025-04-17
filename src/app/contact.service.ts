import { Injectable } from '@angular/core';
import { CONTACTS } from './data/contact-data';

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  number: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts = [...CONTACTS]; // create a copy to work with

  getContacts(): Contact[] {
    return this.contacts;
  }

  addContact(contact: Contact): void {
    this.contacts.push(contact);
  }

  updateContact(updatedContact: Contact): void {
    const index = this.contacts.findIndex(c => c.id === updatedContact.id);
    if (index !== -1) {
      this.contacts[index] = updatedContact;
    }
  }

  deleteContact(id: number): void {
    this.contacts = this.contacts.filter(c => c.id !== id);
  }

  getContactById(id: number): Contact | undefined {
    return this.contacts.find(c => c.id === id);
  }

  constructor() { }
}
