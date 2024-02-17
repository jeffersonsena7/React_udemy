//importação dos moncks
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '.';
import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get(
    '*jsonplaceholder.typicode.com*',
    //esse url de baixo pega só um fetch o de cima pega todos os fetch
    //'https://jsonplaceholder.typicode.com/posts',
    //req = requisição/ res = resposta/ ctx = contexto
    async (req, res, ctx) => {
      //contexto convertido para json
      return res(
        ctx.json([
          {
            userId: 1,
            id: 1,
            title: 'title1',
            body: 'body1',
            //como está importando todos, tem que colocar os dados dos fetch API todos
            url: 'img1.jpg',
          },
          {
            userId: 2,
            id: 2,
            title: 'title2',
            body: 'body2',
            url: 'img2.jpg',
          },
          {
            userId: 3,
            id: 3,
            title: 'title3',
            body: 'body3',
            url: 'img3.jpg',
          },
        ]),
      );
    },
  ),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  //antes de executar os testes ele liga o servidor
  beforeAll(() => {
    server.listen();
  });
  //reset a cada teste para um não afetar o outro
  afterEach(() => {
    server.resetHandlers();
  });

  //depois que acabar os teste desliga o servidor
  afterAll(() => {
    server.close();
  });
  it('should render search, posts and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts');

    //quantos expect vc espera, caso nao coloque a quantidade certa apresenta erro
    expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);
    //screen.debug();

    const search = screen.getByPlaceholderText(/type you search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);

    const button = screen.getByRole('button', { name: /Load more posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should search for posts ', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts');

    //quantos expect vc espera, caso nao coloque a quantidade certa apresenta erro
    expect.assertions(11);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type you search/i);
    expect(search).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'title1 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2 2' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title3 3' })).not.toBeInTheDocument();

    userEvent.type(search, 'title1');
    expect(screen.getByRole('heading', { name: 'title1 1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title2 2' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title3 3' })).not.toBeInTheDocument();
    //só o title1 pode está na tela
    expect(screen.getByRole('heading', { name: 'Search value: title1' })).toBeInTheDocument();

    //para limpar o search que é o input
    userEvent.clear(search);
    expect(screen.getByRole('heading', { name: 'title1 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2 2' })).toBeInTheDocument();

    userEvent.type(search, 'post does not exist');
    expect(screen.getByText('Não existem posts')).toBeInTheDocument();
  });

  it('should load more post button', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts');

    //quantos expect vc espera, caso nao coloque a quantidade certa apresenta erro
    //expect.assertions(2);

    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', { name: /Load more posts/i });

    userEvent.click(button);
    //expect(screen.getByRole('heading', { name: 'title3 3' })).toBeInTheDocument();
    //expect(button).toBeDisabled();
  });
});
