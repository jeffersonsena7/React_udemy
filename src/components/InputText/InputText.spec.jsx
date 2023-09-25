import { render, screen } from '@testing-library/react';
import { InputText } from '.';
import userEvent from '@testing-library/user-event';

describe('<InputText />', () => {
  //
  it('should have a value of searchValue', () => {
    const fn = jest.fn();
    render(<InputText handleChange={fn} searchValue={'testando'} />);
    expect(screen.getByPlaceholderText(/type you search/i).value).toBe('testando');
  });
  //deve chamar a função handleChange em cada tecla pressionada
  it('should call handleChange function on each key pressed', () => {
    const fn = jest.fn();
    render(<InputText handleChange={fn} searchValue="o valor" />);

    const input = screen.getByPlaceholderText(/type you search/i);
    const value = 'o valor';

    userEvent.type(input, value);

    expect(input.value).toBe(value);
    expect(fn).toHaveBeenCalledTimes(value.length);
  });

  //agora fazer um snapshot, caso mude alguma coisa do código apresenta erro no teste
  it('should match snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<InputText handleChange={fn} searchValue="" />);
    expect(container).toMatchSnapshot();
  });
});
