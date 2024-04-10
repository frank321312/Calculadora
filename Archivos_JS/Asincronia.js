const calculadora = document.querySelector(".calculadora");
const resultado = document.querySelector(".resultado");

const fragmentCalculadora = document.createDocumentFragment();

function ResolverOperacion(...args) {

}

for (let index = 0; index < 13; index++) {
    const divNumber = document.createElement("div");
    const divAritmetica = document.createElement("div");
    divAritmetica.classList.add("aritmetica");
    divNumber.classList.add("numberContainer");
    divNumber.textContent = index;

    switch (index) {
        case 3: divAritmetica.textContent = "DEL";
                fragmentCalculadora.appendChild(divAritmetica);
                break;
        case 6: divAritmetica.textContent = "+";
                fragmentCalculadora.appendChild(divAritmetica);
                break;
        case 9: divAritmetica.textContent = "-";
                fragmentCalculadora.appendChild(divAritmetica);
                break;
        case 10: divAritmetica.textContent = "x";
                fragmentCalculadora.appendChild(divAritmetica);
                break;
        case 11: divAritmetica.textContent = "/";
                fragmentCalculadora.appendChild(divAritmetica);
                break;
        case 12: divAritmetica.textContent = "=";
                fragmentCalculadora.appendChild(divAritmetica);
                break;
        default: console.log("Error");
                break;
    }

    if (index < 10) {
        fragmentCalculadora.appendChild(divNumber);
    }

    divNumber.addEventListener("click", () => {
        resultado.innerHTML += divNumber.textContent; 
    });

    divAritmetica.addEventListener("click", () => {
        if (divAritmetica.textContent != "=" && divAritmetica.textContent != "DEL") {
            resultado.innerHTML += divAritmetica.textContent; 
        } else if (divAritmetica.textContent == "DEL") {
            let listResult = resultado.textContent.split("");
            listResult.pop()
            resultado.textContent = listResult.join("");
        } else if (divAritmetica.textContent == "=") {
            
        }
        
    });
}

calculadora.appendChild(fragmentCalculadora);
// let list = [1,2,3,4,5,6,7];
