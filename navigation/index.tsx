/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, Text } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import SignIn from '../screens/login/SignIn';
import SignUp from '../screens/login/SignUp';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/Home';
import NewRide from '../screens/NewRide';
import { LoginStackParamList, RootStackParamList } from '../types';
import { LoginLinking, RootLinking } from './LinkingConfiguration';
import { useDispatch, useSelector } from 'react-redux';
import TestScreen from 'screens/modals/Test';
import { LoginServices } from '@/services/api/Login';
import { setUser } from '@/store/reducers/main';

const LoginStack = createNativeStackNavigator<LoginStackParamList>();


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const { loading, user } = useSelector((state: any)=> state.main)
  return (
    <React.Fragment>
      { !user ? (
          <NavigationContainer linking={LoginLinking} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <LoginStack.Navigator initialRouteName='SignIn'>
                <LoginStack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
                <LoginStack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
              </LoginStack.Navigator>
          </NavigationContainer>
        ):(
          <NavigationContainer linking={RootLinking} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Root></Root>
          </NavigationContainer>
        )
      }
    </React.Fragment>)
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function Root() {
  return (
    <Stack.Navigator initialRouteName='Root' >
        <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="Modal"  options={{ title: 'Entrar' }} component={TestScreen} />
        </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<any>();

function BottomTabNavigator({ navigation }: any) {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch()

  const logOut = () =>{
    LoginServices.logout()
    dispatch(setUser(null))
  }

  return (
    <BottomTab.Navigator 
      initialRouteName="Home"
      screenOptions={{ 
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerRight: () => (
          <Pressable
            onPress={() =>logOut()}
            style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
            <Ionicons name="exit-outline" size={25} color={Colors[colorScheme].text} style={{ marginRight: 15 }} />
          </Pressable>
        )
        
      }}>
      <BottomTab.Screen name="Home" component={HomeScreen}
        options={({ navigation }) => ({ title: 'Caronas para hoje', tabBarIcon: ({ color }) => <TabBarIcon name="car" color={color} />, tabBarShowLabel: false,})}/>
      
      <BottomTab.Screen name="NewRide" component={NewRide} options={{ tabBarShowLabel: false, title: 'Nova Carona', tabBarIcon: ({ color }) => <TabBarIcon name="plus-circle" color={color} />}}/>
      
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string;}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}


