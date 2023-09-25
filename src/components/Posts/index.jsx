//se não tiver logica não coloca dentro de chaves e sim dentro de parentes, pois nao tem o return
import P from 'prop-types';
import { PostCard } from '../PostCard';

import './styles.css';
//sempre que tem map, colocar uma key de id, para não apresentar erro
export const Posts = ({ posts = [] }) => (
  <div className="posts">
    {posts.map((post) => (
      <PostCard key={post.id} title={post.title} cover={post.cover} id={post.id} body={post.body} />
    ))}
  </div>
);

Posts.defaultProps = {
  posts: [],
};

Posts.propTypes = {
  posts: P.array,
};
