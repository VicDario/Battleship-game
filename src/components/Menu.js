import { IoBoat } from 'react-icons/io5';
import { AiFillHeart } from 'react-icons/ai';

const Menu = (props) => {
    const goToGame = () => {
        props.setToPlay(true);
    }
    
    return (
        <div className='container'>
            <h1 className="title"><IoBoat />BATTLESHIP<IoBoat /></h1>
            <button className="btn-play" onClick={goToGame}>Play</button>
            <p className="footer">Made with <AiFillHeart /></p>
        </div>
    );

}

export default Menu;