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
        if (previousTimeRef.current != undefined) { //wenn die derzeitige vorherige Zeit undefiniert,
            const deltaTime = time - previousTimeRef.current; //  zeit - derzeitige vorherige Zeit = aktuelle Zeit
            callback(deltaTime) //wiedergeben der deltatime
        }
        previousTimeRef.current = time;
        requestRef.current = window.requestAnimationFrame(animate); //wiedergeben des animierten Bildes als Kamera Loop
    }

    React.useEffect(() => {
        requestRef.current = window.requestAnimationFrame(animate); //derzeitige anfrage von  Kamera Loops
        return () => window.cancelAnimationFrame(requestRef.current);
    }, []); // Make sure the effect runs only once
}
