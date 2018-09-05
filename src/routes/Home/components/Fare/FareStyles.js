import {Dimensions} from "react-native";
const {width} = Dimensions.get("window");

const styles = {
    fareContainer:{
        width:width,
        height:35,
        paddingTop:5,
        paddingBottom:5,
        paddingHorizontal:5,
        backgroundColor:"#ffd69e"
    },
    fareText:{
        fontSize:15,
        color:"#424242",
        textAlign:"center"
    },
    amount:{
        fontWeight:"bold",
        fontSize:15
    }
};
export default styles;