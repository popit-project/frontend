import { useEffect, useState } from "react";
import { axiosInstance } from "../../AxiosInstance/AxiosConfig";
import { useParams } from "react-router-dom";

interface review {
  id: number;
  email: string;
  comment: string;
}

export default function Review() {
  const [reviewList, setReviewList] = useState<review[]>([]);
  const [newReview, setNewReview] = useState("");
  const { id } = useParams<{ id: string }>();
  const storeId = Number(id);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchReviewList();
  });

  const fetchReviewList = () => {
    axiosInstance
      .get(`http://3.34.149.107:8082/api/review/read/${storeId}/comment`)
      .then((response) => {
        const data = response.data;
        setReviewList(data);
      })
      .catch((error) => {
        console.log(`${storeId}`);
        console.error(error);
      });
  };

  const handleReviewSubmit = () => {
    const newReviewItem = {
      comment: newReview,
    };

    axiosInstance
      .post(
        `http://3.34.149.107:8082/api/review/write/${storeId}`,
        newReviewItem,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        setNewReview("");
        fetchReviewList();
      })
      .catch((error) => {
        console.error("Failed to submit review:", error);
      });
  };

  const deleteReview = (reviewId: number) => {
    axiosInstance
      .delete(`http://3.34.149.107:8082/api/review/delete/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        fetchReviewList();
      })
      .catch((error) => {
        console.error("Failed to delete review:", error);
      });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="my-10 bg-indigo-50 rounded-lg text-left p-5 m-5">
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
              className="btn btn-outline w-full mt-2 focus:outline-none sm:ml-3 sm:w-auto sm:mt-0 border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white hover:border-indigo-400"
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
            {[...reviewList].reverse().map((review, index) => (
              <div
                key={index}
                className="flex justify-between py-8 border-b border-indigo-200 first:pt-0 last:border-none"
              >
                <div className="">
                  <div className="text-left mb-2">
                    <p className="font-bold text-base">{review.email}</p>
                  </div>
                  <div>{review.comment}</div>
                </div>
                {userId === review.email && (
                  <div
                    className="text-indigo-400 cursor-pointer rounded-full"
                    onClick={() => deleteReview(review.id)}
                  >
                    X
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
