var contactImag = document.getElementById('productImag');
var contactName = document.getElementById('contactName'); 
var contactNumber = document.getElementById('contactNumber');
var contactEmail = document.getElementById('contactEmail');
var contactAdress = document.getElementById('contactAdress');
var contactGroup = document.getElementById('contactGroup');
var contactNote = document.getElementById('contactNote');
var isFavorite = document.getElementById('Favorites');
var isEmergency = document.getElementById('Emergency')
var rowData = document.getElementById('rowData');
var modalContact = document.getElementById('staticBackdrop');
var contactTotal = document.getElementById('totalContact');
var favcontent = document.getElementById('favCount');
var emercontent = document.getElementById('emerContact');
var contactAll = document.getElementById('contactAll');
var favBoxContact = document.getElementById('fav-box');
var emerBoxContact = document.getElementById('emer-box')


var contactAdd = JSON.parse(localStorage.getItem('contact')) ||[]
 displayContact()
function addContact(){
  
   if (contactName.value === "") {
        Swal.fire({
            icon: "warning",
            title: "Missing Name",
            text: "Please enter your name"
        });
       return
    }

    if (contactNumber.value === "") {
        Swal.fire({
            icon: "warning",
            title: "Missing Phone Number",
            text: "Please enter your phone number"
        });
       
    }
        if(validAllInput(contactName) && validAllInput(contactNumber) && validAllInput(contactEmail) ){
  var newContact = {
    Name:contactName.value,
    num:contactNumber.value,
    email:contactEmail.value,
    adress:contactAdress.value,
    group:contactGroup.value,
    note:contactNote.value,
    favorite :isFavorite.checked,
    Emergency :isEmergency.checked,
  }

   contactAdd.push(newContact) 
  Swal.fire({
  title: "Added",
  text: "Please enter a name for the contact!",
  showConfirmButton: false,
  timer: 1000,
  icon: "success"
});
saveLocalstorage();
clearForm();
  displayContact();
  closeModal();
   updatContact(index);
   


}}

function clearForm(){
   contactName.value="";
   contactNumber.value="";
   contactEmail.value="";
    contactAdress.value="";
    contactGroup.value="";
    contactNote.value="";
    isEmergency.checked =false;
    isFavorite.checked = false;
}

function displayContact(input){

  if(contactAdd.length ===0){
    rowData.innerHTML =`<p class="alert alert-secondary-subtle text-center">No Contacts Found </p>`;
     favBoxContact.innerHTML =`<p class=" text-secondary text-center">No favorites yet </p>`;
  emerBoxContact.innerHTML =`<p class=" text-secondary text-center">No emergency contacts </p>`;

  }else{
  contactTotal.innerHTML = contactAdd.length;
  contactAll.innerHTML = contactAdd.length;
  var favContact=0,EmergencyContact=0;
  var favBox = "";
  var emerBox = "";
  var box = "";
  var search = input? input.value : '';
  for(i=0; i<contactAdd.length ; i++){
     if(contactAdd[i].Name.toLowerCase().includes(search.toLowerCase())||contactAdd[i].num.toLowerCase().includes(search.toLowerCase()) ||contactAdd[i].email.toLowerCase().includes(search.toLowerCase()) ||''){ 

  box += `
    
        <div class="col-md-6   ">
              <div class="inner hover-card bg-white rounded-4 p-3 shadow-card ">

                  <div class="d-flex gap-3 align-items-center">
                     <div class="position-relative">
                   <div class="position-1 d-flex justify-content-center align-items-center">  ${contactAdd[i].favorite?`<i class="fa-solid fa-star text-white  fs-9 border-css  bg-warning rounded-circle"></i>`:``}</div> 
                    <div class="bg-linear-blue pad fs-5 fw-bold text-white rounded-3">  ${contactAdd[i].Name.slice(0,2).toUpperCase()}</div>  
                       <div class="position-2 d-flex justify-content-center align-items-center">${contactAdd[i].Emergency?`<i class="fa-solid fa-heart-pulse border-css fs-9 border-css rounded-circle bg-red text-white"></i>`:``} </div> 
                     </div>
                     <div>
                        <h3 class="h6 ">${contactAdd[i].Name}</h3>
                        <div class="d-flex align-items-center gap-2">
                          <div><i class="fa-solid fa-phone fs-8 p-2 bg-primary-subtle rounded-3 text-primary"></i></div>
                          <span class="text-secondary font-size-14 m-0">${contactAdd[i].num}</span>
                        </div>
                     </div>

                  </div>

                  <div class="mt-3">
                    <div class="d-flex gap-2">
                      <div><i class="fa-solid fa-envelope fs-8 p-2 rounded-3 " style="background-color: #EDE9FE; color: blueviolet;"></i></div>
                      <span class="text-secondary font-size-14">${contactAdd[i].email}</span>
                    </div>

                    <div class="d-flex gap-2 mt-2">
                      <div><i class="fa-solid fa-location-dot fs-8 p-2 rounded-3" style="background-color: #D0FAE5; color: #009966;"></i></i></div>
                      <span class="text-secondary font-size-14">${contactAdd[i].adress}</span>
                    </div>
                  </div>
                  <div class=" mt-3">
                    <span class="font-size-11 fw-medium text-primary p-1 bg-primary-subtle rounded-2 me-2 ${contactAdd[i].group}">${contactAdd[i].group}</span>
                    ${contactAdd[i].Emergency?`<span class="font-size-11 fw-medium text-danger p-1  rounded-2" style="background-color: #FFF1F2;"> <i class="fa-solid fa-heart-pulse "></i>Emergency</span>`:''}
                  </div>
                 <div class="mt-3 d-flex justify-content-between align-items-end border-top pt-3">
                   <div class="d-flex gap-2 align-items-end ">
                     <div class="pad-2 hover-1 rounded-3" style="background-color: #ECFDF5;">
                      <a href="tel:01067864219" class="" ><i class="fa-solid fa-phone fs-10 " style="color: #009966;"></i></a>
                     </div>
                    <div class=" pad-2 hover-2 d-flex align-items-center rounded-3" style="background-color:#F5F3FF;">
                      <a href="mailto:email" class="" ><i class="fa-solid fa-envelope fs-10" style="color: #7F22FE;"></i></a>
                     </div>

                  </div>
                   <div class="d-flex align-items-center ">
                     <div class=" me-2 pointer" onclick="toggleFav(${i})">
                     ${contactAdd[i].favorite?`<i class="fa-solid fa-star  hover-icon hover-color-1 py-6  pad-2 rounded-3 hover-icon text-warning bg-warning-subtle"></i>`:` <i class="fa-regular fa-star text-secondary hover-icon hover-color-1 py-6  pad-2 rounded-3 hover-icon"></i> `}

                     </div>
                     <div class="   me-2">
                       <label for="heart">
                       <div class="" onclick="toggleEmergency(${i})">
                     
                        ${contactAdd[i].Emergency?`<i class="fa-solid fa-heart-pulse  hover-color-2 py-6  pad-2 rounded-3 hover-icon text-danger bg-danger-subtle" ></i>`:`  <i class="fa-regular fa-heart text-secondary hover-color-2 py-6  pad-2 rounded-3 hover-icon"></i>`}
                      </div>
                     </div>
                     <div class=" me-2 pointer " data-bs-toggle="modal" data-bs-target="#staticBackdrop"  onclick="updatContact(${i})">
                      <i class="fa-solid fa-pen text-secondary fs-10 hover-color-all3 rounded-3 hover-icon pad-2 py-6 "></i>
                     </div>
                     <div class=" me-2 pointer" onclick="deleteThis(${i})">
                      <i class="fa-solid fa-trash text-secondary fs-10 hover-color-all4 rounded-3 hover-icon pad-2 py-6 "></i>
                     </div>
                  </div> 

                 </div>
              </div>
          </div>










           
    `

    if(contactAdd[i].favorite){
      favBox +=`
        <div class="d-flex justify-content-between p-2 bg-gray-body rounded-3 bg-gray-body hover-card-1 mb-3">
                    <div class="d-flex align-items-center gap-3">
                      <div class="bg-linear  pad-4 text-white fw-bold font-size-14 rounded-3">
                    ${contactAdd[i].Name.slice(0,2).toUpperCase()}
                    </div>
                    <div>
                         <h4 class="font-size-14 m-0">${contactAdd[i].Name}</h4>
                         <p class="m-0 font-size-12 text-secondary">${contactAdd[i].num}</p>
                    </div>
                    </div>
                     <div class="pad-5 d-flex align-items-center rounded-3 hover" style="background-color: #defde5;">
                      <a href="tel:${contactAdd[i].num}" class=" p-0 m-0" ><i class="fa-solid fa-phone font-16 " style="color: #009966;"></i></a>
                     </div>
                </div>
      `
    }
     if(contactAdd[i].Emergency){
      emerBox +=`
        <div class="d-flex justify-content-between p-2 bg-gray-body rounded-3 bg-gray-body hover-card-2 mb-3">
                    <div class="d-flex align-items-center gap-3">
                      <div class="bg-linear  pad-4 text-white fw-bold font-size-14 rounded-3">
                      ${contactAdd[i].Name.slice(0,2).toUpperCase()}
                    </div>
                    <div>
                         <h4 class="font-size-14 m-0">${contactAdd[i].Name}</h4>
                         <p class="m-0 font-size-12 text-secondary">${contactAdd[i].num}</p>
                    </div>
                    </div>
                     <div class="pad-5 d-flex align-items-center rounded-3 hover" style="background-color: #FFE4E6;">
                      <a href="tel:01067864219" class=" p-0 m-0" ><i class="fa-solid fa-phone font-16 " style="color: red;"></i></a>
                     </div>
                </div>
      `
      
      }

    if(contactAdd[i].favorite){
      favContact++
    }
     if(contactAdd[i].Emergency){
      EmergencyContact++
    }}
  }
  rowData.innerHTML = box;
  favcontent.innerHTML =favContact;
  emercontent.innerHTML=EmergencyContact;
  favBoxContact.innerHTML = favBox;
  emerBoxContact.innerHTML = emerBox;
  }

}
function saveLocalstorage(){
  localStorage.setItem('contact',JSON.stringify(contactAdd));
}



  
function closeModal(){
  var modalClose = bootstrap.Modal.getInstance(modalContact);
  modalClose.hide();
}




function deleteThis(index){
 Swal.fire({
title: "Are you sure?",
text: "You won't be able to revert this!",
icon: "warning",
showCancelButton: true,
confirmButtonColor: "#d33",
cancelButtonColor: "rgb(92, 92, 92)",
confirmButtonText: "Yes, delete it!",
 
 
}).then((result) => {
if (result.isConfirmed){
  contactAdd.splice(index, 1);
 
  saveLocalstorage();
  displayContact();

   Swal.fire({
title: "Deleted!",
text: "Your file has been deleted.",
icon: "success",
 showConfirmButton: false,
  timer: 1000,
});
}
});
  
}

var globalIndex = '';
function updatContact(index){
  globalIndex = index;
  contactName.value=contactAdd[index].Name;
    contactNumber.value=contactAdd[index].num;
      contactEmail.value=contactAdd[index].email;
        contactGroup.value=contactAdd[index].group;
          contactAdress.value=contactAdd[index].adress;
            contactNote.value=contactAdd[index].note;
            isFavorite.checked = contactAdd[index].favorite;
            isEmergency.checked = contactAdd[index].Emergency;
            var updatBtn = document.getElementById('updatBtn');
            var addBtn = document.getElementById('addBtn');
            updatBtn.classList.remove('d-none');
            addBtn.classList.add('d-none')
         

          
}

function displayuPdate (index){
  var displayThisUpdate = {
  Name:contactName.value,
    num:contactNumber.value,
    email:contactEmail.value,
    adress:contactAdress.value,
    group:contactGroup.value,
    note:contactNote.value,
    favorite :isFavorite.checked,
    Emergency :isEmergency.checked,
      
  }
   contactAdd[globalIndex]=displayThisUpdate;
   saveLocalstorage();
   displayContact();
   clearForm()
   Swal.fire({
  title: "Updated!",
  text: "Contact has been updated succefully!",
  icon: "success",
  showConfirmButton: false,
  timer: 1000,
});
   closeModal();
     var updatBtn = document.getElementById('updatBtn');
            var addBtn = document.getElementById('addBtn');
            updatBtn.classList.add('d-none');
            addBtn.classList.remove('d-none')
}

function toggleFav(index){
contactAdd[index].favorite = ! contactAdd[index].favorite;
console.log('hello')
  saveLocalstorage();
  displayContact()

}

function toggleEmergency(index){
  contactAdd[index].Emergency = ! contactAdd[index].Emergency;
console.log('hello')
  saveLocalstorage();
  displayContact()
}

         function validAllInput(input){
    var regex={
      contactName: /^[a-zA-Z ]{3,20}$/,
      contactNumber:/^(\+2|002)?01[0125][0-9]{8}$/,
      contactEmail:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ,
      /* contactAdress:/^[a-zA-Z0-9\s,.'-]{3,100}$/,
      contactGroup: /^(Family|Friends|Work|school)$/, */
    }
     if(regex[input.id].test(input.value)){
     
       input.nextElementSibling.classList.add('d-none')

       return true
     }
   
    
    input.nextElementSibling.classList.remove('d-none')
    
       return false 


      

  }


