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
    commentsLoading.textContent = "Загружаем комментарии...";
    commentsLoading.classList.remove("hidden");

    return getComments()
      .then((data) => {
        commentsData = data;
        render();
        commentsLoading.classList.add("hidden");
      })
      .catch((error) => {
        console.error(error);

        if (error.status === 500) {
          commentsLoading.textContent =
            "Ошибка сервера. Не удалось загрузить комментарии. Попробуйте позже.";
        } else if (error.status) {
          commentsLoading.textContent =
            "Не удалось загрузить комментарии. Попробуйте позже.";
        } else {
          commentsLoading.textContent =
            "Нет подключения к интернету. Проверьте соединение и попробуйте снова.";
        }
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

    addComment(nameInput.value.trim(), textInput.value.trim())
      .then(() => getComments())
      .then((data) => {
        commentsData = data;
        render();
        nameInput.value = "";
        textInput.value = "";
      })
      .catch((error) => {
        console.error(error);

        if (error.status === 500) {
          alert("Ошибка сервера. Не удалось добавить комментарий. Попробуйте позже.");
        } else if (error.status === 400) {
          alert(error.message);
        } else if (error.status) {
          alert("Не удалось добавить комментарий. Попробуйте позже.");
        } else {
          alert("Нет подключения к интернету. Проверьте соединение и попробуйте снова.");
        }
      })
      .finally(() => {
        button.disabled = false;
        addForm.classList.remove("hidden");
        addCommentLoading.classList.add("hidden");
      });
  });
});
