import { Container} from "./Login.style";
import { Card } from "../../components/Card/AuthCard.style";
import loginImg from '../../assets/mdex-login-key.png'
import { ChangeEvent, useState } from "react";
import Input from "../../components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useUserContext } from "../../App";
import { User } from "../../types";
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
    const [error, setError] = useState<string>("");
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
        setError(_prev => (error as AxiosError).response?.data as string);
      }
     
    } 
    console.log(error)
    async function handleClick(e : React.MouseEvent<HTMLButtonElement>) {
      e.preventDefault();
      if (loginData['usernameOrEmail'] === null || loginData['usernameOrEmail'].trim().length === 0) {
        setError(_prev => 'Invalid username.');
        return;
      }
      else if (loginData['password'] === null || loginData['password'].trim().length === 0) {
        setError(_prev => 'Invalid password.');
        return;
      }
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
            <div>
              <Input isWarning={error.toLowerCase().includes('username')} label="usernameOrEmail" inputType="text" labelText="Username or email" isRequired={false} value={loginData["usernameOrEmail"]} onChange={handleChange}/>
              {error && error.toLowerCase().includes('username') && <div className="error">{error}</div>}
            </div>
            <div>
              <Input isWarning={error.toLowerCase().includes('password')} label="password" inputType="password" labelText="Password" isRequired={false} value={loginData["password"]} onChange={handleChange}/>
              {error && error.toLowerCase().includes('password') && <div className="error">{error}</div>}
            </div>
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
  