import Fileupload from './components/Fileupload';
import './App.css';

function App() {
  return (
    <div className="container mt-4">
      <h4 className="display-4 text-center mb-4">
        <i className="fab fa-react"/>React file upload
      </h4>
     <Fileupload/>
    </div>
  );
}

export default App;
