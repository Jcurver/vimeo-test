import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import ReactPlayer from "react-player";
import ReactPlayerVimeo from "react-player/vimeo";

const Home: NextPage = () => {
  const playerContainerRef = useRef(null);
  const [client, setClient] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    setClient(true);
    if (playerContainerRef.current) {
      new Plyr(playerContainerRef.current);
    }
  }, []);

  const videoRef = useRef(null);

  // const player = new Plyr("#player", {
  //   clickToPlay: false,
  //   controls: [],
  //   fullscreen: { enabled: false, iosNative: false },
  //   // playsinline: true,
  //   vimeo: {
  //     playsinline: true,
  //     controls: false,
  //   },
  // });

  useEffect(() => {
    if (videoRef.current) {
      const player = new Plyr(videoRef.current, {
        controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "captions"],
        clickToPlay: false,
        // controls: [],
        fullscreen: { enabled: false, iosNative: false },
        // playsinline: true,
        // dataPlyrProvider: "vimeo",
        vimeo: {
          playsinline: true,
          // controls: false,
          iframeParams: {
            allow: "autoplay; fullscreen; picture-in-picture",
          },
        },
      });

      return () => {
        // 컴포넌트 언마운트 시 Plyr 인스턴스 제거
        player.destroy();
      };
    }
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    // 컴포넌트 마운트 후 Plyr 인스턴스 생성
    const player = new Plyr("#player");

    // 컴포넌트 언마운트 시 리소스 해제
    return () => {
      player && player.destroy();
    };
  }, []);

  const vimeoUrl = `https://player.vimeo.com/video/76979871?playsinline=1`;

  return (
    <>
      <Head>
        <script src="https://player.vimeo.com/api/player.js" async />
      </Head>
      <div
        id="player"
        data-plyr-provider="vimeo"
        data-plyr-embed-id="76979871"
        // style="margin-top: 50px;"
      ></div>
      <div>
        {client && (
          <>
            <iframe
              ref={videoRef}
              src={vimeoUrl}
              // allow="autoplay"
              // allowFullScreen
              webkit-playsInline // iOS에서 인라인 재생을 위한 속성
            />
            {/* https://vimeo.com/252120919 */}
            <iframe
              src="https://player.vimeo.com/video/76979871?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media"
              allowFullScreen
              allowTransparency
              allow="autoplay"
              webkit-playsinline="true"
              // webkit-playsinline="true"
            ></iframe>
            <div>
              <ReactPlayer
                url="https://www.youtube.com/watch?v=pSUydWEqKwE"
                webkit-playsinline="true"
              />

              <ReactPlayer
                url="https://player.vimeo.com/video/76979871?playsinline=1"
                webkit-playsinline="true"
                playsinline
                controls
                config={{
                  file: {
                    forceHLS: !isSafari,
                    forceVideo: true,
                    hlsVersion: "0.12.4",
                    attributes: {
                      // poster: feed && feed.actionUrl && feed.actionUrl.image,
                      disablePictureInPicture: true,
                    },
                  },
                }}
                // playsinline="true"
              />
            </div>
            {/* <div>
              <ReactPlayer
                url="https://www.youtube.com/watch?v=pSUydWEqKwE"
                webkit-playsinline="true"
              />
            </div> */}

            <iframe
              src="https://player.vimeo.com/video/76979871?playsinline=1"
              allowFullScreen
              allowTransparency
              allow="autoplay"
              webkit-playsinline="true"
            ></iframe>
            {/* <iframe
              src="https://player.vimeo.com/video/201974072?h=5da68dcaa8&title=0&byline=0&portrait=0"
              width="640"
              height="363"
              frameborder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowfullscreen
            ></iframe>
            <div>
              <iframe
                src="https://player.vimeo.com/video/76979871?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media"
                allowFullScreen
                allowTransparency
                allow="autoplay"
              ></iframe>
            </div>

        
            <iframe
              src="https://player.vimeo.com/video/386664628?h=85bba6044f"
              width="640"
              height="480"
              allow="autoplay; fullscreen; picture-in-picture"
            ></iframe>
            <p>
              <a href="https://vimeo.com/386664628">환경관리 동영상 화제</a>{" "}
              from <a href="https://vimeo.com/gg031120">경기도청</a> on{" "}
              <a href="https://vimeo.com">Vimeo</a>.
            </p>
            <iframe
              src="https://player.vimeo.com/video/252120919?h=a10bc5dabe"
              width="640"
              height="360"
              // allowFullscreen
              // frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              // webkit-playsinline="true"
            ></iframe>
            <p>
              <a href="https://vimeo.com/252120919">똑1388(동영상)</a> from{" "}
              <a href="https://vimeo.com/user56990472">
                한국청소년상담복지개발원
              </a>{" "}
              on <a href="https://vimeo.com">Vimeo</a>.
            </p>
            <div>
              <ReactPlayer
                url="https://www.youtube.com/watch?v=pSUydWEqKwE"
                webkit-playsinline="true"
              />
            </div>
            <div>
              <ReactPlayer
                url="https://player.vimeo.com/video/76979871?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media"
                webkit-playsinline="true"
              />
            </div> */}
          </>
        )}
      </div>
    </>
  );
};
//https://vimeo.com/252120919
export default Home;
