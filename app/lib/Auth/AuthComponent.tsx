'use client'
import useSWR from "swr";
import { useEffect } from "react";
import { useMercurialStore } from "@/app/store/useMercurialStore";
import { checkIsloggedIn } from "./authChecks";



export default function AuthComponent() {
  const { data, error } = useSWR("checkAuth", checkIsloggedIn);
  const {setIsLoggedIn } = useMercurialStore();

  useEffect(() => {
    if (data) {
      setIsLoggedIn();
      
    } 
  }, [data, error, setIsLoggedIn]);

  return <></>;
}