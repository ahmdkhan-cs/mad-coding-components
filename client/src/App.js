import {BrowserRouter, Routes, Route} from 'react-router-dom';
import FileUploader from './components/FileUploader';
import Table from './components/Table';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/table" element={<Table />} />
        <Route path="/file-uploader" element={<FileUploader />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
