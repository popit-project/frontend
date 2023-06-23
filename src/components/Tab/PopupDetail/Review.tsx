import { useEffect, useState } from "react";
import { axiosInstance } from "../../AxiosInstance/AxiosConfig";

interface review {
  name: string;
  location: string;
  date: string;
  content: string;
}

export default function Review() {
  const [reviewList, setReviewList] = useState<review[]>([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    axiosInstance
      .get("/reviews?_sort=id&_order=desc")
      .then((response) => {
        const data = response.data;
        setReviewList(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleReviewSubmit = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    const newReviewItem = {
      name: "새로운 사용자",
      location: "위치",
      date: formattedDate,
      content: newReview,
    };

    axiosInstance
      .post("/reviews", newReviewItem)
      .then((response) => {
        console.log("Review submitted:", response.data);
        const updatedReviews = [response.data, ...reviewList];
        setNewReview("");
        setReviewList(updatedReviews);
      })
      .catch((error) => {
        console.error("Failed to submit review:", error);
      });
  };

  return (
    <div className="m-10 bg-slate-100 rounded-lg text-left p-5">
      <div className="mb-16">
        <form className="flex flex-col items-center sm:flex-row">
          <input
            type="text"
            placeholder="리뷰를 등록해주세요"
            className="h-12 p-2 rounded-lg w-full focus:outline-none sm:grow"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          ></input>
          <button
            type="submit"
            className="btn btn-outline w-full mt-2 focus:outline-none sm:ml-3 sm:w-auto sm:mt-0"
            onClick={(e) => {
              e.preventDefault();
              handleReviewSubmit();
            }}
          >
            등록
          </button>
        </form>
      </div>
      {reviewList.length === 0 ? (
        <div className="text-center text-xl font-semibold leading-8 mb-10">
          <p>아직 가게 후기가 없어요! 🥲</p>
        </div>
      ) : (
        <div className="tab-list first:pt-0">
          {reviewList.map((review, index) => (
            <div
              key={index}
              className="py-8 border-b border-slate-300 first:pt-0 last:border-none"
            >
              <div className="flex items-center mb-2">
                <figure className="w-16 h-16 rounded-full bg-gray-400">
                  <img src="" alt="" />
                </figure>
                <div className="ml-3 text-left">
                  <p className="font-bold text-base">{review.name}</p>
                  <div className="text-slate-500">
                    <span>{review.location}</span>
                    <span className="ml-1">•</span>
                    <span className="ml-1">{review.date}</span>
                  </div>
                </div>
              </div>
              <div>{review.content}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
