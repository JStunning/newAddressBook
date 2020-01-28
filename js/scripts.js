// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [];
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, addresses) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.addresses = addresses;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// Business Logic for Addresses ---------
function Address(personalEmailAddress, workEmailAddress, physicalAddress){
  this.personalEmailAddress = personalEmailAddress;
  this.workEmailAddress = workEmailAddress;
  this.physicalAddress = physicalAddress;
}

// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay){
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".personal-email-address").html(contact.addresses.personalEmailAddress);

  if(contact.addresses.workEmailAddress !== ""){
    $(".showAdditionalEmail").show();
    $(".show-personal-contact").show();
    $(".work-email-address").html(contact.addresses.workEmailAddress);
  }
  else{
    $(".showAdditionalEmail").hide();
    $(".show-personal-contact").hide();
  }

  $(".physical-address").html(contact.addresses.physicalAddress);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function attachContactListeners(){
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
  $(".primaryEmail").on("click", "#moreEmails", function(){
    $(".show-personal").show();
    $(".additionalEmail").show();
  });
};

$(document).ready(function(){
  attachContactListeners();
  $("form#new-contact").submit(function(event){
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedPersonalEmailAddress = $("input#new-personal-email-address").val();
    var inputtedWorkEmailAddress = $("input#new-work-email-address").val();
    var inputtedPhysicalAddress = $("input#new-physical-address").val();

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-personal-email-address").val("");
    $("input#new-work-email-address").val("");
    $("input#new-physical-address").val("");
    $(".show-personal").hide();
    $(".additionalEmail").hide();

    var contactAddresses = new Address (inputtedPersonalEmailAddress, inputtedWorkEmailAddress, inputtedPhysicalAddress);
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, contactAddresses);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})

// var contact = new Contact("Ada", "Lovelace", "503-555-0100");
// var contact2 = new Contact("Grace", "Hopper", "503-555-0199");
// addressBook.addContact(contact);
// addressBook.addContact(contact2);