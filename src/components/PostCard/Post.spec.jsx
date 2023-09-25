import { render, screen } from '@testing-library/react';
import { PostCard } from '.';
import { postCardPropMock } from './mock';
const props = postCardPropMock;
describe('<PostCard />', () => {
  //deveria renderizar o postcard corretamente
  it('should render PostCard correctly', () => {
    //esses 3 pontinhos pega tudo que está em props
    render(<PostCard {...props} />);

    expect(screen.getByRole('img', { name: 'title 1' })).toBeInTheDocument('src', 'img/img.pngL');

    expect(screen.getByRole('heading', { name: 'title 1 1' })).toBeInTheDocument();

    expect(screen.getByText('body 1')).toBeInTheDocument();
  });

  //isso faz uma copia, tipo uma foto do codigo, caso mude o codigo apresenta erro

  //deveria corresponder ao instantâneo
  it('should math snapshot', () => {
    const { container } = render(<PostCard {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
