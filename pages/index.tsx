import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import styles from "../styles/video.module.css";

const Home: NextPage = () => {
  const [client, setClient] = useState(false);
  const [mobileScreen, setMobileScreen] = useState<{
    screehWidth: number;
    screenHeight: number;
  }>({
    screehWidth: 0,
    screenHeight: 0,
  });

  useEffect(() => {
    setClient(true);
  }, []);

  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
      console.log(event.data);
      let parsedData: any = {};
      if (typeof event.data === "string") {
        parsedData = JSON.parse(event.data);
      }

      if (parsedData?.didimessage) {
        const { SCREEN_HEIGHT, SCREEN_WIDTH } = parsedData?.didimessage;
        setMobileScreen({
          screehWidth: SCREEN_WIDTH,
          screenHeight: SCREEN_HEIGHT,
        });
      }
    });
    // document.addEventListener("message", (event) => {
    //   console.log(event.data);
    //   let parsedData: any = {};
    //   if (typeof event.data === "string") {
    //     parsedData = JSON.parse(event.data);
    //   }

    //   if (parsedData?.didimessage) {
    //     const { SCREEN_HEIGHT, SCREEN_WIDTH } = parsedData?.didimessage;
    //     setMobileScreen({
    //       screehWidth: SCREEN_WIDTH,
    //       screenHeight: SCREEN_HEIGHT,
    //     });
    //   }
    // });
    return () => {
      window.removeEventListener("message", (event) => {});
    };
  }, []);

  const messageToRN = (message: string | object) => {
    //@ts-ignore
    if (window.ReactNativeWebView) {
      //@ts-ignore
      window.ReactNativeWebView.postMessage(JSON.stringify({ message }));
    } else {
      alert({ message: "not mobile" });
    }
  };
  // if (mobileScreen.screehWidth === 0) return <div>loading</div>;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <div style={{}}>
        {client && (
          <>
            <div>
              <div
                className={`${styles.video_wrapper} ${
                  isFullscreen ? `${styles.fullscreen}` : ""
                }`}
                style={{
                  width: isFullscreen
                    ? mobileScreen.screenHeight
                    : mobileScreen.screehWidth,
                  height: isFullscreen
                    ? mobileScreen.screehWidth
                    : mobileScreen.screenHeight,
                  backgroundColor: "yellow",
                }}
                // style={{ width: "100%", height: "100%" }}
              >
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=hPCgXeAi55s"
                  playsinline
                  playing={playing}
                  // controls

                  width={"100%"}
                  height={"100%"}
                />
                <button
                  style={{
                    width: 80,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 3,
                  }}
                  onClick={() => {
                    setPlaying((p) => !p);
                  }}
                >
                  <p>{playing ? "Pause" : "Play"}</p>
                </button>
                <button
                  style={{
                    width: 80,
                    position: "absolute",
                    top: 0,
                    left: 100,
                    zIndex: 99999,
                  }}
                  onClick={() => {
                    setIsFullscreen((p) => !p);
                    messageToRN(isFullscreen ? "exitFullscreen" : "fullscreen");
                  }}
                >
                  <p>fullscreen</p>
                </button>
                <button
                  style={{
                    width: 80,
                    position: "absolute",
                    top: 0,
                    left: 200,
                    zIndex: 99999,
                  }}
                  onClick={() => {
                    messageToRN("back");
                  }}
                >
                  <p>back</p>
                </button>
              </div>
              {/* <ReactPlayer
                ref={playerRef}
                url="https://player.vimeo.com/video/76979871"
                // url="https://www.youtube.com/watch?v=hPCgXeAi55s"
                width="100%"
                height="100%"
                playsinline
                controls={false}
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
                      autoplay: true,
                      muted: true,
                      autopause: false,
                      playsinline: true,
                      loop: true,
                    },
                  },
                  youtube: {
                    playerVars: {
                      controls: 0,
                    },
                  },
                }}
              />
              <CustomFullscreenButton onClick={toggleFullscreen} /> */}
            </div>
          </>
        )}
      </div>
    </>
  );
};

function CustomFullscreenButton({ onClick }: any) {
  return (
    <button onClick={onClick} style={{ right: "10px", bottom: "-50px" }}>
      Fullscreen
    </button>
  );
}

export default Home;
