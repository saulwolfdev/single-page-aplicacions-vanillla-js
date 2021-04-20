import view from "../view/404.html";

export default ()=>{
   const divElement=document.createElement("div");
//    divElement.className="text-title"
   divElement.innerHTML=view;
   
   return divElement; 
}
