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
let status = ''

window.onload = async () => {
    const countryUser = await (await fetch('https://extreme-ip-lookup.com/json/')).json()
    countryText.innerText = `Seems like you're from ${countryUser.country}`
}

getBtn.addEventListener('click', () => {
    displayText("GET")
    describeText("Fetch COVID-19 cases for the given country")
    descriptionText("/covid19")
    status = 'get'
})

postBtn.addEventListener('click', () => {
    displayText("POST")
    describeText("Send data to the server")
    descriptionText("/covid19")
    status = 'post'
})

patchBtn.addEventListener('click', () => {
    displayText("PATCH")
    describeText("Patch a data in the database")
    descriptionText("/covid19/:id")
    status = 'patch'
})

deleteBtn.addEventListener('click', () => {
    displayText("DELETE")
    describeText("Delete a data in the database")
    descriptionText("/covid19/:id")
    status = 'delete'
})

submit.onclick = () => {
    if(status === 'get') {
        callApi()
    }
}

function displayText(text) {
    display.innerText = `${text}`
}

function descriptionText(text) {
    description.innerText = `${text}`
}

function describeText(text) {
    describe.innerText = `${text}`
}

async function callApi() {
    let countries = await (await fetch('https://api.covid19api.com/countries')).json()
    const country = countries.filter( country => country.Country === input.value)

    if(status === 'get') {
        let covidCases = await (await (await fetch(`https://api.covid19api.com/country/${country[0].Slug}/status/confirmed`)).json())
        console.log(covidCases[covidCases.length - 1].Cases)
    }
}