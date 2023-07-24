import React from 'react';
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

  return (
    <WebView
      source={{
        uri: `https://react-native-human-pose.web.app//?width=${
          p.width ? p.width * 4 : ''
        }&height=${p.height ? p.height * 4 : ''}&enableSkeleton=${
          p.enableSkeleton ? p.enableSkeleton : ''
        }&enableKeyPoints=${p.enableKeyPoints ? p.enableKeyPoints : ''}&color=${
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
