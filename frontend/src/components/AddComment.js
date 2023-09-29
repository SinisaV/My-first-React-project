import { useContext, useState } from 'react'
import { Navigate } from 'react-router';
import { UserContext } from '../userContext';

function AddComment(props) {
    const userContext = useContext(UserContext);
    const[content, setComment] = useState('');

    async function onSubmit(e){
        e.preventDefault();

        if(!content){
            alert("Vnesite content!");
            return;
        }

        const formData = new FormData();
        formData.append('content', content);
        formData.append('parentPost', props.parentPost);
        const res = await fetch('http://localhost:3001/comments', {
            method: 'POST',
            credentials: 'include',
            body: formData
        });
        const data = await res.json();
        setComment('');
        props.onCommentChanged();
        window.location.reload(); // Reload the page
        //setUploaded(true);
    }


    return (
        <form className="form-group" onSubmit={onSubmit}>
            {!userContext.user ? <Navigate replace to="/login" /> : ""}
            {/*{uploaded ? <Navigate replace to="/" /> : ""}*/}
            <input type="text" className="form-control" name="ime" placeholder="Komentar" value={content} onChange={(e)=>{setComment(e.target.value)}}/>
            <input className="btn btn-primary" type="submit" name="submit" value="Komentiraj" />
        </form>
    )
}

export default AddComment;