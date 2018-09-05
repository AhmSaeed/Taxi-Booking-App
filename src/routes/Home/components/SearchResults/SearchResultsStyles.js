import {Dimensions} from "react-native";
var width = Dimensions.get("window").width;
const styles = {
    searchResultsWrapper:{
        top:170,
        position:"absolute",
        width:width,
        height:1000,
        backgroundColor:"#fff",
        opacity:0.9
    },
    primaryText:{
        fontWeight:"bold",
        color:"#373737"
    },
    secondaryText:{
        fontStyle:"italic",
        color:"#7D7D7D"
    },
    leftContainer:{
        flexWrap:"wrap",
        alignItems:"flex-start",
        borderLeftColor:"#7D7D7D"
    },
    leftIcon:{
        fontSize:20,
        color:"#ff9400"
    },
    distance:{
        fontSize:12,
    },
    listTop:{
        top:10
    }
};

export default styles;