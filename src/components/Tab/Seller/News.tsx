import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../AxiosInstance/AxiosConfig";

interface NewsItem {
  storeName: string;
  city: string;
  timeAgo: string;
  content: string;
  newsImgURL: string;
  id: number;
}

interface NewsProps {
  storeName: string | null;
}

export default function News({ storeName }: NewsProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [showImageSection, setShowImageSection] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const formDataRef = useRef<FormData>(new FormData());

  useEffect(() => {
    fetchNewsList(storeName);
  }, [storeName]);

  const fetchNewsList = (storeName: string | null) => {
    axiosInstance
      .get(`http://3.34.149.107:8082/api/${storeName}/news`)
      .then((response) => {
        const data = response.data;
        console.log(data.data);
        setNews(data.data);
        console.log("됐다.");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const uploadedImage = reader.result as string;
        setSelectedImage(uploadedImage);
      };
      reader.readAsDataURL(file);
      formDataRef.current = new FormData();
      formDataRef.current.append("file", file, file.name);
      setShowImageSection(true);
    }
  };

  const handleSubmit = () => {
    const formData = formDataRef.current;
    formData.append(
      "dto",
      JSON.stringify({
        content: inputValue,
      })
    );

    for (const key of formData.keys()) {
      console.log(key);
    }

    for (const value of formData.values()) {
      console.log(value);
    }

    axiosInstance
      .post("http://3.34.149.107:8082/api/seller/news", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        console.log("post완료!");
        setInputValue("");
        setSelectedImage("");
        fetchNewsList(storeName);
      })
      .catch((error) => {
        console.error(error);
      });

    setShowImageSection(false);
  };

  const handleDeleteNews = (id: number) => {
    axiosInstance
      .delete(`http://3.34.149.107:8082/api/seller/news/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setNews((prevNews) => prevNews.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="my-10 bg-indigo-50 rounded-lg text-left p-5 m-5">
        <div className="mb-16">
          <form className="flex flex-col items-center sm:flex-row">
            <input
              type="text"
              id="news-input"
              placeholder="스토어 소식을 등록해주세요"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="h-12 p-2 rounded-lg w-full focus:outline-none sm:grow"
              autoComplete="off"
            />
            <input
              type="file"
              id="file-input"
              className="hidden"
              onChange={(e) => {
                e.preventDefault();
                handleAddPhoto(e);
              }}
            />
            <label
              htmlFor="file-input"
              className="group btn btn-outline w-full mt-2 focus:outline-none sm:ml-3 sm:w-auto sm:mt-0 border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white hover:border-indigo-400"
            >
              사진추가
            </label>
            <button
              type="submit"
              className="btn btn-outline w-full mt-2 focus:outline-none sm:ml-3 sm:w-auto sm:mt-0 border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white hover:border-indigo-400"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              소식등록
            </button>
          </form>
          {showImageSection && (
            <div className="mt-5">
              <p className="font-medium text-lg">첨부이미지</p>
              <div className="mt-2 p-5 border border-indigo-200 rounded-lg">
                {selectedImage && <img src={selectedImage} alt="Uploaded" />}
              </div>
            </div>
          )}
        </div>
        {news.length === 0 ? (
          <div className="text-center text-xl font-semibold mb-10">
            아직 소식이 없어요! 🥲
          </div>
        ) : (
          <div className="tab-list">
            {[...news].reverse().map((item) => (
              <div
                key={item.id}
                className="py-8 border-b border-slate-300 first:pt-0 last:border-none"
              >
                <div className="flex justify-between mb-2">
                  <div className="text-left">
                    <p className="font-bold text-base">{item.storeName}</p>
                    <div className="text-slate-500">
                      <span>{item.city}</span>
                      <span className="ml-1">•</span>
                      <span className="ml-1">{item.timeAgo}</span>
                    </div>
                  </div>
                </div>
                <div className="mb-5">{item.content}</div>
                {item.newsImgURL && (
                  <div className="overflow-hidden">
                    <img src={item.newsImgURL} alt="" />
                  </div>
                )}
                <button
                  type="submit"
                  className="flex ml-auto btn btn-outline w-full mt-5 focus:outline-none sm:w-auto border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white hover:border-indigo-400"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteNews(item.id);
                  }}
                >
                  소식삭제
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
