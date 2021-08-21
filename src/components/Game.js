import { useState } from 'react';
import Map from './Map';

const Game = (props) => {
    /* const generateMap = (n) => {
        // Generate a map of size n x n
        let map = [];
        for (let i = 0; i < n; i++) {
            map.push([]);
            for (let j = 0; j < n; j++) {
                map[i].push(0);
            }
        }
        return map;
    } */
    
    /* class Boat {
        constructor(size) {
          this.size = size;
          this.positions = [];
        }
    } */
    
    class Player {
        constructor(name, map) {
            this.name = name;
            this.map = map;
        }
    }
    let gameBoard1 = [
        [1,1,1,1,1,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0],
        [1,0,0,1,1,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,0,0,0,0,0,0]
    ];

    let gameBoard2 = [
        [0,0,0,0,0,0,0,0,0,1],
        [0,1,1,0,0,1,0,0,0,1],
        [0,0,0,0,0,1,0,0,0,1],
        [0,0,0,0,0,1,0,0,0,1],
        [0,0,0,0,0,1,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0]
    ];

    let [turn, setTurn] = useState(true);
    let [areReady, setAreReady] = useState(false);
    /* let boats = [new Boat(2), new Boat(3), new Boat(4), new Boat(4), new Boat(5)]; */

    let [player, setPlayer] = useState(new Player('Player', gameBoard1));
    let [computer, setComputer] = useState(new Player('Computer', gameBoard2));
    let iaMemory = {'lastFire': false, 'coordinates': false, 'direction': false};

    const reset = () => {
        setTurn(true);
        setAreReady(false);
        setPlayer(new Player('Player', gameBoard1));
        setComputer(new Player('Computer', gameBoard2));
    }

    return (
        <div className="container">
            {
                turn ?
                    <Map 
                        player={player} 
                        enemy={computer} 
                        setPlayer={setPlayer} 
                        setEnemy={setComputer} 
                        areReady={areReady} 
                        turn={turn} 
                        setTurn={setTurn}
                        reset={reset}
                    /> 
                :
                    <Map 
                        player={computer} 
                        enemy={player} 
                        setPlayer={setComputer} 
                        setEnemy={setPlayer}
                        areReady={areReady} 
                        setAreReady={setAreReady} 
                        turn={turn} 
                        setTurn={setTurn} 
                        reset={reset}
                        iaMemory={iaMemory}
                    />
            }
        </div>
    );

}

export default Game;