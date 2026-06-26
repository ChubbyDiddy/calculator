// Portfolio Calculator - index.js

const display = document.getElementById("display")
const history = document.getElementById("history")
const buttons = document.querySelectorAll("button")

let current = ""
let previous = ""
let operator = null

// Update the display
function updateDisplay(value){
    display.textContent = value || "0"
}

// Perform calculation
function calculate(){
    const prev = parseFloat(previous)
    const curr = parseFloat(current)
    if(isNaN(prev) || isNaN(curr)) return

    let result
    switch(operator){
        case "+": result = prev + curr; break
        case "-": result = prev - curr; break
        case "*": result = prev * curr; break
        case "/": result = prev / curr; break
    }

    // Show calculation in history
    history.textContent = `${previous} ${operator} ${current} =`
    current = result.toString()
    operator = null
    previous = ""
    updateDisplay(current)
}

// Button click events
buttons.forEach(button=>{
    button.addEventListener("click", ()=>{
        const value = button.textContent

        // Clear
        if(value === "C"){
            current = ""
            previous = ""
            operator = null
            history.textContent = ""
            updateDisplay("0")
            return
        }

        // Equals
        if(value === "="){
            calculate()
            return
        }

        // Operators
        if(["+", "-", "*", "/"].includes(value)){
            if(current === "") return
            operator = value
            previous = current
            current = ""
            return
        }

        // Decimal
        if(value === "." && current.includes(".")) return

        // Numbers
        current += value
        updateDisplay(current)
    })
})

// Keyboard support including NumPad
document.addEventListener("keydown", (e)=>{
    let key = e.key

    // Map NumPad keys to regular operators
    if(key === "Add") key = "+"
    if(key === "Subtract") key = "-"
    if(key === "Multiply") key = "*"
    if(key === "Divide") key = "/"

    // Numbers
    if(!isNaN(key)){
        current += key
        updateDisplay(current)
        return
    }

    // Decimal
    if(key === "."){
        if(!current.includes(".")){
            current += "."
            updateDisplay(current)
        }
        return
    }

    // Operators
    if(["+", "-", "*", "/"].includes(key)){
        if(current === "") return
        operator = key
        previous = current
        current = ""
        return
    }

    // Equals (Enter or NumPad Enter)
    if(key === "Enter"){ calculate(); return }

    // Backspace
    if(key === "Backspace"){
        current = current.slice(0, -1)
        updateDisplay(current)
        return
    }

    // Clear (Escape)
    if(key === "Escape"){
        current = ""
        previous = ""
        operator = null
        history.textContent = ""
        updateDisplay("0")
        return
    }
})