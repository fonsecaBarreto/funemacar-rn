import react, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet, Text, View} from 'react-native';
import { RootTabScreenProps } from '../types';
import ListView from "@/components/ListView"
import RideItem from "@/components/RideView"
import { RidesServices } from '@/services/api/Rides';
import { useIsFocused } from '@react-navigation/native';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {

  const { user } = useSelector((state: any)=>state.main)
  const [ loadTry, setLoadTry ] = useState(0)
  const [ rides, setRides ] = useState<any[]>([])
  const [ metaData, setMetaData ] = useState(null)

  const isFocused = useIsFocused();

  useEffect(()=>{
    if(isFocused == true){
      setLoadTry(0)
      RidesServices.list()
        .then((r)=>{ 
          setRides(r.records)
          setMetaData(r._metadata)
        })
        .finally(()=>setLoadTry(1))
    }
  },[isFocused]) 

  return (
    <View style={styles.container}>
      <ListView isLoading={loadTry==0} item={RideItem} records={rides} onChange={()=>{}}/>
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



