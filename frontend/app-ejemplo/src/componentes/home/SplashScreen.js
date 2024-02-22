import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('ProfileCard'); 
    }, 3000); 

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
  source={require('https://wallpapercave.com/wp/wp10409166.jpg')} 
  style={styles.logo}
/>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200, 
    height: 200, 
  },
});

export default SplashScreen;
