// import { edenTreaty } from '@elysiajs/eden'
// import type { App } from '../../src/server.ts'
// import { Button } from "@/components/ui/button"

// import {  useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState<number>(0)  
//   const [logId, slogId] = useState<string>();

//   const testCall = async () =>  {
//     // const {data: id, error: error} = await client.id[`${count}`].get();
//     const {data: value, error: errorInfo} = await client.info.get();
   
//     if(!errorInfo) {
//      if(value.success) {
//       console.log(value?.data)
//      }
//     }
//     // if(!error) {
//     //   slogId(id);
//     // }
//   }

  
  
 
//   // response type: 'Hi Elysia'
//   // client.index.get().then(console.log)

  

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <Button>Click me</Button>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <button onClick={() => testCall()}>
//           Submit!
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import { Routes, Route, useLocation} from 'react-router-dom';
// import MainRoute from '@/components/MainRoute'
import Races from '@/pages/Races';
import Ranking from '@/pages/Ranking';
import Events from '@/pages/Events';
import Profile from '@/pages/Profile';
import Navbar from '@/components/Navbar';
import BottomBar from '@/components/BottomBar';
import ManageEvent from '@/pages/ManageEvent';
// import RankingDistance from '@/pages/RankingDistance';
import SearchPage from '@/pages/SearchPage';
import RankingDistanceRunner from '@/pages/RankingDistanceRunner';
import Home from '@/pages/Home';

import AdminLogin from '@/pages/Admin/Login';
import AdminLayout from '@/pages/Admin/MainLayout';

import AdminDashboard from '@/pages/Admin/Dashboard';

import { Toaster } from '@/components/ui/toaster';
import _ from 'lodash';

const App = () => {
  
  const getCurrentPath = (useLocation().pathname).split("/");
  
  return (
    <>
    {!_.find(getCurrentPath, (o) => o == "administrator") ? 
    (
      <>
      <Navbar/>
      <BottomBar/>
      </>
    ) : (
      <>
      
      </>
    )
    }

    <Routes>
        <Route path="/runners" Component={Ranking} />
        {/* <Route path="/rankbydistance" Component={RankingDistance} /> */}
        <Route path="/rankbydistance/:distance" Component={RankingDistanceRunner} />
        <Route path="/" Component={Home} />

        <Route path="/races" Component={Races} />
        <Route path="/events/:id" Component={Events} />
        <Route path="/profile/:id" Component={Profile} />
        <Route path="/manage/:id" Component={ManageEvent} />
        <Route path="/search/:txt" Component={SearchPage} />
        <Route path="/administrator" Component={AdminLogin}/>
        <Route path="/administrator/dashboard" element={<AdminLayout componentIn={<AdminDashboard/>}/>}/>

        {/* <Route path="/" element={<HomePage/>} /> */}
        {/* <Route path="/fullMarathon" element={<FullMarathon/>} />
        <Route path="/fullMarathon/:classes" element={<FullClasses/>} />
        <Route path="/halfMarathon" element={<HalfMarathon/>} />
        <Route path="/halfMarathon/:classes" element={<HalfClasses/>} /> */}
    </Routes>
    <Toaster />

    </>
  );
};

export default App;
