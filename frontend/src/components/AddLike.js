export function handleVote(props) {
    const storageKey = `voted_${props.userId}_${props.id}`;
    console.log(localStorage.getItem(storageKey));

    if (localStorage.getItem(storageKey)) {
        alert("Can't add more likes to photo.");
        return;
    }

    fetch(`http://localhost:3001/photos/like/${props.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: 'likes'
        })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('likes').textContent = `Likes ${data.likes}`;

            localStorage.setItem(storageKey, true);
        })
        .catch(error => console.error(error));
}
function AddLikes(props)
{
    return(

        <button  className={props.className} onClick={() => handleVote(props)}>
            {props.text}
        </button>
    )

}

export default AddLikes;