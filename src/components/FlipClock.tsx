import React, { useState, useEffect } from 'react';
import './FlipClock.css';

const FlipClock: React.FC = () => {
    const [time, setTime] = useState<Date>(new Date());
    const [flipping, setFlipping] = useState<boolean>(false);
    const [lastValue, setLastValue] = useState<string[]>(['0', '0', '0', '0', '0', '0']);

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return () => clearInterval(timerID);
    }, []);

    const tick = () => {
        const newTime = new Date();
        const newValue = formatTime(newTime);
        setLastValue([newValue.hours[0], newValue.hours[1], newValue.minutes[0], newValue.minutes[1], newValue.seconds[0], newValue.seconds[1]]);
        setFlipping(true);
        setTimeout(() => {
            setFlipping(false);
        }, 600); // Czas trwania animacji
        setTime(newTime);
    };

    const formatTime = (date: Date) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return { hours, minutes, seconds };
    };

    const { hours, minutes, seconds } = formatTime(time);

    return (
        <div className="flip-clock">
            <div className="clock">
                <FlipCard value={flipping ? lastValue[0] : hours[0]} flipping={flipping} />
                <FlipCard value={flipping ? lastValue[1] : hours[1]} flipping={flipping} />
                <span>:</span>
                <FlipCard value={flipping ? lastValue[2] : minutes[0]} flipping={flipping} />
                <FlipCard value={flipping ? lastValue[3] : minutes[1]} flipping={flipping} />
                <span>:</span>
                <FlipCard value={flipping ? lastValue[4] : seconds[0]} flipping={flipping} />
                <FlipCard value={flipping ? lastValue[5] : seconds[1]} flipping={flipping} />
            </div>
        </div>
    );
};

interface FlipCardProps {
    value: string;
    flipping: boolean;
}

const FlipCard: React.FC<FlipCardProps> = ({ value, flipping }) => {
    return (
        <div className={`flip-card ${flipping ? 'flip' : ''}`}>
            <div className="flip-card-inner">
                <div className="flip-card-front">{value}</div>
                <div className="flip-card-back">{value}</div>
            </div>
        </div>
    );
};

export default FlipClock;