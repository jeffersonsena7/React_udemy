//se não tiver logica não coloca dentro de chaves ee sim dentro de parentes, pois nao tem o return 
import { PostCard } from '../PostCard'

import './styles.css'
//sempre que tem map, colocar uma key de id, para não apresentar erro
export const Posts =  ({posts}) => (
  <div className="posts">          
          {posts.map(post =>(
            <PostCard 
                      key={post.id} 
                      title={post.title} 
                      cover={post.cover}
                      id={post.id}
                      body={post.body}/>

          ))}
        </div>
)