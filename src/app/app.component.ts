import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import { CONTACTS } from './data/contact-data';
import { Contact, ContactService } from './contact.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ContactComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private contactService = inject(ContactService);
  // title = "assignment4"

  // contacts = CONTACTS;
  // id: number = -1;
  // fName: string = "";
  // lName: string = "";
  // phone: string = "";
  // email: string = "";

  // listView: boolean = true;
  // editMode: boolean = false;
  // currentEditID: number = -1;

  // listingsView() {
  //   this.listView = true;
  // }
  // addingView() {
  //   this.listView = false;
  //   this.editMode = false;
  // }

  // editContact(contactID: number) { 
  //   const contact = this.contacts.find(c => c.id === contactID);
  //   if (contact){
  //     this.fName = contact?.firstName;
  //     this.lName = contact?.lastName;
  //     this.phone = contact?.number;
  //     this.email = contact?.email;
  //     this.currentEditID = contact?.id;
  //   }
  //   this.addingView();
  //   this.editMode = true;
  // }
  // deleteContact(contactID: number) { 
  //   this.contacts = this.contacts.filter(contact => contact.id !== contactID);
  //   this.clearForm();
  //  }

  // submitChanges(contactID: number) { 
  //   const contact = this.contacts.find(c => c.id === contactID);
  //   if(contact) {
  //     contact.firstName = this.fName;
  //     contact.lastName = this.lName;
  //     contact.number = this.phone;
  //     contact.email = this.email;
  //   }
  //   this.listingsView();
  //   this.clearForm();
  // }

  // submitContact() {
  //   const newContact  = {
  //     id: this.contacts[this.contacts.length-1].id + 1,
  //     firstName: this.fName,
  //     lastName: this.lName,
  //     number: this.phone,
  //     email: this.email
  //   }

  //   this.contacts.push(newContact);

  //   this.listingsView();
  //   this.clearForm();
  // }

  // cancelButton() {
  //   this.clearForm();
  //   this.listingsView();
  // }

  // clearForm() {
  //   this.id = -1;
  //   this.fName = "";
  //   this.lName = "";
  //   this.phone = "";
  //   this.email = "";
  //   this.editMode = false;
  //   this.currentEditID = -1;
  // }
    title = "assignment4";
  contacts: Contact[] = [];

  fName: string = "";
  lName: string = "";
  phone: string = "";
  email: string = "";

  listView: boolean = true;
  editMode: boolean = false;
  currentEditID: number = -1;

  constructor() {
    this.contacts = this.contactService.getContacts();
  }

  listingsView() {
    this.listView = true;
  }

  addingView() {
    this.listView = false;
  }

  editContact(contactID: number) {
    const contact = this.contactService.getContactById(contactID);
    if (contact) {
      this.fName = contact.firstName;
      this.lName = contact.lastName;
      this.phone = contact.number;
      this.email = contact.email;
      this.currentEditID = contact.id;
      this.editMode = true;
    }
    this.addingView();
  }

  deleteContact(contactID: number) {
    this.contactService.deleteContact(contactID);
    this.contacts = this.contactService.getContacts();
    this.clearForm();
  }

submitChanges() {
  const index = this.contacts.findIndex(c => c.id === this.currentEditID);
  if (index !== -1) {
    const updatedContact: Contact = {
      id: this.currentEditID,
      firstName: this.fName,
      lastName: this.lName,
      number: this.phone,
      email: this.email
    };

    // Replace the object in the array to trigger change detection
    this.contacts[index] = updatedContact;
    this.contacts = [...this.contacts]; // <-- this is key (forces Angular to see the change)
  }

  this.listingsView();
  this.clearForm();
}


  submitContact() {
    const newId = this.contacts.length > 0
    ? this.contacts[this.contacts.length - 1].id + 1
    : 1;

  const newContact: Contact = {
    id: newId,
    firstName: this.fName,
    lastName: this.lName,
    number: this.phone,
    email: this.email
  };

  this.contacts.push(newContact);

  this.contacts = [...this.contacts];

  this.listingsView();
  this.clearForm();
}

  cancelButton() {
    this.clearForm();
    this.listingsView();
  }

  clearForm() {
    this.fName = "";
    this.lName = "";
    this.phone = "";
    this.email = "";
    this.editMode = false;
    this.currentEditID = -1;
  }
}
