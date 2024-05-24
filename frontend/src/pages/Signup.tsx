import { Auth } from "../components/Auth";
import Quote from "../components/Quote";

const Signup = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-screen">
      <div className="h-screen flex justify-center items-center">
        <Auth usedFor="SignUp" />
      </div>
      <div className="hidden md:block">
        <Quote />
      </div>
    </div>
  );
};

export default Signup;
