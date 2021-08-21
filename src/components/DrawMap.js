const DrawMap = (props) => {
    return (
        <>
        {
            props.map.map((row, rowIndex) => {
                return (
                    <div className="row" key={rowIndex}>
                        {
                            row.map((cell, cellIndex) => {
                                return (
                                    <div className="cell" key={cellIndex}>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            })
        }
        </>
    );
}

export default DrawMap;