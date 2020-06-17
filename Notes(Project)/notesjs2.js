 showNotes();
 showImportant();
 document.getElementById('addBtn').addEventListener('click',function(){

let mainTitle = document.getElementById('mainTitle');
let addTxt = document.getElementById('addTxt');
let notes = localStorage.getItem('notes');
if (mainTitle.value ==''){
	mainTitle.value = 'Note';
}


if (notes === null){
	notesObj = [];
}
else{
	notesObj = JSON.parse(notes);
}

notesObj.push([mainTitle.value,addTxt.value,false]);
localStorage.setItem('notes',JSON.stringify(notesObj));

addTxt.value = '';
mainTitle.value = '';

showNotes();
showImportant();


 });


// SHOWING NOTES TO USER
function showNotes(){
let notes = localStorage.getItem('notes');
if (notes === null){
	notesObj = []
}
else{
	notesObj  = JSON.parse(notes);
}
let html = '';
notesObj.forEach(function(element,index){

let title = element[0];
let content = element[1];
let important = element[2];
let date = new Date();

// Adding content to Main Page





let notesElem = document.getElementById('notes');


	if (important === true){

	html += `<div class="card mx-3 my-3 noteCard" style="width: 15rem;">
  <div class="card-body">
    <h5 class="card-title"  id = 'title${index}'>${title}</h5>
   <p id = 'content${index}'>${content}</p>
    <button id = '${index}' class="my-1 rounded" onclick = 'deleteNote(${index})'>Delete Note</button>
     <button id = 'edit${index}' class="my-1 rounded" onclick = 'editNote(${index})'>Edit Note</button>
  </div> ${date.toDateString()}<i class="fa fa-star-o my-1 important" id = "star${index}"></i>
</div>`;

}
else{
	
	html += `<div class="card mx-3 my-3 noteCard" style="width: 15rem;">
  <div class="card-body">
    <h5 class="card-title" id = 'title${index}'>${title}</h5>
   <p id = 'content${index}'>${content}</p>
    <button id = '${index}' class="my-1 rounded" onclick = 'deleteNote(${index})'>Delete Note</button>
     <button id = 'edit${index}' class="my-1 rounded" onclick = 'editNote(${index})'>Edit Note</button>
  </div> ${date.toDateString()}<i class="fa fa-star-o my-1" id = "star${index}"></i>
</div>`



};








});

let notesElem = document.getElementById('notes');
if (notesObj.length == 0){
	
	notesElem.innerHTML = `<h4><b> No Notes to show </b></h4>`;

}
else{
	
	notesElem.innerHTML = html;
	// showImportant()
}



};







// SEARCHING FUNCTIONALITY.

let searchTxt = document.getElementById('searchTxt');
searchTxt.addEventListener('input',function(){

let inputVal = searchTxt.value.toLowerCase();

let noteCards = document.getElementsByClassName('noteCard');
Array.from(noteCards).forEach(function(element){
	let cardTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();
	if (cardTxt.includes(inputVal)){
		element.style.display = 'block';
	}
	else{
		element.style.display = 'none';
	};

});

});


//DELETING A NOTE
function deleteNote(index){

let notes = localStorage.getItem('notes');
let notesObj = JSON.parse(notes);

notesObj.splice(index,1);


localStorage.setItem('notes',JSON.stringify(notesObj)); 
showNotes();
showImportant();




};



// IMPORTANT TAGGING;
function showImportant(){
let classStar = document.getElementsByClassName('fa fa-star-o my-1');
Array.from(classStar).forEach(function(element){
	 let noteId = element.id.replace('star','')
	 if (element.className.includes('important')){
	 		
			
			element.style.color = 'red';
			element.parentNode.style.backgroundColor = 'rgba(0,0,0,0.2)'

	 }

	 else{

	 			element.style.color = 'black';
			element.parentNode.style.backgroundColor = 'white';

	 }
	 element.addEventListener('click',function(){
	 	if (element.className.includes('important')){
	 		element.className = 'fa fa-star-o my-1'
	 			element.style.color = 'black';
			element.parentNode.style.backgroundColor = 'white';
			let change = JSON.parse(localStorage.getItem('notes'));
			let setChange = change[noteId];
			
			setChange[2] = false;
			localStorage.setItem('notes',JSON.stringify(change));

	 	}
	 	else{
	 		element.className = 'fa fa-star-o my-1 important'
	 		element.style.color = 'red';
			element.parentNode.style.backgroundColor = 'rgba(0,0,0,0.2)';
			let change = JSON.parse(localStorage.getItem('notes'));
			let setChange = change[noteId];
			
			setChange[2] = true;
			localStorage.setItem('notes',JSON.stringify(change));

	 	};
	 	



	 });



});

};



function editNote(index){
	let content = document.getElementById(`content${index}`);
	let title = document.getElementById(`title${index}`);
	let button = document.getElementById(`edit${index}`)
	
	let editContent = document.createElement('input');
	let editTitle = document.createElement('input');
	let editButton= document.createElement('button');

	editTitle.value = title.innerHTML;

	editTitle.id = title.id;
	editContent.value = content.innerHTML;
	
	editContent.id = content.id;
	editButton.innerText= 'Save Changes';
	editButton.id = `save${index}`;
	editButton.onclick = 'saveEditedNote()'
	editButton.className = button.className + ' saveThis';
	content.replaceWith(editContent);
	title.replaceWith(editTitle);
	button.replaceWith(editButton);





	let saveThis = document.getElementsByClassName('saveThis');

Array.from(saveThis).forEach(function(element){
	let getElemt = document.getElementById(element.id) ;
	let id = element.id.replace('save','');
	

	getElemt.addEventListener('click',function(){
		
		let content  = document.getElementById(`content${id}`).value;

		
		
		let title = document.getElementById(`title${id}`).value;
		let allNotes = JSON.parse(localStorage.getItem('notes'));
		let myNote = allNotes[id];
		myNote[0] = title;
		myNote[1] = content;
		localStorage.setItem('notes',JSON.stringify(allNotes));
	

	content = document.getElementById(`content${index}`);
	title = document.getElementById(`title${index}`);
	button = document.getElementById(`save${index}`)
	
	editContent = document.createElement('p');
	editTitle = document.createElement('h5');
 editButton= document.createElement('button');

	editTitle.innerHTML = title.value;

	editTitle.id = title.id;
	editContent.innerHTML = content.value;
	
	editContent.id = content.id;
	editButton.innerText= 'Edit Note';
	editButton.id = `${index}`;
	
	editButton.className = button.className + '';
	content.replaceWith(editContent);
	title.replaceWith(editTitle);
	button.replaceWith(editButton);


		
		showNotes();
		showImportant();

		
		
		


	});




});



};


