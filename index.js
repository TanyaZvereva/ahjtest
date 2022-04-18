const button = document.querySelector("button")
button.addEventListener('click',() => {
    const input = document.querySelector("input")
    const cardNumber = input.value
    const isValid = Moon_Algorithm(cardNumber)
    document.querySelector('#algoritm_validation').innerText = isValid
    const validSystem = checkPaymentSystem(cardNumber, isValid)
    document.querySelector('#paymentsystem_validation').innerText = validSystem
})
const Moon_Algorithm = setValue => {
    let ch = 0;
    const num = String(setValue).replace(/\D/g, '');
    const isOdd = num.length % 2 !== 0;

    if ('' === num) return false;

    for (let i = 0; i < num.length; i++) {
        let n = parseInt(num[i], 10);

        ch += (isOdd | 0) === (i % 2) && 9 < (n *= 2) ? (n - 9) : n;
    }

    return 0 === (ch % 10);
};

const checkPaymentSystem = (cardNumber,isValid) => {
    if(!isValid){
        return 'Card isn`t valid' 
    }
    switch(String(cardNumber)[0]) {
        case '0':
        case '1':
        case '7':
        case '8':
        case '9': 
            return 'Card isn`t valid'  
        case '2':
            return 'МИР'
        case '3':
            return 'American Express'
        case '4':
            return 'Visa'
        case '5':
            return 'Mastercard'
        case '6':
            return 'Maestro'
        default: 
            return 'Card isn`t valid' 
    }
}