const personalKey = "ilya-chu";

const API_URL = `https://wedev-api.sky.pro/api/v1/${personalKey}/comments`;

export const getComments = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Не удалось загрузить комментарии");
  }

  const data = await response.json();

  return data.comments.map((comment) => ({
    id: comment.id,
    name: comment.author.name,
    date: new Date(comment.date).toLocaleString(),
    text: comment.text,
    likes: comment.likes,
    isLiked: comment.isLiked,
  }));
};

export const addComment = async (name, text) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      text: text,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Не удалось добавить комментарий");
  }

  return data;
};
