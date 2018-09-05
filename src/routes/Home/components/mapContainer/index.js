import React from "react";
import {View} from "native-base";
import MapView from "react-native-maps";
import SearchBox from "../SearchBox";
import SearchResults from "../SearchResults";

import styles from "./mapContainerStyles";

const MapContainer = ({region, getInputData, toggleSearchResultModal, getAddressPredictions, resultTypes, predictions, inputData, getSelectedAddress, selectedAddress}) => {
    return(
        <View style={styles.container}>
            <MapView
                provider={MapView.PROVIDER_GOOGLE}
                style={styles.map}
                region={region}
            >
                <MapView.Marker
                    coordinate={region}
                    pinColor="#ff9400"
                />
            </MapView>
            <SearchBox 
                getInputData={getInputData} 
                toggleSearchResultModal={toggleSearchResultModal} 
                getAddressPredictions={getAddressPredictions}
                selectedAddress={selectedAddress}
            />
            {(resultTypes.pickUp || resultTypes.dropOff) && (inputData.pickUp || inputData.pickUp) && 
            <SearchResults predictions={predictions} getSelectedAddress={getSelectedAddress} />
            }
        </View>
    );
}
export default MapContainer;