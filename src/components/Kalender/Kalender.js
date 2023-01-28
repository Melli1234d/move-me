import React, {useState} from 'react';
import './Kalender.css';
import ArrowLeft from "../../components/Pictures/arrow-left.svg";
import ArrowRight from "../../components/Pictures/arrow-right.svg";

//Kalender angelehnt an: https://codepen.io/eliza-rjb/pen/xmbEWX

const Kalender = (props) => {
    const [view, setView] = useState('overview'); // 'april'


    const handleMarch = async () => {
        setView('overview');
    }
    const handleApril = async () => {
        setView('april');
    }
    return (


        <div className="calender-container">
            {view === 'overview' &&
                <>
                    <div className="calendar-header-container">
                        <div><img className="arrowleftmarch" src={ArrowLeft} alt="Kalender Icon" height={18} width={18}/>
                        </div>
                        <h4 className="calendar-month-year">März 2023</h4>
                        <div onClick={handleApril}><img className="arrowright" src={ArrowRight} alt="Kalender Icon" height={18} width={18}/>
                        </div>
                    </div>
                    <div className="calender-body">
                        <div className="calendar-day-header">
                            <div className="calendar-day-letter">Mo</div>
                            <div className="calendar-day-letter">Di</div>
                            <div className="calendar-day-letter">Mi</div>
                            <div className="calendar-day-letter">Do</div>
                            <div className="calendar-day-letter">Fr</div>
                            <div className="calendar-day-letter">Sa</div>
                            <div className="calendar-day-letter">So</div>
                        </div>
                        <div className="calendar-date-header">
                            <div className="calendar-date-gray">27</div>
                            <div className="calendar-date-gray">28</div>
                            <div className="calendar-date">1</div>
                            <div className="calendar-date">2</div>
                            <div className="calendar-date">3</div>
                            <div className="calendar-date">4</div>
                            <div className="calendar-date">5</div>
                            <div className="calendar-date">6</div>
                            <div className="calendar-date">7</div>
                            <div className="calendar-date">8</div>
                            <div className="calendar-date">9</div>
                            <div className="calendar-date">10</div>
                            <div className="calendar-date">11</div>
                            <div className="calendar-date">12</div>
                            <div className="calendar-date">13</div>
                            <div className="calendar-date">14</div>
                            <div className="calendar-date">15</div>
                            <div className="calendar-date">16</div>
                            <div className="calendar-date">17</div>
                            <div className="calendar-date">18</div>
                            <div className="calendar-date">19</div>
                            <div className="calendar-date">20</div>
                            <div className="calendar-date">21</div>
                            <div className="calendar-date">22</div>
                            <div className="calendar-date">23</div>
                            <div className="calendar-date">24</div>
                            <div className="calendar-date">25</div>
                            <div className="calendar-date">26</div>
                            <div className="calendar-date">27</div>
                            <div className="calendar-date">28</div>
                            <div className="calendar-date">29</div>
                            <div className="calendar-date">30</div>
                            <div className="calendar-date">31</div>
                            <div className="calendar-date-gray">1</div>
                            <div className="calendar-date-gray">2</div>
                        </div>
                    </div>
                </>
            }
            {view === 'april' &&
                <>
                    <div className="calendar-header-container">
                        <div onClick={handleMarch}><img className="arrowleft" src={ArrowLeft} alt="Kalender Icon" height={18} width={18}/>
                        </div>
                        <h4 className="calendar-month-year">April 2023</h4>
                        <div><img className="arrowright" src={ArrowRight} alt="Kalender Icon" height={18} width={18}/>
                        </div>
                    </div>
                    <div className="calender-body">
                        <div className="calendar-day-header">
                            <div className="calendar-day-letter">Mo</div>
                            <div className="calendar-day-letter">Di</div>
                            <div className="calendar-day-letter">Mi</div>
                            <div className="calendar-day-letter">Do</div>
                            <div className="calendar-day-letter">Fr</div>
                            <div className="calendar-day-letter">Sa</div>
                            <div className="calendar-day-letter">So</div>
                        </div>
                        <div className="calendar-date-header">
                            <div className="calendar-date-gray">27</div>
                            <div className="calendar-date-gray">28</div>
                            <div className="calendar-date-gray">29</div>
                            <div className="calendar-date-gray">30</div>
                            <div className="calendar-date-gray">31</div>
                            <div className="calendar-date">1</div>
                            <div className="calendar-date">2</div>
                            <div className="calendar-date">3</div>
                            <div className="calendar-date">4</div>
                            <div className="calendar-date">5</div>
                            <div className="calendar-date">6</div>
                            <div className="calendar-date">7</div>
                            <div className="calendar-date">8</div>
                            <div className="calendar-date">9</div>
                            <div className="calendar-date">10</div>
                            <div className="calendar-date">11</div>
                            <div className="calendar-date">12</div>
                            <div className="calendar-date">13</div>
                            <div className="calendar-date">14</div>
                            <div className="calendar-date">15</div>
                            <div className="calendar-date">16</div>
                            <div className="calendar-date">17</div>
                            <div className="calendar-date">18</div>
                            <div className="calendar-date">19</div>
                            <div className="calendar-date">20</div>
                            <div className="calendar-date">21</div>
                            <div className="calendar-date">22</div>
                            <div className="calendar-date">23</div>
                            <div className="calendar-date">24</div>
                            <div className="calendar-date">25</div>
                            <div className="calendar-date">26</div>
                            <div className="calendar-date">27</div>
                            <div className="calendar-date">28</div>
                            <div className="calendar-date">29</div>
                            <div className="calendar-date">30</div>
                        </div>
                    </div>
                </>
            }
        </div>


    );
}

export default Kalender;
