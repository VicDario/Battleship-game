const Map = (props) => {

    const previsualization = (event) => {
        event.target.style.backgroundColor = '#ff8080';
        console.log(event);
    }

    const removePrevisualization = (event) => {
        event.target.style.backgroundColor = '#ffffff';
    }

    const putBoat = (event) => {
        
    }

    return (
        <>
        {   
            props.areReady ?
                props.player.map.map((row, rowIndex) => {
                    return (
                        <div className="row" key={rowIndex} value={row}>
                            {
                                row.map((cell, cellIndex) => {
                                    return (
                                        <div 
                                            className="cell" 
                                            key={cellIndex} 
                                            onMouseOver={previsualization} 
                                            onMouseLeave={removePrevisualization}
                                        >
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            :
                <>
                <h1>{`${props.player.name} preparation`}</h1>
                {   
                    props.player.map.map((row, rowIndex) => {
                        return ( 
                            <div className="row" key={rowIndex}>
                                {
                                    row.map((cell, cellIndex) => {
                                        return (
                                            <div 
                                                className="cell" 
                                                key={cellIndex} 
                                                onMouseOver={previsualization} 
                                                onMouseLeave={removePrevisualization}
                                                onClick={putBoat}
                                            >
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
                </>
                
        }
        </>
    );
}

export default Map;