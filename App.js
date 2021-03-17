import 'react-native-gesture-handler';
import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';
import { RNCamera } from 'react-native-camera';

const cameraScreen =()=> {
  let cameraRef = useRef(null);
  const [camType, setCamType] = useState(RNCamera.Constants.Type.back);
  const [flash,setFlash] = useState(RNCamera.Constants.FlashMode.off)
  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  const flipCamera = () =>{
    if(camType===RNCamera.Constants.Type.back){
      setCamType(RNCamera.Constants.Type.front)
    }else{
      setCamType(RNCamera.Constants.Type.back)
    }
  }
  const togglefalsh =() =>{
    if(flash===RNCamera.Constants.FlashMode.off){
      setFlash(RNCamera.Constants.FlashMode.on)
    }else{
      setFlash(RNCamera.Constants.FlashMode.off)
    }
  }


    return (
      <View style={styles.container}>
        <RNCamera
          ref={cameraRef}
          style={styles.preview}
          type={camType}
          flashMode={flash}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={()=> togglefalsh()} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> flash </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> takePicture()} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> flipCamera()} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> type </Text>
          </TouchableOpacity>
        </View>
      </View>
    );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});



export default cameraScreen;