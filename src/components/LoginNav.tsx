import logo from "../icon/buy.256x238.png";
import menu from "../icon/menu.256x158.png";

export default function LoginNav() {
    return (
        <>
            <div>
                {/* <div className="header w-screen p-8 flex justify-between border-b-4 items-center">
                    <img className="w-8 h-8" src={menu}></img>
                    <img className="w-16 h-16 mx-auto" src={logo}></img>
                </div> */}

                <div className="navbar bg-base-100 justify-center w-full">
                    <div className="navbar-center text-center">
                        <div className="normal-case text-3xl">Pop-it!
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
