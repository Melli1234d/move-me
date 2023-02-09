import React from 'react';
import './HomeCategorieList.css';

import HomeCategories from "./HomeCategories";

//Struktur vom React js Udemy Kurs " The Complete Guide" von Maximilian Schwarzmüller übernommen
//Bild 1:https://de.freepik.com/fotos-kostenlos/junges-paar-zog-in-ein-neues-haus-oder-eine-neue-wohnung-spass-mit-pappkartons-haben-nach-dem-reinigen-und-auspacken-am-umzugstag-entspannen_12701225.htm#query=umzug&position=45&from_view=search&track=sph
//BIld 2:https://de.freepik.com/fotos-kostenlos/glueckliche-familie-die-beim-umzug-in-ein-neues-zuhause-wohnungsplaene-durchgeht_26922775.htm#query=Umzug%20planen&position=8&from_view=search&track=sph
//Bild 3:https://de.freepik.com/fotos-kostenlos/schliessen-sie-die-elegante-dekoration-des-hauses_19867506.htm#query=Möbel&position=25&from_view=search&track=ais
//Bild 4:https://de.freepik.com/fotos-kostenlos/glueckliches-ueberglueckliches-geschaeftsteam-feiert-unternehmenssieg_21149733.htm#query=menschengruppe&position=2&from_view=search&track=sph
// XD Plugin "Auto Icon"

const HomeCategorieList = (props) => {
    const homecategories = [
        {
            id: 'e1',
            title: 'Profil',
            button: 'weiter',
            paragraph: 'Erstelle ein Profil mit deinen Umzugsdaten und Wünschen. Schicke dein Profil an Umzugsunternehmen und ziehe stressarm um.',
            picture: require('../Pictures/BildUmzug.png'),
            contentclass: 'left',
        },
        {
            id: 'e2',
            title: 'Zeit- und Organisationsplan',
            paragraph: 'Lege für jede anfallende Aufgaben einen Termin fest. Verknüpfe den Kalender und plane Deine Aufgaben passend zu Deinem Alltag',
            button: 'weiter',
            picture: require('../Pictures/BildPlanen.png'),
            contentclass: 'right',
        },
        {
            id: 'e3',
            title: 'Möbelliste ',
            paragraph: 'Speichere dein Interieur in eine Möbelliste. Gebe individuelle Daten an, um es Umzugsunternehmen einfacher zu machen, Deinen Umzug zu planen!',
            button: 'weiter',
            picture: require('../Pictures/BildMöbel.png'),
            contentclass: 'left',
        },
        {
            id: 'e4',
            title: 'Community',
            paragraph: 'Ziehst Du demnächst in eine andere Stadt um, wissen aber noch nicht welche Gegend zu Dir passt? Mach dich schlau und finde die Wohngegend abgestimmt auf Deine Bedürfnisse.',
            button: 'weiter',
            picture: require('../Pictures/BildCommunity.png'),
            contentclass: 'right',
        },
    ];

    return (
        <div>
            <HomeCategories items={homecategories} />
        </div>
    );
}

export default HomeCategorieList;
