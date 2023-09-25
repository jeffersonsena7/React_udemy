import P from 'prop-types';
import './styles.css';

export const PostCard = ({ cover, id, title, body }) => (
  <div className="post">
    <img src={cover} alt={title} />
    <div className="post-content">
      <h2>
        {title} {id}
      </h2>
      <p>{body} </p>
    </div>
  </div>
);

//sempre lembra de colocar required quando for obrigatório usar na pagina.
PostCard.propTypes = {
  cover: P.string.isRequired,
  id: P.number.isRequired,
  title: P.string.isRequired,
  body: P.string.isRequired,
};
