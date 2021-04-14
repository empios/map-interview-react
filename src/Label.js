import React from "react";
import ReactSearchBox from 'react-search-box'

class Label extends React.Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }

    }
    componentDidMount() {
        let tempArr = []
        this.props.array.map((marker, idx) => {
            tempArr.push({
                "key": marker.id,
                "value": marker.x + "," + marker.y
            })
        })
        this.setState({
            data: tempArr
        })
    }
    render() {
        console.log(this.state.data)
        return (
            <div className={"label"}>
                <h2 style={{textAlign: "center"}}>Search a marker</h2>
                <ReactSearchBox placeholder={"Put a id of marker"} data={this.state.data} onSelect={(record) => console.log(record)}/>
                <h2 style={{textAlign: "center"}}>List of all points</h2>
                {this.props.array.map((marker, idx) =>
                    <div key={marker.id} style={{marginTop: "10%"}}>
                        <h5 style={{marginLeft: "8%"}}><i className="fas fa-map-marker" style={{marginRight: "2%"}}/>{marker.id}</h5>
                        <h6 style={{marginLeft: "8%"}}>X: {marker.x}</h6>
                        <h6 style={{marginLeft: "8%"}}>Y: {marker.y}</h6>
                    </div>
                )}
            </div>
        );
    }
}

export default Label;