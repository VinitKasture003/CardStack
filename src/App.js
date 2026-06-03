import './App.css';
import { Stack } from './Components/CardStack/CardStack.jsx';
import RococoBackground from './Components/RococoBg/RococoBg.jsx';
import { UseUniqueSessionId } from './Hooks/UseUniqeSessionId.js';

function App() {
  UseUniqueSessionId();

  return (
    <>
      <RococoBackground>
        <div className='container' >
          <br />
          <br />
          <br />
          <br />
          <Stack />
        </div>
      </RococoBackground>
    </>
  );
}

export default App;
