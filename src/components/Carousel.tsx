import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CarouselComponent() {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const message = "반갑습니다:)\nPOPIT에서 다양한 팝업스토어를 둘러보세요!";
    let currentIndex = 0;
    let timeout: string | number | NodeJS.Timeout | undefined;

    const type = () => {
      if (currentIndex < message.length) {
        setText(message.substring(0, currentIndex + 1));
        currentIndex++;
        timeout = setTimeout(type, 100);
      } else {
        setIsTyping(false);
        clearTimeout(timeout);
      }
    };

    type();

    return () => clearTimeout(timeout);
  }, []);

  const typingText = isTyping ? (
    <span className="inline-block">
      {text.split("\n").map((line, index) => (
        <span key={index}>
          {line}
          {/* <span className="animate-blink">|</span> */}
          <br />
        </span>
      ))}
    </span>
  ) : (
    <span>
      {text.split("\n").map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
      ))}
    </span>
  );

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl -z-1">
      <div className="w-full sm:w-96 md:w-3/5 md:m-auto lg:w-1/2">
        <Carousel
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          autoPlay
          infiniteLoop
        >
          <div>
            {/* <img src="../../src/assets/images/KakaoTalk_Photo_2023-06-23-22-43-57 002.jpeg" /> */}
          </div>
          <div>
            {/* <img src="../../src/assets/images/KakaoTalk_Photo_2023-06-23-22-43-57 004.jpeg" /> */}
          </div>
          <div>
            <img src="https://popits3.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A2%E1%86%B7%E1%84%83%E1%85%A5%E1%86%BC%E1%84%8F%E1%85%B3.jpeg" />
          </div>
          <div>
            {/* <img src="../../src/assets/images/KakaoTalk_Photo_2023-06-23-22-43-56 001.jpeg" /> */}
          </div>
        </Carousel>
      </div>
      <div className="card-body -mb-10 lg:mb-0">
        <p className="card-title">{typingText}</p>
        <div className="card-actions justify-end">
          <Link to="/popuplist">
            <button className="btn btn-outline mb-5 mt-5 lg:mt-0 border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white hover:border-indigo-400">
              팝업스토어 보기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CarouselComponent;
