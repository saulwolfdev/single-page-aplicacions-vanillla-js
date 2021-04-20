import view from '../view/home.html'
import menu from "../mock/data";
export default () => {

  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  //displayMenuButtons();

  const sectionsCards = divElement.querySelector(".sectionCards");
  const sectionsButtonsContainer=divElement.querySelector(".sectionButtons");
  
   //CARDS
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

  //BUTTONS
  function displayMenuButtons(){

    sectionsButtons.forEach(function(btn){
      btn.addEventListener("click", function(e){
        const category=e.currentTarget.dataset.id;
        const menuCategory=menu.filter((menuItem)=>{
          if(menuItem.category===category){
            return menuItem;
          }
        });
        if(category==="all"){
          diplayMenuItems(menu);
        }else{
          diplayMenuItems(menuCategory);
        }
      });
    });
     
    const categories=menu.reduce((values,item)=>{
      if(!values.includes(item.category)){
          values.push(item.category)
      }
      return values;
    },["all"]
    );
  
    const selectCategoriesButtons=categories
    .map((category)=>{
      return `<button class="sectionButtons_Filter" type="button"  data-id=${category}>${category}</button>`
    })
    .join("");
    sectionsButtonsContainer.innerHTML=selectCategoriesButtons;
    const sectionsButtons=divElement.querySelectorAll(".sectionButtons_Filter");
  
  };
    
  diplayMenuItems(menu);
  
  
  return divElement;
}