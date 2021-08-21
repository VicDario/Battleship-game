const Map = (props) => {
    const preview = (event) => {
        event.target.style.backgroundColor = "#ff8080";
    };

    const removePreview = (event) => {
        event.target.style.backgroundColor = "#ffffff";
    };

    const fireTorpedo = (event, row, cell) => {};
    return (
        <>
            <h1>{`${props.player.name} preparation`}</h1>
            {props.player.map.map((row, rowIndex) => {
                return (
                    <div className="row" key={rowIndex}>
                        {row.map((cell, cellIndex) => {
                            return (
                                <div
                                    className="cell"
                                    key={cellIndex}
                                    onMouseOver={preview}
                                    onMouseLeave={removePreview}
                                    onClick={(event) => fireTorpedo(event, rowIndex, cellIndex)}
                                ></div>
                            );
                        })}
                    </div>
                );
            })}
        </>
    );
};

export default Map;
