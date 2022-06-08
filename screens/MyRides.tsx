import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from 'components/Themed';


export namespace MyRidesScreen {
  export type Params = { navigation: any }
}

export const MyRidesScreen: React.FunctionComponent<MyRidesScreen.Params> = ({navigation}) =>{

  return (
      <View style={styles.container}>
          <Text> Minha Caronas aqui </Text>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  formContainer: {
      width: "100%",
      padding: 10
  }
});


export default MyRidesScreen;



