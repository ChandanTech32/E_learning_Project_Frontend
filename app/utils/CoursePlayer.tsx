import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  const isYouTube = videoUrl?.includes("youtube.com");
  const isVdoCipher = !isYouTube && !videoUrl?.includes("res.cloudinary.com");

  useEffect(() => {
    // VdoCipher only
    if (isVdoCipher && videoUrl) {
      axios
        .post(`${process.env.NEXT_PUBLIC_SERVER_URI}getVdoCipherOTP`, {
          videoId: videoUrl,
        })
        .then((res) => {
          setVideoData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [videoUrl]);

  return (
    <div style={{ position: "relative", paddingTop: "56.25%" }}>

      {/* ✅ YouTube Player */}
      {isYouTube && (
        <iframe
          src={videoUrl}
          title={title}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
          allowFullScreen
        />
      )}

      {/* ✅ Cloudinary Player (NEW FIX) */}
      {videoUrl?.includes("res.cloudinary.com") && (
        <video
          controls
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            background: "black",
          }}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support video tag.
        </video>
      )}

      {/* ✅ VdoCipher Player */}
      {isVdoCipher && videoData.otp && videoData.playbackInfo && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=3thUX4gz2Z2U5DvN`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
          allow="encrypted-media"
          allowFullScreen
        />
      )}
    </div>
  );
};

export default CoursePlayer;
