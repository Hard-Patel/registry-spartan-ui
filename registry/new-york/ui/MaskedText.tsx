import React, { useState } from "react";

type MaskedTextProps = {
  text: string;
  imageUrl: string;
  className?: string;
};

export const MaskedText: React.FC<MaskedTextProps> = ({
  text,
  imageUrl,
  className = "",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {/* Hidden preloader for the image */}
      <img
        src={imageUrl}
        alt=""
        onLoad={() => setIsLoaded(true)}
        style={{ display: "none" }}
      />

      <div
        className={`relative inline-block text-6xl font-extrabold ${className}  ${
          isLoaded ? "text-transparent" : "text-foreground"
        }`}
        style={
          isLoaded
            ? {
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }
            : {}
        }
      >
        {text}
      </div>
    </>
  );
};
