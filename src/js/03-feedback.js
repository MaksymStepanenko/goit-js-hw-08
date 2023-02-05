
import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('input[name="email"]');
const textarea = document.querySelector('textarea[name="message"]');
const FORM_KEY = 'feedback-form-state';

form.addEventListener('submit', onFormSubmin);
form.addEventListener('input', throttle(onTextareaInput, 500));

let formValues = {
  email: "",
  message: "",
};

populateDataFormOutput()

function populateDataFormOutput() {
  const dataForm = load(FORM_KEY);
  if (dataForm === undefined) {
    input.value = '';
    textarea.value = '';
  } else {
    input.value = dataForm.email;
  textarea.value = dataForm.message;
  }
}

function onFormSubmin(e) {
  e.preventDefault();
  const {
    elements: { email, message },
  } = e.currentTarget;
  const currentData = load(FORM_KEY);
    console.log(currentData);
    e.currentTarget.reset();
    localStorage.removeItem(FORM_KEY);
}

function onTextareaInput() {
  formValues.email = input.value;
  formValues.message = textarea.value;

  save(FORM_KEY, formValues);
}


function populateDataFormOutput() {
  const dataForm = load(FORM_KEY);
  if (dataForm === undefined) {
    input.value = '';
    textarea.value = '';
  } else {
    input.value = dataForm.email;
  textarea.value = dataForm.message;
  }
}

function save(key, value) {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
}


function load(key) {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
}

