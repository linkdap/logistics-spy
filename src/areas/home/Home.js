import './Home.css';
import Countries from '../countryData/countriesForm';

function Home() {
  
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>
          Logistics Spy
        </h1>
      </header>
      <main>
      <Countries />
      </main>
    </div>
  );
}

export default Home;