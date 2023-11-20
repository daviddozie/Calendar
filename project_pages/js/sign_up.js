document.addEventListener("DOMContentLoaded", function () {
    const circles = document.querySelectorAll('.item-circle1, .item-circle2, .item-circle3, .item-circle4, .item-circle5, .item-circle6, .item-circle7, .item-circle8');
    const delayBetweenCircles = 1000;

    let index = 0;

    function displayNextCircle() {
        if (index < circles.length) {
            circles[index].style.display = 'block';
            index++;
            setTimeout(displayNextCircle, delayBetweenCircles);
        }
    }

    displayNextCircle();
});

let submitForm = document.getElementById('validateSignIn');
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let email = document.getElementById('email');
let password = document.getElementById('password');
let comfirmPassword = document.getElementById('comfirmPassword');


function validateFirstName(firstnameinput, event) {
    if (firstnameinput.value === "") {
        firstnameinput.nextElementSibling.innerHTML = "Please enter first name !";
        firstName.style.borderColor = "red";
        event.preventDefault();
        return false;
    } else {
        firstnameinput.nextElementSibling.innerHTML = "";
        firstName.style.border = "2px solid green";
        return true;
    }
};

function validateLastName(lastnameinput, event) {
    if (lastnameinput.value === "") {
        lastnameinput.nextElementSibling.innerHTML = "Please enter first name !";
        lastName.style.borderColor = "red";
        event.preventDefault();
        return false;
    } else {
        lastnameinput.nextElementSibling.innerHTML = "";
        lastName.style.border = "2px solid green";
        return true
    }
};

function validateEmail(emailinput, event) {
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailinput.value === "") {
        emailinput.nextElementSibling.innerHTML = "Please enter your email address";
        email.style.borderColor = "red";
        event.preventDefault();
        return false;
    }else if (!emailinput.value.match(emailRegex)) {
        emailinput.nextElementSibling.innerHTML = "Please enter a valid email";
        email.style.borderColor = "red";
        return false;
    } else {
        emailinput.nextElementSibling.innerHTML = "";
        email.style.border = "2px solid green";
        return true;
    }
};

function validatePassword(passwordinput, event) {
    let pwdRegex = /^(?=.*[A-Z])(?=.*[@*+%$#&])(?=.*\d).{6,}$/;
    if (passwordinput.value === "") {
        passwordinput.nextElementSibling.innerHTML = "Please enter password !";
        password.style.borderColor = "red";
        event.preventDefault();
        return false;
    } else if (!passwordinput.value.match(pwdRegex)) {
        passwordinput.nextElementSibling.innerHTML = "Your password should have a minimum of 6 characters, 1 capital letter, 1 special character eg @*$#&+% and 1 number !";
        password.style.borderColor = "red";
        return false;
    } else {
        passwordinput.nextElementSibling.innerHTML = "";
        password.style.border = "2px solid green";
        return true;
    }
}

function validateComfirmPassword(comfirminput, event) {
    if (comfirminput.value === "") {
        comfirminput.nextElementSibling.innerHTML = "Please comfirm password !";
        comfirmPassword.style.borderColor = "red";
        event.preventDefault();
        return false;
    } else if (comfirminput.value !== password.value) {
        comfirminput.nextElementSibling.innerHTML = "Please password don't match !";
        comfirmPassword.style.borderColor = "red";
        return false;
    } else {
        comfirminput.nextElementSibling.innerHTML = "";
        comfirmPassword.style.border = "2px solid green";
        return true;
    }
}

function houseFunction(e) {
    e.preventDefault();

    let firstNameValidation = validateFirstName(firstName, e);
    let emailValidation = validateEmail(email, e);
    let lastNameValidation = validateLastName(lastName, e);
    let passwordValidation = validatePassword(password, e);
    let comfirmPasswordValidation = validateComfirmPassword(comfirmPassword, e);

    if (firstNameValidation && emailValidation && lastNameValidation && passwordValidation && comfirmPasswordValidation) {
        let loader = document.querySelector('.load');
        loader.style.display = "block";

        setTimeout(() => {
            window.location.href = '../auth/verification.html';
        }, 3000);
    }

    return true;
}

submitForm.addEventListener('submit', houseFunction);

for (let i = 1; i < 3; i++) {
    let passwordHide = document.getElementsByClassName(`hidepassword${i}`)[0];
    let passwordShow = document.getElementsByClassName(`showPassword${i}`)[0];
    let passwordText = document.getElementsByClassName(`passText${i}`)[0];

    passwordHide.addEventListener('click', () => {
        passwordShow.style.display = 'unset';
        passwordHide.style.display = 'none';

        if (passwordText.type === 'password') {
            passwordText.type = 'text';
        } else {
            passwordText.type = 'password';
        }
    })

    passwordShow.addEventListener('click', () => {
        passwordShow.style.display = 'none';
        passwordHide.style.display = 'unset';

        if (passwordText.type === 'text') {
            passwordText.type = 'password';
        } else {
            passwordText.type = 'text';
        }
    })
}