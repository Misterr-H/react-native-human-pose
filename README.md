# react-native-human-pose
A Light Weight, performative package to quickly get human pose from a mobile camera

![](https://i.imgur.com/d3CEtiC.jpg)

## Installation
```
npm i react-native-human-pose
```
OR
```
yarn add react-native-human-pose
```
### Android
Go to android/app/src/main/AndroidManifest.xml and add this line
```
<uses-permission android:name="android.permission.CAMERA" />
```
### iOS
```
cd ios && pod install
```
Also go to ios/\<project name\>/Info.plist and these lines
```
<key>NSCameraUsageDescription</key>
<string>$(PRODUCT_NAME) needs access to your Camera.</string>
```
## Sample Usage
```
import React from 'react';
import HumanPose from 'react-native-human-pose';
import {View, Text} from 'react-native';

const App = () => {
  const onPoseDetected = (pose: any) => {
    console.log('pose', pose);
  };
  return (
    <View style={{flex:1}}>
      <Text>Human Pose</Text>
      <HumanPose
        height={200}
        width={300}
        enableKeyPoints={true}
        flipHorizontal={false}
        isBackCamera={false}
        color={'255, 0, 0'}
        onPoseDetected={onPoseDetected}
      />
    </View>
  );
};

export default App;
```
## Props Passed
1. width?: number // Width for the video component
2. height?: number // Height for the video component
3. enableSkeleton?: boolean // Wheather you want to enable skeleton or not. Default: true
4. enableKeyPoints?: boolean // Wheather you want to enable keypoints or not. Default: true
5. color?: string // Color of keypoints and skeleton in 'RR, GG, BB' format
6. mode?: 'single' | 'multiple' // Pose detection mode to detect single person or multiple persons
7. scoreThreshold?: number // A confidence score to mark keypoint between 0 and 1. Default: 0.5
8. isBackCamera?: boolean // Capture from back camera of device. Default: false
9. flipHorizontal?: boolean // Flip video horizontally
10. onPoseDetected?: (pose: any) => void // A callback called on each pose detected on each frame
