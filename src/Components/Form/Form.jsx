import React from "react";
import "./form.css"
const Form = ({active, setActive, children}) => {

        return(
            <div className={active ? "form active" : "form"} onClick={()=>setActive(false)}>
                <div className={active ? "form__content active" : "form__content"} onClick={e=> e.stopPropagation()}>
                    {children}
                </div>
            </div>
        );

};
export default Form;