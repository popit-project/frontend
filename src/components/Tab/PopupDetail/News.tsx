const reviewDummy = [
  {
    id: 1,
    name: "부엉이돈까스학동역점",
    location: "위치(논현동)",
    date: "1년전",
    description:
      "학동역 돈까스 맛집, 부엉이돈까스(배달/포장됩니다.) 대한민국 1등 치즈돈까스 맛집, 부엉이돈까스 학동역점입니다. 우동/냉소바/돈까스.카레 메뉴 하나하나 손수 만들어 정성으로 판매합니다. 💗",
  },
  {
    id: 2,
    name: "부엉이돈까스학동역점",
    location: "위치(논현동)",
    date: "1년전",
    description:
      "학동역 돈까스 맛집, 부엉이돈까스(배달/포장됩니다.) 대한민국 1등 치즈돈까스 맛집, 부엉이돈까스 학동역점입니다. 우동/냉소바/돈까스.카레 메뉴 하나하나 손수 만들어 정성으로 판매합니다. 💗",
  },
  {
    id: 3,
    name: "부엉이돈까스학동역점",
    location: "위치(논현동)",
    date: "1년전",
    description:
      "학동역 돈까스 맛집, 부엉이돈까스(배달/포장됩니다.) 대한민국 1등 치즈돈까스 맛집, 부엉이돈까스 학동역점입니다. 우동/냉소바/돈까스.카레 메뉴 하나하나 손수 만들어 정성으로 판매합니다. 💗",
  },
];

export default function News() {
  return (
    <div className="m-10 bg-slate-100 rounded-lg text-left p-5">
      {reviewDummy.length === 0 ? (
        <div className="text-center text-xl font-semibold">
          아직 소식이 없어요! 🥲(유저용)
        </div>
      ) : (
        <div className="tab-list">
          {reviewDummy.map((item) => (
            <div
              key={item.id}
              className="py-8 border-b border-slate-300 first:pt-0 last:border-none"
            >
              <div className="flex items-center mb-2">
                <figure className="w-16 h-16 rounded-full bg-gray-400">
                  <img src="" alt="" />
                </figure>
                <div className="ml-3 text-left">
                  <p className="font-bold text-base">{item.name}</p>
                  <div className="text-slate-500">
                    <span>{item.location}</span>
                    <span className="ml-1">•</span>
                    <span className="ml-1">{item.date}</span>
                  </div>
                </div>
              </div>
              <div>{item.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
