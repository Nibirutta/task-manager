import { Link } from "react-router";
import BorderAnimationButton from "../../lib/Nurui/BorderAnimationButton";
import { LogIn, UserRoundPlus } from "lucide-react";

const CTA = () => {
  return (
    <section className="flex flex-col justify-center items-center p-8 gap-12">
      <h2 className=" text-6xl text-[var(--cta-title-color)] font-(family-name:--cta-title-font) text-shadow-[var(--cta-title-shadow)]"> Pronto pra organizar seus projetos?</h2>

      <div className="flex justify-between items-center gap-24   p-4">
        <Link to="/registrar">
          <BorderAnimationButton
            text="Criar conta Grátis"
            className="transition-all duration-300 ease-in-out hover:scale-110 focus:scale-110 active:scale-100"
            icon={UserRoundPlus}
            textFont="Orbitron"
            backgroundColor="#0d1b2a"
            textColor="#e0e1dd"
            textSize="1.6rem"
          ></BorderAnimationButton>
        </Link>

        <Link to="/login">
          <BorderAnimationButton
            text="Login"
            className="transition-all duration-300 ease-in-out hover:scale-110 focus:scale-110 active:scale-100"
            icon={LogIn}
            textFont="Orbitron"
            backgroundColor="#0d1b2a"
            textColor="#e0e1dd"
            textSize="1.6rem"
          ></BorderAnimationButton>
        </Link>
      </div>
    </section>
  );
};

export default CTA;
