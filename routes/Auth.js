import { authService, firebaseInstance } from "fbase";
import { 
    getAuth, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
 } from "firebase/auth";
import React, {useState} from "react";



const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true)
    const [error, setError] =useState ("") //생성
    const onChange = (event) => {
        const { target: {name,value}} = event;
        if(name ==="email"){
            setEmail(value)
        }else if (name ==="password"){
            setPassword(value)
        }
    }
    
    const onSubmit = async(event) => {
        event.preventDefault();   
        try {
            let data ;
            const auth = getAuth();
            if(newAccount){
                 data = await createUserWithEmailAndPassword(
                    auth, email, password )
            } else {
                 data = await signInWithEmailAndPassword(
                     auth,email,password)
            } 
            console.log(data);
        } catch (error) {
            setError(error.message) 
        }  
    } ;

    const toggleAccount = () => setNewAccount((prev)=> !prev) 
    const onSocialClick = async(event) => {
        const {
            target : {name}
        } = event;
        let provider;
        try{
            if(name ==="google") {
                provider = new GoogleAuthProvider();
                const result = await signInWithPopup(authService,provider)
                const credential = GoogleAuthProvider.credentialFromResult(result)
            }else if(name==="github"){
                provider = new GithubAuthProvider();
                const result = await signInWithPopup(authService, provider);
                const credential = GithubAuthProvider.credentialFromResult(result)
            }
            const data = await signInWithPopup(authService, provider)
                console.log(data);

            }catch(error){
                console.log(error)
            }
       
    }
    return(
        <div>
            <form  onSubmit={onSubmit}>
                <input 
                    name="email" 
                    type="email" 
                    placeholder="Email" 
                    required 
                    value ={email}  
                    onChange={onChange} />
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Passwords" 
                    required 
                    value ={password} 
                    onChange={onChange}/>
                <input type="submit" value={newAccount ? "Create Account" : "Log in"}/> 
                {error}
            </form>
             <span onClick={toggleAccount}>
                {newAccount ? "Sign in" : "Create Account"}
             </span>
             <div>
                <button onClick={onSocialClick} name ="google">Continue with Google</button>
                <button onClick={onSocialClick} name ="github">Continu with Github</button>            
            </div>
        </div>
    )
}


export default Auth;