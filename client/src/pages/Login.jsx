import { useState } from "react";
import { User, Lock } from "phosphor-react";

const Login = () => {

        // Stati per input
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
      
        // Funzione di submit
        const handleLogin = (e) => {
          e.preventDefault(); // evita il reload della pagina
          console.log("Username:", username);
          console.log("Password:", password);
        };

    return (
        <div className="flex flex-col p-6 gap-6 min-h-screen items-center justify-center">


            <form className="flex flex-col gap-6 " onSubmit={handleLogin}>


                <div className="relative gap-2 items-center">
                    <input
                        className=" pl-12 border-2 border-[var(--color-verdolight)] 
                rounded-xl p-2 bg-white focus:border-[var(--color-verdoscuro)] 
                outline-none peer"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <User size={32} weight="duotone"
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8CA576] 
                    peer-focus:text-[var(--color-verdoscuro)]" />
                </div>

                <div className="relative gap-2 items-center">
                    <input
                        className=" pl-12 border-2 border-[var(--color-verdolight)] 
                rounded-xl p-2 bg-white focus:border-[var(--color-verdoscuro)] 
                outline-none peer"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Lock size={32} weight="duotone"
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8CA576] 
                    peer-focus:text-[var(--color-verdoscuro)]" />
                </div>

                <button type="submit" className="shadow-md rounded-xl p-2 bg-[var(--color-verdolight)] 
            text-white w-30 hover:bg-[var(--color-verdoscuro)] active:bg-[var(--color-verdolight)] 
            active:text-[var(--color-verdoscuro)] transition-colors">
                    Accedi
                </button>

            </form>

        </div>
    );
};

export default Login;

//  bg-[var(--color-verdolight)] #8CA576   --color-verdoscuro: #1E431D;