import { useEffect } from 'react';
import Swal from 'sweetalert2';

const Map = (props) => {
    useEffect(() => {
        //IA
        if (props.player.name === 'Computer') {
            setTimeout(function(){
                let doesComputerHaveToPlay = true;
                do {
                    if ( iaMemory['lastFire'] === 'miss' || iaMemory['lastFire'] === false ) {
                        let row = Math.floor(Math.random() * props.enemy.map.length);
                        let cell = Math.floor(Math.random() * props.enemy.map[row].length);
                        const fire = fireTorpedoIA(row, cell);

                        props.iaMemory['lastFire'] = fire;
                        if ( fire == 'hit' ) {
                            props.iaMemory['cordenate'] = [row, cell];
                            props.iaMemory['direction'] = 'up';
                            doesComputerHaveToPlay = false;
                        } else if ( fire == 'miss' ) {
                            props.iaMemory['row'] = false;
                            props.iaMemory['cell'] = false;
                            props.iaMemory['direction'] = false;
                            doesComputerHaveToPlay = false;
                        }
                    } else if ( iaMemory['lastFire'] === 'hit' || isMemory['lastFire'] === 'checking' ) {
                        if( iaMemory['lastFire'] === 'hit' ) {
                            // Now check directions to fire, to try hit another parts of the boats
                            if( iaMemory['direction'] === 'up' ) {
                                if( iaMemory['cordenate'][0] - 1  < 0 ) iaMemory['direction'] === 'right';
                            }
                            if( iaMemory['direction'] === 'right' ) {
                                if( iaMemory['cordenate'][1] + 1  >= props.enemy.map[0].lenght ) iaMemory['direction'] === 'down';
                            }
                            if( iaMemory['direction'] === 'down' ) {
                                if( iaMemory['cordenate'][0] + 1  >= props.enemy.map.lenght ) iaMemory['direction'] === 'left';
                            }
                            if( iaMemory['direction'] === 'left' ) {
                                if( iaMemory['cordenate'][1] - 1  < 0 ) {
                                    iaMemory['lastFire'] = false
                                    iaMemory['direction'] = false;
                                    iaMemory['cordenate'] = []
                                }
                            }


                        }
                    }
                } while (doesComputerHaveToPlay);
                props.setTurn(!props.turn);
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
        removePreview(event);
        let map = props.enemy.map;
        if (map[row][cell] === 1)   map[row][cell] = 2;
        else if (map[row][cell] === 2 || map[row][cell] === 3)  return;
        else map[row][cell] = 3;

        props.setEnemy(Object.assign(props.enemy, map));
        props.setTurn(!props.turn)

        let win = checkWin(map);
        if (win) {
            Swal.fire({
                icon: 'success',
                title: 'You win!',
                text: 'You have won the game!',
                showConfirmButton: true,
                confirmButtonText: 'Start again!',
            }).then(() => {
                props.reset();
            })
        }
    };

    const fireTorpedoIA = (row, cell) => {
        let map = props.enemy.map;
        let result = '';
        if (map[row][cell] === 1) {
            map[row][cell] = 2;
            result = 'hit';
        }
        else if (map[row][cell] === 2 || map[row][cell] === 3)  return 'repeat';
        else {
            map[row][cell] = 3;
            result = 'miss';
        }

        props.setEnemy(Object.assign(props.enemy, map));
        props.setTurn(!props.turn)

        let win = checkWin(map);
        if (win) {
            Swal.fire({
                icon: 'error',
                title: 'You lose!',
                text: 'You have lost the game!',
                showConfirmButton: true,
                confirmButtonText: 'Revenge',
            }).then(() => {
                props.reset();
            })
        }
    }

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
