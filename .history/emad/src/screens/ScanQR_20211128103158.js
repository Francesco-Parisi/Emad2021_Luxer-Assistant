import { StatusBar } from "expo-status-bar";
import React, {useState,useEffect} from "react";
import { StyleSheet, Image, View, Text, Button, TouchableOpacity, ScrollView, Appearance } from "react-native";
import {BarCodeScanner} from "expo-barcode-scanner";
import ExitButton from '../components/ExitButton';

const ScanQR = ({ navigation }) => {
    const[hasPermission,setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState("Not Scanned");

    const askCameraPermission = () => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status == 'granted');
        })()
    }

    useEffect(() => {
        askCameraPermission();
    },[]);

    const barCodeScanned = ({type,data}) => {
        setScanned(true);
        setText(data);
        console.log('Type: '+ type + '\nData: '+ data);
    }

   
    return(
        <View>
            <ExitButton style={{backgroundColor:'trasparent'}} onPress={() => { navigation.goBack() }}/>
            <View style={styles.barcodebox}>
            <BarCodeScanner onBarCodeScanned ={scanned ? undefined: barCodeScanned} style={{height:'100%', width:'100%'}} />
            </View>
        </View>
    )

};



const styles = StyleSheet.create({

});

export default ScanQR;