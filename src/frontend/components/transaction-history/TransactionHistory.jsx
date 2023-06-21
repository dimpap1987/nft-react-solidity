import { useGlobalState } from "../../store";
import "./TransactionHistory.css";

export default function TransactionHistory() {
  const [transactions] = useGlobalState("transactions");

  return (
    <section className="md:w-10/12 m-auto text-md text-white text-center">
      {transactions.length > 0 && (
        <>
          <h1 className="textLg font-bold p-5">Transaction History</h1>
          <div className="transaction-container">
            <table className="transaction-table">
              <thead>
                <tr>
                  <th className="flex justify-center">
                    <svg
                      fill="#ffffff"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24.00 24.00"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#ffffff"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path d="M17.0020048,13 C17.5542895,13 18.0020048,13.4477153 18.0020048,14 C18.0020048,14.5128358 17.6159646,14.9355072 17.1186259,14.9932723 L17.0020048,15 L5.41700475,15 L8.70911154,18.2928932 C9.0695955,18.6533772 9.09732503,19.2206082 8.79230014,19.6128994 L8.70911154,19.7071068 C8.34862757,20.0675907 7.78139652,20.0953203 7.38910531,19.7902954 L7.29489797,19.7071068 L2.29489797,14.7071068 C1.69232289,14.1045317 2.07433707,13.0928192 2.88837381,13.0059833 L3.00200475,13 L17.0020048,13 Z M16.6128994,4.20970461 L16.7071068,4.29289322 L21.7071068,9.29289322 C22.3096819,9.8954683 21.9276677,10.9071808 21.1136309,10.9940167 L21,11 L7,11 C6.44771525,11 6,10.5522847 6,10 C6,9.48716416 6.38604019,9.06449284 6.88337887,9.00672773 L7,9 L18.585,9 L15.2928932,5.70710678 C14.9324093,5.34662282 14.9046797,4.77939176 15.2097046,4.38710056 L15.2928932,4.29289322 C15.6533772,3.93240926 16.2206082,3.90467972 16.6128994,4.20970461 Z"></path>{" "}
                      </g>
                    </svg>
                  </th>
                  <th>From</th>
                  <th className="value-column">Age</th>
                  <th>To</th>
                  <th className="value-column">Value</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {transactions?.map((transaction, index) => (
                  <tr key={index}>
                    <td title={transaction.hash}>{transaction.hash}</td>
                    <td title={transaction.from}>{transaction.from}</td>
                    <td className="value-column">{transaction.time}</td>
                    <td title={transaction.to}>{transaction.to}</td>
                    <td className="value-column">{transaction.price} ether</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
