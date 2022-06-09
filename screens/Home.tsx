import react, { useState, useEffect, useCallback, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet, Text, View, Button} from 'react-native';
import ListView from "@/components/ListView"
import RideItem from "@/components/RideView"
import { RidesServices } from '@/services/api/Rides';
import { useIsFocused } from '@react-navigation/native';

export default function HomeScreen({ navigation }: any) {

  const { user } = useSelector((state: any)=>state.main)
  const [ loadTry, setLoadTry ] = useState(0)
  const [ rides, setRides ] = useState<any[]>([])
  const [ metaData, setMetaData ] = useState(null)

  const isFocused = useIsFocused();

  useEffect(()=>{ if(isFocused == true){ setLoadTry(0) } },[isFocused]) 

  useEffect(()=>{
    if(loadTry > 0) return;

    RidesServices.list({})
      .then((r)=>{ 
        setRides(r.records)
        setMetaData(r._metadata)
      })
      .finally(()=>setLoadTry(1))

  },[loadTry])

  return (
    <View style={styles.container}>
      <Button onPress={()=>setLoadTry(0)} title="reload" />
      <ListView isLoading={loadTry==0} item={RideItem} records={rides} onChange={()=>{}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});



