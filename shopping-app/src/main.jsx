import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './styles/sweetalert2.css'
import { BrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router'

// const categories = [
//   "electronics",
//   "jewelery",
//   "men's clothing",
//   "women's clothing",
// ];

// console.log(
//   categories.map((category) => createElement("button", null, category))
// );

const root = document.querySelector("#root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// view - react node
// const app = createElement(
//   "div",
//   { id: "category-section", className: "p-5" },
//   createElement(
//     "p",
//     { className: "text-2xl text-gray-500 mb-3" },
//     "Product Categories"
//   ),
//   createElement(
//     "div",
//     null,
//     ...categories.map((category) =>
//       createElement(
//         "button",
//         { className: "border border-black px-4 py-2 me-2" },
//         category
//       )
//     )
//   )
// );

// console.log(app);

// render
// createRoot(root).render(App());

// const title = document.createElement("p");
// title.innerText = "Product Categories";
// title.classList.add("text-2xl", "text-gray-500", "mb-3");

// const categoryButton = (categoryName) => {
//   const btn = document.createElement("button");
//   btn.innerText = categoryName;
//   btn.classList.add("border", "border-black", "px-4", "py-2", "me-2");
//   return btn;
// };

// root.append(title);
// categories.forEach((category) => root.append(categoryButton(category)));
