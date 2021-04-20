import view from "../view/home.html";
import menu from "../mock/data";
export default () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = view;

  const sectionsCards = divElement.querySelector(".sectionCards");
  const sectionsButtonsContainer = divElement.querySelector(".sectionButtons");

  const modalBtn = divElement.querySelector(".modal-btn");
  const modal = divElement.querySelector(".modal-overlay");
  const closeBtn = divElement.querySelector(".close-btn"); 

/*   function modalShowInfo(item){
   console.log("LISTA",item)
}; */
  let diplayMenuItems = (menuItems) => {
    let displayMenu = menuItems.map(function (item) {
    
    /*   <article onclick=${modalShowInfo(item)}></article> */
      return `
        <article class="sectionCards_Article">
        <img src="${item.img}" alt=${item.title} class="sectionCards_Img" />
            <h4 class="sectionCards_Title">${item.title}</h4>
      </article>
          `;
        
    });
    displayMenu = displayMenu.join("");
    sectionsCards.innerHTML = displayMenu;
  };

  //BUTTONS
  function displayMenuButtons() {
    const categories = menu.reduce(
      (values, item) => {
        if (!values.includes(item.category)) {
          values.push(item.category);
        }
        return values;
      },
      ["Todos"]
    );

    const selectCategoriesButtons = categories
      .map((category) => {
        return `<button class="sectionButtons_Filter" type="button"  data-id=${category}>${category}</button>`;
      })
      .join("");
    sectionsButtonsContainer.innerHTML = selectCategoriesButtons;
    const sectionsButtons = divElement.querySelectorAll(
      ".sectionButtons_Filter"
    );

    sectionsButtons.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        const category = e.currentTarget.dataset.id;
        const menuCategory = menu.filter((menuItem) => {
          if (menuItem.category === category) {
            return menuItem;
          }
        });
        if (category === "Todos") {
          diplayMenuItems(menu);
        } else {
          diplayMenuItems(menuCategory);
        }
      });
    });
  }
  //MODAL
  let modalBasic=()=>{
    modalBtn.addEventListener("click", function () {
      modal.classList.add("open-modal");
    });
    closeBtn.addEventListener("click", function () {
      modal.classList.remove("open-modal");
    });
  }
  diplayMenuItems(menu);
  displayMenuButtons();
  modalBasic()
  return divElement;
};
