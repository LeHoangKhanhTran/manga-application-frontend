import { Container} from "./Login.style";
import { Card } from "../../components/Card/AuthCard.style";
import loginImg from '../../assets/mdex-login-key.png'
import { ChangeEvent, useState } from "react";
import Input from "../../components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import { User, useUserContext } from "../../App";
import config from "../../config";
import { ReactComponent as LogoIcon } from "../../assets/mangadex-logo.svg"
import { ReactComponent as WordMark } from "../../assets/mangadex-wordmark.svg"
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
        await axios.post(`${config.apiUrl}/api/user/authenticate`, data, {withCredentials: true});
      }
      catch (error) {
        console.log("Something went wrong during authentication.")
        console.log(error as AxiosError)
      }
     
    } 
    
    async function handleClick(e : React.MouseEvent<HTMLButtonElement>) {
      e.preventDefault();
      await authenticate(e);
      try {
        const response: AxiosResponse = await axios.get<User>(`${config.apiUrl}/api/user/me`, { withCredentials: true});
        if (response.data) {
          console.log(response);
          setUser(_prev => response.data)
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
        <a className="logo" href="/">
          <LogoIcon/>
          <WordMark/>
        </a>
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
              {/* <span className="forgot-password">Forgot password?</span> */}
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
  