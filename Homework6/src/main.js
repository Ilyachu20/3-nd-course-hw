import { addComment, getComments } from "./api/commentsApi.js";
import { renderComments } from "./render/renderComments.js";
import { sanitize } from "./utils/sanitize.js";

document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.querySelector(".add-form-name");
  const textInput = document.querySelector(".add-form-text");
  const button = document.querySelector(".add-form-button");
  const comments = document.querySelector(".comments");
  const commentsLoading = document.querySelector(".comments-loading");
  const addForm = document.querySelector(".add-form");
  const addCommentLoading = document.querySelector(".add-comment-loading");

  let commentsData = [];

  const render = () => {
    renderComments(commentsData, textInput, comments);
  };

  const loadComments = () => {
    return getComments()
      .then((data) => {
        commentsData = data;
        render();
        commentsLoading.classList.add("hidden");
      })
      .catch((error) => {
        console.error(error);
        commentsLoading.textContent = "Не удалось загрузить комментарии";
      });
  };

  loadComments();

  button.addEventListener("click", () => {
    if (nameInput.value.trim() === "" || textInput.value.trim() === "") {
      alert("Заполните пункт 'Имя' и добавьте комментарий");
      return;
    }

    button.disabled = true;
    addForm.classList.add("hidden");
    addCommentLoading.classList.remove("hidden");

    addComment(sanitize(nameInput.value), sanitize(textInput.value))
      .then(() => {
        return getComments();
      })
      .then((data) => {
        commentsData = data;
        render();
        nameInput.value = "";
        textInput.value = "";
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      })
      .finally(() => {
        button.disabled = false;
        addForm.classList.remove("hidden");
        addCommentLoading.classList.add("hidden");
      });
  });
});
