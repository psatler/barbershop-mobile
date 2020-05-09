import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  Linking,
  Button,
  Alert,
  PermissionsAndroid,
} from 'react-native';

// import axios from 'axios'

// import RNFetchBlob from 'rn-fetch-blob';

import { utils } from '@react-native-firebase/app';
import vision, {
  VisionBarcodeValueType,
} from '@react-native-firebase/ml-vision';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { useAuth } from '../hooks/auth';

async function processBarcodes(localPath) {
  const barcodes = await vision().barcodeDetectorProcessImage(localPath);

  // const [
  //   barcode,
  //   ...otherBarcodes
  // ] = await vision().barcodeDetectorProcessImage(localPath);
  // console.log('barcode', barcode);
  // console.log('otherBarcodes', otherBarcodes);

  console.log('barcodes', barcodes);

  barcodes.forEach(barcode => {
    if (barcode.valueType === VisionBarcodeValueType.CALENDAR_EVENT) {
      console.log('Barcode is a calendar event: ', barcode.calendarEvent);
    }

    if (barcode.valueType === VisionBarcodeValueType.CONTACT_INFO) {
      console.log('Barcode contains contact info: ', barcode.contactInfo);
    }

    if (barcode.valueType === VisionBarcodeValueType.DRIVER_LICENSE) {
      console.log(
        'Barcode contains drivers license info: ',
        barcode.driverLicense,
      );
    }

    if (barcode.valueType === VisionBarcodeValueType.EMAIL) {
      console.log('Barcode contains email address info: ', barcode.email);
    }

    if (barcode.valueType === VisionBarcodeValueType.GEO) {
      console.log('Barcode contains location info: ', barcode.geoPoint);
    }

    if (barcode.valueType === VisionBarcodeValueType.PHONE) {
      console.log('Barcode contains phone number info: ', barcode.phone);
    }

    if (barcode.valueType === VisionBarcodeValueType.SMS) {
      console.log('Barcode contains SMS info: ', barcode.sms);
    }

    if (barcode.valueType === VisionBarcodeValueType.URL) {
      console.log('Barcode contains URL info: ', barcode.url);
    }

    if (barcode.valueType === VisionBarcodeValueType.WIFI) {
      console.log('Barcode contains WIFI info: ', barcode.wifi);
    }
  });
}

// https://medium.com/react-native-training/deep-linking-your-react-native-app-d87c39a1ad5e
const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  const [url, setUrl] = useState<string | null>(null);

  // console.log(dirs.DocumentDir);
  // console.log(dirs.CacheDir);
  // console.log(dirs.DCIMDir);
  // console.log(dirs.DownloadDir);

  // Local path to file on the device
  // const localFile = `${utils.FilePath.DOCUMENT_DIRECTORY}/barcode-document.jpg`;
  // const localFile = `${utils.FilePath.DOCUMENT_DIRECTORY}/A Sample-PDF.pdf`;
  const localFile = `${utils.FilePath.EXTERNAL_STORAGE_DIRECTORY}/EAN-Obst.jpg`;

  console.log('CACHES_DIRECTORY', utils.FilePath.CACHES_DIRECTORY);
  console.log('DOCUMENT_DIRECTORY', utils.FilePath.DOCUMENT_DIRECTORY);
  console.log('EXTERNAL_DIRECTORY', utils.FilePath.EXTERNAL_DIRECTORY);
  console.log(
    'EXTERNAL_STORAGE_DIRECTORY',
    utils.FilePath.EXTERNAL_STORAGE_DIRECTORY,
  );
  console.log('LIBRARY_DIRECTORY', utils.FilePath.LIBRARY_DIRECTORY);
  console.log('MAIN_BUNDLE', utils.FilePath.MAIN_BUNDLE);
  console.log('MOVIES_DIRECTORY', utils.FilePath.MOVIES_DIRECTORY);
  console.log('PICTURES_DIRECTORY', utils.FilePath.PICTURES_DIRECTORY);
  console.log('TEMP_DIRECTORY', utils.FilePath.TEMP_DIRECTORY);

  // processBarcodes(
  //   '/storage/emulated/0/Download/EAN-Obst.jpg',
  //   // '/storage/emulated/0/Download/A Sample-PDF.pdf',
  //   // localFile,
  // )
  //   .then(() => console.log('Finished processing file.'))
  //   .catch(e => console.log(e));

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

  const processPdf = useCallback(async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App Camera Permission',
          message: 'The app needs to access your external storage',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permission granted');

        // await processBarcodes('/storage/emulated/0/Download/EAN-Obst.jpg');
        await processBarcodes(
          // '/storage/emulated/0/Download/iptu.jpg',
          '/storage/emulated/0/Download/net.jpg',
        );

        // processBarcodes(
        //   '/storage/emulated/0/Download/EAN-Obst.jpg',
        //   // '/storage/emulated/0/Download/A Sample-PDF.pdf',
        //   // localFile,
        // )
        //   .then(() => console.log('Finished processing file.'))
        //   .catch(e => console.log(e));

        // const { fs } = RNFetchBlob;
        // // const base64 = RNFetchBlob.base64;

        // const { dirs } = RNFetchBlob.fs;
        // console.log(dirs.DownloadDir);

        // const NEW_FILE_PATH = `${dirs.DownloadDir}/test.txt`;
        // fs.createFile(NEW_FILE_PATH, 'foo', 'utf8');
      } else {
        console.log('Permission denied');
      }
    } catch (err) {
      console.warn(err);
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
      {/* {url && <Button title="Open pdf" onPress={() => openPdf(url)} />} */}
      {url && <Button title="Open pdf" onPress={() => processPdf()} />}
    </View>
  );

  // return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
