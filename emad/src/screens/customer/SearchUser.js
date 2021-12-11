import React from "react";
import {Image, View, Text, TouchableOpacity, ScrollView} from "react-native";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import BackButton from "../../components/BackButton";
import Divider from "../../components/Divider";
import InputText from "../../components/InputText";
import { useTheme } from "../../theme/ThemeProvider";
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const users = [
    { "name": "Maria Rossi", "id": "001", "next_appointment": "", "reserved": "true" },
    { "name": "Antonella Rossi", "id": "002", "next_appointment": "", "reserved": "true" },
    { "name": "Margherita Rosi", "id": "003", "next_appointment": "", "reserved": "true" },
    { "name": "Maria Bianchi", "id": "004", "next_appointment": "", "reserved": "true" },
    { "name": "Michela Gargiulo", "id": "005", "next_appointment": "29 Novembre 2021 15:00-16:00", "reserved": "true" },
]

const SearchUser = ({ navigation }) => {
    
    const {colors, isDark} = useTheme();

    const tabBarHeight = useBottomTabBarHeight();
    const [search, onChangeText] = React.useState('');
    const [user, onSearch] = React.useState([]);
    const ook = (cerca) => {
        onChangeText(cerca);
        onSearch(users.filter(user => (user.name.toLowerCase().includes(cerca.toLowerCase()) || user.id.includes(cerca))))

    }
    let [fontsLoaded] = useFonts({
        'SFProDisplayMedium': require('../../../assets/fonts/SFProDisplayMedium.otf'),
        'SFProDisplayRegular': require('../../../assets/fonts/SFProDisplayRegular.otf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            
            <View style={{ backgroundColor: colors.theme.background, flex: 1 }}>
                
                <View style={{ alignItems: "center", marginBottom: 15, marginTop: '10%' }}>
                    <InputText params={{ width: "75%", paddingLeft: 75, textAlign: "left" }}
                        name="Cliente" icon="search" rotation="0deg" value={search} onChangeText={cerca => ook(cerca)} secure='false' />
                </View>
                <Divider width="100%" />
                <ScrollView>
                    {user.map((item) => (
                        <View key={item.id} style={{height: 75, width: "90%",flexDirection: "row", alignSelf: "center",marginTop: 5, marginBottom: 5, }}>
                                <View style={{width: '25%'}}>
                                <View style={{ justifyContent: "center", marginLeft: 5, height: 70, width: 70, shadowOffset: { width: 1, height: 2 },shadowOpacity: 0.25,shadowRadius: 5, elevation: 5, marginRight: 10, borderRadius: 5 }}>
                                    <Image source={require('../../../assets/img/img.jpg')} style={{ height: 70, width: 70, borderRadius: 5, borderWidth: 3, borderColor: "white" }} />
                                </View>
                                </View>
                                <TouchableOpacity style={{flexDirection: 'row', width: '75%'}} activeOpacity={.75} onPress={() => { navigation.navigate('CustomerPage',{user:item.id}) }}>
                                    <View style={{ flexDirection: "column", justifyContent: "center" }}>
                                        <Text style={{ fontSize: 16, fontFamily: 'SFProDisplayMedium', color: colors.theme.title }}>{item.name}</Text>
                                        <Text style={{ fontSize: 11, fontFamily: 'SFProDisplayRegular', color: colors.theme.subtitle }}>Codice cliente: {item.id}</Text>
                                        <Text style={{ fontSize: 12, fontFamily: 'SFProDisplayRegular', color: colors.theme.title }}>{item.next_appointment}</Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignContent: "center", alignItems: 'center', marginLeft: 'auto', top: 15, marginRight: 5, height: 40, width: 40}}>
                                        <Ionicons name="chevron-forward" size={25} color={colors.theme.title} />
                                    </View>
                                </TouchableOpacity>
                        </View>
                    ))}
                    <View style={{ marginBottom: tabBarHeight + 10 }}></View>

                </ScrollView>
            </View>
        )
    }
};

export default SearchUser;