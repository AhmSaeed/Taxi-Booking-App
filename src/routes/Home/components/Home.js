import React from "react";
import {View, Text} from "react-native";
import {Container} from "native-base";
import MapContainer from "./mapContainer";
import HeaderComponent from "../../../components/HeaderComponent";
import FooterComponent from "../../../components/FooterComponent";
import Fare from "./Fare";
import Fab from "./Fab";


const taxiLogo = require("../../../assets/img/taxi-sign.png");


class Home extends React.Component{

    componentDidMount() {
        this.props.getCurrentLocation();
    }
    render(){
        const region = {
            latitude:30.034154,
            longitude:31.236912,
            latitudeDelta:0.0922,
            longitudeDelta:0.0421
        }
        return (
            <Container>
                <HeaderComponent logo={taxiLogo}/>
                {this.props.region.latitude &&
                <MapContainer 
                    region={this.props.region} 
                    getInputData={this.props.getInputData}
                    toggleSearchResultModal = {this.props.toggleSearchResultModal}
                    getAddressPredictions = {this.props.getAddressPredictions}
                    resultTypes={this.props.resultTypes}
                    predictions={this.props.predictions}
                    inputData={this.props.inputData}
                    getSelectedAddress={this.props.getSelectedAddress}
                    selectedAddress={this.props.selectedAddress}
                />
                }
                <Fab fare={this.props.fare} onPressAction={()=>this.props.bookCar()}/>
                {
                    this.props.fare ? <Fare fare={this.props.fare}/> : null
                }
                <FooterComponent/>
            </Container>
        );
    }
}
export default Home;