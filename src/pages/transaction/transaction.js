import React, { useRef, useEffect, useState, useCallback } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./transaction.css";

function Transaction() {
  const inputRef = useRef();

  const [transaction, setTransaction] = useState([]);

  const getTransaction = useCallback(async () => {
    const response = await fetch('/api/transactions');
    const transaction = await response.json();
    console.log(transaction.transactions);
    setTransaction(transaction.transactions);
  }, []);

  useEffect(() => {
    getTransaction();
  }, [getTransaction]);


    // player status
    const [player, setPlayer] = useState([]);
    const getPlayer = useCallback(async () => {
      const response = await fetch('/api/players');
      const player = await response.json();
      setPlayer(player.player);
    }, []);
  
    useEffect(() => {
      getPlayer();
    }, [getPlayer]);



  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <div className="Transaction">
        <div className="Transactionhead">
          <h1>Transaction</h1>
          <h2>
            Cash in your hand: $ <span>{player.valueInCash}</span>
          </h2>
          <div className="searchbox">
            <SearchIcon className="searchIcon" />
            <input type="text" ref={inputRef} />
          </div>
        </div>
        <div className="transactionBody">
          <div className="transactionTable">
            <div className="transactionTableHead">
              <li>Stock name</li>
              <li>Status</li>
              <li>Qty</li>
              <li>Stock code</li>
              <li>Price</li>
              <li>Gain/Loss</li>
            </div>
            {transaction.map((item, i) => {
              return (
                <div className="transactionTableBody" key={i}>
                  <div className="row">
                    <li>{item.Stock.name}</li>
                    <li className={item.type}>{item.type}</li>
                    <li>{item.quantity}</li>
                    <li>{item.Stock.code}</li>
                    <li>${item.price}</li>
                    <li className="sold">${item.netProfit}</li>
                  </div>
                </div>)
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Transaction;
