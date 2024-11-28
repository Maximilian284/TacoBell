const itaUrl = "https://mocki.io/v1/79f87e5d-b34a-4dba-b64b-32ad4ce919f7"
const engUrl = "https://mocki.io/v1/bfb40168-1a2f-4324-aa8a-611ab475ab5a"

document.addEventListener("DOMContentLoaded", () => {
    fetch(itaUrl)
        .then(response => response.json())
        .then(data => {
            populateDOM(data)
        })
})

const languageSelect = document.getElementById("language-select")
languageSelect.addEventListener("change", () => {
    
    fetch(languageSelect.value === "ita" ? itaUrl : engUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById("my-taco-h").style.visibility = "hidden"
            document.getElementById("my-taco-textarea").style.visibility = "hidden"
            document.getElementById("submit-button").style.visibility = "hidden"

            const myTacoTextarea = document.getElementById("my-taco-textarea")
            myTacoTextarea.innerHTML = ""

            resetDocument(data)
        })
})

const buildButton = document.getElementById("build-button")
buildButton.addEventListener("click", () => {
    fetch(languageSelect.value === "ita" ? itaUrl : engUrl)
        .then(response => response.json())
        .then(data => {
            populateTextarea(data)

            document.getElementById("my-taco-h").style.visibility = "visible"
            document.getElementById("my-taco-textarea").style.visibility = "visible"
            document.getElementById("submit-button").style.visibility = "visible"
        })
})

const resetButton = document.getElementById("reset-button")
resetButton.addEventListener("click", () => {
    fetch(languageSelect.value === "ita" ? itaUrl : engUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById("my-taco-h").style.visibility = "hidden"
            document.getElementById("my-taco-textarea").style.visibility = "hidden"
            document.getElementById("submit-button").style.visibility = "hidden"
        
            const myTacoTextarea = document.getElementById("my-taco-textarea")
            myTacoTextarea.innerHTML = ""

            resetDocument(data)
        })
})

