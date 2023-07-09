import textLogo from "../assets/images/textLogo.png";

export default function LoginNav() {
  return (
    <>
      <div>
        <div className="navbar bg-base-100 justify-center w-full mt-20">
          <div className="navbar-center text-center">
            <div className="normal-case text-3xl">
              <img src={textLogo} alt="" className="w-[188px]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
