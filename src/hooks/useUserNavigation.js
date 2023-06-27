import { useNavigate } from "react-router-dom";

const useUserNavigation = () => {
  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate("/dashboard");
  };

  const navigateToSignUp = () => {
    navigate("/signup");
  };

  const navigateToSignIn = () => {
    navigate("/signin");
  };

  return {
    navigateToDashboard,
    navigateToSignUp,
    navigateToSignIn,
  };
};

export default useUserNavigation;
