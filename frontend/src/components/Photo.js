import {Link, useParams} from "react-router-dom";
import { UserContext } from "../userContext";
import {useState, useEffect, useContext} from "react";
import AddLikes from "./AddLike";

function Photo(props){
    const userContext = useContext(UserContext);
    async function onSubmit(e){
        e.preventDefault();

        const updatedPhoto = {
            likes: props.photo.likes + 1
        };

        const res = await fetch(`http://localhost:3001/photos/${props.photo._id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPhoto)
        });

        localStorage.setItem(
            `photo_${props.photo._id}_${props.session}`,
            true
        );
        props.onPhotoUpdated();
        console.log(props.photo._id)
    }

    function onView(e) {
        e.preventDefault();

        const updatedPhoto = {
            views: props.photo.views + 1,
        };

        fetch(`http://localhost:3001/photos/${props.photo._id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPhoto)
        })
            .then(res => {
                props.onPhotoUpdated();
                window.location.href = `/photos/${props.photo._id}`;
            })
            .catch(err => console.log(err));
    }

    async function onDelete(e){
        e.preventDefault();

        const res = await fetch(`http://localhost:3001/photos/${props.photo._id}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        console.log(props.photo._id)

        if (res.status === 204) {
            // The response is empty
            props.onPhotoUpdated();
        } else {
            // The response is not empty, parse it as JSON
            const data = await res.json();
            props.onPhotoUpdated();
        }
    }

    return (
        <div className="card bg-dark text-dark mb-2">
            <img className="card-img" src={"http://localhost:3001/"+props.photo.path} alt={props.photo.name}/>
            <div className="card-img-overlay">
                <h5 className="card-title">{props.photo.name}</h5>
                <p className="card-title">Views: {props.photo.views}</p>
                <p className="card-title" id="likes">Likes: {props.photo.likes}</p>
                <p className="card-title">Posted date: {props.photo.date}</p>
                <p className="card-title">Posted by: {props.photo.postedBy.username}</p>

                <UserContext.Consumer>
                    {context => (
                        context.user ?
                            <>
                                <AddLikes id={props.photo._id} text="Like" userId={userContext.user._id}/>
                                <button onClick={onView}>Preberi več</button>
                                <br/>
                                <br/>
                                <input className="btn btn-danger" type="submit" name="submit" value="Briši" onClick={onDelete} />
                            </>
                            :
                            <>

                            </>

                    )}
                </UserContext.Consumer>
            </div>
        </div>
    );
}

export default Photo;