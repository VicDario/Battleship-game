const Menu = (props) => {

    const goToGame = () => {
        
    }
    
    return (
        <div className='container'>
            <h1 className="title">Battleship</h1>
            <button className="btn-play" onClick={goToGame}>Play</button>
        </div>
    );

}

export default Menu;