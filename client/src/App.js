import React,{useState,useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route,Navigate} from "react-router-dom";
// import Home from '../src/components/home';
import TextArea from './notepad/textarea';
import About from './about/about';
import Navbar from './navbar/navbar';
import Alert from '../src/components/alert';
import Insight from './analysis/insight';
import Login from './user/login';
import Register from './user/registers';
import Bookmark from './notepad/BookmarkPage';
import Category from './category/category';


function App(props) {
  const [mode,setMode]=useState('light');
  const [alert,setAlert]=useState(null);

  // Default background color based on the mode
  const backgroundColor = mode === 'light' ? '#D2B48C' : '#0A3A5E';
  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor; // Set default background color
  }, [mode, backgroundColor]);

  
  const showAlert=(message,type)=>{
      setAlert({
        msg:message,
        type:type
      })
  }
  const toggleMode = ()=>{
    if (mode==='light') {
      setMode('dark');
      document.body.style.backgroundColor='#0A3A5E';
      showAlert("Dark Mode has been enabled","success");
      document.title="Notepad Dark Mode";
    }
    else{
      setMode('light');
      showAlert("Light Mode has been enabled","warning");
      document.title="Notepad Light Mode";
    }
  }

  const renderNavbar = () => {
    const currentPath = window.location.pathname;
    if (currentPath === '/register' || currentPath === '/') {
      return null; // Don't render Navbar for register and login paths
    }
    return <Navbar head="NotePad" mode={mode} toggleMode={toggleMode} />;
  };
  

  return (
    <>
    <Router>
    {renderNavbar()}
    <Alert alert={alert}/>
      <Routes>
        
        {/* NotePad Path */}
        <Route exact path='/insight' element={<Insight mode={mode} />}/>
        <Route exact path='/notes' element={<TextArea showAlert={showAlert} head="Welcome to NotePad" mode={mode} />}/>
        <Route exact path='/about' element={<About mode={mode} />}/>
        <Route exact path='/bookmark' element={<Bookmark mode={mode} />}/>
        
        {/* Category Path */}
  
        <Route exact path='/uncategory' element={<Category head='Uncategory' category='uncategorized' mode={mode} />} />
        <Route exact path='/work' element={<Category head='Work' category='Work' mode={mode} />} />
        <Route exact path='/development' element={<Category head='Development' category='Development' mode={mode} />} />
        <Route exact path='/study' element={<Category head='Study' category='Study' mode={mode} />} />
        <Route exact path='/generals' element={<Category head='General' category='General' mode={mode} />} />
        <Route exact path='/personal' element={<Category head='Personal' category='Personal' mode={mode} />} />

      
      
      
      {/* UserAuth Path */}
      <Route exact path='/' element={<Login mode={mode} />} />
      <Route exact path='/register' element={<Register mode={mode} />} />


      </Routes>
    </Router>
    </>
  );
}

export default App;
  


