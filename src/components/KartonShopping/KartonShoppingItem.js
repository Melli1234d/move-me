import React,{useState} from 'react';
import './KartonShoppingItem.css';

//Struktur vom React js Udemy Kurs " The Complete Guide" von Maximilian Schwarzmüller übernommen

const KartonShoppingItem = (props) => {
    const [count, setCount] = useState(1);
    const [decrease, setDecrease] = useState(1);
    // Funktion die bei jedem klick + eins machen soll (Anzahl der Kartons/Boxen im Warenkorb)
    const handleAmountKartonsAdd = () => {
        setCount(count + 1);
    }
    const handleAmountKartonsDecrease = () => {
        setCount(count - 1);
    }
    const handleReset = () => {
        setCount(1);
        setDecrease(1);
    }

    function buttonClickedAdd() {
        handleAmountKartonsAdd(); //macht +1 bei gesamt Spiele
    }
    function buttonClickedDecrease() {
        handleAmountKartonsDecrease(); //macht +1 bei gesamt Spiele
    }


    return (
        <div>
            <h2>KartonShopping</h2>
            <img className="home-categorie-item-picture" src={props.picture} alt="alt"/>
            <h2>{props.title}</h2>
            <div>{props.paragraph}</div>
            <div onClick={buttonClickedDecrease}>-</div>
            <div className="spielrunden"> <div className="count"> {count}</div> </div>
            <div onClick={buttonClickedAdd}>+</div>
            <div onClick={handleReset}/>
            <div>{props.button}</div>
        </div>
    );
}

export default KartonShoppingItem;
