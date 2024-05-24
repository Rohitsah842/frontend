'use client'
import { useAxiosRequestHelper } from "@/hooks/useAxiosHelper";
import { get } from "lodash";
import { ReactElement, useEffect } from "react";
import Cookies from "universal-cookie";


const Home = (): ReactElement => {

  const config = { method: 'Post', url: '/auth/refresh-token', withCredentials: true }

  const cookies = new Cookies();
  const [resData, error, errormessage, isLoading, sendRequest] = useAxiosRequestHelper<any>(config, false);

  // console.log(resData);


  // useEffect(() => {
  //   setInterval(() => {
  //     const refreshToken = cookies.get('RefreshToken');
  //     console.log(cookies.get('RefreshToken'));
  //     console.log(cookies.get('Authorization'));

  //     sendRequest({ "token": refreshToken });
  //   }, 60000)


  // }, [])





  return (
    <main >
      <h2>Home</h2>
    </main>
  );
}
export default Home;
