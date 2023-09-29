import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddComment from "./AddComment";
import Comments from "./Comments";

function ShowPhoto() {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                const response = await fetch(`http://localhost:3001/photos/${id}`);
                const data = await response.json();
                setPhoto(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPhoto();
    }, [id]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:3001/comments/byParentPost/${id}`);
                const data = await response.json();
                setComments(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchComments();
    }, [id]);

    return (
        <div>
            {photo ? (
                <div className="card bg-dark text-dark mb-2">
                    <img
                        className="card-img"
                        src={"http://localhost:3001/" + photo.path}
                        alt={photo.name}
                    />
                    <div className="card-img-overlay">
                        <h5 className="card-title">{photo.name}</h5>
                        <p className="card-title">Views: {photo.views}</p>
                        <p className="card-title">Likes: {photo.likes}</p>
                        <p className="card-title">Posted date: {photo.date}</p>
                        <p className="card-title">Posted by: {photo.postedBy.username}</p>
                        <AddComment parentPost={id} onCommentChanged={() => {
                            const getComments = async function(){
                                const res = await fetch(`http://localhost:3001/comments/byParentPost/${id}`);
                                const data = await res.json();
                                setComments(data);
                            }
                            getComments();
                        }} />
                    </div>
                    <Comments comments={comments} />
                </div>
            ) : (
                <p>Loading photo...</p>
            )}
        </div>
    );
}

export default ShowPhoto;