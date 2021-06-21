import React, { useState } from 'react';
import ImageMarker, { Marker, MarkerComponentProps } from 'react-image-marker';
import Button from '@material-ui/core/Button';




function App() {

    const CarImage = 'http://www.mkhealth.co.kr/news/photo/202010/50970_51164_4758.jpg'
    const [markers, setMarkers] = useState<Array<Marker>>([
        { top: 10, left: 50 },
    ]);

    const CustomMarker = (props: MarkerComponentProps) => {
        return (
            <Button variant="contained">Default {props.itemNumber}</Button>
        );
    };

    
    return (
        <div className="App">
            <div className="frame">
                <ImageMarker
                    src={CarImage}
                    markers={markers}
                    onAddMarker={(marker: Marker) =>
                        setMarkers([...markers, marker])
                    }
                    markerComponent={CustomMarker}
                />
            </div>
        </div>
    );
}

export default App;