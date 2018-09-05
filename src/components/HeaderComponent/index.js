import React from "react";
import {Text, Image} from "react-native";
import {Header, Left, Body, Right, Button, StyleProvider} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./HeaderComponentStyles";
import getTheme from "../../../native-base-theme/components";
import material from '../../../native-base-theme/variables/material';

const HeaderComponent = ({logo})=>{
    return (        
            <Header style={{backgroundColor:"#ff9400"}}>
                <Left>
                    <Button transparent>
                        <Icon name="bars" style={styles.icon}/>
                    </Button>
                </Left>
                <Body>
                    <Image resizeMode="contain" style={styles.logo} source={logo}/>
                </Body>
                <Right>
                    <Button transparent>
                        <Icon name="star" style={styles.icon}/>
                    </Button>
                </Right>
            </Header>
    );
}
export default HeaderComponent;