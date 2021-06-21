import React, { useState } from 'react';
import ImageMarker, { Marker, MarkerComponentProps } from 'react-image-marker';
import TextField from '@material-ui/core/TextField';

interface thisProps {
    taskImgUrl: string;
  }

function App(prop: thisProps) {

    const [markers, setMarkers] = useState<Array<Marker>>([
        { top: 10, left: 50 },
    ]);
    const [markerTest, setMarkerTest] = useState<Array<String>>([]);

    const CustomMarker = (props: MarkerComponentProps) => {
        return (
            <TextField id="filled-basic" variant="filled" onChange={handleFormChange} />
        );
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        
      }
    
    return (
        <div className="App">
            <div className="frame">
                <ImageMarker
                    src={prop.taskImgUrl}
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