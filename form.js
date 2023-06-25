window.onload = function() {

const signupBtn = document.getElementById('signupBtn');
const signinBtn = document.getElementById('signinBtn');
const hideFields = document.getElementsByClassName('hide');
const form = document.getElementById('form');
const nume = document.getElementById('nume');
const email = document.getElementById('email');
const telefon = document.getElementById('telefon');
const parola = document.getElementById('parola');
const title = document.getElementById('title');
const inputs = Array.prototype.slice.call(
    document.querySelectorAll('input')
  );
const user = {}
const users = JSON.parse(localStorage.getItem('users')) || [];

let formBox = document.getElementsByClassName('form-box');

form.addEventListener('submit', e => {
    e.preventDefault();

    const sign = document.getElementsByClassName("disable");
    if(sign[0] == signinBtn){
        validateInputs();
        const errors = document.getElementsByClassName('input-field error');
        if(errors.length==0){
            users.push(user);
            const usersJSON = JSON.stringify(users);
            localStorage.setItem('users', usersJSON);
            window.location.href = "index.html";
        }
    }
    else{
        if(verifyInputs())
            window.location.href = "index.html";
    }
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const isValidEmail = email => {
    const re = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+$/;
    return re.test(String(email).toLowerCase());
}

const isValidNume = nume => {
    const re = /^[a-zA-Z ]+$/;
    return re.test(String(nume));
}

const isValidTelefon = telefon => {
    const re = /^[0-9]{10,12}$/;
    return re.test(String(telefon));
}

const validateInputs = () => {
    const numeValue = nume.value.trim();
    const emailValue = email.value.trim();
    const telefonValue = telefon.value.trim();
    const parolaValue = parola.value.trim();

    if(numeValue === ''){
        setError(nume, 'Numeele este obligatoriu');
    } else if (!isValidNume(numeValue)){
        setError(nume, 'Nume invalid');
    } else {
        setSuccess(nume);
        user.nume = numeValue;
    }

    if(emailValue === ''){
        setError(email, 'Email-ul este obligatoriu');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Email invalid');
    } else {
        setSuccess(email);
        user.email = emailValue;
    }
    if(telefonValue === ''){
        setSuccess(telefon);
        user.phone = telefonValue;
    } else if (!isValidTelefon(telefonValue)) {
        setError(telefon, 'Telefon invalid');
    } else {
        setSuccess(telefon);
        user.phone = telefonValue;
    }
    if(parolaValue === ''){
        setError(parola, 'Parola e obligatorie');
    } else if (parolaValue.length < 8){
        setError(parola, 'Parola trebuie sa fie minim 8 caractere');
    } else {
        setSuccess(parola);
        user.password = parolaValue;
    }
}

const verifyInputs = () => {
    const emailValue = email.value.trim();
    const parolaValue = parola.value.trim();
    for(let i=0; i<users.length; i++){
        if(emailValue == users[i].email && parolaValue == users[i].password)
            return true;
    }
    setError(email, 'Email sau parola incorecta');
    setError(parola, '');
    return false;
}

inputs.forEach((input) => {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        focusNext();
      }
    });
  });

function focusNext() {
    const currInput = document.activeElement;
    const currInputIndex = inputs.indexOf(currInput);
    if(currInputIndex == inputs.length-1){
        document.getElementById("signupBtn").click();
        return;
    }
    const nextinputIndex = (currInputIndex + 1) % inputs.length;
    const input = inputs[nextinputIndex];
    input.focus();
  }

signinBtn.onclick = function(){
    title.innerHTML = "Sign In";
    signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");
    for(let i=0; i<hideFields.length; i++){
     //   hideFields[i].style.borderBottom = "0";
     //   hideFields[i].style.maxHeight = "0";
       hideFields[i].style.display = "none";
        }
    const inputs = Array.prototype.slice.call(
        document.querySelectorAll('input:not(.disable)')
        );
}

signupBtn.onclick = function(){
    title.innerHTML = "Sign Up";
    signupBtn.classList.remove("disable");
    signinBtn.classList.add("disable");
    for(let i=0; i<hideFields.length; i++){
   //     hideFields[i].style.borderBottom = "2px solid white";
     //   hideFields[i].style.maxHeight = "60px";
     hideFields[i].style.display = "flex";
        }
}

}