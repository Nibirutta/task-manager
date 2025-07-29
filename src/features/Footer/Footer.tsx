import '../../styles/globals.css'
import alucinadoLogo from './ALucin4do-logo.png'
         


function Footer() {


    return (
    <footer className="flex items-center justify-center p-[1rem] m-auto absolute bottom-0 box-border w-full">
        <div id='developed-by' className='flex items-center justify-center gap-4 text-[1.6rem] text-(--text-color-footer) font-(family-name:--tech)'>
            <p id="dev-by" className='font-semibold flex items-center justify-center gap-2 '> 
                Developed with 💜 by Nibirutta &
            </p>
            <a href="https://alucinado-dev.vercel.app" target="_blank" rel="noopener noreferrer"  className="font-black text-(--text-color-footer)  before:content-['</ALUCINADO>']  hover:font-(family-name:--tech) hover:bg-(image:--logo-gradient) hover:bg-clip-text hover:text-transparent hover:text-shadow-(--logo-shadow) focus:font-(family-name:--tech) focus:bg-(image:--logo-gradient) focus:bg-clip-text focus:text-transparent focus:text-shadow-(--logo-shadow)"></a>  
            
            <img src={alucinadoLogo} alt="Logo of Alucinado-Dev"  className='w-[35px] h-[35px]'/>
            
        </div>
    </footer>
    )
}

export default Footer;

