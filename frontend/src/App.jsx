import { RecoilRoot } from 'recoil';
import Home from './components/home';

function App() {
  return (
    <div>
      <RecoilRoot>
        <Home />
      </RecoilRoot>
    </div>
  );
}

export default App;
