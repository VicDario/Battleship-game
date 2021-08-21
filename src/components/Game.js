import { useState } from 'react';
import Map from './Map';

const Game = (props) => {
    const generateMap = (n) => {
        // Generate a map of size n x n
        let map = [];
        for (let i = 0; i < n; i++) {
            map.push([]);
            for (let j = 0; j < n; j++) {
                map[i].push(0);
            }
        }
        return map;
    }
    
    class Boat {
        constructor(size) {
          this.size = size;
          this.positions = [];
        }
      }
    
    class Player {
        constructor(name, boats, map) {
            this.name = name;
            this.boats = boats;
            this.map = map;
            this.boatsPlaced = 0;
        }
    }

    let [turn, setTurn] = useState(true);
    let [areReady, setAreReady] = useState(false);
    let boats = [new Boat(2), new Boat(3), new Boat(4), new Boat(4), new Boat(5)];

    let [player, setPlayer] = useState(new Player('Player', boats, generateMap(10)));
    let [computer, setComputer] = useState(new Player('Computer', boats, generateMap(10)));

    return (
        <div className="container">
            {
                turn ?
                    <Map player={player} setPlayer={setPlayer} areReady={areReady} turn={turn} setTurn={setTurn} /> 
                :
                    <Map player={computer} setPlayer={setComputer} areReady={areReady} setAreReady={setAreReady} turn={turn} setTurn={setTurn} />
            }
        </div>
    );

}

export default Game;