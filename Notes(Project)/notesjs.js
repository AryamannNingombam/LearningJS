let addBtn = document.getElementById('addBtn');

showNotes();
showImportant();
addBtn.addEventListener('click',function(e){
	let addTxt = document.getElementById('addTxt');
	let  notes = localStorage.getItem('notes');
	let mainTitle = document.getElementById('mainTitle');
	if (notes===null)
{
	 notesObj = [];
}
else{
	notesObj = JSON.parse(notes);

};

notesObj.push([mainTitle.value,addTxt.value]);
localStorage.setItem('notes',JSON.stringify(notesObj));
addTxt.value = '';
showNotes();
showImportant();


});
// Showing elements from local storage;
function showNotes(){
	let notes = localStorage.getItem('notes');
	let importantNotesIndex = JSON.parse(localStorage.getItem('important'));
	
	if (notes === null && importantNotesIndex===null){
		notesObj = [];
		importantNotesIndex = [];
	}
	else{
		notesObj = JSON.parse(notes);
		
	}

	let html = '';

	notesObj.forEach(function(element,index){
		let date = new Date();
		console.log(date);
		
		if (importantNotesIndex.indexOf(String(index))>-1){
			
		html += `<div class="card mx-3 my-3 noteCard" style="width: 15rem;">
  <div class="card-body">
    <h5 class="card-title">${element[0]}</h5>
   <p>${element[1]}</p>
    <button id = '${index}' class="my-1 rounded" onclick = 'deleteNote(${index})'>Delete Note</button>
  </div> ${date.toDateString()}<i class="fa fa-star-o my-1 important" id = "star${index}"></i>
</div>`}
	else{
		html += `<div class="card mx-3 my-3 noteCard" style="width: 15rem;">
  <div class="card-body">
    <h5 class="card-title">${element[0]}</h5>
   <p>${element[1]}</p>
    <button id = '${index}' class="my-1 rounded" onclick = 'deleteNote(${index})'>Delete Note</button>
  </div>${date.toDateString()}<i class="fa fa-star-o my-1" id = "star${index}"></i>
</div>`

	}



	});

let notesElem = document.getElementById('notes');

if (notesObj.length === 0){
	notesElem.innerHTML = `<h4><b> No Notes to show </b></h4>`;

}
else{
	notesElem.innerHTML = html;
	// showImportant()
}
// importantNotesIndex.forEach(function(element){
// 	
// document.getElementById(`star${element}`).click()
// });

};
// let importantNotesIndex = JSON.parse(localStorage.getItem('important'));





function deleteNote(index){

let notes = localStorage.getItem('notes');
let notesObj = JSON.parse(notes);

notesObj.splice(index,1);


localStorage.setItem('notes',JSON.stringify(notesObj)); 
showNotes();
showImportant();




};







function showImportant(){
let stars = document.getElementsByClassName('fa fa-star-o my-1');





Array.from(stars).forEach(function(element){
	let stars1 = localStorage.getItem('important');
		if (stars1 == null){
			importantList = new Set();
		}
		else{
			importantList = JSON.parse(stars1);
		};


	if (element.className.includes('important')){
		let noteId = element.id.replace('star','')
			
			localStorage.setItem('important',JSON.stringify(importantList));


		
		element.style.color = 'red';
		element.parentNode.style.backgroundColor = 'rgba(0,0,0,0.2)'
	};



	element.addEventListener('click',function(){
		

		if (element.className.includes('important')){
			let noteId = element.id.replace('star','')
			let index = importantList.indexOf(noteId);
			importantList.splice(index,1);
			
			localStorage.setItem('important',JSON.stringify(importantList));


		element.className = 'fa fa-star-o my-1';
		element.style.color = 'black';
		element.parentNode.style.backgroundColor = 'white';
		}
		else{
			let noteId = element.id.replace('star','');
			if (importantList.indexOf(noteId)>-1){
			}
			else{
				importantList.push(noteId);
			};
			
			
			localStorage.setItem('important',JSON.stringify(importantList));
		element.className += ' important';
		element.style.color = 'red';
		element.parentNode.style.backgroundColor = 'rgba(0,0,0,0.2)';
	};


	});

})};