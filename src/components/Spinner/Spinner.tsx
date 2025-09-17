import { PacmanLoader } from "react-spinners";

const Spinner = (size: number, color: string, text: string) => {
  return (
    <>
      <PacmanLoader size={size} color={color} />
      <span> {text}</span>
    </>
  );
};

export default Spinner;
