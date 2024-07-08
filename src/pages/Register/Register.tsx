import { Container } from "../Login/Login.style"
import loginImg from "../../assets/mdex-login-key.png"
import { InputField } from "../../components/Input/Input.style"
import { Card } from "../../components/Card/AuthCard.style"
import Input from "../../components/Input/Input"
import { useState, ChangeEvent, ButtonHTMLAttributes } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios, { AxiosError, AxiosResponse } from "axios"

interface RegisterData {
  username: string;
  password: string;
  confirmPassword: string;
  email: string
}
const userData = {
  username: '',
  password: '',
  confirmPassword: '',
  email: ''
}
export default function Register() {
    const [registerData, setRegisterData] = useState<RegisterData>(userData);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    function handleChange(e: ChangeEvent<HTMLInputElement>) : void {
      setRegisterData((prev: RegisterData) => {
        return {
          ...prev, 
         [e.target.name]: e.target.value
        }
      })
    }
    async function register(e : React.MouseEvent<HTMLButtonElement>) {
      e.preventDefault();
      if (registerData['password'] !== registerData['confirmPassword']) {
        setError(prev => 'Password is incorrect.');
        return;
      }
      try {
        const data = {
          username: registerData['username'],
          password: registerData['password'],
          email: registerData['email'],
          role: 'User'
        }
        const response : AxiosResponse = await axios.post('https://localhost:7245/api/user/register', data);
        if (response.status === 200) {
          navigate("/login")
        }
      }
      catch (error) {
        const message = ((error as AxiosError).response?.data as string).split('.')[1].split(':')[1];
        console.log(message)
        setError(prev => message);
      }
    }
    async function handleClick(e : React.MouseEvent<HTMLButtonElement>) {
      await register(e);
    }
    return (
        <Container>
        <img id="key-img" src={loginImg} alt="login-key-img"/>
        <Card>
          <h2>Register</h2>
          <div className="note">
            <span>*</span>
            <span>{'\u00A0'}Required fields</span>
          </div>
          <form>
            <Input label="username" labelText="username" inputType="text" isRequired={true} value={registerData["username"]} onChange={handleChange}/>
            {error?.toLowerCase().includes('username') && <div className="error">{error}</div>}
            <Input label="password" labelText="password" inputType="password" isRequired={true} value={registerData["password"]} onChange={handleChange}/>
            {error?.toLowerCase().includes('password') && error !== 'Password is incorrect.' && <div className="error">{error}</div>}
            <Input label="confirmPassword" labelText="confirm password" inputType="password" isRequired={true} value={registerData["confirmPassword"]} onChange={handleChange}/>
            {error && error === 'Password is incorrect.' && <div className="error">{error}</div>}
            <Input label="email" labelText="email" inputType="email" isRequired={true} value={registerData["email"]} onChange={handleChange}/>
            {error?.toLowerCase().includes('email') && <div className="error">{error}</div>}
            <Link className="navigate" to='/login'>
              <span className="arrow">{'<<'}</span>
              <span>{'\u00A0'}Back to Login</span>
            </Link>
            <button className="auth-btn" onClick={handleClick}>Register</button>
          </form>
        </Card>
      </Container> 
    )
}