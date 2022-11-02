export default class API{
    async contries(){
        const response = await fetch(`https://restcountries.com/v3.1/all`)
        const data = await response.json()
        return data
    }

    async contry(name){
        const response = await fetch(`https://restcountries.com/v3.1/name/${name}`)
        const data = await response.json()
        return data
    }

    async region(region){
        const response = await fetch(`https://restcountries.com/v3.1/region/${region}`)
        const data = await response.json()
        return data
    }
}