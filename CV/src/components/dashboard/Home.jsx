import { useAuthUser } from "../../context/AuthContext";
import { useUserCV } from "../../context/UserCVContext";
import welcomeImage from "../../assets/Welcome.png";

const Home = () => {
  const { user } = useAuthUser();
  const { userCV } = useUserCV();

  const username = user?.email ? user.email.split("@")[0] : "";

  return (
    <div className="h-full w-full pb-10 flex flex-col justify-center items-center text-3xl">
      <img src={welcomeImage} alt="Welcome" className="h-[200px] w-[200px]" />
      <div>Welcome {username},</div>
      <div>to</div>
      <div className="text-4xl font-bold">CV Maker</div>
    </div>
  );
};

export default Home;
