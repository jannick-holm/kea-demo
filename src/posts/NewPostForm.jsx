import { useRef, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRealTime } from '../hooks/useRealTime';

function NewPostForm() {
	const [editing, setEditing] = useState(false);
	const postTitleInput = useRef(null);
	const form = useRef(null);
	const {auth} = useAuth();
	const {postData} = useRealTime();
	const placeholderText = !auth ? 'Login to create a post' : 'Create a post';

	const handleFocus = () => {
		setEditing(true);
	}

	const handleCancelClick = () => {
		setEditing(false);
		clearForm();
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Get data from form
		const postTitle = postTitleInput.current.value;
		const postBody = e.target.querySelector('textarea')?.value;

		await postData('posts', {
			title: postTitle,
			body: postBody,
			user_id: auth.user.id,
		});

		clearForm();
	}

	const clearForm = () => {
		postTitleInput.current.value = '';
		form.current.querySelector('textarea').value = '';

		setEditing(false);
	}

	return (
		<div className="new-post-form">
			<input ref={postTitleInput} type="text" placeholder={placeholderText} onFocus={handleFocus} disabled={!auth}/>

			{editing ?
				<form ref={form} className="form" onSubmit={handleSubmit}>
					<textarea name="" id="" cols="30" rows="5"></textarea>
					<div className="buttons-container">
						<button type="submit" className="button">Post</button>
						<button className="button button--style-outline" onClick={handleCancelClick}>Cancel</button>
					</div>
				</form>
				: null}
		</div>
	)
}

export default NewPostForm;
