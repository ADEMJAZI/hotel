import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import Room from './components/Romm';
import Bookingscreen from './screens/Bookingscreen';
import Register from './screens/Register';
import Loginscreen from './screens/Loginscreen';
import ProfileScreen from './screens/profilscreen';
import BookScreen from './screens/bookscreen';
import AdminScreen from './screens/Adminscreen';
import AdminBooking from './screens/AdminBooking';
import AddRoom from './screens/AddRoom';
import RoomPage from './screens/RoomPage';
import UserListPage from './screens/UserListPage';
import Avew from './Avew';
import about from './components/about';
import Contact from './components/Contact';
import teanstart from './components/teanstart';


const sampleRoom = {
    imageUrls: [],
    name: 'Sample Room',
    maxcount: 2,
    phonenumber: '123-456-7890',
    type: 'Deluxe'
};

function App() {
    return (
        <div className="App">
            <Navbar />
            <BrowserRouter>
                <Routes>
                    <Route path='/Home' element={<HomeScreen />} />
                    <Route path='/Room' element={<Room room={sampleRoom} />} />
                    <Route path='/book/:roomid' exact Component={Bookingscreen}></Route>
                    <Route path='/register' exact Component={Register}></Route>
                    <Route path='/login' exact Component={Loginscreen}></Route>
                    <Route path='/profil' exact Component={ProfileScreen}></Route>
                    <Route path='/booking' exact Component={BookScreen}></Route>
                    <Route path='/admin' exact Component={AdminScreen}></Route>
                    <Route path="/admin/bookings" element={<AdminBooking />} />
                    <Route path='/admin/rooms' element={<AddRoom></AddRoom>}></Route>
                    <Route path='/admin/affroom' element={<RoomPage></RoomPage>}></Route>
                    <Route path="/admin/users" element={<UserListPage />} />
                    <Route path='/plan' element={<Avew></Avew>}></Route>
                    <Route path='/about' exact Component={about}></Route>
                    <Route path='/contact' exact Component={Contact}></Route>
                    <Route path='/tean' exact Component={teanstart}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
