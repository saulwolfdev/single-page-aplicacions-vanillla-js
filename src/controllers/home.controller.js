import view from "../view/home.html";
import menu from "../mock/data";
export default () => {
  
  const divElement = document.createElement("div");

  divElement.innerHTML = view;


  const sectionsCards = divElement.querySelector(".sectionCards");
  const sectionsButtonsContainer = divElement.querySelector(".sectionButtons");

  const modal = modalCreate();

  let diplayMenuItems = (menuItems) => {

    let displayMenu = menuItems.map(function (item) {
      return `
              <article class="sectionCards_Article" id=${item.id}>
              <img src="${item.img}" alt=${item.title} class="sectionCards_Article_Img" />
            </article>
                `;
    });
    displayMenu = displayMenu.join("")
    sectionsCards.innerHTML = displayMenu;

    Array.from(divElement.querySelectorAll('.sectionCards_Article'))
    .forEach((card) => {
      card.addEventListener('click', () => {
        const id  = card.id;
        const dataModal = menu.filter((item) => {
          return item.id === parseInt(id)
        })

       modal.update(
       `<div class="sectionModals_View">
          <button class="sectionModals_View_Cancel">X</button>
          <img class="sectionModals_View_Img" src=${dataModal[0].img}/>
          <div class="sectionModals_View_Contents">
          <div class="sectionModals_View_Contents_Box">
              <h5 class="sectionModals_View_Contents_Box_Subtitle">Categoria</h5>
              <h3 class="sectionModals_View_Contents_Box_Title">${dataModal[0].title}</h3>
              <div class="sectionModals_View_Contents_Box_Line"></div>
          </div>
          <a  href=${dataModal[0].archive} class="sectionModals_View_Download">Descargar</a>
          </div>
         </div>
       `
       )
      modal.show()
      let buttonCloseModal=divElement.querySelector(".sectionModals_View_Cancel")
      buttonCloseModal.addEventListener("click",function () {
        modal.hidden()
      })
      let buttonDonwloadModal=divElement.querySelector(".sectionModals_View_Download")
         buttonDonwloadModal.addEventListener("click",function () {
           modal.hidden()
         }) 
         
      })
    })

  };
  function modalCreate() {
    const tmp = `
      <div class="sectionModals_Modal">
      <div class="sectionModals_Content"></div>
      </div>
     
    `;

    divElement.querySelector('.sectionModals').innerHTML = tmp;

    return {
      update(dataModal) {
        divElement.querySelector('.sectionModals_Content').innerHTML=dataModal;
      },
      show() {
        const modalShowView=divElement.querySelector('.sectionModals_Modal');
              modalShowView.classList.add("sectionModals_Modal--Show");
      },
      hidden() {
        const modalShowView=divElement.querySelector('.sectionModals_Modal');
              modalShowView.classList.remove("sectionModals_Modal--Show");
      }
    }
  }

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
