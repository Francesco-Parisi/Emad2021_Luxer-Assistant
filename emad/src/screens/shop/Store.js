import React from "react";
import { Dimensions, Image, View, Text, ScrollView } from "react-native";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { useTheme } from "../../theme/ThemeProvider";
import BackButton from "../../components/BackButton";
import Divider from "../../components/Divider";
import InputButton from "../../components/InputButton";
import { getMagazzinoById } from "../../db/connect";

const days = [
    { "id": "01", "days": [{ "giorno": "Lunedì", "orario": "07:00 - 21:00" }, { "giorno": "Martedì", "orario": "07:00 - 21:00" }, { "giorno": "Mercoledì", "orario": "07:00 - 21:00" }, { "giorno": "Giovedì", "orario": "07:00 - 21:00" }, { "giorno": "Venerdì", "orario": "07:00 - 21:00" }, { "giorno": "Sabato", "orario": "07:00 - 21:00" }, { "giorno": "Domenica", "orario": "07:00 - 21:00" }] },
    { "id": "02", "days": [{ "giorno": "Lunedì", "orario": "07:00 - 21:00" }, { "giorno": "Martedì", "orario": "07:00 - 21:00" }, { "giorno": "Mercoledì", "orario": "07:00 - 21:00" }, { "giorno": "Giovedì", "orario": "07:00 - 21:00" }, { "giorno": "Venerdì", "orario": "07:00 - 21:00" }, { "giorno": "Sabato", "orario": "07:00 - 21:00" }, { "giorno": "Domenica", "orario": "07:00 - 21:00" }] },
    { "id": "03", "days": [{ "giorno": "Lunedì", "orario": "07:00 - 21:00" }, { "giorno": "Martedì", "orario": "07:00 - 21:00" }, { "giorno": "Mercoledì", "orario": "07:00 - 21:00" }, { "giorno": "Giovedì", "orario": "07:00 - 21:00" }, { "giorno": "Venerdì", "orario": "07:00 - 21:00" }, { "giorno": "Sabato", "orario": "07:00 - 21:00" }, { "giorno": "Domenica", "orario": "07:00 - 21:00" }] },
    { "id": "04", "days": [{ "giorno": "Lunedì", "orario": "07:00 - 21:00" }, { "giorno": "Martedì", "orario": "07:00 - 21:00" }, { "giorno": "Mercoledì", "orario": "07:00 - 21:00" }, { "giorno": "Giovedì", "orario": "07:00 - 21:00" }, { "giorno": "Venerdì", "orario": "07:00 - 21:00" }, { "giorno": "Sabato", "orario": "07:00 - 21:00" }, { "giorno": "Domenica", "orario": "07:00 - 21:00" }] },
    { "id": "05", "days": [{ "giorno": "Lunedì", "orario": "07:00 - 21:00" }, { "giorno": "Martedì", "orario": "07:00 - 21:00" }, { "giorno": "Mercoledì", "orario": "07:00 - 21:00" }, { "giorno": "Giovedì", "orario": "07:00 - 21:00" }, { "giorno": "Venerdì", "orario": "07:00 - 21:00" }, { "giorno": "Sabato", "orario": "07:00 - 21:00" }, { "giorno": "Domenica", "orario": "07:00 - 21:00" }] },
    { "id": "06", "days": [{ "giorno": "Lunedì", "orario": "07:00 - 21:00" }, { "giorno": "Martedì", "orario": "07:00 - 21:00" }, { "giorno": "Mercoledì", "orario": "07:00 - 21:00" }, { "giorno": "Giovedì", "orario": "07:00 - 21:00" }, { "giorno": "Venerdì", "orario": "07:00 - 21:00" }, { "giorno": "Sabato", "orario": "07:00 - 21:00" }, { "giorno": "Domenica", "orario": "07:00 - 21:00" }] },
    { "id": "07", "days": [{ "giorno": "Lunedì", "orario": "07:00 - 21:00" }, { "giorno": "Martedì", "orario": "07:00 - 21:00" }, { "giorno": "Mercoledì", "orario": "07:00 - 21:00" }, { "giorno": "Giovedì", "orario": "07:00 - 21:00" }, { "giorno": "Venerdì", "orario": "07:00 - 21:00" }, { "giorno": "Sabato", "orario": "07:00 - 21:00" }, { "giorno": "Domenica", "orario": "07:00 - 21:00" }] },
    { "id": "08", "days": [{ "giorno": "Lunedì", "orario": "07:00 - 21:00" }, { "giorno": "Martedì", "orario": "07:00 - 21:00" }, { "giorno": "Mercoledì", "orario": "07:00 - 21:00" }, { "giorno": "Giovedì", "orario": "07:00 - 21:00" }, { "giorno": "Venerdì", "orario": "07:00 - 21:00" }, { "giorno": "Sabato", "orario": "07:00 - 21:00" }, { "giorno": "Domenica", "orario": "07:00 - 21:00" }] },

];




const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Store = ({ navigation, route }) => {

    const { colors, isDark } = useTheme();
    
    const [store, setStore] = React.useState(getMagazzinoById(route.params.store));
    const [day, setDays] = React.useState(JSON.parse(store.orari).days);
    var weekDays = ['Domenica','Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
    
    var now = weekDays[new Date().getDay()];
    const tabBarHeight = useBottomTabBarHeight();


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
                <View style={{flexDirection: 'row'}}>
                    <BackButton onPress={() => { navigation.goBack() }} />
                    <View style={{flex:1,justifyContent: "center",marginRight:'15%',alignItems: "center", paddingTop: '15%'}}>
                    <Text style={{fontFamily: "SFProDisplayMedium", fontSize: 22, alignSelf:'center', color: colors.theme.title}}>{store.nome}</Text>
                    </View>
                </View>
                <ScrollView overScrollMode="never">
                    <View style={{ maxWidth: width, maxHeight: 250, marginTop: '5%' }}>
                        <Image source={{uri:store.cover}} style={{ maxWidth: width, minHeight:220, maxHeight: 240 }} />
                    </View>
                    <View style={{marginTop: '5%'}}>
                        {day.map((item) => (
                            <View key={item.giorno} style={{ width: '80%', alignSelf: 'center', marginBottom: '2%', flexDirection: 'row' }}>
                                {now == item.giorno ?
                                    <View style={{ width: '5%', justifyContent: 'center' }}>
                                        <View style={{ width: 7, height: 7, backgroundColor: '#EA9F5A', borderRadius: 3.5 }} />
                                    </View>
                                    :
                                    <View style={{ width: '5%', justifyContent: 'center' }} />}
                                <View style={{ width: '48%' }}>
                                    {now == item.giorno ?
                                        <Text style={{ fontFamily: "SFProDisplayBold", fontSize: 15, color: colors.theme.title }}>{item.giorno}</Text>
                                        :
                                        <Text style={{ fontFamily: "SFProDisplayMedium", fontSize: 14, color: colors.theme.title }}>{item.giorno}</Text>
                                    }
                                </View>
                                <View style={{ width: '48%' }}>
                                    {now == item.giorno ?
                                        <Text style={{ textAlign: 'right', fontFamily: "SFProDisplayBold", fontSize: 15, color: colors.theme.subtitle }}>{item.orario}</Text>
                                        :
                                        <Text style={{ textAlign: 'right', fontFamily: "SFProDisplayMedium", fontSize: 14, color: colors.theme.subtitle }}>{item.orario}</Text>
                                    }
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={{ marginTop: '5%' }}></View>
                    <Divider width={'85%'} />
                    <View style={{ width: "75%", alignSelf: 'center' }}>
                        <Text style={{ fontFamily: "SFProDisplayMedium", fontSize: 14, color: colors.theme.title, marginTop: '5%' }}>{store.indirizzo}, {store.zip}{'\n'}{store.citta} {store.provincia}</Text>
                    </View>
                    <InputButton params={{ marginTop: '5%', width: "75%" }} name="CHIAMA" icon="arrow-forward-outline" rotation="-45deg" />
                    <View style={{ marginBottom: tabBarHeight + 10 }} />
                </ScrollView>
            </View>
        )
    }
};

export default Store;
