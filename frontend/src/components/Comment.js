import {useParams} from "react-router-dom";

function Comment(props) {
    const { id } = useParams();

    async function onSubmit(e){
        e.preventDefault();

        const res = await fetch(`http://localhost:3001/comments/${props.comment._id}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        console.log(props.comment._id)

        if (res.status === 204) {
            // The response is empty
            props.onCommentDeleted();
        } else {
            // The response is not empty, parse it as JSON
            const data = await res.json();
            props.onCommentDeleted();
        }
    }

    return (
        <div className="card bg-dark text-light mb-2">
            <div className="card-body">
                <h5 className="card-title">{props.comment.content}</h5>
                <p className="card-text">Posted date: {props.comment.date}</p>
                <p className="card-text">Parent post: {props.comment.parentPost}</p>
                <input className="btn btn-danger" type="submit" name="submit" value="Briši" onClick={onSubmit} />
            </div>
        </div>
    );
}

export default Comment;