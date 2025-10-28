import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import styles from "./styles.module.css";

interface VideoPlayerProps {
  filmData?: {
    nameRu: string;
    kinopoiskId?: string;
    year?: number;
  };
}

declare global {
  interface Window {
    videojs: any;
  }
}

export default function VideoPlayer({ filmData }: VideoPlayerProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const dataUrl = window.location.href;
        const kinopoiskId = filmData?.kinopoiskId || "";

        console.log("Fetching video for Kinopoisk ID:", kinopoiskId);

        const response = await fetch(
          `https://pleer.videoplayers.club/get_player?w=610&h=370&type=widget&kp_id=${kinopoiskId}&players=videocdn,hdvb,bazon,alloha,ustore,kodik,trailer,torrent&r_id=videoplayers&ru=${encodeURIComponent(
            dataUrl
          )}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const html = await response.text();
        console.log("API Response received");

        const iframeMatch = html.match(/<iframe[^>]*src="([^"]*)"/);

        if (iframeMatch && iframeMatch[1]) {
          const url = iframeMatch[1];
          console.log("Found video URL:", url);
          setVideoUrl(url);
        } else {
          throw new Error("Video URL not found in response");
        }
      } catch (err) {
        console.error("Error fetching video:", err);
        setError("Не удалось загрузить информацию о видео");
        setVideoUrl(getFallbackVideoUrl());
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideoUrl();
  }, [filmData]);

  const getFallbackVideoUrl = (): string => {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  };

  useEffect(() => {
    if (!videoUrl || !videoRef.current) return;

    if (playerRef.current) {
      playerRef.current.dispose();
      playerRef.current = null;
    }

    videoRef.current.innerHTML = "";

    const videoElement = document.createElement("video-js");
    videoElement.classList.add("vjs-default-skin");
    videoRef.current.appendChild(videoElement);

    const getVideoType = (url: string): string => {
      if (url.includes(".m3u8")) return "application/x-mpegURL";
      if (url.includes(".mpd")) return "application/dash+xml";
      if (url.includes(".mp4")) return "video/mp4";
      if (url.includes(".webm")) return "video/webm";
      if (url.includes("youtube") || url.includes("youtu.be"))
        return "video/youtube";

      return "application/x-mpegURL";
    };

    const videoType = getVideoType(videoUrl);
    console.log("Video type:", videoType, "URL:", videoUrl);

    const options = {
      autoplay: false,
      controls: true,
      responsive: true,
      fluid: true,
      preload: "metadata",
      liveui: true,
      html5: {
        vhs: {
          overrideNative: true,
        },
        nativeAudioTracks: false,
        nativeVideoTracks: false,
      },
      sources: [
        {
          src: videoUrl,
          type: videoType,
        },
      ],
      playbackRates: [0.5, 1, 1.25, 1.5, 2],
      controlBar: {
        children: [
          "playToggle",
          "volumePanel",
          "currentTimeDisplay",
          "timeDivider",
          "durationDisplay",
          "progressControl",
          "remainingTimeDisplay",
          "playbackRateMenuButton",
          "fullscreenToggle",
        ],
      },
    };

    try {
      playerRef.current = videojs(videoElement, options, function () {
        const player = this;
        console.log("Video.js player initialized");

        player.on("loadedmetadata", () => {
          console.log("Video metadata loaded");
          setError(null);
        });

        player.on("error", () => {
          console.error("Video.js error:", player.error());
          setError(`Ошибка видео: ${getErrorMessage(player.error()?.code)}`);
        });

        player.on("loadstart", () => {
          console.log("Video loading started");
        });

        player.ready(() => {
          setTimeout(() => {
            if (player.error()) {
              console.log("Trying to recover from error...");
              player.src({ src: videoUrl, type: "video/mp4" });
            }
          }, 1000);
        });
      });
    } catch (err) {
      console.error("Error initializing Video.js:", err);
      setError("Ошибка инициализации видеоплеера");
    }

    return () => {
      if (playerRef.current && !playerRef.current.isDisposed()) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [videoUrl]);

  const getErrorMessage = (code?: number): string => {
    switch (code) {
      case 1:
        return "Видео прервано";
      case 2:
        return "Ошибка сети";
      case 3:
        return "Ошибка декодирования";
      case 4:
        return "Формат видео не поддерживается";
      default:
        return "Неизвестная ошибка";
    }
  };

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className={styles.videoContainer}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          Загрузка видеоплеера...
        </div>
      </div>
    );
  }

  return (
    <div className={styles.videoContainer}>
      {error && (
        <div className={styles.errorOverlay}>
          <div className={styles.error}>
            <h4>Ошибка загрузки видео</h4>
            <p>{error}</p>
            <button onClick={handleRetry} className={styles.retryButton}>
              Попробовать снова
            </button>
            <div className={styles.fallbackTips}>
              <p>Если проблема повторяется:</p>
              <ul>
                <li>Проверьте интернет-соединение</li>
                <li>Попробуйте другой браузер</li>
                <li>Обновите страницу</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div data-vjs-player className={styles.videoWrapper}>
        <div ref={videoRef} className={styles.videoJsContainer} />
      </div>
    </div>
  );
}
