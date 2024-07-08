import { Container} from "./Login.style";
import { Card } from "../../components/Card/AuthCard.style";
import loginImg from '../../assets/mdex-login-key.png'
import { ChangeEvent,  EventHandler,  useState } from "react";
import Input from "../../components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import axios, {AxiosError, AxiosResponse} from "axios";
import { User, useUserContext } from "../../App";
{}
interface LoginData {
  usernameOrEmail: string;
  password: string
}

const userData = {
  usernameOrEmail: '',
  password: ''
}

export default function Login() {
    const [loginData, setLoginData] = useState<LoginData>(userData);
    const navigate = useNavigate();
    const { setUser } = useUserContext();
    function handleChange(e: ChangeEvent<HTMLInputElement>) : void {
      setLoginData((prev: LoginData) => {
        return {
          ...prev, 
         [e.target.name]: e.target.value
        }
      })
    }
    async function authenticate(e : React.MouseEvent<HTMLButtonElement>) {
      e.preventDefault();
      try {
        const data = {
          usernameOrEmail: loginData['usernameOrEmail'].trim(),
          password: loginData['password'].trim()
        }
        const response : AxiosResponse = await axios.post('https://localhost:7245/api/user/authenticate', data, {withCredentials: true});
        console.log(response)
      }
      catch (error ) {
        console.log("Something went wrong during authentication.")
      }
     
    } 
    
    async function handleClick(e : React.MouseEvent<HTMLButtonElement>) {
      e.preventDefault();
      await authenticate(e);
      try {
        const response: AxiosResponse = await axios.get<User>("https://localhost:7245/api/user/me", { withCredentials: true});
        if (response.data) {
          console.log(response);
          setUser(prev => response.data)
          navigate("/")
        }
      }
      catch (error) {
        console.log('Cannot find user.')
      }
    }
    
    return (
      <Container>
        <img id="key-img" src={loginImg} alt="login-key-img"/>
        <Card>
          <h2>Sign in to your account</h2>
          <form>
            <Input label="usernameOrEmail" inputType="text" labelText="Username or email" isRequired={false} value={loginData["usernameOrEmail"]} onChange={handleChange}/>
            <Input label="password" inputType="password" labelText="Password" isRequired={false} value={loginData["password"]} onChange={handleChange}/>
            <div className="settings">
              <label htmlFor="remember-me" id="remember-me-label">
                <input type="checkbox" name="remember-me" className="checkbox" id="remember-me"/>
                <span>Remember me</span>
              </label>
              <span className="forgot-password">Forgot password?</span>
            </div>
            <button className="auth-btn" onClick={handleClick}>Sign in</button>
          </form> 
          <footer>
            <span>New user?</span>
            <Link to='/register'><span id="register">Register</span></Link>
          </footer>
        </Card>
      </Container> 
    );
  }
  