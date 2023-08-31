import { Link } from 'react-router-dom';
import Nav from '../components/Nav';

function Home() {
  return (
    <div>
      <Nav />
      <h1>Worldwise</h1>
      <Link to="/pricing">Pricing</Link>
    </div>
  );
}

export default Home;
