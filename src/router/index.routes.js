import { pages } from "../controllers/index";

const router = async (route) => {
  let content = document.querySelector("#root");
  content.innerHTML = "";
  console.log("route ok => ",route)
  switch (route) {
    case "#/": {
      return content.appendChild(pages.home());
    }
    default: {
      return content.appendChild(pages.home());
    }
  }

};
export { router };