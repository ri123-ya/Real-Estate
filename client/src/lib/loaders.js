// import { defer } from "react-router-dom";

import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/posts/" + params.id);
  return res.data;
};
export const listPageLoader = async ({ request, params }) => {
  //  console.log(request)
  const query = request.url.split("?")[1];
  const postPromise = apiRequest("/posts?" + query);
  return ({
   postResponse: postPromise,
  });
};

export const profilePageLoader = async () => {
  const postPromise = apiRequest("/users/profilePosts");
  const chatPromise = apiRequest("/chats");
  return ({
    postResponse: postPromise,
    chatResponse: chatPromise,
  });
};

// import apiRequest from "./apiRequest";

// export const singlePageLoader = async ({ params }) => {
//   try {
//     const res = await apiRequest("/posts/" + params.id);
//     return res.data;
//   } catch (error) {
//     console.error("Failed to load single post:", error);
//     throw new Response("Failed to load post", { status: 500 });
//   }
// };

// export const listPageLoader = async ({ request }) => {
//   const query = request.url.split("?")[1] || "";

//   try {
//     const postResponse = await apiRequest("/posts?" + query);
//     return { postResponse };
//   } catch (error) {
//     console.error("Failed to load posts:", error);
//     return { postResponse: [] }; // Return an empty array to avoid breaking the UI
//   }
// };

// export const profilePageLoader = async () => {
//   try {
//     const [postResponse, chatResponse] = await Promise.all([
//       apiRequest("/users/profilePosts"),
//       apiRequest("/chats"),
//     ]);

//     return { postResponse, chatResponse };
//   } catch (error) {
//     console.error("Failed to load profile data:", error);
//     return { postResponse: [], chatResponse: [] };
//   }
// };



