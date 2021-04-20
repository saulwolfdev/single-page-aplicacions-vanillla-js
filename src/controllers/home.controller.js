import view from '../view/home.html'
import menu from "../mock/data";
export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  const sectionsCards = divElement.querySelector(".sectionCards");
  const sectionsButtons=divElement.querySelectorAll(".sectionButtons_Filter")

  sectionsButtons.forEach(function(btn){
    btn.addEventListener("click", function(e){
      const category=e.currentTarget.dataset.id;
      //console.log(category)
      const menuCategory=menu.filter((menuItem)=>{
        //console.log("CATEGORIAS",menuItem.category)
        
        if(menuItem.category===category){
          return menuItem;
        }
      });
      //console.log("NUEVO MENU",menuCategory)
      if(category==="all"){
        diplayMenuItems(menu);
      }else{
        diplayMenuItems(menuCategory);
      }
    });
  });

   let diplayMenuItems=(menuItems)=>{
      let displayMenu = menuItems.map(function (item) {
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
      sectionsCards.innerHTML = displayMenu;
    }
   diplayMenuItems(menu);
  return divElement;
}