import { User } from "phosphor-react";
import { Lock } from "phosphor-react";

const Login = () => {
    return (
        <div className="flex flex-col p-6 gap-6 min-h-screen items-center justify-center">

            <div className="relative gap-2 items-center">
                <input
                className=" pl-12 border-2 border-[var(--color-verdolight)] 
                rounded-xl p-2 bg-white focus:border-[var(--color-verdoscuro)] 
                outline-none peer"
                    type="text"
                    placeholder="Username"
                />
                <User size={32} weight="duotone"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8CA576] 
                    peer-focus:text-[var(--color-verdoscuro)]" />
            </div>

            <div className="relative gap-2 items-center">
                <input className=" pl-12 border-2 border-[var(--color-verdolight)] 
                rounded-xl p-2 bg-white focus:border-[var(--color-verdoscuro)] 
                outline-none peer" type="password" placeholder="Password" />
                <Lock size={32} weight="duotone"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8CA576] 
                    peer-focus:text-[var(--color-verdoscuro)]" />
            </div>

            <button className="shadow-md rounded-xl p-2 bg-[var(--color-verdolight)] 
            text-white w-30 hover:bg-[var(--color-verdoscuro)] active:bg-[var(--color-verdolight)] 
            active:text-[var(--color-verdoscuro)] transition-colors">
                Accedi
            </button>

        </div>
    );
};

export default Login;

//  bg-[var(--color-verdolight)] #8CA576   --color-verdoscuro: #1E431D;