import React from "react";
import { View, Text, Image,StyleSheet, Linking, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import externalStyles from "./ProfileCardStyles";
import kwaiLogo from './logok.png';
import gabLogo from './GABLOGO.png';
import fotoPerfil from './fotoperfil.jpeg';

const twitch = <Icon name={'twitch'} size={40} color={'purple'} />;
const codepen = <Icon name={'codepen'} size={40} color={'blue'} />;
const kwai = <Icon name={'kwai'} size={40} color={'red'} />;
const kwai2 = <Image source={kwaiLogo} style={{ width: 40, height: 40 }} />;
const GAB = <Image source={gabLogo} style={{ width: 40, height: 40 }} />;
const perfil1 = <Image source={fotoPerfil} style={{ width: 40, height: 40 }} />;

const ProfileCard = () => {
    const user = {
        // Cambia el avatar a la imagen importada
        avatar: fotoPerfil,
        coverPhoto: "https://scontent.fuio13-1.fna.fbcdn.net/v/t1.6435-9/68765704_1358208481004750_8750048816721297408_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=300f58&_nc_eui2=AeH8Jf1t3p3ImycyawzWmtL-M9K-rAkEwksz0r6sCQTCSwRabb7tLEsaiAQ_Yq90qRBImZRnuXTVWUr5yaCLu8wR&_nc_ohc=-FGg9JvQQIoAX9Mz6iF&_nc_ht=scontent.fuio13-1.fna&oh=00_AfAVwZiKgm7VH3K5Q70mkv-1F7yLrNqTI9j6CIr7FGDZrQ&oe=65FD53F4",
        name: "Javier Catucuago",
        facebookProfile: "https://www.facebook.com/javi.pxul"  
    }

    return (
        <View style={styles.container}>
            <Image source={{uri: user.coverPhoto}} style={styles.coverPhoto}/>
            <View style={styles.avatarContainer}>
                <Image source={{uri: user.avatar}} style={styles.avatar}/>
                <Text style={styles.name}>
                    {user.name}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableWithoutFeedback onPress={() => Linking.openURL('https://www.twitch.tv/javiercat1')}>
                    {twitch}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => Linking.openURL('https://codepen.io/javier-catucuago')}>
                    {codepen}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => Linking.openURL('https://www.kwai.com/es')}>
                    {kwai2}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => Linking.openURL('https://gab.com/')}>
                    {GAB}
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    coverPhoto: {
        width: '100%',
        height: 200,
        resizeMode: 'cover'
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: -75
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 5,
        borderColor: 'white'
    },
    name: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
        width: '60%',
        justifyContent: 'space-between'
    }
});

export default ProfileCard;
