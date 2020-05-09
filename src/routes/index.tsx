import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  Linking,
  Button,
  Alert,
} from 'react-native';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { useAuth } from '../hooks/auth';

// https://medium.com/react-native-training/deep-linking-your-react-native-app-d87c39a1ad5e
const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  const [url, setUrl] = useState<string | null>(null);

  useEffect(function getPdfIntent() {
    // If the app is already open, the app is foregrounded and a Linking event is fired
    // Linking.addEventListener(url, callback)

    // If the app is not already open, it is opened and the url is passed in as the initialURL
    // Linking.getInitialURL(url)

    // content://com.android.providers.downloads.documents/document/15

    async function getPdf(): Promise<void> {
      console.log('Pdf intent!');
      const initialURL = await Linking.getInitialURL();
      setUrl(initialURL);
      console.log('initialURL ', initialURL);
    }

    getPdf();
  }, []);

  const openPdf = useCallback(async (pdfUrl: string) => {
    console.log(pdfUrl);
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(pdfUrl);
    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(pdfUrl);
    } else {
      Alert.alert(`Don't know how to open this URL: ${pdfUrl}`);
    }
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text style={{ color: '#fff' }}> Testing intent </Text>
      <Text style={{ color: '#fff' }}> {url} </Text>
      {url && <Button title="Open pdf" onPress={() => openPdf(url)} />}
    </View>
  );

  // return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
