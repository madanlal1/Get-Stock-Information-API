import { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://jsonmock.hackerrank.com/api/stocks?date=5-January-2000`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `HTTP Error status : ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setData(actualData.data);
        setError(null);
        console.log(actualData);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
          <>

            <br/> <h1 style={{textAlign: "center"}}>Get Stock Information</h1> <br/>

            {loading && <div>Please wait, data is loading...</div>}

            {error && (
              <div>{`data fetching error : ${error}`}</div>
            )}

              <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Open</th>
                  <th scope="col">High</th>
                  <th scope="col">Low</th>
                  <th scope="col">Close</th>
                </tr>
              </thead>
              <tbody>

                {data &&
                  data.map((item) => (
                    <tr>
                          <th scope="row">1</th>
                          <td>{item.open}</td>
                          <td>{item.high}</td>
                          <td>{item.low}</td>
                          <td>{item.close}</td>
                    </tr>
                ))}
              </tbody>
            </table>
      </>
  );
}
