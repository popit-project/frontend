const reviews = [
  {
    name: "자칭 맛잘알",
    location: "위치(논현동)",
    date: "1년전",
    content:
      "돈까스가 너무 땡겨서 바로 주문하였습니다. \n 맛도 맛있고 배달도 정말 빨랐습니다.\n서비스도 좋고 배송도 빨랐습니다.\n맛있는 식사했습니다.👍\n감사합니다~!!",
  },
  {
    name: "자칭 맛잘알",
    location: "위치(논현동)",
    date: "1년전",
    content:
      "돈까스가 너무 땡겨서 바로 주문하였습니다. 맛도 맛있고 배달도 정말 빨랐습니다. 서비스도 좋고 배송도 빨랐습니다. 맛있는 식사했습니다.👍 감사합니다~!!",
  },
  {
    name: "자칭 맛잘알",
    location: "위치(논현동)",
    date: "1년전",
    content:
      "돈까스가 너무 땡겨서 바로 주문하였습니다. 맛도 맛있고 배달도 정말 빨랐습니다. 서비스도 좋고 배송도 빨랐습니다. 맛있는 식사했습니다.👍 감사합니다~!!",
  },
];

export default function Review() {
  return (
    <div className="m-10 bg-slate-100 rounded-lg text-left p-5">
      <div className="text-center text-xl font-semibold leading-8">
        <p>아직 가게 후기가 없어요! 🥲 </p>
      </div>
      <div className="mb-16">
        <form className="flex flex-col items-center sm:flex-row">
          <input
            type="text"
            placeholder="리뷰를 등록해주세요"
            className="h-12 p-2 rounded-lg w-full focus:outline-none sm:grow"
          ></input>
          <button
            type="submit"
            className="btn btn-outline w-full mt-2 focus:outline-none sm:ml-3 sm:w-auto sm:mt-0"
          >
            등록
          </button>
        </form>
      </div>
      <div className="tab-list first:pt-0">
        {reviews.map((review, index) => (
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
    </div>
  );
}
