import './styles.css';

import { Component } from 'react';

import { loadPosts } from '../../utils/loadPosts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { InputText } from '../../components/InputText'

export class Home extends Component {
  //state salva coisas na memoria e manda reder para mostrar na tela
  //se o stato mudar a props muda, porém se a props mudar o stato não muda 
  state = {
    //ambos são uma array, ao colocar slice ele fatia a array 
     posts: [],
     allPost: [],
     page: 0,
     postsPerPage: 2,
     searchValue: ''
  };

  //todos esses estão usando a função callback, enviando para dentro dos componentes,
  //ai os componentes pode manipular os dados

  //componente montado
  // usado para fazer uma busca externa com API, carregando só os posts
  async componentDidMount() {
    await this.loadPosts();
  }
  //retorna uma props pq ela é assíncrona, assíncrona quando vai pegar do uma API
  loadPosts = async() => {
    const {page, postsPerPage} = this.state;
    const postsAndPhotos = await loadPosts();
    
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage), 
      allPost:postsAndPhotos
    });
  }
  
  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPost,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nexPost = allPost.slice(nextPage, nextPage + postsPerPage);
    //pega tudo da array e joga dentro de nextPost por isso coloca os 3 pontinhos
    posts.push(...nexPost);

    this.setState({ posts, page:nextPage });
  }

  handleChange = (e) => {
    const {value} = e.target;
    this.setState({ searchValue: value });
  }

  render() {
    const  { posts, page, postsPerPage, allPost, searchValue } = this.state;
    
    //se a pagina que estou querendo ir for maior que os post 
    const noMorePosts = page + postsPerPage >= allPost.length;
    
    //operador ternário, se isso for verdade faça isso se não faça isso
    // se tem valor em searchValue pegue todos os allPosts converta tudo para minusculo
    //incluindo o valor de searchValue em minusculo tbm.
    const filteredPosts = !!searchValue ? allPost.filter(post =>{
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      )
      //se não pegue só os posts
    }) : posts;

  //quandoClick é um atributo do evento na outra pagina
  //!! converte para booleano true e && converte para false, isso se chama 
  // avaliação de curto-circuito (short-circuit)
    return (
      <section className='container'>
        {/*Se isso for true exiba o h1 */}
        <div className='search-container'>
          {!!searchValue && (
            <h1>search value: {searchValue}</h1>
          )}
          <InputText searchValue={ searchValue } handleChange={ this.handleChange }/>
        </div>
        

        {/*se o tamanho filteredPost for maior que 0 mostre isso */}
        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}
        
        {filteredPosts.length === 0 && (
          <p>Não existe posts </p>
        )}
        
        <div className='button-container'>
          {/*se nao tiver busca eu quero exibir o botão */}
          {!searchValue && (
            <Button
            text='Load more posts'
            quandoClick={this.loadMorePosts}
            disabled = {noMorePosts}
          />
          )}
            
        </div>
      </section>

    );

  }
}