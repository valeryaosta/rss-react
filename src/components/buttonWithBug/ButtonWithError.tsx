import { Component } from 'react';
import './ButtonWithError.css';

interface Props {}

interface State {
  clicked: boolean;
}

class ButtonWithError extends Component<Props, State> {
  state: State = {
    clicked: false,
  };

  handleClick = () => {
    this.setState({ clicked: true });
  };

  render() {
    if (this.state.clicked) {
      throw new Error('Imitate application error...');
    }
    return (
      <button onClick={this.handleClick} className='btn-error'>
        Click to receive Error
      </button>
    );
  }
}

export default ButtonWithError;
