"use strict";

const fullname = document.querySelector("#fullname");
const phone = document.querySelector("#phone");
const guests = document.querySelector("#guests");
const transfer = document.querySelector("#transfer");
const children = document.querySelector("#children");
const comments = document.querySelector("#comments");
const btn = document.querySelector(".submit-btn");
const errorBlock = document.querySelector(".error__block");
const loaderOverlay = document.querySelector(".loader-overlay");

function showLoader() {
  loaderOverlay.classList.add("loader-overlay__active");
}

function hideLoader() {
  loaderOverlay.classList.remove("loader-overlay__active");
}
function showErrorMessage() {
  errorBlock.classList.add("error__block-active");
}

function hideErrorMassage() {
  errorBlock.classList.remove("error__block-active");
}

function clearForm() {
  fullname.value = "";
  phone.value = "";
  guests.value = "1";
  transfer.value = "нет";
  children.value = "нет";
  comments.value = "";
  hideErrorMassage();
}

function validationForm() {
  let isValid = true;
  if (fullname.value === "" || phone.value === "") {
    isValid = false;
    showErrorMessage();
  }
  return isValid;
}

const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbx9kq5g1UkME2LSCplyXUGbxBgR8Ia6VruOcShgne6GdJS9ClgdHiSDmVIbzUAtcgUR/exec";

async function submitForm(ev) {
  ev.preventDefault();

  if (!validationForm()) return;

  showLoader();
  btn.disabled = true;

  const data = {
    name: fullname.value,
    phone: phone.value,
    guests: guests.value,
    transfer: transfer.value,
    children: children.value,
    comments: comments.value,
  };

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("HTTP " + res.status);
    const out = await res.json();

    if (out.status === "ok") {
      showModalWinwow();
      clearForm();
    } else {
      alert("Ошибка отправки формы");
    }
  } catch (e) {
    console.error(e);
    alert("Ошибка отправки формы");
  } finally {
    hideLoader();
    btn.disabled = false;
  }
}

btn.addEventListener("click", submitForm);

document.addEventListener("DOMContentLoaded", function () {
  const targetDate = new Date(2025, 8, 27, 15, 0, 0);

  const weeksEl = document.querySelector(
    ".timer-block:nth-child(1) .timer-value"
  );
  const daysEl = document.querySelector(
    ".timer-block:nth-child(3) .timer-value"
  );
  const hoursEl = document.querySelector(
    ".timer-block:nth-child(5) .timer-value"
  );
  const minutesEl = document.querySelector(
    ".timer-block:nth-child(7) .timer-value"
  );
  const secondsEl = document.querySelector(
    ".timer-block.seconds-block .timer-value"
  );

  const weeksLabel = document.querySelector(
    ".timer-block:nth-child(1) .timer-label"
  );
  const daysLabel = document.querySelector(
    ".timer-block:nth-child(3) .timer-label"
  );
  const hoursLabel = document.querySelector(
    ".timer-block:nth-child(5) .timer-label"
  );
  const minutesLabel = document.querySelector(
    ".timer-block:nth-child(7) .timer-label"
  );
  const secondsLabel = document.querySelector(
    ".timer-block.seconds-block .timer-label"
  );

  function updateTimer() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      clearInterval(timerInterval);
      [weeksEl, daysEl, hoursEl, minutesEl, secondsEl].forEach(
        (el) => (el.textContent = "00")
      );
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

    weeksLabel.textContent = pluralize(weeks, ["неделя", "недели", "недель"]);
    daysLabel.textContent = pluralize(days, ["день", "дня", "дней"]);
    hoursLabel.textContent = pluralize(hours, ["час", "часа", "часов"]);
    minutesLabel.textContent = pluralize(minutes, [
      "минута",
      "минуты",
      "минут",
    ]);
    secondsLabel.textContent = pluralize(seconds, [
      "секунда",
      "секунды",
      "секунд",
    ]);
  }

  function pluralize(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[Math.min(number % 10, 5)]
    ];
  }

  function formatTime(value) {
    return value < 10 ? `0${value}` : value.toString();
  }

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
});

const modalWindow = document.querySelector(".modal-overlay");

function showModalWinwow() {
  modalWindow.classList.add("modal__window-active");
}

const btnCloseModalWindow = document.querySelector(".modal-close");

function closeModalWindow() {
  modalWindow.classList.remove("modal__window-active");
}

btnCloseModalWindow.addEventListener("click", closeModalWindow);
