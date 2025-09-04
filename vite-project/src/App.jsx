import {Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/login';
import ForgotPassword from './Components/ForgotPassword';
import Dashboard from './Components/Dashboard';
import UploadDocuments from './Components/UploadDocuments';
import ESign from './Components/ESign';
import Review from './Components/Review';
import LoanForm from './Components/Loanform';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Sidebar from './Components/Sidebar';
import LoanApplication from './Components/LoanApplication';
import LoanTypeCard from './Components/LoanTypeCard';
import ProgressBar from './Components/ProgressBar';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/signup' element={<Signup />}/>
      <Route path="/login" element={<Login />} />
      <Route path='/forgotpassword' element={<ForgotPassword/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/uploaddocuments' element={<UploadDocuments/>}/>
      <Route path='/esign' element={<ESign/>}/>
      <Route path = '/review' element={<Review/>}/>
      <Route path = '/loanform' element={<LoanForm/>}/>
      <Route path='/header' element={<Header/>}/>
      <Route path='/footer' element={<Footer/>}/>
      <Route path='/sidebar' element={<Sidebar/>}/>
      <Route path='/loanapplication' element={<LoanApplication/>}/>
      <Route path='/loantypecard' element={<LoanTypeCard/>}/>
      <Route path='/progressbar' element={<ProgressBar/>}/>
    </Routes>
  );
}

export default App;