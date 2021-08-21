import './scss/App.scss';
import { useState } from 'react';
import Menu from './components/Menu';
import Game from './components/Game';

function App() {
  let [toPlay, setToPlay] = useState(false);
  return (
    <>
      {toPlay ? <Game /> : <Menu setToPlay={setToPlay} />}
    </>
  );
}

export default App;