import { useEffect, useState } from "react";


const Home = () => {
    const [user , setUser] = useState("");
    console.log(user)

    useEffect(()=>{
        fetch("https://chill-gamer-server-six.vercel.app/api/v1/users")
        .then(response => response.json())
        .then(data => setUser(data))
    },[])
     
  return <div>this is home component {user.length}</div>;
};

export default Home;
