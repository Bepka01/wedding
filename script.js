'use strict';

const fullname = document.querySelector('#fullname');
const phone = document.querySelector('#phone');
const guests = document.querySelector('#guests');
const transfer = document.querySelector('#transfer');
const children = document.querySelector('#children');
const alcohol = document.querySelector('#alcohol');
const comments = document.querySelector('#comments');
const btn = document.querySelector('.submit-btn');
const errorBlock = document.querySelector('.error__block');

function showErrorMessage() {
  errorBlock.classList.add('error__block-active');
}

function hideErrorMassage() {
  errorBlock.classList.remove('error__block-active');
}

function clearForm() {
  fullname.value = '';
  phone.value = '';
  guests.value = '1';
  transfer.value = 'no';
  children.value = 'no';
  alcohol.value = 'any';
  comments.value = '';
  hideErrorMassage();
}

function validationForm() {
  let isValid = true;
  if (fullname.value === '' || phone.value === '') {
    isValid = false;
  }
  return isValid;
}

const ENDPOINT =
  'https://script.google.com/macros/s/AKfycbx9kq5g1UkME2LSCplyXUGbxBgR8Ia6VruOcShgne6GdJS9ClgdHiSDmVIbzUAtcgUR/exec';

async function submitForm(ev) {
  ev.preventDefault();

  const data = {
    name: fullname.value,
    phone: phone.value,
    guests: guests.value,
    transfer: transfer.value,
    children: children.value,
    alcohol: alcohol.value,
    comments: comments.value,
  };

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('HTTP ' + res.status);
    const out = await res.json();

    if (out.status === 'ok') {
      showModalWinwow();
      clearForm();
    } else {
      alert('Ошибка отправки формы');
    }
  } catch (e) {
    console.error(e);
    alert('Ошибка отправки формы');
  }
}

btn.addEventListener('click', submitForm);

document.addEventListener('DOMContentLoaded', function () {
  const targetDate = new Date();
  targetDate.setMonth(8);
  targetDate.setDate(27);
  targetDate.setHours(14);
  targetDate.setMinutes(30);
  targetDate.setSeconds(0);
  targetDate.setMilliseconds(0);

  const timerValues = document.querySelectorAll('.timer-value');
  const [weeksEl, daysEl, hoursEl, minutesEl, secondsEl] = timerValues;

  function updateTimer() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      clearInterval(timerInterval);
      timerValues.forEach((el) => (el.textContent = '00'));
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

const modalWindow = document.querySelector('.modal-overlay');

function showModalWinwow() {
  modalWindow.classList.add('modal__window-active');
}

const btnCloseModalWindow = document.querySelector('.modal-close');

function closeModalWindow() {
  modalWindow.classList.remove('modal__window-active');
}

btnCloseModalWindow.addEventListener('click', closeModalWindow);
