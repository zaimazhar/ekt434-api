// Variables
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

// To append the data to their respective elements in the DOM
let confirmed = document.querySelector("#confirmed")
let active = document.querySelector("#active")
let recovered = document.querySelector("#recovered")
let death = document.querySelector("#death")

// On page load, execute this function
window.onload = async () => {
    // Remove any display on the result so we can populate back based on the current state
    // of the data
    displayResult.style.display = "none"
    // Fetch the current visitor country
    const countryUser = await (await fetch('https://extreme-ip-lookup.com/json/').catch(
    // Handle the error if the API is broken or unsuccessful
    handleError()
    )).json()
    // Show the user which country they are from
    countryText.innerHTML = `Seems like you're from <span class='text-purple-500'>${countryUser.country}</span>`
    // Get list of countries to populate inside our <select> element
    getCountries = await (await fetch('https://api.covid19api.com/countries')).json()
    // Loop through the country and append into their respective <option> element
    getCountries.forEach( country => {
        const opt = document.createElement('option')
        opt.value = country.Country
        opt.innerText = country.Country
        pickedCountries.appendChild(opt)
    });
    // Change the current method for the request to 'GET'
    status = 'get'
    // The country value will be utilized in callApi() function
    input.value = countryUser.country
    // callApi() function execution is based on the status variable
    callApi()
    // After 2 seconds of callApi() invocation, set status back to null to avoid bugs
    setTimeout( () => status = null, 2000)
}

// Listen if the GET button is clicked
getBtn.addEventListener('click', () => {
    describeText("Fetch COVID-19 cases for the given country")
    status = 'get'
})

// Listen if the POST button is clicked
postBtn.addEventListener('click', () => {
    describeText("Send data to the server")
    status = 'post'
})

// Listen if the PATCH button is clicked
patchBtn.addEventListener('click', () => {
    describeText("Patch a data in the database")
    status = 'patch'
})

// Listen if the DELETE button is clicked
deleteBtn.addEventListener('click', () => {
    describeText("Delete a data in the database")
    status = 'delete'
})

// If the button submit is clicked, run thos function
submit.onclick = () => {
    // If current status is null or undefined, mention the error to user
    if(!status) describeText('Choose a method and a country')
    // If the current status is GET, run the callApi() function
    if(status === 'get') {
        callApi()
    }
}

// Display the description text of the current chosen method
function describeText(text) {
    describe.innerText = `${text}`
}

// callApi() function
async function callApi() {
    // Get all countries available inside the REST API
    let countries = await (await fetch('https://api.covid19api.com/countries')).json()
    // Get the supposedly country by filtering
    const country = countries.filter( country => country.Country === input.value)
    // If the current status variable has value of 'get'
    if(status === 'get') {
        // Get the specific country by passing the slug of the country name
        let covidCases = await (await (await fetch(`https://api.covid19api.com/country/${country[0].Slug}`).catch( () => {
        // If the API is unsuccessful, invoke displayError() function
        displayError(input.value)
    })).json())
    // If the current country is not available or hahs no record, invoke displayError
    // and clear the input for country then stop the code execution
    if(!covidCases || !covidCases.length) {
        displayError(input.value)
        input.value = ''
        return
    }
    // Diplay the results
    displayResult.style.display = "block"
    // The returned country is in array, get the last data of the array only
    const currCases = covidCases[covidCases.length - 1]
    // Format the date properly
    const date = new Intl.DateTimeFormat('ms-MY').format(new Date(currCases.Date))
    // Display the current picked country with the date
    displayCountry.innerHTML = `<p class='text-3xl font-bold mb-2 animate-word'>${input.value}</p><p class='font-bold animate-word'>${date}</p>`
    // Clear the country input
    input.value = ''
    
    // Get the specific data for each corresponding subject
    const activeCases = currCases.Active
    const confirmedCases = currCases.Confirmed
    const deathCases = currCases.Deaths
    const recoveredCases = currCases.Recovered
    
    // Append all the data to their respective element
    confirmed.innerHTML = `${displayResultCases(confirmedCases)}<p class='my-2 text-lg text-white'>Confirmed Cases</p>`
    recovered.innerHTML = `${displayResultCases(recoveredCases)}<p class='my-2 text-lg text-white'>Recovered</p>`
    active.innerHTML = `${displayResultCases(activeCases)}<p class='my-2 text-lg text-white'>Active Cases</p>`
    death.innerHTML = `${displayResultCases(deathCases)}<p class='my-2 text-lg text-white'>Deaths</p>`
}
}

// Display result function
function displayResultCases(cases) {
    return `<span class='font-bold animate-word text-4xl'>${cases}</span>`
}

// Handle error function
function handleError() {
    userCountry.innerText = `Please turn off your ad blocking extension and refresh.`
}

// Display error function
function displayError(country) {
    displayCountry.innerHTML = `<p class='p-10'>No records for ${country}</p>`
    displayResult.style.display = "none"
    result.innerHTML = `<p class='my-2 text-2xl'>No records of cases for ${input.value}</p>`
    input.value = ''
}