import React, { useState } from "react";
import { useGetIpAddress } from "./useGetIpAddress";

const AmountForm = ({ isFetchingIp, errorIp, ipAddress }) => {
  const [amount, setAmount] = useState("");
  if (isFetchingIp) {
    return <span>Loading</span>;
  } else if (errorIp) {
    return (
      <span style={{ backgroundColor: "red", color: "white" }}>{errorIp}</span>
    );
  } else if (ipAddress) {
    return (
      <div>
        <input
          type="text"
          placeholder="Transaction Amount"
          name="amount"
          value={amount}
          onChange={e => {
            setAmount(e.target.value);
          }}
        />
        <button>Submit</button>
      </div>
    );
  } else {
    return null;
  }
};

const PaxForm = () => {
  const [serialNo, setSerialNo] = useState("");
  const { isFetching, error, ipAddress, fetchIpAddress } = useGetIpAddress(
    serialNo
  );
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Pax Serial Number"
          name="serialNo"
          value={serialNo}
          onChange={e => {
            setSerialNo(e.target.value);
          }}
        />
        <button onClick={fetchIpAddress} disabled={isFetching}>
          Submit
        </button>
      </div>
      <AmountForm
        isFetchingIp={isFetching}
        errorIp={error}
        ipAddress={ipAddress}
      />
    </div>
  );
};

export default PaxForm;
