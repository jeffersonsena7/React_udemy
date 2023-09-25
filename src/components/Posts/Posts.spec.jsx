import { render, screen } from "@testing-library/react";
import { Posts } from ".";

//como Props teem tem vários post cria a variável com uma array para testar
const props = {
  posts: [
    {
      id: 1,
      title: "title 1",
      body: "body 1",
      cover: "img/img1.png",
    },
    {
      id: 2,
      title: "title 2",
      body: "body 2",
      cover: "img/img2.png",
    },
    {
      id: 3,
      title: "title 3",
      body: "body 3",
      cover: "img/img3.png",
    },
  ],
};

describe("<Posts />", () => {
  it("should render posts", () => {
    //checar se todos os posts estão na pagina
    render(<Posts {...props} />);
    //as //i pega tudo que tiver title independente da escrita
    // coloca getAllBiRole pq tem vários titulo, se tivesse só um colocaria getByRole, ai pegaria pelo atributo ficando assim.
    //expect(screen.getByRole('img', {name: /title3/i})).toHaveAttribute('src', img/img3.png);
    expect(screen.getAllByRole("heading", { name: /title/i })).toHaveLength(3);
    expect(screen.getAllByRole("img", { name: /title/i })).toHaveLength(3);
    expect(screen.getAllByText(/body/i)).toHaveLength(3);
  });

  it("should not render posts", () => {
    render(<Posts />);
    expect(
      screen.queryByRole("heading", { name: /title/i }),
    ).not.toBeInTheDocument();
  });

  //faz o de cima para poder criar o snapshot com todos os atributos
  it("should match snapshot", () => {
    const { container } = render(<Posts {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
