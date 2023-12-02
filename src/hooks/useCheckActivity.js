import { useSelector } from "react-redux";
const useCheckActivity = () => {
  const { active } = useSelector((state) => state.user);
  return active;
};
export default useCheckActivity;
