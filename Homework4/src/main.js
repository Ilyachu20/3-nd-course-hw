import { commentsData } from "./data/commentsData.js";
import { renderComments } from "./render/renderComments.js";
import { sanitize } from "./utils/sanitize.js";

const nameInput = document.querySelector(".add-form-name");
const textInput = document.querySelector(".add-form-text");
const button = document.querySelector(".add-form-button");
const comments = document.querySelector(".comments");

button.addEventListener("click", () => {
  if (nameInput.value.trim() === "" || textInput.value.trim() === "") {
    alert("Заполните пункт 'Имя' и добавьте комментарий");
    return;
  }

  const date = new Date().toLocaleString();

  commentsData.push({
    name: sanitize(nameInput.value),
    date: date,
    text: sanitize(textInput.value),
    likes: 0,
    isLiked: false,
  });

  renderComments(commentsData, textInput, comments);

  nameInput.value = "";
  textInput.value = "";
});

renderComments(commentsData, textInput, comments);
