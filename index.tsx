import React, { useState, useEffect } from 'react';
import {WebView} from 'react-native-webview';
import {Dimensions, Platform} from 'react-native';

interface HumanPoseProps {
  width?: number;
  height?: number;
  enableSkeleton?: boolean;
  enableKeyPoints?: boolean;
  color?: string;
  mode?: 'single' | 'multiple';
  scoreThreshold?: number;
  isBackCamera?: boolean;
  flipHorizontal?: boolean;
  onPoseDetected?: (pose: any) => void;
  isFullScreen?: boolean;
}

export default function HumanPose(p: HumanPoseProps) {
  const onPoseDetected = (pose: any) => {
    if (p.onPoseDetected) {
      p.onPoseDetected(pose);
    }
  };

  let screenHeight = p.isFullScreen ? Dimensions.get('window').height * 2 : p.height ? p.height * 2.6 : 200 * 2.6;
  let screenWidth = p.isFullScreen ? Dimensions.get('window').width * 2 : p.width ? p.width * 2.6 : 200 * 2.6;



  return (
    <WebView
      source={{
        uri: `https://react-native-human-pose.web.app/?width=${
          p.width ? screenWidth : ''
        }&height=${p.height ? Platform.OS === 'ios' ? screenHeight : 300
          : ''}&enableSkeleton=${
          p.enableSkeleton === true ? p.enableSkeleton : 'false'
        }&enableKeyPoints=${p.enableKeyPoints === true ? p.enableKeyPoints : 'false'}&color=${
          p.color ? p.color : ''
        }&mode=${p.mode ? p.mode : ''}&scoreThreshold=${
          p.scoreThreshold ? p.scoreThreshold : ''
        }&isBackCamera=${p.isBackCamera ? p.isBackCamera : ''}&flipHorizontal=${
          p.flipHorizontal ? p.flipHorizontal : ''
        }&isFullScreen=${p.isFullScreen ? p.isFullScreen : ''}`,
      }}
      style={{
        width: p.isFullScreen ? Dimensions.get('window').width : p.width ? p.width : 200,
        height: p.isFullScreen ? Dimensions.get('window').height : p.height ? p.height : 200,
        // Dimensions.get('window').height / 2.8,
        borderRadius: 5,
        // borderWidth: 2,
        // borderColor: 'red',
      }}
      geolocationEnabled={true}
      mediaPlaybackRequiresUserAction={false}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      allowsInlineMediaPlayback={true}
      limitsNavigationsToAppBoundDomains={true}
      onMessage={event => {
        try {
          const pose = JSON.parse(event.nativeEvent.data);
          onPoseDetected(pose);
        } catch (e) {
          console.log(e);
        }
      }}
    />
  );
}
