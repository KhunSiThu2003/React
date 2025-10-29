import { getCookie } from "react-use-cookie";

export const changeName = (data) => {
  const token = getCookie("my_token");
  return fetch(import.meta.env.VITE_API_URL + "/user-profile/change-name", {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changePassword = (data) => {
  const token = getCookie("my_token");
  return fetch(
    import.meta.env.VITE_API_URL + "/user-profile/change-password",
    {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export const changeProfileImage = (formData) => {
  const token = getCookie("my_token");
  return fetch(
    import.meta.env.VITE_API_URL + "/user-profile/change-profile-image",
    {
      method: "PATCH",
      body: formData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}