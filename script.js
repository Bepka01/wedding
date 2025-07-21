"use strict";

const fullname = document.querySelector("#fullname");
const phone = document.querySelector("#phone");
const guests = document.querySelector("#guests");
const transfer = document.querySelector("#transfer");
const children = document.querySelector("#children");
const alcohol = document.querySelector("#alcohol");
const comments = document.querySelector("#comments");
const btn = document.querySelector(".submit-btn");
const errorBlock = document.querySelector(".error__block");

function showErrorMessage() {
  errorBlock.classList.add("active");
  errorBlock.style.display = "flex";
}

function hideErrorMassage() {
  errorBlock.classList.remove("active");
  errorBlock.style.display = "none";
  errorBlock.textContent = "";
}

function clearForm() {
  fullname.value = "";
  phone.value = "";
  guests.value = "1";
  transfer.value = "no";
  children.value = "no";
  alcohol.value = "any";
  comments.value = "";
  hideErrorMassage();
}

function validationForm() {
  let isValid = true;
  if (fullname.value === "" || phone.value === "") {
    isValid = false;
  }
  return isValid;
}

function submitForm() {
  const data = {
    name: fullname.value,
    phone: phone.value,
    guests: guests.value,
    transfer: transfer.value,
    children: children.value,
    alcohol: alcohol.value,
    comments: comments.value,
  };
  if (validationForm() === true) {
    console.log(data);
    clearForm();
    alert("Форма успешно отправлена");
  } else {
    showErrorMessage(
      "Заполните обязательные поля: Фамилию и имя, номер телефона "
    );
  }
}

btn.addEventListener("click", submitForm);
