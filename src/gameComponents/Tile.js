import React from 'react';
import "../css/tic-tac-toe.css"

export const Tile = ({ id, value, setTile, isWinningTile, winner, isClickable }) => {
    const handleClick = () => {
        if (!value && !winner && isClickable) {
            setTile();
        }
    };

    return (
        <div 
            className={`game-tile ${value || ''} ${isWinningTile ? 'winning' : ''} ${!value && isClickable && !winner ? 'clickable' : ''}`}
            onClick={handleClick}
        >
            {value}
        </div>
    );
};
