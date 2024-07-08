import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Notfound from './pages/Notfound';
import Counter from './components/counter';
import Timer from './components/timer';
import TextInput from './components/textinput';
import { ThemeProvider } from './context/themecontext';
import ThemedComponent from './ThemedComponent';
import { Provider } from 'react-redux';
import store from './store';
//import Counter from './counter';

const jsonData = [
  { id: 1, name: 'Nico Darmawan' },
  { id: 1, name: 'A11.2021.13434' },
];


function App() {
  return (
    
    <div className='contianer'>
      
      <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </Router>

      <div>
        <div className="App">
          <h1>TUGAS REACT JS</h1>
          {jsonData.map(item => (
            <p>{item.name}</p>
          ))
          }
        </div>
        <hr />
        <div className="App container">
          <h1 className="text-danger">BootStrap</h1>
            <button className="btn btn-primary">Submit</button>
        </div>
        <hr />
        <Deskripsi
          judul="Latihan Reactjs - props Setiap Bulan"
          penulis="mahasiswa mahasiswi"
          deskripsisingkat="cerita mahasiswa yang blum tau arah jalan"
        />
<hr />
        <div>
          <h1>Konsep State</h1>
          <Statusstate />
        </div>
        <hr />
        <div>
          <h1>fetch API</h1>
          <UserApp />
        </div>

      <div>
        <hr />
        <div>
          <h1>Hooks - Counter</h1>
          <Counter />
        </div>

        <div>
          <h1>Hooks - Timer</h1>
          <Timer />
        </div>

        <div>
          <h1>Hooks - TextInput</h1>
          <TextInput />
        </div>

<hr />
        <div>
          <h1>Context API</h1>
          <ThemeProvider>
          <ThemedComponent />
        </ThemeProvider>
        </div>

          <div>
          <Provider store={store}>
          <counter />
        </Provider>
          </div>
        
        
      </div>
      </div>
    </div>
  );
}

function Deskripsi({judul, penulis, deskripsisingkat}){
  return(
    <div>
      <h1>{judul}</h1>
        <div>
          <b>{penulis}</b>
        </div>
        <div>
          {deskripsisingkat}
        </div>
    </div>
  )
}

function Statusstate(){
  const [isOnline, setIsOnline] = useState(true);

  const toggleStatus = () => {
    setIsOnline(!isOnline);
  };
  return(
    <div>
      <p>Status aplikasi saat ini: {isOnline ? 'Online' : 'Offline'}</p>
      <button onClick={toggleStatus}>Ganti Status</button>
    </div>
  )
}

function Userlist(){
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data =>{
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  if (loading){
    return <p>Loading...</p>;
  }

  return(
    <div>
      <h1>Daftar Pengguna</h1>
      <ul>
        {users.map(user=>(
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
);
}

function AddUser(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.prevenDefault();
    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('User added:', data);
      //reset form
      setName('');
      setEmail('');
    })
    .catch(error => {
      console.error('Error adding user:', error);
    });
  };

  return(
    <div>
      <h1>Tambahkan Pengguna</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Tambahkan</button>
      </form>
    </div>
  );
}

function UserApp(){
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() =>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data=>{
      setUsers(data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
  }, []);

  const handleSubmit = (event) => {
    event.prevenDefault();
    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
    .then(response => response.json())
    .then(data =>{
      setUsers([...users, data]);
      setName('');
      setEmail('');
    })
    .catch(error => {
      console.error('Error adding user:', error);
    });;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return(
    <div>
      <h1>Daftar Pengguna</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <h1>Tambahkan Pengguna</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Tambahkan</button>
      </form>
    </div>
  );
}

export default App;