import view from '../view/home.html'
import menuItems from "../mock/data";
export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  const sectionsCards = divElement.querySelector(".sectionCards");
   console.log("SECTIONS",sectionsCards);
   
   let diplayMenuItems=(menuItems)=>{
      let displayMenu = menuItems.map(function (item) {
        // console.log(item);
    
        return `<article class="menu-item">
              <img src="${item.img}" alt=${item.title} class="photo" />
              <div class="item-info">
                <header>
                  <h4>${item.title}</h4>
                  <h4 class="price">$${item.price}</h4>
                </header>
                <p class="item-text">
                  ${item.desc}
                </p>
              </div>
            </article>`;
      });
      displayMenu = displayMenu.join("");
      // console.log(displayMenu);
    
      sectionsCards.innerHTML = displayMenu;
    }
    diplayMenuItems(menuItems);
  return divElement;
}