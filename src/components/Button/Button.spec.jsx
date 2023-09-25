import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from ".";

describe("<Button />", () => {
  // isto('deve renderizar o botão com o texto "carregue mais"')
  it('should render the button with the text "Load more"', () => {
    const fn = jest.fn();
    render(<Button text="Load more" disabled={false} onClick={fn} />);

    expect.assertions(1);
    //screen.getByRole -> pegue esse texto na tela
    // /load more/i -> isso faz pegar esse texto com qualquer letra
    const button = screen.getByRole("button", { name: /load more/i });
    // espero esse documento em button
    expect(button).toBeInTheDocument();
  });

  //isto('deve chamar a função ao clicar')
  it("should call function on click", () => {
    //jest cria uma função simples ou mock simples
    const fn = jest.fn();
    render(<Button text="Load more" disabled={true} onClick={fn} />);
    //screen.getByRole -> pegue esse texto na tela
    // /load more/i -> isso faz pegar esse texto com qualquer letra
    const button = screen.getByRole("button", { name: /load more/i });

    userEvent.click(button);

    // espera receber 1 evento de button
    expect(fn).toHaveBeenCalledTimes(0);
  });

  //isto('deveria ser desabilitado quando desabilitado é verdadeiro')
  it("should be disable when disabled is true", () => {
    const fn = jest.fn();
    render(<Button text="Load more" disabled={true} onClick={fn} />);
    //screen.getByRole -> pegue esse texto na tela
    // /load more/i -> isso faz pegar esse texto com qualquer letra
    const button = screen.getByRole("button", { name: /load more/i });

    // espera que esse botão esteja desativado
    expect(button).toBeDisabled();
  });

  //isto('deveria ser ativado quando desabilitado é falso')
  it("should be enable when disabled is false", () => {
    const fn = jest.fn();
    render(<Button text="Load more" disabled={false} onClick={fn} />);
    //screen.getByRole -> pegue esse texto na tela
    // /load more/i -> isso faz pegar esse texto com qualquer letra
    const button = screen.getByRole("button", { name: /load more/i });

    // espera que esse botão esteja ativado
    expect(button).toBeEnabled();
  });

  it("should match snapshot", () => {
    const fn = jest.fn();
    const { container } = render(
      <Button text="Load more" disabled={false} onClick={fn} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
