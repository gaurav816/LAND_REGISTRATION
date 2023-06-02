import React, { Component,useState, useEffect } from 'react';
import Web3 from 'web3';
import detectEtherumProvider from '@metamask/detect-provider';
import {load} from './utils/load';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Admin from './components/Admin';
import LandInspector from './components/LandInspector';
import User from './components/User';
import './css/App.css'; 


function App() {
    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null,
        contract: null
        })
    
      const [account, setAccount] = useState(null);
      let navigate = useNavigate();
    
    
      const connectToEthereum = async () =>{
    
        const provider = await detectEtherumProvider();  
        const contract = await load('Registration', provider);
        
        if(provider){              // provider = metamask detected.
            console.log("provider:",provider);
            provider.request({method:'eth_requestAccounts'}); // calling this method trigger a user interface(metamask) 
                                                                // that allow user to approve/reject account access for a dapp.      
            setWeb3Api({
                web3: new Web3(provider),
                provider,
                contract
            })
        }
        else{
            console.error('Metamask not connected!');  // metamask not detected.
        }
    
    }
    
    useEffect(() => {
        const getAccount = async () =>{
          const {web3, contract} = web3Api;  
          const accounts = await web3.eth.getAccounts();  // returns the list of accounts you can access.
    
          setAccount(accounts[0]);
                
        }
        web3Api.web3 && getAccount();
    }, [web3Api]);
   
    useEffect(() =>{
    
        const checkAccount = async () =>{
            const {web3, contract} = web3Api; 
            const Admin = await contract.Admin();
            console.log(account);
            if(account === Admin){
                navigate('/Admin');
            }
            else if(await contract.isLandInspector({from: account})){
                navigate('/LandInspector');
            }
            else{
                navigate('./User')
            }
            
        }
        account && checkAccount();
    }, [web3Api, account])

    const cardStyle = {
        
  
      };
      
      const cardSelect = {
        boxShadow: "2px 4px 30px 0px rgba(0, 0, 0, 0.75)",
        color: "white",
        backgroundColor: "black"
      };

      const [selected, setSelected] = React.useState();
        return (
    <Routes>
      <Route path='/Admin' element={<Admin myWeb3Api={web3Api} account={account} />} />
      <Route path='/LandInspector/*' element={<LandInspector myWeb3Api={web3Api} account={account} />} />
      <Route path='/User/*' element={<User myWeb3Api={web3Api} account={account} />} />
      <Route path='/' element=  
      {
      <div className="App">
          <div className='container mainDiv'>
                <div className='landingPage-heading-div'>
                    <h1 className='text-center pt-5'>Land Registration using Blockchain</h1>
                </div>
                {/* //<button className='landingPage-btn' onClick={connectToEthereum}>Connect to Ethereum</button> */}
            </div>

        <div class="container pt-5 ">
            <div class="row">
                <div class="col-sm-4" >
                     <div class="card" style={{...cardStyle, ...(selected === 0 && cardSelect)}}
                    onClick={() => setSelected(0)}>
                   <div class="card-body text-center box">
                        <i class="bi bi-person-fill-gear"></i>
                        <h2 class="card-text text-center">ADMIN</h2> 
                    </div>
                    </div>
                </div>
                <div class="col-sm-4" >
                   <div class="card" style={{ ...cardStyle, ...(selected === 1 && cardSelect) }}
                onClick={() => setSelected(1)}>
                    <div class="card-body text-center box">
                        <i class="bi bi-incognito"></i>
                        <h2 class="card-text text-center">LANDINSPECTOR</h2>    
                    </div> 
                    </div>
                </div>
                <div class="col-sm-4" >
                    <div class="card" style={{...cardStyle, ...(selected === 2 && cardSelect)  }}
                    onClick={() => setSelected(2)}>
                    <div class="card-body text-center box">
                        <i class="bi bi-person-fill"></i>
                        <h2 class="card-text text-center">USER</h2>  
                    </div>
                    </div>
                </div>
            </div>
            <div class="text-center pt-5">
                <button className='landingPage-btn btn btn-outline-dark btn-lg' onClick={connectToEthereum}>Connect to Ethereum</button>
            </div>
        </div>
        </div> 
      }/>
    </Routes>
        )
    
}

export default App;