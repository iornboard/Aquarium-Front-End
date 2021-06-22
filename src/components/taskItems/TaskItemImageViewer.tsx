import React, { useState } from 'react';
import ImageMarker, { Marker, MarkerComponentProps } from 'react-image-marker';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';

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
            <Card>
                <TextField
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <AccountCircle />
                    </InputAdornment>
                ),
                }}
                />
            </Card>
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