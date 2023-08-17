import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import styles from "../styles/video.module.css";
import ErrorBoundary from "./ErrorBoundary";
import axios from "axios";

const Home: NextPage = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [client, setClient] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  const RNListener = (event: MessageEvent<any> | Event) => {
    let parsedData: any = {};
    //@ts-ignore
    if (typeof event.data === "string") {
      //@ts-ignore
      parsedData = JSON.parse(event.data);
    }

    if (parsedData?.didimessage) {
      const message = parsedData?.didimessage;
      if (message?.videoUrl !== undefined) {
        setVideoUrl(message.videoUrl);
      }
      if (message?.playing !== undefined) {
        setPlaying(message.playing);
      }
      if (message?.isMuted !== undefined) {
        setIsMuted(message.isMuted);
      }
      if (message?.playbackRate !== undefined) {
        setPlaybackRate(message.playbackRate);
      }
      if (message?.currentTime !== undefined) {
        if (message.currentTime > 1 && !duration) {
          playerRef.current?.seekTo(message.currentTime - 1);
        } else {
          playerRef.current?.seekTo(message.currentTime);
        }
      }
    }
  };

  useEffect(() => {
    setClient(true);
  }, []);

  useEffect(() => {
    window.addEventListener("message", (event) => RNListener(event));
    document.addEventListener("message", (event) => RNListener(event));
  }, []);

  const messageToRN = (didimessage: string | object) => {
    //@ts-ignore
    window.ReactNativeWebView.postMessage(JSON.stringify({ didimessage }));
  };

  useEffect(() => {
    if (isVideoLoading === false) {
      messageToRN({ isVideoLoading: false });
    }
  }, [isVideoLoading]);

  useEffect(() => {
    messageToRN({ isWebViewLoading: false });
  }, []);

  useEffect(() => {
    if (currentTime > -1) {
      messageToRN({ currentTime });
    }
  }, [currentTime]);

  useEffect(() => {
    if (duration > -1) {
      messageToRN({ duration });
    }
  }, [duration]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>
      <div style={{ width: "100%", height: "100%" }}>
        {client && (
          <ReactPlayer
            ref={playerRef}
            url={videoUrl}
            playing={playing}
            width="100vw"
            height="100vh"
            playsinline
            controls={false}
            muted={isMuted}
            playbackRate={playbackRate}
            onDuration={(duration) => {
              setDuration(duration);
            }}
            onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
            onReady={() => setIsVideoLoading(false)}
            config={{
              vimeo: {
                playerOptions: {
                  controls: false,
                  responsive: true,
                  muted: false,
                  autopause: false,
                  playsinline: true,
                  speed: true,
                },
              },
              youtube: {
                playerVars: {
                  controls: 0,
                  modestbranding: 1,
                  showinfo: 0,
                },
              },
            }}
          />
        )}
      </div>
    </>
  );
};

export default Home;
