import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import styles from "../styles/video.module.css";

const Home: NextPage = () => {
  const [client, setClient] = useState(false);
  // const [mobileScreen, setMobileScreen] = useState<{
  //   screehWidth: number;
  //   screenHeight: number;
  // }>({
  //   screehWidth: 0,
  //   screenHeight: 0,
  // });

  useEffect(() => {
    setClient(true);
  }, []);

  const playerRef = useRef<ReactPlayer>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [playing, setPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isSeekDragging, setIsSeekDragging] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  // const toggleFullscreen = () => {
  //   if (playerRef.current) {
  //     const internalPlayer = playerRef.current.getInternalPlayer();
  //     if (internalPlayer && internalPlayer.requestFullscreen) {
  //       internalPlayer.requestFullscreen();
  //     }
  //     setIsFullscreen(!isFullscreen);
  //   }
  // };

  useEffect(() => {
    window.addEventListener("message", (event) => {
      let parsedData: any = {};
      if (typeof event.data === "string") {
        console.log("DD", event.data);

        parsedData = JSON.parse(event.data);
      } else {
        // console.log("DD", event.data);
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

          // if (Number(message.currentTime) > duration || message.currentTime < 0) {
          //   playerRef.current?.seekTo(duration - 15);
          // } else {
          // }
        }
      }

      if (parsedData?.didimessage) {
        //@ts-ignore
        if (window?.ReactNativeWebView) {
          //@ts-ignore
          window?.ReactNativeWebView.postMessage(
            `Message from React Web to React Native ${parsedData?.didimessage?.isMuted}`
          );
        }
        console.log("DD", event.data);
      }
    });
    // document.addEventListener("message", (event: any) => {
    //   console.log(event.data);
    //   let parsedData: any = {};
    //   if (typeof event.data === "string") {
    //     parsedData = JSON.parse(event.data);
    //   }

    //   if (parsedData?.didimessage) {
    //     console.log("DD2", event.data);
    //     if (parsedData?.didimessage === "play") {
    //       setPlaying(true);
    //     } else if (parsedData?.didimessage === "pause") {
    //       setPlaying(false);
    //     }
    //   }
    // });
    // return () => {
    //   window.removeEventListener("message", (event) => {});
    // };
  }, []);

  const messageToRN = (didimessage: string | object) => {
    //@ts-ignore
    if (window.ReactNativeWebView) {
      //@ts-ignore
      window.ReactNativeWebView.postMessage(JSON.stringify({ didimessage }));
    } else {
      // alert({ message: "not mobile" });
    }
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

  // if (!videoUrl || isVideoLoading)
  //   return (
  //     <div
  //       style={{ width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center" }}
  //     >
  //       loading...
  //     </div>
  //   );

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>
      <div style={{ width: "100%", height: "100%" }}>
        {client && (
          <>
            <ReactPlayer
              ref={playerRef}
              url={videoUrl}
              playing={playing}
              src={{}}
              // url=""
              width="100vw"
              height="100vh"
              playsinline
              controls={false}
              muted={isMuted}
              playbackRate={playbackRate}
              onDuration={(duration) => {
                setDuration(duration);
                console.log("duration", duration);
              }}
              onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
              onReady={() => setIsVideoLoading(false)}
              // options={{
              //   fullscreen: {
              //     iosNative: true,
              //   },
              // }}

              config={{
                vimeo: {
                  playerOptions: {
                    controls: false,
                    responsive: true,
                    muted: false,
                    autopause: false,
                    playsinline: true,
                  },
                },
                youtube: {
                  playerVars: {
                    controls: 0,
                    modestbranding: 1,
                  },
                },
              }}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
