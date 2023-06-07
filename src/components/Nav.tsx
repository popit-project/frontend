import logo from "../icon/buy.256x238.png";
import menu from "../icon/menu.256x158.png";

export default function Nav() {
    return (
        <div className="header w-screen p-8 flex justify-between border-b-4 items-center">
            <img className="w-8 h-8" src={menu}></img>
            <img className="w-16 h-16 mx-auto" src={logo}></img>
        </div>
    );
}
