import React from "react";
import {Text} from "react-native";
import styles from "./fabStyles";
import {View, Button} from "native-base";
import Icon from "react-native-vector-icons/Feather";

const Fab = ({fare, onPressAction}) => {
    if(fare){
        return (
            <Button  style={styles.activeState} onPress={onPressAction}>
                <Icon name="send" style={styles.btnText}/>
            </Button>
        );
    }
    else{
        return (
            <Button  style={styles.disabledState} onPress={onPressAction}>
                <Icon name="send" style={styles.btnText}/>
            </Button>
        );
    }       
}

export default Fab;