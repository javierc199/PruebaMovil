import React from "react";
import { View, Text, Image, Linking, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import externalStyles from "./ProfileCardStyles";
import kwaiLogo from './logok.png';


const twitch = <Icon name={'twitch'} size={40} color={'purple'} />; 
const codepen = <Icon name={'codepen'} size={40} color={'blue'} />;  
const kwai = <Icon name={'kwai'} size={40} color={'red'} />; 
const linkedin = <Icon name={'linkedin'} size={40} color={'blue'} />;  
const kwai2 = <Image source={kwaiLogo} style={{ width: 40, height: 40 }} />;



const ProfileCard = () => {
    const user = {
        avatar: "https://scontent.fuio13-1.fna.fbcdn.net/v/t1.6435-1/79278908_1475334559292141_2310337026769027072_n.jpg?stp=dst-jpg_p160x160&_nc_cat=110&ccb=1-7&_nc_sid=2b6aad&_nc_eui2=AeHJ1T0et1-KAm2Rt3K7o9c66ebvY6qngebp5u9jqqeB5sqj36eejSadWDMEkKn6zNbjRqf33373zXqag04J1TT5&_nc_ohc=qizQdHBRNhgAX_4xBRF&_nc_ht=scontent.fuio13-1.fna&oh=00_AfBl6ZJX3RmAkHhKxdnc5XQOApwVlrQGnt-KmLm0fOLG3g&oe=65FD4570",
        coverPhoto: "https://scontent.fuio13-1.fna.fbcdn.net/v/t1.6435-9/68765704_1358208481004750_8750048816721297408_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=300f58&_nc_eui2=AeH8Jf1t3p3ImycyawzWmtL-M9K-rAkEwksz0r6sCQTCSwRabb7tLEsaiAQ_Yq90qRBImZRnuXTVWUr5yaCLu8wR&_nc_ohc=-FGg9JvQQIoAX9Mz6iF&_nc_ht=scontent.fuio13-1.fna&oh=00_AfAVwZiKgm7VH3K5Q70mkv-1F7yLrNqTI9j6CIr7FGDZrQ&oe=65FD53F4",
        name: "Javier Catucuago",
        facebookProfile: "https://www.facebook.com/javi.pxul"  
    }

    return (
        <View style={externalStyles.container}>
            <Image source={{uri: user.coverPhoto}} style={externalStyles.coverPhoto}/>
            <View style={externalStyles.avatarContainer}>
                <Image source={{uri: user.avatar}} style={externalStyles.avatar}/>
                <Text style={externalStyles.name}>
                    {user.name}
                </Text>
            </View>
            <View style={externalStyles.buttonContainer}>
                <TouchableWithoutFeedback onPress={() => Linking.openURL('https://www.twitch.tv/javiercat1')}>
                    {twitch}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => Linking.openURL('https://codepen.io/javier-catucuago')}>
                    {codepen}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => Linking.openURL('https://www.kwai.com/es')}>
                    {kwai2}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => Linking.openURL('https://www.linkedin.com/in/javier-catucuago-510022266/')}>
                    {linkedin}
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

export default ProfileCard;
