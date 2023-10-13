import React, {useEffect, useState} from 'react';
import './userHome.css'
import { Menubar } from 'primereact/menubar';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Form from './form'
import UserArchive from './userArchive';

const UserHome = () => {

    const { userId } = useParams();
    const[userData, setUserData] = useState(null);
    const[showForm, setShowForm] = useState(false);
    const[showArchive, setShowArchive] = useState(true);
    const[header, setHeader] = useState('Your Incident Archive')

    const navigate = useNavigate();

    const getUser = async () => {
        try {
            console.log('get name called')
            const response = await fetch('http://localhost:4000/api/user', {
                method: 'POST',
                body: JSON.stringify({ userId }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log('Retrieved user success')
                const data = await response.json();
                return data.user
            } else {
                return 'Could not find name';
            }
        } catch (error) {
            console.log(error);
            return 'An error occurred';
        }
    };

    useEffect(() => {
        const fetchName = async () => {
            const user = await getUser();
            setUserData(user);
            console.log(userData)
        };
        fetchName();
    }, []);

    const welcomeMessage = userData ? `Welcome, ${userData.firstname}` : ''

    const items = [
        {
            label: welcomeMessage,
            className: 'welcome-user',
            disabled: true,
        },
        {
           label:'Home',
           command: () => {
            setShowForm(false);
            setShowArchive(true)
            setHeader('Your incident archive')
           }
        },
        {
            label:'Report an incident',
            command: () => {
            setShowForm(true);
            setShowArchive(false);
            setHeader('Report an incident')
           }
        },
        {
            label: 'Sign out',
            command: () => {
                navigate('/login.js')
            }
        }
    ];

    return (
        <>
        <Menubar model={items}/>
        <h1 className='heading'>{header}</h1>  
        <div className='function-container'>
        {showForm && <Form userData = {userData}/>}
        {showArchive && <UserArchive className="user-archive" userData={userData}/>}
        </div>
        </>
    )
}

export default UserHome