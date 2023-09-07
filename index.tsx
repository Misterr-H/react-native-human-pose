import React, { useState, useEffect } from 'react';
import {WebView} from 'react-native-webview';

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
}

export default function HumanPose(p: HumanPoseProps) {
  const onPoseDetected = (pose: any) => {
    if (p.onPoseDetected) {
      p.onPoseDetected(pose);
    }
  };

  let screenHeight = p.height ? p.height * 2.6 : 689 * 2.6;
  let screenWidth = p.width ? p.width * 2.6 : 383 * 2.6;

  return (
    <WebView
      source={{
        uri: `https://1ad4-223-190-85-119.ngrok-free.app/?width=${
          p.width ? screenWidth : ''
        }&height=${p.height ? screenHeight : ''}&enableSkeleton=${
          p.enableSkeleton === true ? p.enableSkeleton : 'false'
        }&enableKeyPoints=${p.enableKeyPoints === true ? p.enableKeyPoints : 'false'}&color=${
          p.color ? p.color : ''
        }&mode=${p.mode ? p.mode : ''}&scoreThreshold=${
          p.scoreThreshold ? p.scoreThreshold : ''
        }&isBackCamera=${p.isBackCamera ? p.isBackCamera : ''}&flipHorizontal=${
          p.flipHorizontal ? p.flipHorizontal : ''
        }`,
      }}
      style={{
        width: p.width ? p.width : 200,
        height: p.height ? p.height : 200,
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
