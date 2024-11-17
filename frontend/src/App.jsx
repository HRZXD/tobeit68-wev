import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import modelCar from "./img/model_car.png";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:3000/endpoint'); // Update with your backend URL
      setData(response.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data from the server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Distance Data</h1>
      <div className="relative w-full max-w-lg">
        <p className="text-center mt-4"><strong>Distance 1:</strong> {data?.distance1 || "N/A"} cm</p>
        <div className="grid grid-cols-3 gap-4 items-center justify-items-center">
          <p className="text-center"><strong>Distance 2:</strong> {data?.distance2 || "N/A"} cm</p>
          <img src={modelCar} alt="carModel" className="col-span-1 row-span-3 w-96 h-auto" />
          <p className="text-center"><strong>Distance 3:</strong> {data?.distance3 || "N/A"} cm</p>
        </div>
      </div>

      {loading && <p className="text-lg mt-4">Loading data...</p>}
      {error && <p className="text-lg text-red-500 mt-4">{error}</p>}
      <button
        onClick={fetchData}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Refresh Data
      </button>
    </div>
  );
};

export default App;
