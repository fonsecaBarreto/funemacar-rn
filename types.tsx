import { NavigatorScreenParams } from '@react-navigation/native';

export type LoginStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<{
    Home: undefined;
    NewRide: undefined;
  }> | undefined;
  Modal: undefined;
  NotFound: undefined;
};