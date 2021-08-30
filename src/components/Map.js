import { useEffect } from 'react';
import Swal from 'sweetalert2';

const Map = (props) => {
    useEffect(() => {
        //IA
        if (props.player.name === 'Computer') {
            setTimeout(function(){
                let doesComputerHaveToPlay = true;
                do {
                    if ( props.iaMemory['lastFire'] === 'miss' || props.iaMemory['lastFire'] === false ) {
                        let row = Math.floor(Math.random() * props.enemy.map.length);
                        let cell = Math.floor(Math.random() * props.enemy.map[row].length);
                        const fire = fireTorpedoIA(row, cell);

                        props.iaMemory['lastFire'] = fire;
                        if ( fire === 'hit' ) {
                            props.iaMemory['coordinates'] = [row, cell];
                            props.iaMemory['direction'] = 'up';
                            doesComputerHaveToPlay = false;
                        } else if ( fire === 'miss' ) {
                            props.iaMemory['row'] = false;
                            props.iaMemory['cell'] = false;
                            props.iaMemory['direction'] = false;
                            doesComputerHaveToPlay = false;
                        }
                    } else if ( props.iaMemory['lastFire'] === 'hit' || props.iaMemory['lastFire'] === 'repeat' ) {
                        if( props.iaMemory['lastFire'] === 'hit' ) {
                            // Now check directions to fire, to try hit another parts of the boats
                            if( props.iaMemory['direction'] === 'up' ) {
                                if( props.iaMemory['coordinates'][0] - 1  < 0 ){
                                    props.iaMemory['direction'] = 'right';
                                    continue;
                                }
                                let row = props.iaMemory['coordinates'][0] - 1;
                                let cell = props.iaMemory['coordinates'][1];
                                const fire = fireTorpedoIA(row, cell);
                                if (fire === 'hit') {
                                    props.iaMemory['coordinates'] = [row, cell];
                                    doesComputerHaveToPlay = false;
                                }else if ( fire === 'miss' ) {
                                    props.iaMemory['row'] = false;
                                    props.iaMemory['cell'] = false;
                                    props.iaMemory['direction'] = false;
                                    doesComputerHaveToPlay = false;
                                }

                            }
                            if( props.iaMemory['direction'] === 'right' ) {
                                if( props.iaMemory['coordinates'][1] + 1  >= props.enemy.map[0].length ) {
                                    props.iaMemory['direction'] = 'down';
                                    continue;
                                }
                                let row = props.iaMemory['coordinates'][0];
                                let cell = props.iaMemory['coordinates'][1] + 1;
                                const fire = fireTorpedoIA(row, cell);
                                if (fire === 'hit') {
                                    props.iaMemory['coordinates'] = [row, cell];
                                    doesComputerHaveToPlay = false;
                                }else if ( fire === 'miss' ) {
                                    props.iaMemory['row'] = false;
                                    props.iaMemory['cell'] = false;
                                    props.iaMemory['direction'] = false;
                                    doesComputerHaveToPlay = false;
                                }
                            }
                            if( props.iaMemory['direction'] === 'down' ) {
                                if( props.iaMemory['coordinates'][0] + 1  >= props.enemy.map.length ) {
                                    props.iaMemory['direction'] = 'left';
                                    continue;
                                }
                                let row = props.iaMemory['coordinates'][0] + 1;
                                let cell = props.iaMemory['coordinates'][1];
                                const fire = fireTorpedoIA(row, cell);
                                if (fire === 'hit') {
                                    props.iaMemory['coordinates'] = [row, cell];
                                    doesComputerHaveToPlay = false;
                                }else if ( fire === 'miss' ) {
                                    props.iaMemory['row'] = false;
                                    props.iaMemory['cell'] = false;
                                    props.iaMemory['direction'] = false;
                                    doesComputerHaveToPlay = false;
                                }
                            }
                            if( props.iaMemory['direction'] === 'left' ) {
                                if( props.iaMemory['coordinates'][1] - 1  < 0 ) {
                                    props.iaMemory['lastFire'] = false
                                    props.iaMemory['direction'] = false;
                                    props.iaMemory['coordinates'] = []
                                }
                                let row = props.iaMemory['coordinates'][0];
                                let cell = props.iaMemory['coordinates'][1] - 1;
                                const fire = fireTorpedoIA(row, cell);
                                if (fire === 'hit') {
                                    props.iaMemory['coordinates'] = [row, cell];
                                    doesComputerHaveToPlay = false;
                                }else if ( fire === 'miss' ) {
                                    props.iaMemory['lastFire'] = false;
                                    props.iaMemory['row'] = false;
                                    props.iaMemory['cell'] = false;
                                    props.iaMemory['direction'] = false;
                                    doesComputerHaveToPlay = false;
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
    // Paint a cell of the map
    const preview = (event) => {
        event.target.classList.contains('green') || event.target.classList.contains('red')
        ? event.target.style.backgroundColor = ''
        : event.target.style.backgroundColor = '#b4b3b3';
    };

    // 
    const removePreview = (event) => {
        event.target.style.backgroundColor = "";
    };

    // Check if the map doesn't have boats
    const checkWin = (map) => {
        for (let row = 0; row < map.length; row++) {
            for (let cell = 0; cell < map[row].length; cell++) {
                if (map[row][cell] === 1) return false;
            }
        }
        return true;
    }

    const fireTorpedoPlayer = (event, row, cell) => {
        let map = props.enemy.map;
        if (map[row][cell] === 1){
            map[row][cell] = 2;
            event.target.classList.add('green');
            event.target.style.backgroundColor = "green";
        }
        else if (map[row][cell] === 2 || map[row][cell] === 3){
            return;
        } else {
            map[row][cell] = 3;
            event.target.classList.add('red');
            event.target.style.backgroundColor = "red";
        }

        props.setEnemy(Object.assign(props.enemy, map));

        setTimeout(() => {
            props.setTurn(!props.turn);
        },2000);

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

    const fireTorpedoIA = (event, row, cell) => {
        let map = props.enemy.map;
        let result = '';
        if (map[row][cell] === 1) {
            map[row][cell] = 2;
            result = 'hit';
            event.target.style.backgroundColor = "green";
        }
        else if (map[row][cell] === 2 || map[row][cell] === 3)  return 'repeat';
        else {
            map[row][cell] = 3;
            result = 'miss';
        }

        props.setEnemy(Object.assign(props.enemy, map));
        setTimeout(() => {
            props.setTurn(!props.turn);
        },2000);

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

        return result;
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
