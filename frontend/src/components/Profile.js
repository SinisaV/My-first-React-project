import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';

function Profile(){
    const userContext = useContext(UserContext); 
    const [profile, setProfile] = useState({});
    const [numPhotos, setNumPhotos] = useState(0);
    const [totalViews, setTotalViews] = useState(0);

    useEffect(function(){
        const getProfile = async function(){
            const res = await fetch("http://localhost:3001/users/profile", {credentials: "include"});
            const data = await res.json();
            setProfile(data);
        }
        getProfile();
    }, []);

    useEffect(function(){
        const getNumPhotos = async function(){
            const res = await fetch(`http://localhost:3001/photos/byUser/${profile._id}`);
            const data = await res.json();
            setNumPhotos(data.length);
            const views = data.reduce((total, photo) => total + photo.views, 0);
            setTotalViews(views);
        }
        if (profile._id) {
            getNumPhotos();
        }
    }, [profile._id]);

    return (
        <>
            {!userContext.user ? <Navigate replace to="/login" /> : ""}
            <h1>User profile</h1>
            <p>Username: {profile.username}</p>
            <p>Email: {profile.email}</p>
            <p>Number of photos uploaded: {numPhotos}</p>
            <p>Total views: {totalViews}</p>
        </>
    );
}

export default Profile;