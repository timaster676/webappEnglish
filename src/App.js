import { useState, useEffect, useCallback } from "react";
import "./App.css";
import Card from "./Components/Card/Card";
import {useTelegram} from "./hooks/useTelegram";
import Cart from "./Components/Cart/Cart";
import Form from "./Components/Form/Form";
const { getData } = require("./db/db");
const foods = getData();




/* const tele = window.Telegram.WebApp; */


function App() {
  const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('physical');
    const {tg} = useTelegram();
    const [arr, setArr] = useState([]);

    

    const onSendData = useCallback(() => {
      
        setArr([...arr, 
          cartItems.map(cartItems => 
            <h8>{cartItems.title} - {cartItems.quantity} шт./ </h8> 
          )


         ])
        const data = {
            country,
            street,
            subject,
            arr,
            
            
        }
        tg.sendData(JSON.stringify(data));
    }, [country, street, subject,arr])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Заказать'
        })
    }, [])

    useEffect(() => {
        if(!street || !country) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [country, street])

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
     
       
    }

    const onChangeStreet = (e) => {
        setStreet(e.target.value)

    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

  const [order, setOrder] = useState([
  ]);

  

  const [modalActive, setModalActive]=useState(false);
  const [cartItems, setCartItems] = useState([]);
 /*  useEffect(() => {
    tele.ready();
  });
 */
  

  const onAdd = (food) => {


    const exist = cartItems.find((x) => x.id === food.id);

  



    if (exist) {


      setCartItems(


        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x
        ));
        console.log(cartItems);


       



       

        
        // console.log(newOrder)

    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }]);


      
    }
  };

  const onRemove = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);

    setOrder(order.filter(o => o.id !== food.id));

    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.id !== food.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
    }
  };

  const onCheckout = () => {
    setModalActive(true);
    
  };
  const onCheckout2 = () => {
    
   /*  tele.MainButton.text = "Оформить заказ";
    tele.MainButton.show(); */
  };

  return (
      <div className="App">

      


      <h1 className="heading">Пицца хата</h1>
      <Cart cartItems={cartItems} onCheckout={onCheckout}/>

      <div className="cards__container">
        {foods.map((food) => {
          return (
            <Card food={food} key={food.id} onAdd={onAdd} onRemove={onRemove} />
            
          );
        })}
      </div>
        <Form active={modalActive} setActive={setModalActive}>
          <form action="">
          <h3>Введите ваши данные</h3>
          <input
                className={'input'}
                type="text"
                placeholder={'Имя'}
                value={country}
                onChange={onChangeCountry}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Тел.'}
                value={street}
                onChange={onChangeStreet}
            />
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'physical'}>Доставка</option>
                <option value={'legal'}>Самовывоз</option>
            </select>
            <h3>Ваш заказ:</h3>
            {cartItems.map(cartItems => 
              <h8>{cartItems.title} - {cartItems.quantity} шт./ </h8> 
            )}
            
            {/* <input type="text" placeholder='Имя'/>
            <input type="text" placeholder='Телефон'/>
            <input type="text" placeholder='Адрес'/> */}
             <p></p>
             
            <Cart cartItems={cartItems} onCheckout={onCheckout2}/>
          </form>
        </Form>
      </div>
  );

}

export default App;
