const calculator = document.getElementById('calculator');
const input = document.getElementById('input');
const clearButton = document.getElementById('clear');
const submit = document.getElementById('submit');
const deleteButton = document.getElementById('delete');

// BUTTON INPUT (Event Delegation)
calculator.addEventListener('click', (e) => {
  const value = e.target.dataset.value;
  const fn = e.target.dataset.fn;

  if (input.value === 'Error') {
    input.value = '';
    input.style.textAlign = 'right';
    input.style.color = 'white';
  }

  if (value) {
    input.value += value;
  } else if (fn) {
    applyFunction(fn);
  }
});

// EQUALS
submit.addEventListener('click', () => {
   try {
    const expr = input.value;

    // Regex prüfen: nur erlaubte Zeichen + keine zwei Operatoren hintereinander
    if (!/^(?!.*[+\-*/]{2})[0-9+\-*/().\s]+$/.test(expr)) {
      throw new Error();
    }

    // Berechnung
    const result = Function(`"use strict"; return (${expr})`)();

    // Prüfen auf NaN oder Infinity
    if (!Number.isFinite(result)) {
      throw new Error();
    }

    // Ergebnis runden
    input.value = round(result);
    input.style.color = 'white';
    input.style.textAlign = 'right';

  } catch (error) {
    input.value = 'Error';
    input.style.textAlign = 'center';
    input.style.color = 'red';
  }
});

deleteButton.addEventListener('click', () => {
  if (input.value === 'Error') {
    input.value = '';
  } else {
    input.value = input.value.slice(0, -1);
  }
});

// CLEAR
clearButton.addEventListener('click', () => {
  input.value = '';
  input.style.textAlign = 'right';
  input.style.color = 'white';
});

// HELPERS

function round(num) {
  return Math.round(num * 100) / 100;
}

function applyFunction(fn) {
  try {
    let val = parseFloat(input.value); 

    switch(fn) {
      case 'sqrt': 
        if (val < 0) throw new Error();
        val = Math.sqrt(val);
        break;
      case 'percent':
        val = val / 100;
        break;
      case "ln": 
        if (val <= 0) throw new Error();
        val = Math.log(val);
        break;
      case "exp":
        val = Math.exp(val);
        break;
      case "cbrt":
        val = Math.cbrt(val);
        break;
      case "sin":
        val = Math.sin(val);
        break;
      case "cos":
        val = Math.cos(val);
        break;
      case "tan":
        val = Math.tan(val);
        break;
      case "pow2":
        val = Math.pow(val, 2);
        break;
    }

    // Prüfen auf NaN oder Infinity
    if (!Number.isFinite(val)) {
      throw new Error();
    }

    input.value = Math.round(val * 100) / 100;
    
  } catch (error)  {
     input.value = 'Error';
     input.style.textAlign = 'center';
     input.style.color = 'red';
  }
}
