import pizzaImg from "../images/pizza.png";
import burgerImg from "../images/burger.png";
import cocaImg from "../images/coca.png";
import saladImg from "../images/salad.png";
import waterImg from "../images/water.png";
import iceCreamImg from "../images/icecream.png";
import kebabImg from "../images/kebab.png";

export function getData() {
  return [
    { title: "Пицца ассорти", dis: "Состав" ,price: 17.99, Image: pizzaImg,id:1 },
    { title: "Бургер",dis: "Состав" , price: 150, Image: burgerImg,id:2 },
    { title: "Кола",dis: "Состав" , price: 35, Image: cocaImg ,id:3},
    { title: "Кебаб",dis: "Состав" , price: 139, Image: kebabImg,id:4 },
    { title: "Салат цезарь",dis: "Состав" , price: 25, Image: saladImg,id:5 },
    { title: "Вода",dis: "Состав" , price: 99, Image: waterImg,id:6 },
    { title: "Мороженное",dis: "Состав" , price: 299, Image: iceCreamImg,id:7 },
    { title: "Мороженное2",dis: "Состав" , price: 299, Image: iceCreamImg,id:8 },
  ];
}
