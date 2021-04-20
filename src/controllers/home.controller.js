import view from "../view/home.html";
import menu from "../mock/data";
export default () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = view;

  const sectionsCards = divElement.querySelector(".sectionCards");
  const sectionsButtonsContainer = divElement.querySelector(".sectionButtons");
  const selectModalContainer = divElement.querySelector(".sectionModals");
  let diplayMenuItems = (menuItems) => {
    let displayMenu = menuItems.map(function (item) {
      return `
              <article class="sectionCards_Article">
              <img src="${item.img}" alt=${item.title} class="sectionCards_Article_Img" />
                  <div class="sectionCards_Article_Container">
                  <h4 class="sectionCards_Article_Container_Title">${item.title}</h4>
                  </div>
            </article>
                `;

    });
    /* displayModalItems(); */
    displayMenu = displayMenu.join("")
    sectionsCards.innerHTML = displayMenu;

  };

  //MODAL
/*   function displayModalItems() {
    const modals = menu.reduce(
      (values, item) => {
        if (!values.includes(item.id)) {
          values.push(item.id);
        }
        return values;
      },
      ["Todos"]
    );

    const selectModals = modals.map((id) => {
      return `<div class="sectionModals_Items"  data-id=${id}>
              <h5>MODAL</h5>
      </div>`;
    })
      .join("");
    selectModalContainer.innerHTML = selectModals;
    const selectionModal = divElement.querySelectorAll(".sectionModals_Items");
    console.log(selectionModal)

    selectionModal.forEach(function (modal) {
      modal.addEventListener("click", function (e) {
        const idSelect = e.currentTarget.dataset.id;
        const idMenuSelect = menu.filter((menuItem) => {
          if (menuItem.id === idSelect) {
            return menuItem;
          }
        });
        if (idSelect === "Todos") {
          diplayMenuItems(menu);
        } else {
          diplayMenuItems(idMenuSelect);
        }
      });
    });

  } */

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

    const selectCategoriesButtons = categories.map((category) => {
      return `<button class="sectionButtons_Filter" type="button"  data-id=${category}>${category}</button>`;
    })
      .join("");
    sectionsButtonsContainer.innerHTML = selectCategoriesButtons;
    const sectionsButtons = divElement.querySelectorAll(".sectionButtons_Filter");

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

  diplayMenuItems(menu);
  displayMenuButtons();
  return divElement;
};
