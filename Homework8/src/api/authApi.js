
const AUTH_URL = "https://wedev-api.sky.pro/api/user/login";

export const login = async (login, password) => {
  const response = await fetch(AUTH_URL, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  });

  let data = {};

  try {
    data = await response.json();
  } catch (error) {}

  if (!response.ok) {
    const error = new Error(
      data.error || "Не удалось авторизоваться. Проверьте логин и пароль.",
    );
    error.status = response.status;
    throw error;
  }

  return data.user || data;
};
