import React from "react";

//#############################################################################################################################################################
//CODE: angelehnt an Code Beispiel der automatisch von Teachable Machine generiert wird
//CODE: https://css-tricks.com/using-requestanimationframe-with-react-hooks/
//#############################################################################################################################################################


//#############################################################################################################################################################
// KOMPONENTE USEANIMATIONFRAME DIE DIE AKTUELLE ZEIT ZURÜCKGIBT
//#############################################################################################################################################################

export const useAnimationFrame = callback => {
    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const requestRef = React.useRef();
    const previousTimeRef = React.useRef();

    const animate = time => {
        if (previousTimeRef.current != undefined) { //wenn eine aktuelle vorhergehende Zeitreferenz haben
            const deltaTime = time - previousTimeRef.current; //  berechnet Differenz zwischen Jetzt und der vorhergehenden Zeit (die Zeit die die Animation brauchte)
            callback(deltaTime) //wiedergeben der deltatime
        }
        previousTimeRef.current = time;//aktuelle Zeit wird als vorhergehende aktuelle Zeit gesetzt
        requestRef.current = window.requestAnimationFrame(animate); //aimierte Bild wird herausgegeben
    }

    React.useEffect(() => {
        requestRef.current = window.requestAnimationFrame(animate); //derzeitige anfrage von  Kamera Loops
        return () => window.cancelAnimationFrame(requestRef.current);
    }, []); // Make sure the effect runs only once
}
