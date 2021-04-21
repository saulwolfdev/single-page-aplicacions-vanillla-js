import view from "../view/home.html";
import menu from "../mock/data";
export default () => {
  
  const divElement = document.createElement("div");

  divElement.innerHTML = view;

  const modal = modalCreate();
  const sectionsCards = divElement.querySelector(".sectionCards");
  const sectionsButtonsContainer = divElement.querySelector(".sectionButtons");

  let diplayMenuItems = (menuItems) => {

    let displayMenu = menuItems.map(function (item) {
      return `
              <article class="sectionCards_Article" id=${item.id}>
              <img src="${item.img}" alt=${item.title} class="sectionCards_Article_Img" />
                  <div class="sectionCards_Article_Container">
                  <h4 class="sectionCards_Article_Container_Title">${item.title}</h4>
                  </div>
            </article>
                `;
    });
    displayMenu = displayMenu.join("")
    sectionsCards.innerHTML = displayMenu;

    Array.from(divElement.querySelectorAll('.sectionCards_Article'))
    .forEach((card) => {
      card.addEventListener('click', () => {
        const id  = card.id;
        const data = menu.filter((item) => {
          return item.id === parseInt(id)
        })
        
        console.log(data)

       modal.update(
       `<h4>${data[0].title}
       <button class="buttonCloseModal">${data[0].title}</button>
       </h4>`
       )
      modal.show()
      divElement.querySelector(".buttonCloseModal").addEventListener("click",modal.hidden())
      })
    })


        /////////////
  };
  function modalCreate() {
    const tmp = `
    <div class="modal-overlay">
      <div class="modal-container">
        <h3>modal content</h3>
        <button class="close-btn">CERRAR</button>
    
        <div id="modal-content"></div>
      </div>
    </div>
    `;

    divElement.querySelector('.sectionModals').innerHTML = tmp;

    return {
      update(data) {
        divElement.querySelector('#modal-content').innerHTML=data;
      },
      show() {
        divElement.querySelector('.modal-overlay').style.display = 'block';
      },
      hidden() {
        divElement.querySelector('.modal-overlay').style.display = 'none';
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
