import { useState, useEffect } from 'react';
import Comment from "./Comment";
import {useParams} from "react-router-dom";

function Comments(){
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    useEffect(function(){
        const getComments = async function(){
            const res = await fetch(`http://localhost:3001/comments/byParentPost/${id}`);
            const data = await res.json();
            setComments(data);
        }
        getComments();
    }, [id]);

    return(
        <div>
            <h3>Comments:</h3>
            <ul>
                {comments.map((comment) => (
                    <Comment comment={comment}
                             key={comment._id}
                             onCommentDeleted={() => {
                                 const getComments = async function(){
                                     const res = await fetch(`http://localhost:3001/comments/byParentPost/${id}`);
                                     const data = await res.json();
                                     setComments(data);
                                 }
                                 getComments();
                             }}
                    />
                ))}
            </ul>
        </div>
    );
}

export default Comments;