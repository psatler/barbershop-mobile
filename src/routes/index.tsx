import React from 'react';
// import { View, ActivityIndicator } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (!loading) {
    SplashScreen.hide();
  }

  // if (loading) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //       }}
  //     >
  //       <ActivityIndicator size="large" color="#999" />
  //     </View>
  //   );
  // }

  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
