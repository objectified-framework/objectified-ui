'use client';

import LoginForm from '@/app/components/login/LoginForm';
import {Stack, Typography} from "@mui/material";
import Item from "@/app/components/common/Item";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  console.log(session);

  if (!session) {
    return (
      <div style={{ margin: '0', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <LoginForm/>
      </div>
    );
  } else {
    router.push('/');
  }
}

export default Login;
