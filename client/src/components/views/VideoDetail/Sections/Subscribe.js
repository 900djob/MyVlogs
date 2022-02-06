import React, { useEffect, useState } from "react";
import axios from "axios";

const Subscribe = (props) => {
  const userTo = props.userTo;
  const userFrom = props.userFrom;

  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  const onSubscribe = () => {
    let subscribeVariable = {
      userTo: userTo,
      userFrom: userFrom,
    };
    if (Subscribed) {
      axios
        .post("/api/subscribe/unSubscribe", subscribeVariable)
        .then((res) => {
          if (res.data.success) {
            setSubscribeNumber(SubscribeNumber - 1);
            setSubscribed(!Subscribed);
          } else {
            alert("구독취소를 할 수 없습니다.");
          }
        });
    } else {
      axios.post("/api/subscribe/subscribe", subscribeVariable).then((res) => {
        if (res.data.success) {
          setSubscribeNumber(SubscribeNumber + 1);
          setSubscribed(!Subscribed);
        } else {
          alert("구독을 할 수 없습니다.");
        }
      });
    }
  };

  useEffect(() => {
    const subscribeNumberVariables = { 
      userTo: userTo, 
      userFrom: userFrom 
    };

    axios
      .post("/api/subscribe/subscribeNumber", subscribeNumberVariables)
      .then((res) => {
        if (res.data.success) {
          setSubscribeNumber(res.data.subscriberNumber);
        } else {
          alert("구독자 수를 불러올 수 없습니다.");
        }
      });

    axios
      .post("/api/subscribe/subscribed", subscribeNumberVariables)
      .then((res) => {
        if (res.data.success) {
          setSubscribed(res.data.subscribed);
        } else {
          alert("구독정보를 불러올 수 없습니다.");
        }
      });
  }, [userFrom, userTo]);

  return (
    <div>
      <button
        onClick={onSubscribe}
        style={{
          backgroundColor: `${Subscribed ? "#AAAAAA" : "#CC0000"}`,
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
        }}
      >
        {SubscribeNumber} {Subscribed ? "subscribed" : "Subscribe"}
      </button>
    </div>
  );
};

export default Subscribe;
