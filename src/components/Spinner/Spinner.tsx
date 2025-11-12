import { PacmanLoader } from "react-spinners";
import style from './Spinner.module.css';

interface SpinnerProps {
  size?: number;
  color?: string;
  text?: string;
}

const Spinner = ({ size = 55, color = "#0cbce9", text = "Carregando..." }: SpinnerProps) => {
  return (
    <div className={style.spinnerContainer}>
      <PacmanLoader size={size} color={color} />
      {text && <span className={style.spinnerText}>{text}</span>}
    </div>
  );
};

export default Spinner;
