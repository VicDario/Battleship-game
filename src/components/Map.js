import { useEffect } from 'react';
import Swal from 'sweetalert2';

const Map = (props) => {

    useEffect(() => {
        if (props.player.name === 'Computer') {
            setTimeout(function(){
                let doesComputerHaveToPlay = true;
                do {
                    let row = Math.floor(Math.random() * props.enemy.map.length);
                    let cell = Math.floor(Math.random() * props.enemy.map[row].length);
                    const fire = fireTorpedoPlayer(false, row, cell);
                    if (fire)   doesComputerHaveToPlay = false 
                } while(doesComputerHaveToPlay)
                props.setTurn(!props.turn)
            },2000);
        }
        // eslint-disable-next-line
    });
    
    const preview = (event) => {
        event.target.style.backgroundColor = "#b4b3b3";
    };

    const removePreview = (event) => {
        event.target.style.backgroundColor = "";
    };

    const checkWin = (map) => {
        for (let row = 0; row < map.length; row++) {
            for (let cell = 0; cell < map[row].length; cell++) {
                if (map[row][cell] === 1) return false;
            }
        }
        return true;
    }

    const fireTorpedoPlayer = (event, row, cell) => {
        if (!!event)    removePreview(event);
        let map = props.enemy.map;
        if (map[row][cell] === 1)   map[row][cell] = 2;
        else if (map[row][cell] === 2 || map[row][cell] === 3)  return false;
        else map[row][cell] = 3;

        props.setEnemy(Object.assign(props.enemy, map));
        props.setTurn(!props.turn)

        let win = checkWin(map);
        if (win && props.player.name === 'Player') {
            Swal.fire({
                icon: 'success',
                title: 'You win!',
                text: 'You have won the game!',
                showConfirmButton: true,
                confirmButtonText: 'Start again!',
            }).then((result) => {
                props.reset();
            })
        } else if (win && props.player.name === 'Computer') {
            Swal.fire({
                icon: 'error',
                title: 'You lose!',
                text: 'You have lost the game!',
                showConfirmButton: true,
                confirmButtonText: 'Revenge',
            }).then((result) => {
                props.reset();
            })
        }
        return true;
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

                            if (props.player.name === 'Player') {
                                return (
                                    <div
                                        className={`cell ${background}`}
                                        key={cellIndex}
                                        onMouseOver={preview}
                                        onMouseLeave={removePreview}
                                        onClick={(event) => fireTorpedoPlayer(event, rowIndex, cellIndex)}
                                    ></div>
                                );
                            }
                            else {
                                return (
                                    <div
                                        className={`cell ${background}`}
                                        key={cellIndex}
                                    ></div>
                                );
                            }
                        })}
                    </div>
                );
            })}
        </>
    );
};

export default Map;
