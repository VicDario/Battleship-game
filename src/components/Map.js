import { useEffect } from 'react';

const Map = (props) => {
    const preview = (event) => {
        event.target.style.backgroundColor = "#b4b3b3";
    };

    const removePreview = (event) => {
        event.target.style.backgroundColor = "";
    };

    const fireTorpedoPlayer = (event, row, cell) => {
        let map = props.enemy.map;
        if (map[row][cell] === 1)   map[row][cell] = 2;
        else if (map[row][cell] === 2 || map[row][cell] === 3)  return;
        else map[row][cell] = 3;

        props.setEnemy(Object.assign(props.enemy, map));
        props.setTurn(!props.turn)
    };

    return (
        <>
            <h1>{`${props.player.name} turn`}</h1>
            {props.enemy.map.map((row, rowIndex) => {
                return (
                    <div className="row" key={rowIndex}>
                        {row.map((cell, cellIndex) => {
                            let background;
                            if (cell === 1 || cell === 0) background = '';
                            else if (cell === 2) background = 'green';
                            else if (cell === 3) background = 'red';
                            return (
                                <div
                                    className={`cell ${background}`}
                                    key={cellIndex}
                                    onMouseOver={preview}
                                    onMouseLeave={removePreview}
                                    onClick={(event) => fireTorpedoPlayer(event, rowIndex, cellIndex)}
                                ></div>
                            );
                        })}
                    </div>
                );
            })}
        </>
    );
};

export default Map;
