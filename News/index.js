// 22aea26058b446de89f2a8ca66a01d20

let api = '22aea26058b446de89f2a8ca66a01d20';
urlindia = {
    'home': `http://newsapi.org/v2/top-headlines?country=in&apiKey=${api}`,
    'business': `http://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${api}`,
    'technology': `http://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=${api}`,
    'sports': `http://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=${api}`,
    'science': `http://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=${api}`,
    'health': `http://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=${api}`,
    'entertainment': `http://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=${api}`,
};

let newsAccordian = document.getElementById('newsAccordian');
// setTimeout(() => {
makeRequest(urlindia['home'],'home');
//     document.getElementById('spinner').style.display = 'none';

// }, 1000);

// let newsAccordian = document.getElementById('newsAccordian');

//REQUESTING URL

let allButtons = document.getElementsByClassName('cat');
let url;
for (button of allButtons) {
    button.addEventListener('click', (e) => {
        let cat = e.target.innerText;
      
        url = urlindia[cat.toLowerCase()];

        makeRequest(url,cat);





    });
}


function makeRequest(url,heading) {
    let request = new XMLHttpRequest();

    request.open('GET', url, true);

    request.onload = function() {
        if (this.status === 200) {
            let allArticles = JSON.parse(this.responseText);
            
           
            newsAccordian.innerHTML = '';

            document.getElementById('spinner').style.display = 'block';
            if (heading == 'home'){
            	document.getElementById('headLine').innerHTML = 'TOP NEWS';
            } else{
            	document.getElementById('headLine').innerHTML = heading;
            }
            setTimeout(() => {

                document.getElementById('spinner').style.display = 'none';
                
                for (article of allArticles['articles']) {

                    newsAccordian.innerHTML += `<div class="card" >
  <img src="${article['urlToImage']}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${article['title']}</h5>
    <p class="card-text">${article['description']}</p>
    <a target= '_blank' href="${article['url']}" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`
                };



            }, 1000)


        } else {
            console.log('Error');
        }

    };

    request.send()
};


function highlightThis(buttonid){
	let button = document.getElementById(buttonid);
		
		
	for (buttonl of allButtons){
		
		if (button  === buttonl){
			
			buttonl.parentNode.className = 'nav-item selected';
		} else{
			
			buttonl.parentNode.className = `nav-item` ;
			
		}
	}
}