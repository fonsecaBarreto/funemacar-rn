
import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { LoginStackParamList, RootStackParamList } from '../types';

export const RootLinking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              TabOneScreen: 'one test',
            },
          },
          NewRide: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export const LoginLinking: LinkingOptions<LoginStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      SignIn: "SignIn",
      SignUp: "SignUp"
    }
  },
};


