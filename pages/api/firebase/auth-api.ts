import { FirebaseError } from "firebase/app";
import {
    AuthErrorCodes,
    Persistence,
    User,
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    setPersistence,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
  inMemoryPersistence,
} from "firebase/auth";
import { auth } from "./firebase";
import { useRouter } from "next/navigation"; 

class AuthAPI {
    // async signInWithGoogle() {
    //     try {
    //         const result = await signInWithPopup(auth, googleProvider);
    //         await this.setPersistence(browserLocalPersistence);
    //         return result.user;
    //     } catch (error) {
    //         console.error("Error signing in with Google:", error);
    //         throw error;
    //     }
    // }

    async signUpWithEmailAndPassword(email: string, password: string): Promise<User | string> {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await this.setPersistence(browserLocalPersistence);
            return result.user;
        } catch (error) {
            if (error instanceof FirebaseError) {
                if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
                    return "Já existe um usuário cadastrado com este email.";
                }
            }
            return "Ocorreu um erro ao criar a conta.";
        }
    }
//   const [name, setName] = useState('')

async signInWithEmailAndPassword(
    email: string, 
    password: string, 
    setEmail: (value: string) => void, 
    setPassword: (value: string) => void, 
    setIsLoading: (value: boolean) => void, 
    router: ReturnType<typeof useRouter>
) {
    try {
        await setPersistence(auth, inMemoryPersistence); // 🔥 Define sessão apenas na aba atual
        setIsLoading(true); // Ativa o loading no botão
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result.user;
    } catch (error) {
        let errorMessage = "Erro ao fazer login. Verifique suas credenciais.";

        if (error instanceof FirebaseError) {
            if (error.code === AuthErrorCodes.INVALID_PASSWORD || error.code === "auth/invalid-credential") {
                errorMessage = "Email ou senha inválidos.";
            } else if (error.code === AuthErrorCodes.USER_DELETED) {
                errorMessage = "Usuário não encontrado.";
            }
        }

        // console.error(errorMessage);
        alert(errorMessage); // ✅ Mostra alerta com a mensagem de erro

        // ✅ Reseta os campos do formulário
        setEmail("");
        setPassword("");
        setIsLoading(false);

        router.push("/admin"); // ✅ Redireciona para a página de login
    }
}

    

    async signOut() {
        try {
            await signOut(auth);
            console.log("Sign-out successful");
        } catch (error) {
            console.error("Error signing out:", error);
            throw error;
        }
    }

    async setPersistence(persistence: Persistence) {
        try {
            await setPersistence(auth, persistence);
            console.log("Persistence set successfully");
        } catch (error) {
            console.error("Error setting persistence:", error);
            throw error;
        }
    }
}

export { AuthAPI };
