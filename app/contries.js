export default class Contries{
    constructor({name,region,subregion,capital,tld,currencies,languages,borders,population,flags}){
        this.name = name
        this.region = region
        this.subregion = subregion
        this.capital = capital
        this.tld = tld
        this.currencies = currencies
        this.languages = languages
        this.borders = borders
        this.population = population
        this.flags = flags
        this.contries = document.querySelector(".contries")
        this.divflag = document.querySelector(".flag")
        this.info = document.querySelector(".info_detail")
        
    }


    showcontry(){
        return `
        <div class="card" data-contry=${this.name.common}>
            <div class="flag">
                <img src="${this.flags.png}" alt="${this.name.common}">
            </div>
            <div class="info">
                <h3>${this.name.common}</h3>
                <p>Population:<span class="population">${new Intl.NumberFormat().format(this.population)}</span></p>
                <p>Region:<span>${this.region}</span></p>
                <p>Capital:<span>${this.capital}</span></p>
            </div>
        </div>
        `
    }

    showDetail(){
        return`
        <div class="content_flag">
            <img src="${this.flags.png}" alt="${this.name.common}">
        </div>
       <div class="more_info">
            <h2>${this.name.common}</h2>
            <div class="info__geography">
                <p>Native Name:<span>${this.name.common}</span></p>
                <p>Population:<span>${new Intl.NumberFormat().format(this.population)}</span></p>
                <p>Region:<span>${this.region}</span></p>
                <p>Sub Region:<span>${this.subregion}</span></p>
                <p>Capital:<span>${this.capital}</span></p>
            </div>

            <div class="info_others">
                <p>Top Level Domain:<span>${this.tld}</span></p>
                <p>Currencies:<span id="currencies">${this.currencies}</span></p>
                <p>Languages:<span id="languages">${this.languages}</span></p>
            </div>

            <div class="info__borderContries">
                <h3>Border Contries:</h3>
                <div class="borders"></div>

            </div>
       </div>
        
        `
    }

    
}