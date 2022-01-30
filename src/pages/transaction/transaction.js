import React, { useRef, useEffect, useState, useCallback } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./transaction.css";
import MetaDecorator from "../../components/metaDecorator/metaDecorator";

function Transaction() {
  const inputRef = useRef();

  const start = localStorage.getItem("Start");
  const end = localStorage.getItem("End");
  var current_date = new Date().getTime();
  var new11 = new Date(start).getTime();

  if (current_date < new11 || current_date > new Date(end).getTime()) {
    window.location.href = "/";
  }

  const [transaction, setTransaction] = useState([]);

  const getTransaction = useCallback(async () => {
    const response = await fetch("/api/transactions");
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
    const response = await fetch("/api/players");
    const player = await response.json();
    setPlayer(player.player);
  }, []);

  useEffect(() => {
    getPlayer();
  }, [getPlayer]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const searchValue = (e) => {
    // console.log(e.target.value);
    const filter = e.target.value;

    document.querySelectorAll(".row").forEach((element) => {
      if (
        element.children[0].innerHTML.indexOf(filter) > -1 ||
        element.children[0].innerHTML.toLowerCase().indexOf(filter) > -1
      ) {
        element.style.display = "";
      } else {
        element.style.display = "none";
      }
    });
  };

  return (
    <>
      <MetaDecorator title="Transactions - Freemex" />
      <div className="Transaction">
        <div className="Transactionhead">
          <h1>Transaction</h1>
          <h2>
            Cash in your hand: $ <span>{player.valueInCash}</span>
          </h2>
          <div className="searchbox">
            <SearchIcon className="searchIcon" />
            <input
              type="text"
              ref={inputRef}
              onChange={(e) => {
                searchValue(e);
              }}
            />
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
                    {/* <li className="sold">${item.netProfit}</li> */}
                    {item.netProfit < 0 ? (
                      <li className="sold"> {item.netProfit} </li>
                    ) : (
                      <li className="bought"> {item.netProfit} </li>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Transaction;
