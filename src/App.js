import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import React from "react";
import L from 'leaflet'
import axios from "axios";
import Label from "./Label";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            markers: [],
            isLoading: true
        }
    }
    async componentDidMount() {
        for (let i = 0; i<4;i++) {
            await axios.get("http://localhost:3000/").then(res => {
                this.state.markers.push({
                    x: res.data[0],
                    y: res.data[1],
                    id: res.data[2]
                });
            })
        }
        this.setState({isLoading: false})
        this.interval = setInterval(async () => {
            let currentMarkers = this.state.markers;
            for (let i = 0; i<4;i++) {
                await axios.get("http://localhost:3000/").then(res => {
                    currentMarkers[i].x= res.data[0];
                    currentMarkers[i].y = res.data[1];
                })
            }
            this.setState({
                markers: currentMarkers
            })
        },6000)

    }
    render() {
        // eslint-disable-next-line no-unused-vars
        L.Icon.Default.imagePath = 'images/'

        if (this.state.isLoading) {
            return <h1>Loading, Please Wait ....</h1>
        } else {
            return (
                <div style={{display: "inline-flex"}}>
                    <MapContainer id="map" className={"map"} center={[51.505, -0.09]} zoom={8} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {this.state.markers.map((item, idx) =>
                            <Marker key={item.id} position={[item.x, item.y]}>
                                <Popup>
                                    {item.id}
                                </Popup>
                            </Marker>
                        )}
                    </MapContainer>
                    <Label array={this.state.markers}/>
                </div>
            );
        }
    }
}

export default App;
