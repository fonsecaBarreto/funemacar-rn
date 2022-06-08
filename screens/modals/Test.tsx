import react, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet, Text, View} from 'react-native';

export function TestScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
        <Text> TEstando modal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TestScreen;



