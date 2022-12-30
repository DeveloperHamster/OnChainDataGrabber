import type { NextPage } from 'next'
import React, { useState, useEffect } from "react";
import styles from '../styles/Home.module.css'
import AddressForm from '../components/AddressForm'
import * as Web3 from '@solana/web3.js'
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

const Home: NextPage = () => {
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')
  const [isExecutable, setIsExecutable] = useState(false);
  const [buffdata, setData] = useState('')

  const addressSubmittedHandler = (address: string) => {
    try {
      setAddress(address)
      const key = new Web3.PublicKey(address)
      const connection = new Web3.Connection('https://rpc.helius.xyz/?api-key=f9eb1eaa-88b1-45e2-87ad-e1e29cd09bdf')
      
      connection.getBalance(key).then(balance => {
        setBalance(balance / Web3.LAMPORTS_PER_SOL)
      })

      connection.getAccountInfo(key).then(info => {
        try{
          setData(info!.data.toString());
        } catch (error){
          setData('No data found on this address!')
        }
        
      })

      connection.getAccountInfo(key).then(info => {
        setIsExecutable(info?.executable ?? false);
      })
    } catch (error) {
      setAddress('')
      setData('Error!')
      setBalance(0)
      alert(error)
    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>
          Get On Chain Image Data for Blockrons <br></br>
        </p>
        <div className={styles.App3}>
        <p>
          You need the image container address! <br></br>
          try: Ghtm2poe3AC1PJwLWQ4EEFtU9aka6n7z5TjbeD9JyUmS<br></br>
        </p>
        </div>
        <AddressForm handler={addressSubmittedHandler} />
        <div className={styles.App2}>
        <p>
            Instructions: <br></br>
            - Paste address into text box and press the button <br></br>
            - Copy the long string of text after the weird symbols starting with PHN.. <br></br>
            - Important: Make sure the weird symbols are not included! <br></br>
            - Paste into base64 to svg converter such as:  <br></br>
            - <a href="https://base64.guru/converter/decode/image/svg">https://base64.guru/converter/decode/image/svg</a> <br></br>
        </p>
        </div>
        <div className={styles.App2}>
        <p>{`${buffdata}`}</p>
        </div> 
      </header>
      <body>
      </body>
    </div>
  )
}

export default Home
