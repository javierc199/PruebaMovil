import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: '50%',
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
    borderWidth: 10,
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

export default styles;
