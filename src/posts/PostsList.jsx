import { useRealTime } from '../hooks/useRealTime';
import { useEffect, useState } from 'react';
import PostItem from './PostItem';
import NewPostForm from './NewPostForm';

function PostsList() {
	const [posts, setPosts] = useState([]);
	const { subscribe } = useRealTime();

	useEffect( () => {
		subscribe('posts', setPosts);
	}, []);

	return (
		<div className="posts-view">
			<NewPostForm />
			<ul className="posts-list">
				{posts?.map((post) => {
					return (
						<PostItem key={post.id} data={post} />
					)
				})}
			</ul>
		</div>
	)
}

export default PostsList
