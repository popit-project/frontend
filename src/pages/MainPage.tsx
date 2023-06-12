import Footer from "../components/Footer";
import RecomList from "../components/RecomList";

const MainPage = () => {
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Item 1</a></li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li>
              <li><a>Item 3</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">POPIT</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a>Item 1</a></li>
            <li tabIndex={0}>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </details>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
      <div>
        <input type="text" placeholder="검색하세요!" className="input input-bordered w-full max-w-xs" />
      </div>
      <div className="card w-96 bg-base-100 shadow-xl image-full w-full">
        {/* <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> */}
        <div className="card-body">
          <h2 className="card-title">POPIT!</h2>
          <p>내 주변 팝업 스토어 찾기</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">바로가기</button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col w-full">
          <div className="grid h-20 card bg-base-300 rounded-box place-items-center">content</div> 
          <div className="divider"></div> 
          <div className="grid h-20 card bg-base-300 rounded-box place-items-center">content</div>
        </div>
      </div>
      {[...Array(5)].map((_, index) => (
        <RecomList key={index} />
      ))}
      <Footer />
    </div>
  );
};

export default MainPage;
