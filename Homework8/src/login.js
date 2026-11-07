import { login } from "./api/authApi.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");
  const errorElement = document.querySelector(".login-error");
  const button = document.querySelector(".login-button");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    errorElement.classList.add("hidden");
    button.disabled = true;

    const loginValue = form.elements.login.value.trim();
    const passwordValue = form.elements.password.value;

    login(loginValue, passwordValue)
      .then((user) => {
        if (!user.token) {
          throw new Error("Сервер не вернул токен авторизации.");
        }
        localStorage.setItem("token", user.token);
        window.location.href = "index.html";
      })
      .catch((error) => {
        errorElement.textContent = error.message;
        errorElement.classList.remove("hidden");
      })
      .finally(() => {
        button.disabled = false;
      });
  });
});
