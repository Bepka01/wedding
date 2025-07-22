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

document.addEventListener("DOMContentLoaded", function () {
  // Устанавливаем целевую дату - 27 сентября 14:30 текущего года
  const targetDate = new Date();
  targetDate.setMonth(8); // 8 = сентябрь (месяцы от 0 до 11)
  targetDate.setDate(27);
  targetDate.setHours(14);
  targetDate.setMinutes(30);
  targetDate.setSeconds(0);
  targetDate.setMilliseconds(0);

  const timerValues = document.querySelectorAll(".timer-value");
  const [weeksEl, daysEl, hoursEl, minutesEl, secondsEl] = timerValues;

  function updateTimer() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      clearInterval(timerInterval);
      timerValues.forEach((el) => (el.textContent = "00"));
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const weeks = Math.floor(totalSeconds / (3600 * 24 * 7));
    const days = Math.floor((totalSeconds % (3600 * 24 * 7)) / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    weeksEl.textContent = formatTime(weeks);
    daysEl.textContent = formatTime(days);
    hoursEl.textContent = formatTime(hours);
    minutesEl.textContent = formatTime(minutes);
    secondsEl.textContent = formatTime(seconds);
  }

  function formatTime(value) {
    return value < 10 ? `0${value}` : value.toString();
  }

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
});
