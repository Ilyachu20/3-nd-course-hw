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
  const authLink = document.querySelector(".auth-link");
  const logoutButton = document.querySelector(".logout-button");

  let commentsData = [];
  let token = localStorage.getItem("token");

  const updateAuthView = () => {
    addForm.classList.toggle("hidden", !token);
    authLink.classList.toggle("hidden", Boolean(token));
    logoutButton.classList.toggle("hidden", !token);
  };

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    token = null;
    updateAuthView();
  });

  updateAuthView();

  const render = () => renderComments(commentsData, textInput, comments);

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
        commentsLoading.textContent = error.status
          ? "Не удалось загрузить комментарии. Попробуйте позже."
          : "Нет подключения к интернету. Проверьте соединение и попробуйте снова.";
      });
  };

  loadComments();

  button.addEventListener("click", () => {
    if (!token) return;
    if (nameInput.value.trim() === "" || textInput.value.trim() === "") {
      alert("Заполните пункт 'Имя' и добавьте комментарий");
      return;
    }

    button.disabled = true;
    addForm.classList.add("hidden");
    addCommentLoading.classList.remove("hidden");

    addComment(textInput.value.trim(), token)
      .then(() => getComments())
      .then((data) => {
        commentsData = data;
        render();
        nameInput.value = "";
        textInput.value = "";
      })
      .catch((error) => {
        console.error(error);
        if (error.status === 401) {
          localStorage.removeItem("token");
          token = null;
          updateAuthView();
          alert("Сессия завершилась. Войдите в аккаунт снова.");
        } else {
          alert(error.message || "Не удалось добавить комментарий. Попробуйте позже.");
        }
      })
      .finally(() => {
        button.disabled = false;
        addCommentLoading.classList.add("hidden");
        updateAuthView();
      });
  });
});
