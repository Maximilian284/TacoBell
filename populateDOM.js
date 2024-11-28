const populateProteinsSelect = (data) => {
    const proteinsSelect = document.getElementById("proteins-select")
    data.forEach((element, i) => {
        const proteinsOption = document.createElement("option")
        proteinsOption.id = "proteins-option-" + i
        proteinsOption.value = "proteins-option-" + i + "-" + element.name
        proteinsOption.innerText = element.name + " (" + element.preparation + ")"
        proteinsSelect.appendChild(proteinsOption)
    })
}

const populateSalsasSelect = (data) => {
    const salsasSelect = document.getElementById("salsa-select")
    data.forEach((element, i)=> {
        const salsasOption = document.createElement("option")
        salsasOption.id = "salsas-option-" + i
        salsasOption.value = element.name
        salsasOption.innerText = element.name + " (" + element.spiciness + ")"
        salsasSelect.appendChild(salsasOption)
    })
}

const populateToppingsDiv = (data) => {
    data.forEach((element, i) => {
        let precDiv = false
        if (!!document.getElementById("topping-div-0")) {
            precDiv = document.getElementById(`topping-div-${i-1}`)
        } 
        const toppingDiv = document.createElement("div")
    
        const toppingOptionI = document.createElement("input")
        const toppingOptionL = document.createElement("label")

        toppingDiv.classList.add("form-check")
        toppingDiv.id = "topping-div-" + i

        toppingOptionI.classList.add("form-check-input")
        toppingOptionI.type = "checkbox"
        toppingOptionI.value = element.name
        toppingOptionI.id = "topping-option-" + i
        
        toppingOptionL.classList.add("form-check-label")
        toppingOptionL.setAttribute("for", "topping-option-" + i)
        toppingOptionL.innerText = element.name + " (" + element.quantity + ")"

        if (!!precDiv) {
            precDiv.after(toppingDiv)
        } else {
            document.getElementById("submit-div").before(toppingDiv)
        }
        toppingDiv.appendChild(toppingOptionI)
        toppingDiv.appendChild(toppingOptionL)
    })
}

const populateDOM = (data) => {
    data = data.proteins 

    populateProteinsSelect(data)

    const proteinsSelect = document.getElementById("proteins-select")
    proteinsSelect.addEventListener("change", () => {
        const salsasSelect = document.getElementById("salsa-select")
        salsasSelect.innerHTML = ""
        populateSalsasSelect(data[parseInt(proteinsSelect.value.split("-")[2])].salsas)

        const divs = document.getElementsByClassName("form-check")
        while (divs.length > 0) {
            divs[0].parentNode.removeChild(divs[0])
        }
        populateToppingsDiv(data[parseInt(proteinsSelect.value.split("-")[2])].toppings)
    })

    populateSalsasSelect(data[0].salsas)

    populateToppingsDiv(data[0].toppings)
}

const resetDocument = (data) => {
    const proteinsSelect = document.getElementById("proteins-select")
    proteinsSelect.innerHTML = "" 
    
    const salsasSelect = document.getElementById("salsa-select")
    salsasSelect.innerHTML = ""

    const divs = document.getElementsByClassName("form-check")
    while (divs.length > 0) {
        divs[0].parentNode.removeChild(divs[0])
    }
    populateDOM(data)
}

const populateTextarea = (data) => {
    data = data.proteins

    const proteinIndex = document.getElementById("proteins-select").value.split("-")[2]
    const salsaValue = document.getElementById("salsa-select").value
    const toppingInputs = document.getElementsByClassName("form-check-input")
    const toppings = [] 
    for (let i = 0; i < toppingInputs.length; i++){
        toppings.push(toppingInputs[i].checked ? toppingInputs[i].value : null)
    }

    let proteinString = data[proteinIndex].name + " (" + data[proteinIndex].preparation + ")"
    let salsaString = salsaValue
    for (let i = 0; i < data[proteinIndex].salsas.length; i++) {
        if (salsaValue === data[proteinIndex].salsas[i].name) salsaString += " (" + data[proteinIndex].salsas[i].spiciness + ")" 
    }

    for (let i = 0; i < data[proteinIndex].toppings.length; i++) {
        for (let j = 0; j < toppings.length; j++) {
            if (data[proteinIndex].toppings[i].name === toppings[j]) toppings[j] += " (" + data[proteinIndex].toppings[i].quantity + ")"
        }
    }
    
    tacoString = `Protein: ${proteinString}\nSalsa: ${salsaString}\nToppings: ${toppings.filter(e => e).join(", ")}`

    const myTacoTextarea = document.getElementById("my-taco-textarea")
    myTacoTextarea.innerHTML = tacoString
}