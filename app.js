let contoh = document.querySelector("#contoh")
let getBtn = document.querySelector("#get")
let postBtn = document.querySelector("#post")
let patchBtn = document.querySelector("#patch")
let deleteBtn = document.querySelector("#delete")
let display = document.querySelector("#currMethod")
let submit = document.querySelector("#btnSubmit")
let description = document.querySelector("#description")
let describe = document.querySelector("#describe")
let input = document.querySelector("#getInput")
let countryText = document.querySelector("#userCountry")
let result = document.querySelector("#result")
let chart = document.querySelector("#myChart")
let pickedCountries = document.querySelector("#pickCountries")
let displayResult = document.querySelector("#displayResult")
let displayCountry = document.querySelector("#displayCountry")
let getCountries
let status = ''

let confirmed = document.querySelector("#confirmed")
let active = document.querySelector("#active")
let recovered = document.querySelector("#recovered")
let death = document.querySelector("#death")

const headerConfig = {
    "auth": "5acfed2a527d6667b048b9a48c886e28",
    "Content-Type": "application/json"
}

window.onload = async () => {
    displayResult.style.display = "none"
    const countryUser = await (await fetch('https://extreme-ip-lookup.com/json/').catch(
    handleError()
    )).json()
    countryText.innerHTML = `Seems like you're from <span class='text-purple-500'>${countryUser.country}</span>`
    getCountries = await (await fetch('https://api.covid19api.com/countries')).json()
    getCountries.forEach( country => {
        const opt = document.createElement('option')
        opt.value = country.Country
        opt.innerText = country.Country
        pickedCountries.appendChild(opt)
    });
    status = 'get'
    input.value = countryUser.country
    callApi()
    setTimeout( () => status = null, 2000)
}

getBtn.addEventListener('click', () => {
    describeText("Fetch COVID-19 cases for the given country")
    status = 'get'
})

postBtn.addEventListener('click', () => {
    describeText("Send data to the server")
    status = 'post'
})

patchBtn.addEventListener('click', () => {
    describeText("Patch a data in the database")
    status = 'patch'
})

deleteBtn.addEventListener('click', () => {
    describeText("Delete a data in the database")
    status = 'delete'
})

submit.onclick = () => {
    if(!status) describeText('Choose a method and a country')
    if(status === 'get') {
        callApi()
    }
}

function displayText(text) {
    display.innerText = `${text}`
}

function describeText(text) {
    describe.innerText = `${text}`
}

async function callApi() {
    let countries = await (await fetch('https://api.covid19api.com/countries')).json()
    const country = countries.filter( country => country.Country === input.value)
    if(status === 'get') {
        let covidCases = await (await (await fetch(`https://api.covid19api.com/country/${country[0].Slug}`).catch( () => {
        displayError(input.value)
        result.innerHTML = `<p class='my-2 text-2xl'>No records of cases for ${input.value}</p>`
        input.value = ''
    })).json())
    console.log(covidCases)
    
    if(!covidCases || !covidCases.length) {
        displayError(input.value)
        input.value = ''
        return
    }
    displayResult.style.display = "block"
    const currCases = covidCases[covidCases.length - 1]
    const date = new Intl.DateTimeFormat('ms-MY').format(new Date(currCases.Date))
    displayCountry.innerHTML = `<p class='text-3xl font-bold mb-2 animate-word'>${input.value}</p><p class='font-bold animate-word'>${date}</p>`
    input.value = ''
    const activeCases = currCases.Active
    const confirmedCases = currCases.Confirmed
    const deathCases = currCases.Deaths
    const recoveredCases = currCases.Recovered
    confirmed.innerHTML = `${displayResultCases(confirmedCases)}<p class='my-2 text-lg text-white'>Confirmed Cases</p>`
    recovered.innerHTML = `${displayResultCases(recoveredCases)}<p class='my-2 text-lg text-white'>Recovered</p>`
    active.innerHTML = `${displayResultCases(activeCases)}<p class='my-2 text-lg text-white'>Active Cases</p>`
    death.innerHTML = `${displayResultCases(deathCases)}<p class='my-2 text-lg text-white'>Deaths</p>`
}
}

function displayResultCases(cases) {
    return `<span class='font-bold animate-word text-4xl'>${cases}</span>`
}

function handleError() {
    userCountry.innerText = `Please turn off your ad blocking extension and refresh.`
}

function displayError(country) {
    displayCountry.innerHTML = `<p class='p-10'>No records for ${country}</p>`
    displayResult.style.display = "none"
}

function removeElement(el) {
    while(el.firstChild) {
        el.removeChild(el.firstChild)
    }
}
