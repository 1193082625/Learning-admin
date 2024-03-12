'use client';
import { EyeFilledIcon } from "@/components/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/icons/EyeSlashFilledIcon";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { useState } from "react";
import { UsersIcon } from "./icons/UsersIcon";
import Image from 'next/image'
import { post } from "@/api/fetch";
import { useUserStore } from "@/store/userStore";

export default function Login() {
  const handleLogin = useUserStore(state => state.login);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [remember, setRemember] = useState(true);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const login = async () => {
    const params = {
      username,
      password
    }
    console.log('登录', params);
    const {code, data, msg} = await post('/auth/login', params);
    console.log('登录结果', remember, data);
    if(code === 0) {
      setUserName('');
      setPassword('');
      handleLogin(data);
    }
  }
  
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Image
        src="/imgs/logo.png"
        alt="LOGO"
        width={317}
        height={77}
      />
      <div className="w-[500px] h-[600px] flex flex-col rounded-lg p-6 mt-6 shadow-lg bg-[#f9fafb]">
        <div className="mb-8">
          <h1 className="text-[30px] font-bold text-center">LOGIN</h1>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Input
            isRequired
            type="email"
            label="Email"
            variant="bordered"
            placeholder="请输入账号"
            value={username}
            className="mb-6"
            onChange={(e: any) => setUserName(e.target.value)}
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                <UsersIcon className="text-2xl text-default-400 pointer-events-none" />
              </button>
            }
          />
          <Input
            isRequired
            label="Password"
            variant="bordered"
            placeholder="请输入密码"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />
          <div className="flex w-full py-2 px-1 justify-between mt-4">
            <Checkbox
              classNames={{
                label: "text-small",
              }}
              isSelected={remember}
              onValueChange={(isSelected: boolean) => setRemember(isSelected)}
            >
              记住我
            </Checkbox>
            <Link color="primary" href="#" size="sm">
              忘记密码?
            </Link>
          </div>
          <Button color="primary" className="w-full mt-6" onPress={login}>
            登录
          </Button>
        </div>
      </div>
    </div>
  )
}