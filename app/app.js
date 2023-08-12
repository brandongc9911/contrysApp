import API from "./api.js"
import Contries from "./contries.js"

const api = new API()
const showContries = document.querySelector(".show_contries")
const sectionDetail = document.querySelector(".detail")
const back = document.querySelector("#back")
const region = document.querySelector(".region")
const searchForm = document.querySelector("#nameform")
const listContries = document.querySelector("#list_contries")
const searchContry = document.querySelector(".content_search")
let theme = document.querySelector("#theme")
let textTheme = document.querySelector("#text_theme")
let cards
let currencies
let languages
let borders

document.addEventListener('DOMContentLoaded',()=>{
    theme.addEventListener('click',changeTheme)
    searchForm.addEventListener("submit",search)
    getAll()
})

function changeTheme(){
    theme.classList.toggle("fa-moon")
    document.body.classList.toggle("dark")
    
    if(this.classList.toggle("fa-sun")){
        textTheme.textContent = "Light Mode"
    }else{
        textTheme.textContent = "Dark Mode"
        document.body.style.transition = "0.2s"
    }
}


// TRAER TODOS LOS PAISES
async function getAll(){
    cleanHTML()
    const contriesData = await api.contries()
    contriesData.forEach(contry => {
        const contries = new Contries(contry)     
        contries.contries.innerHTML += contries.showcontry()
        cards = document.querySelectorAll(".card")
        getdetail(cards)
    });
}



async function search(e){
    e.preventDefault()
    cleanHTML()
    const contriesData = await api.contry(searchContry.value)
    contriesData.forEach((contry)=>{
        const contries = new Contries(contry)     
        contries.contries.innerHTML += contries.showcontry()
        cards = document.querySelectorAll(".card")
        getdetail(cards)
    })
}



// LISTA DE REGIONES
region.addEventListener("click", ()=>{
    if(listContries.style.display === "block"){
        listContries.style.display = "none";

    }else{
        listContries.style.display = "block";

    }
})

listContries.childNodes.forEach(region => {
    region.addEventListener('click',()=>{
        dataRegion(region.textContent)
    })
    
})



async function dataRegion(contry){
    if(contry === "All"){
        getAll()
    }else{
        cleanHTML()
        const contriesData = await api.region(contry)
        contriesData.forEach(contry => {
            const contries = new Contries(contry)     
            contries.contries.innerHTML += contries.showcontry() 
            cards = document.querySelectorAll(".card")
            getdetail(cards)


        });
    }
  
}


// CLICK AL PAIS Y VER INFORMACION ADICIONAL
function getdetail(cards){
    searchContry.value = ""
    cards.forEach((card)=>{        
        card.addEventListener("click", ()=>{
            showContries.style.display = "none"
            sectionDetail.style.display = "block"
            showDetail(card.dataset.contry)

        })
    })

    back.addEventListener("click", (b)=>{
        showContries.style.display = "block"
        sectionDetail.style.display = "none"
        
    })
}


async function showDetail(contrie){
    const data = await api.contry(contrie)
    data.forEach((contry)=>{
        const dataContrie = new Contries(contry)
        dataContrie.info.innerHTML = dataContrie.showDetail()
        
        
        currencies = document.querySelector("#currencies")
        languages = document.querySelector("#languages")
        borders = document.querySelector(".borders")

        for(let c in dataContrie.currencies){
           currencies.textContent = dataContrie.currencies[c].name
            
        }

        for(let b in dataContrie.borders){
            const border_element = document.createElement("div")
            border_element.classList = "border"
            border_element.textContent = dataContrie.borders[b]
            borders.appendChild(border_element)
            
        }
        
        languages.textContent = Object.keys(dataContrie.languages)
        
    })
    

}

function cleanHTML(){
    const contries = document.querySelector('.contries')
    while(contries.firstChild){
        contries.removeChild(contries.firstChild)
    }
    
  }