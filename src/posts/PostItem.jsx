import moment from 'moment';
import { useRealTime } from '../hooks/useRealTime';
import { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../hooks/useAuth';

function PostItem(props) {
	const { auth } = useAuth();
	const { user_id, id, title, body, created_at } = props.data;
	const [user, setUser] = useState({});
	const { fetchRow, deleteRow } = useRealTime();

	const canDeletePost = () => {
		return auth?.user.id === user_id;
	};

	const handleDelete = async () => {
		await deleteRow('posts', {col: 'id', val: id})
	}

	useEffect(() => {
		fetchRow('users', {col: 'id', val: user_id}, setUser);
	}, []);

	return (
		<div className="posts-list-item">
			{ canDeletePost() ? <TrashIcon onClick={handleDelete} className="icon-delete" /> : null }
			<div className="content">
				<p className="post-info">{user.email} { moment(created_at).fromNow() }</p>
				<h1 className="title">{title}</h1>
				<p className="body">{body}</p>
			</div>
		</div>
	)
}

export default PostItem
