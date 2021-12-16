import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { useTheme } from "../../theme/ThemeProvider";
import BackButton from "../../components/BackButton";
import CartItem from "../../components/CartItem";
import InputButton from "../../components/InputButton";
import InputText from "../../components/InputText";
import Divider from "../../components/Divider";

const Cart = ({ navigation }) => {

    const { colors, isDark } = useTheme();

    const tabBarHeight = useBottomTabBarHeight();
    const [userEmail, setUserEmail] = useState('');

    let [fontsLoaded] = useFonts({
        'SFProDisplayMedium': require('../../../assets/fonts/SFProDisplayMedium.otf'),
        'SFProDisplayBold': require('../../../assets/fonts/SFProDisplayBold.otf'),
        'SFProDisplayUltraLightItalic': require('../../../assets/fonts/SFProDisplayUltraLightItalic.otf')
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={{ backgroundColor: colors.theme.background, flex: 1 }}>
                <View style={{flexDirection: 'row',marginBottom:20}}>
                    <BackButton onPress={() => { navigation.goBack() }} />
                    <View style={{flex:1,justifyContent: "center",marginRight:'15%',alignItems: "center", paddingTop: '15%'}}>
                    <Text style={{fontFamily: "SFProDisplayMedium", fontSize: 22, alignSelf:'center', color: colors.theme.title}}>Carrello</Text>
                    </View>
                </View> 
                <ScrollView overScrollMode="never">
                    <CartItem name="Prodotto 1" reference="10231023" specifics={"Specifiche"} price={1780} image={{ uri: 'https://storageaccountemadbc1b.blob.core.windows.net/prodotti/p3_1.webp' }} min={0} max={2} />
                    <CartItem name="Prodotto 2" reference="10231023" specifics={"Specifiche"} price={1650} image={{ uri: 'https://storageaccountemadbc1b.blob.core.windows.net/prodotti/p10_3.webp' }} min={0} max={2} />

                    <View style={{ width: '75%', alignSelf: 'center', marginTop: '5%', marginBottom:'5%' }}>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <View style={{ width: '50%' }}>
                                <Text style={{ fontSize: 16, fontFamily: 'SFProDisplayMedium', color: colors.theme.primary }}>
                                    Articoli Totali:
                                </Text>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text style={{ fontSize: 16, fontFamily: 'SFProDisplayMedium', color: colors.theme.primary, textAlign: 'right' }}>
                                    2
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', width: '100%', marginBottom:'5%' }}>
                            <View style={{ width: '50%' }}>
                                <Text style={{ fontSize: 20, fontFamily: 'SFProDisplayMedium', fontWeight:"bold", color: colors.theme.primary }}>
                                Totale:
                                </Text>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text style={{ fontSize: 20, fontFamily: 'SFProDisplayMedium', fontWeight:"bold", color: colors.theme.primary, textAlign: 'right' }}>
                                € 3430,00
                                </Text>
                            </View>
                        </View>
                        <Divider width={"100%"} opacity={1} marginBottom={12} />
                        <InputText params={{ marginTop: 25, alignSelf:'center',width: "100%" }} name="Inserisci Email" icon="mail-outline" rotation="0deg" value={userEmail} onChangeText={setUserEmail} secure='false' />


                    </View>
                    <InputButton params={{ marginTop: 26, width: "75%" }} name="PAGA IN CASSA" icon="arrow-forward-outline" rotation="-45deg" />
                    <InputButton params={{ marginTop: 26, width: "75%" }} name="PAGA ORA" icon="arrow-forward-outline" rotation="-45deg" onPress={() => navigation.navigate('Payment')} />

                    <View style={{ marginBottom: tabBarHeight + 100 }}></View>
                </ScrollView>
            </View>
        )
    }
};

const styles = StyleSheet.create({
});

export default Cart;
