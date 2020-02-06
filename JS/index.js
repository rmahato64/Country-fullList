const nameButton = document.querySelector('.name')  
const capitalButton = document.querySelector('.capital')
const populationButton = document.querySelector('.population')
const flexContainer = document.querySelector('.flexContainer')
const searchButton = document.querySelector('.search')
let buttonDiv = document.querySelector('.buttons-wrapper')
//let searchValue = searchButton.value  why always me??????
let content = ''
const getall= document.querySelector('.fetchall')
let state=0;


  let renderAll =(arr)=>{
    for(const country of arr){
      let {name,capital,population} =country
      //console.log(name,capital,population)
      flexContainer.innerHTML += `<div>
      <h2>${name}</h2>
      <p>${capital}</p>
      <p>${country.languages.map(e => `${e.name}`)}</P>
      <p>${population}</p>
    </div>`
    } 
  }

  //filter by name
let filterByName = (data)=>{
  let searchValue = searchButton.value
    flexContainer.innerHTML = ''
    let result =  data.filter(a => a.name.toLowerCase().includes(searchValue.toLowerCase()))
    return result
  }

  //filter by capital
let filterByCapital = (data)=>{
    let searchValue = searchButton.value
    flexContainer.innerHTML = ''
    let result = data.filter(b => b.capital.toLowerCase().includes(searchValue.toLowerCase()));
   return result
    
  } 

  // function to filter by name and capital
  let filteredCountries = (data)=>{
    let searchValue = searchButton.value
    flexContainer.innerHTML = ''
    let result = data.filter(a => a.name.toLowerCase().includes(searchValue.toLowerCase()) ||  (a.capital.toLowerCase().includes(searchValue.toLowerCase())))
    renderAll(result)
  }

  const sortByName = (data) => {
    const sortedName = data.sort(function (a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;

    });
    if (state == 0) {
      renderAll(filterByName(sortedName).reverse())
      
      state = 1
    } 
    else {
      renderAll(filterByName(sortedName))
      
        //showCountries(filterCountries(sortedName.reverse(), searchInput.value.toLowerCase()));
        state = 0;
    }

}

 const sortByCapital = (data) => {    
    let sortedCapital = data.sort((a, b) => {        
      if(a.capital > b.capital) return -1;        
      if(a.capital < b.capital) return 1;       
       return 0;
  })   
 
  if (state == 0) {
    renderAll(filterByCapital(sortedCapital).reverse())
    
    state = 1;
} else {
  renderAll(filterByCapital(sortedCapital))
    state = 0;
}
}

fetch('https://restcountries.eu/rest/v2/all')
  .then(res => res.json())
  .then(data =>{
    renderAll(data)
    
    searchButton.addEventListener("input",function(){
      filteredCountries(data)
    })
    buttonDiv.addEventListener('click',event =>{
      flexContainer.innerHTML = ''
      
      //console.log(event.target.)
        if(event.target.value == "name"){
          let copyOfData = [...data]
          //nameButton.setAttribute('class','fas fa-arrow-up')
          sortByName(data)
        }
        else if(event.target.value=='capital'){
          let copyOfData = [...data]
          console.log(copyOfData);
          
         // capitalButton.setAttribute('class', 'fas fa-arrow-up')
          sortByCapital(copyOfData)

        }
    })

  })