import update from "react-addons-update";
import constants from "./actionConstants";
import {Dimensions} from "react-native";
import Geolocation from "react-native-geolocation-service";
import RNGooglePlaces from "react-native-google-places";
import axios from "axios";
import calculateFare from "../../../util/fareCalculator";
import request from "../../../util/request";

const {
    GET_CURRENT_LOCATION, 
    GET_INPUT, 
    TOGGLE_SEARCH_RESULT,
    GET_ADDRESS_PREDICTIONS,
    GET_SELECTED_ADDRESS,
    GET_DISTANCE_MATRIX,
    GET_FARE,
    BOOK_CAR

} = constants;

const GoogleKey = "";
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

//------------------
//Actions
//------------------

export function getCurrentLocation(){
    return(dispatch) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch({
                    type:GET_CURRENT_LOCATION,
                    payload:position
                });
            },
            (error)=> console.log(error.message),
            {enableHighAccuracy: true,timeout: 20000, maximumAge: 1000}
        )
    }
}

//GET USER INPUT

export function getInputData(payload){
    return{
        type:GET_INPUT,
        payload
    }
}

//toggle search results model

export function toggleSearchResultModal(payload){
    return{
        type:TOGGLE_SEARCH_RESULT,
        payload
    }
}

//Get adresses from Google places

export function getAddressPredictions(){
    return(dispatch, store)=>{
        let userInput = store().home.resultTypes.pickUp ? store().home.inputData.pickUp : store().home.inputData.dropOff;
        RNGooglePlaces.getAutocompletePredictions(userInput,{
                country:"EG"
            }
        )
        .then((results)=>
            dispatch({
                type:GET_ADDRESS_PREDICTIONS,
                payload:results
            })
        )
        .catch((error)=> console.log(error.message));
    };    
}

//get selected address
export function getSelectedAddress(payload){
    const dummyNumbers = {
        baseFare:0.4,
        timeRate:0.14,
        distanceRate:0.97,
        surge:1
    }
    return(dispatch, store)=>{
        RNGooglePlaces.lookUpPlaceByID(payload)
        .then((results)=>{
            dispatch({
                type:GET_SELECTED_ADDRESS,
                payload:results
            })
        })
        .then(()=>{            
            if(store().home.selectedAddress.selectedPickUp && store().home.selectedAddress.selectedDropOff){
                const params = `origins=${store().home.selectedAddress.selectedPickUp.latitude},${store().home.selectedAddress.selectedPickUp.longitude}&destinations=${store().home.selectedAddress.selectedDropOff.latitude},${store().home.selectedAddress.selectedDropOff.longitude}&mode=driving&key=${GoogleKey}`;

                axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?${params}`)
                .then((res) => {
                    dispatch({
                        type:GET_DISTANCE_MATRIX,
                        payload:res.data
                    })
                    if(store().home.selectedAddress.selectedPickUp && store().home.selectedAddress.selectedDropOff){
                        const fare = calculateFare(
                            dummyNumbers.baseFare,
                            dummyNumbers.timeRate,
                            store().home.distanceMatrix.rows[0].elements[0].duration.value,
                            dummyNumbers.distanceRate,
                            store().home.distanceMatrix.rows[0].elements[0].distance.value,
                            dummyNumbers.surge,
                        );
                        dispatch({
                            type:GET_FARE,
                            payload:fare
                        })
                    }
                })
                .catch((error) => console.log(error.message));
            }    
        })
        .catch((error)=> console.log(error.message));
    }
}

//BOOK CAR

export function bookCar(){
    return(dispatch, store)=>{
        if(store().home.fare){
            const payload = {
                data:{
                    userName:"Ahmed",
                    pickUp:{
                        address:store().home.selectedAddress.selectedPickUp.address,
                        name:store().home.selectedAddress.selectedPickUp.name,
                        latitude:store().home.selectedAddress.selectedPickUp.latitude,
                        longitude:store().home.selectedAddress.selectedPickUp.longitude
                    },
                    dropOff:{
                        address:store().home.selectedAddress.selectedDropOff.address,
                        name:store().home.selectedAddress.selectedDropOff.name,
                        latitude:store().home.selectedAddress.selectedDropOff.latitude,
                        longitude:store().home.selectedAddress.selectedDropOff.longitude
                    },
                    fare:store().home.fare,
                    status:"pending"
                }
            };

            request.post("http://192.168.1.3:3000/api/bookings")
            .send(payload)
            .finish((error, res) =>{
                dispatch({
                    type:BOOK_CAR,
                    payload:res.body
                });
            });
        }
    }
}

//------------------
//Action Handlers
//------------------

function handleGetCurrentLocation(state, action){
    return update(state, {
        region:{
            latitude:{
                $set:action.payload.coords.latitude
            },
            longitude:{
                $set:action.payload.coords.longitude
            },
            latitudeDelta:{
                $set:LATITUDE_DELTA
            },
            longitudeDelta:{
                $set:LONGITUDE_DELTA
            }
        }
    });
}

function handleGetInputData(state, action){
    const {key, value} = action.payload;
    return update(state, {
        inputData:{
            [key]:{
                $set:value
            }
        }
    });
}

function handleToggleSearchResult(state, action){
    if(action.payload === "pickUp"){
        return update(state, {
            resultTypes:{
                pickUp:{
                    $set:true
                },
                dropOff:{
                    $set:false
                }
            },
            predictions:{
                $set:{}
            }
        });
    }
    if(action.payload === "dropOff"){
        return update(state, {
            resultTypes:{
                pickUp:{
                    $set:false
                },
                dropOff:{
                    $set:true
                }
            },
            predictions:{
                $set:{}
            }
        });
    }
}

function handleGetAddressPredictions(state, action){
    return update(state, {
        predictions:{
            $set:action.payload
        }
    });
}

function handleGetSelectedAddress(state, action){
    let selectedTitle = state.resultTypes.pickUp ? "selectedPickUp" : "selectedDropOff";
    return update(state, {
        selectedAddress:{
            [selectedTitle]:{
                $set:action.payload
            }
        },
        resultTypes:{
            pickUp:{
                $set:false
            },
            dropOff:{
                $set:false
            }
        }
    });
}

function handleGetDistanceMatrix(state, action){
    return update(state, {
        distanceMatrix:{
            $set:action.payload
        }
    })
}

function handleGetFare(state, action){
    return update(state, {
        fare:{
            $set:action.payload
        }
    })
}

//handle book car

function handleBookCar(state, action){
    return update(state, {
        booking:{
            $set:action.payload
        }
    })
}

const ACTION_HANDLER = {
    GET_CURRENT_LOCATION:handleGetCurrentLocation,
    GET_INPUT:handleGetInputData,
    TOGGLE_SEARCH_RESULT:handleToggleSearchResult,
    GET_ADDRESS_PREDICTIONS:handleGetAddressPredictions,
    GET_SELECTED_ADDRESS:handleGetSelectedAddress,
    GET_DISTANCE_MATRIX:handleGetDistanceMatrix,
    GET_FARE:handleGetFare,
    BOOK_CAR:handleBookCar
}
const initialState = {
    region:{},
    inputData:{},
    resultTypes:{},
    selectedAddress:{}
};

export function HomeReducer (state= initialState, action){
    const handler = ACTION_HANDLER[action.type];

    return handler ? handler(state, action) : state;
}