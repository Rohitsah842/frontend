'use client'
import { useAxiosRequestHelper } from "@/hooks/useAxiosHelper";
import { ReactElement } from "react";


const Home = (): ReactElement => {
  const config = { method: 'GET', url: 'http://localhost:8082/auth/test', withCredentials: true }
  const [resData, error, errormessage, isLoading] = useAxiosRequestHelper<any>(config);

  console.log(resData);




  return (
    <main >
      <h2>Home</h2>

    </main>
  );
}
export default Home;
