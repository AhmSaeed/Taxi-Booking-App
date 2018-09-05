import React from "react";
import {Text, Image} from "react-native";
import {Footer, FooterTab, Button} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./FooterComponentStyles";

const FooterComponent = ({logo})=>{
    
    //tab bar items
    const tabs = [{
        title:"TaxiCar",
        subTitle:"",
        icon:"taxi"
    },
    {
        title:"CarShare",
        subTitle:"",
        icon:"car"
    },
    {
        title:"TaxiPremium",
        subTitle:"",
        icon:"taxi"
    },
    {
        title:"TaxiBike",
        subTitle:"",
        icon:"motorcycle"
    }];
    return (
        <Footer>       
            <FooterTab style={styles.footerContainer}>
                {
                    tabs.map((obj, index)=>{
                        return (
                            <Button key={index}>
                                <Icon name={obj.icon} style={{fontSize:12, color:(index === 0) ? "#ff9400" : "#a8a8a8", fontSize:24}}/>
                                <Text style={{fontSize:12, color:(index === 0) ? "#ff9400" : "#a8a8a8"}}>{obj.title}</Text>
                                <Text style={styles.subText}>{obj.subTitle}</Text>
                            </Button>
                        )
                    })
                }
            </FooterTab>
        </Footer>
    );
}
export default FooterComponent;