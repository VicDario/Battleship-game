import { useState } from 'react';
import { DrawMap } from './DrawMap';

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
        }
    }

    let [turn, setTurn] = useState(true);
    let boats = [new Boat(2), new Boat(3), new Boat(4), new Boat(4), new Boat(5)];

    let [player, setPlayer] = useState(new Player('Player 1', boats, generateMap(10)));
    let [computer, setComputer] = useState(new Player('Computer', boats, generateMap(10)));

    return (
        <div className="container">
            {
                turn ?
                    <DrawMap map={player.map} /> 
                :
                    <DrawMap map={computer.map} />
            }
        </div>
    );

}

export default Game;