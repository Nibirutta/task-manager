
import { Mail } from "lucide-react";
import InputField from "../../components/InputField/InputField";

function LoginForm () {


    return(
        <>
        <InputField
			id="email"
			label="Email"
			value=""
			onChange={() => {}}
			placeholder="Enter your email"
			isValid={false}
			errorMessage="Email is not valid"
			Icon={Mail}
		/>
        </>
    )

}

export default LoginForm;