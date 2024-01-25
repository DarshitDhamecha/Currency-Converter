const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropdows = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdows) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === 'from' && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === 'to' && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlage(evt.target);
    })
}

const updateFlage = (element) => {
    let currCode = element.value;
    let counteyCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${counteyCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

}


btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    if (amountVal === "" || amountVal < 1) {
        amountVal = 1;
        amount.value = "1";
    }
    console.log(fromCurr.value, toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let respons = await fetch(URL);
    let data = await respons.json();
    let rate = data[toCurr.value.toLowerCase()]
    let finalAmount = amountVal * rate;


    msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
})

