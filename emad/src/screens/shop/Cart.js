import React, { useCallback, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Dimensions} from "react-native";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { useTheme } from "../../theme/ThemeProvider";
import BackButton from "../../components/BackButton";
import CartItem from "../../components/CartItem";
import InputButton from "../../components/InputButton";
import InputText from "../../components/InputText";
import Divider from "../../components/Divider";
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/Ionicons';
import { addProduct, decreaseProduct, getCart, getNumOfArticle, getTotale, increaseProduct, removeProduct } from "../../back/cart";
import { getImmagineByProdotto } from "../../back/connect";
import { useLanguage } from "../../localization/Localization";

const height = Dimensions.get('screen').height;

const Cart = ({ navigation,route }) => {
    const [cart,setCart]=useState(getCart())
    const { colors, isDark } = useTheme();
    const [lang, setLanguage] = useLanguage();
    const [isModalVisible, setModalVisible] = useState(false);
    const [errorText, setErrorText] = useState('Default');


    const [totale,setTotale]=useState(getTotale())
    const [numOfArticle,setNum]=useState(getNumOfArticle())
    const tabBarHeight = useBottomTabBarHeight();
    const [userEmail, setUserEmail] = useState('');
    
    const OnIncrementProduct=useCallback((id)=>{
        setCart(increaseProduct(id))
        setTotale(getTotale());
        setNum(getNumOfArticle());
    })
    const OnDecrementProduct=useCallback((id)=>{
        setCart(decreaseProduct(id))
        setTotale(getTotale());
        setNum(getNumOfArticle());
    })

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    
      let [fontsLoaded] = useFonts({
        'SFProDisplayMedium': require('../../../assets/fonts/SFProDisplayMedium.otf'),
        'SFProDisplayBold': require('../../../assets/fonts/SFProDisplayBold.otf'),
        'SFProDisplayUltraLightItalic': require('../../../assets/fonts/SFProDisplayUltraLightItalic.otf')
    });

    const handleSubmitPress = () => {
        var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        const delay = ms => new Promise(res => setTimeout(res, ms));
    
        if (totale==0) {
          setErrorText(lang.campoErroreTotale)
          setModalVisible(true)
          return;
        } 
        if (!userEmail.match(mailformat)) {
            setErrorText(lang.campoErroreEmail)
            setModalVisible(true)
            return;
        } 

        navigation.navigate('Payment');
      }

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {


        
        return (
            <View style={{ backgroundColor: colors.theme.background, flex: 1 }}>
                <Modal
                    isVisible={isModalVisible}
                    statusBarTranslucent={true}
                    animationIn="bounceIn"
                    animationOut="fadeOutDownBig"
                    hasBackdrop={true}
                    backdropOpacity={10}
                    backdropColor={"rgba(0, 0, 0, 0.3)"}
                    useNativeDriverForBackdrop={true}
                    hideModalContentWhileAnimating={true}
                    deviceHeight={height}
                >
          <View style={{ padding: 20 }}>
            <View style={colors.topModal}>
              <Icon name="close-circle-outline" size={75} color={'#FFFFFF'} />
            </View>
            <View style={colors.modalContent}>
              <Text style={{ color: colors.theme.primary, textAlign: 'center' }}>{errorText}</Text>
              <InputButton params={{ marginTop: '5%', width: "75%" }}
                name={lang.conferma} icon="arrow-forward-outline" rotation="-45deg" onPress={toggleModal} />
            </View>
          </View>
        </Modal>
                <View style={{flexDirection: 'row',marginBottom:20}}>
                    <BackButton onPress={() => { navigation.goBack() }} />
                    <View style={{flex:1,justifyContent: "center",marginRight:'15%',alignItems: "center", paddingTop: '15%'}}>
                    <Text style={{fontFamily: "SFProDisplayMedium", fontSize: 22, alignSelf:'center', color: colors.theme.title}}>{lang.carrello}</Text>
                    </View>
                </View> 
                <ScrollView overScrollMode="never">
                    {cart.map((prod)=>(
                        <CartItem key={prod.prodotto.id} OnIncrementProduct={OnIncrementProduct} OnDecrementProduct={OnDecrementProduct} value={prod.qta} id={prod.prodotto.id} name={prod.prodotto['nome_'+lang.codice]} reference={prod.prodotto.ean13} specifics={"Specifiche"} price={prod.prodotto.prezzo} image={{ uri: getImmagineByProdotto(prod.prodotto.id) }} min={0} max={2} />
                    ))}

                    <View style={{ width: '75%', alignSelf: 'center', marginTop: '5%', marginBottom:'5%' }}>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <View style={{ width: '50%' }}>
                                <Text style={{ fontSize: 16, fontFamily: 'SFProDisplayMedium', color: colors.theme.primary }}>
                                    {lang.articoliTot}:
                                </Text>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text style={{ fontSize: 16, fontFamily: 'SFProDisplayMedium', color: colors.theme.primary, textAlign: 'right' }}>
                                    {numOfArticle}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', width: '100%', marginBottom:'5%' }}>
                            <View style={{ width: '50%' }}>
                                <Text style={{ fontSize: 20, fontFamily: 'SFProDisplayMedium', fontWeight:"bold", color: colors.theme.primary }}>
                                {lang.totale}:
                                </Text>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text style={{ fontSize: 20, fontFamily: 'SFProDisplayMedium', fontWeight:"bold", color: colors.theme.primary, textAlign: 'right' }}>
                                € {totale}
                                </Text>
                            </View>
                        </View>
                        <Divider width={"100%"} opacity={1} marginBottom={12} />
                        <InputText params={{ marginTop: 25, alignSelf:'center',width: "100%" }} name={lang.email} icon="mail-outline" rotation="0deg" value={userEmail} onChangeText={setUserEmail} secure='false' />


                    </View>
                    <InputButton params={{ marginTop: 26, width: "75%" }} name={lang.pagaCassa} icon="arrow-forward-outline" rotation="-45deg" />
                    <InputButton params={{ marginTop: 26, width: "75%" }} name={lang.pagaOra} icon="arrow-forward-outline" rotation="-45deg" onPress={handleSubmitPress} />

                    <View style={{ marginBottom: tabBarHeight + 100 }}></View>
                </ScrollView>
            </View>
        )
    }
};

const styles = StyleSheet.create({
});

export default Cart;
