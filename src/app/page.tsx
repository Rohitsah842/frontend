'use client'
import { useAxiosRequestHelper } from "@/hooks/useAxiosHelper";
import { get } from "lodash";
import { ReactElement, useEffect } from "react";
import Cookies from "universal-cookie";


const Home = (): ReactElement => {

  const config = { method: 'Post', url: '/refresh-token', withCredentials: true }

  const cookies = new Cookies();
  const [resData, error, errormessage, isLoading, sendRequest] = useAxiosRequestHelper<any>(config, false);

  console.log(resData);


  // useEffect(() => {
  //   setInterval(() => {
  //     const refreshToken = cookies.get('RefreshToken');
  //     console.log(refreshToken, "hello");
  //     console.log(cookies.get('Authorization'), "hello2");

  //     sendRequest({ "token": refreshToken });
  //     // setToken();
  //   }, 60000)


  // }, [])

  // const setToken = () => {
  //   if (get(resData, 'status') === 200) {
  //     cookies.set("Authorization", get(resData, 'data.jwtToken'));
  //     cookies.set("RefreshToken", get(resData, 'data.refreshToken'));
  //   }
  // }




  return (
    <main >
      <h2>Home</h2>

    </main>
  );
}
export default Home;
