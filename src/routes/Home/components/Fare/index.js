import React from "react";
import {Text} from "react-native";
import styles from "./FareStyles";
import {View} from "native-base";

const Fare = ({fare}) => {
    return (
        <View style={styles.fareContainer}>
            <Text style={styles.fareText}>Fare: EG <Text style={styles.amount}>{fare}</Text></Text>
        </View>
    );        
}

export default Fare;