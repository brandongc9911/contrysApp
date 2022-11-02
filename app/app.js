import API from "./api.js"
import Contries from "./contries.js"

const api = new API()
const sectionAll = document.querySelector(".all")
const sectionDetail = document.querySelector(".detail")
const back = document.querySelector("#back")
const region = document.querySelector(".region")
const searchForm = document.querySelector("#nameform")
const africa = document.querySelector(".africa")
const america = document.querySelector(".america")
const asia = document.querySelector(".asia")
const europe = document.querySelector(".europe")
const oceania = document.querySelector(".oceania")
const all = document.querySelector(".allContries")
const searchContry = document.querySelector(".content_search")


let theme = document.querySelector("#theme")
let textTheme = document.querySelector("#text_theme")
let cards
let currencies
let languages
let borders
let contrys


// CHANGE THEME
theme.addEventListener("click",function(){
    this.classList.toggle("fa-moon")
    document.body.classList.toggle("dark")
    
    if(this.classList.toggle("fa-sun")){
        textTheme.textContent = "Light Mode"
    }else{
        textTheme.textContent = "Dark Mode"
        document.body.style.transition = "0.2s"
        

    }
})


// SEARCH CONTRY
searchForm.addEventListener("submit",async (e)=>{
    e.preventDefault()
    const contrieData = await api.contry(searchContry.value)
    contrieData.forEach((a)=>{
        const dataContry = new Contries(a)
        dataContry.contries.innerHTML = dataContry.showcontries()
        cards = document.querySelectorAll(".card")
        getdetail(cards)
                    
    })
    
})



// LISTA DE REGIONES
region.addEventListener("click", ()=>{
    let list_contries = document.querySelector("#list_contries")

    if(list_contries.style.display === "block"){
        list_contries.style.display = "none";

    }else{
        list_contries.style.display = "block";

    }
})

all.addEventListener("click", (contry =>{
    dataRegion(contry)
}))

africa.addEventListener("click", (contry =>{
    dataRegion(contry)
}))

america.addEventListener("click", (contry =>{
    dataRegion(contry)
}))


asia.addEventListener("click", (contry =>{
    dataRegion(contry)
}))

europe.addEventListener("click", (contry =>{
    dataRegion(contry)
}))


oceania.addEventListener("click", (contry =>{
    dataRegion(contry)
}))

async function dataRegion(contry){
    Object.values(contrys.children).forEach((a)=>{
        a.remove()
        
    })
    
    let data = contry.target.innerText
    if(data === "All"){
        const contrieData = await api.contries()
        contrieData.forEach((c)=>{
            const dataContry = new Contries(c)
            dataContry.contries.innerHTML += dataContry.showcontries()
            cards = document.querySelectorAll(".card")
            getdetail(cards)
            contrys = dataContry.contries
            
        })
        
    }else {
        const contrieData = await api.region(data)
        contrieData.forEach((c)=>{
            const dataContry = new Contries(c)
            dataContry.contries.innerHTML += dataContry.showcontries()
            cards = document.querySelectorAll(".card")
            getdetail(cards)
            contrys = dataContry.contries
            
        })
    }
    
}




// TRAER TODOS LOS PAISES
async function getAll(){
    const contriesData = await api.contries()
    contriesData.forEach(contry => {
        

        const contries = new Contries(contry)
        contries.contries.innerHTML += contries.showcontries()
        
        contrys = contries.contries
        cards = document.querySelectorAll(".card")
        
        getdetail(cards)


    });
}

// CLICK AL PAIS Y VER INFORMACION ADICIONAL
function getdetail(cards){
    searchContry.value = ""
    cards.forEach((card)=>{
        card.addEventListener("click", (a)=>{
            sectionAll.style.display = "none"
            sectionDetail.style.display = "block"
            showDetail(a.target.alt)

        })
    })

    back.addEventListener("click", (b)=>{
        sectionAll.style.display = "block"
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

getAll()



