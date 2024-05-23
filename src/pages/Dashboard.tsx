import React from 'react';
import { useQuery } from 'react-query';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { LatLngExpression } from 'leaflet';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const { data: worldData, error: worldError } = useQuery('worldData', () =>
    axios.get('https://disease.sh/v3/covid-19/all').then(res => res.data)
  );

  const { data: countriesData, error: countriesError } = useQuery('countriesData', () =>
    axios.get('https://disease.sh/v3/covid-19/countries').then(res => res.data)
  );

  const { data: historicalData, error: historicalError } = useQuery('historicalData', () =>
    axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all').then(res => res.data)
  );

  if (worldError || countriesError || historicalError) return <div>Error loading data...</div>;
  if (!worldData || !countriesData || !historicalData) return <div>Loading...</div>;

  const chartData = {
    labels: Object.keys(historicalData.cases),
    datasets: [
      {
        label: 'Cases',
        data: Object.values(historicalData.cases),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
      {
        label: 'Deaths',
        data: Object.values(historicalData.deaths),
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      },
      {
        label: 'Recovered',
        data: Object.values(historicalData.recovered),
        borderColor: 'rgba(153, 102, 255, 1)',
        fill: false,
      },
    ],
  };

  const mapCenter: LatLngExpression = [20, 0];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">COVID-19 Dashboard</h1>
      <div className="mb-8">
        <h2 className="text-xl mb-2">Global Cases Over Time</h2>
        <Line data={chartData} />
      </div>
      <div>
        <h2 className="text-xl mb-2">Map of COVID-19 Cases</h2>
        <MapContainer center={mapCenter} zoom={2} style={{ height: '500px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {countriesData.map((country: any) => (
            <Marker key={country.countryInfo._id} position={[country.countryInfo.lat, country.countryInfo.long]}>
              <Popup>
                <div>
                  <h3>{country.country}</h3>
                  <p>Active: {country.active}</p>
                  <p>Recovered: {country.recovered}</p>
                  <p>Deaths: {country.deaths}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Dashboard;
