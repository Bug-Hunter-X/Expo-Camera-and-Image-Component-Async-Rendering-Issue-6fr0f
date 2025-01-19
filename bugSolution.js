**Solution Code (bugSolution.js):**
```javascript
import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { Image, StyleSheet, View, ActivityIndicator } from 'react-native';

export default function App() {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(CameraType.back);
  const [imageUri, setImageUri] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    setIsLoading(true);
    if (hasPermission) {
      let photo = await cameraRef.current.takePictureAsync();
      setImageUri(photo.uri);
    }
    setIsLoading(false);
  };

  const cameraRef = React.useRef(null);

  if (hasPermission === null) {
    return <View />; 
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
      </Camera>
      <Button title="Take Picture" onPress={takePicture} />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
  },
});
```