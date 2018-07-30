import React, { Component } from "react";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0",
      historyText: "",
      historyArr: [],
      currentOp: ""
    };

    this.handleDigit = this.handleDigit.bind(this);
    this.handleOperand = this.handleOperand.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleDigit(e) {
    console.log("state =" + this.state.display);
    const digit = e.target.value;
    console.log(digit);
    const displayNum = parseFloat(this.state.display);

    (digit === "." && this.state.display.indexOf(".") == -1) || digit != "."
      ? this.state.display == "0"
        ? this.setState({ display: digit })
        : this.setState({ display: this.state.display + digit })
      : console.log("blockDecimal");
  }

  handleOperand(e) {
    console.log(e.target.id);
    console.log("Op CLicked");
    this.setState({ currentOp: e.target.id });
  }

  handleClear() {
    this.setState({
      display: "0",
      historyText: "",
      currentOp: "",
      historyArr: []
    });
  }
  render() {
    return (
      <div className="App">
        <div className="calculator">
          <Display result={this.state.display} />
          <Keypad
            handleDigit={this.handleDigit}
            handleClear={this.handleClear}
            handleOperand={this.handleOperand}
          />
        </div>
      </div>
    );
  }
}

export default App;

class Display extends Component {
  render() {
    return (
      <div id="result-wrapper">
        <Results result={this.props.result} />
        <History />
      </div>
    );
  }
}

class Results extends Component {
  render() {
    return <div id="display">{this.props.result}</div>;
  }
}

class History extends Component {
  render() {
    return <div id="history">history + 7 X 4 =</div>;
  }
}

class Keypad extends Component {
  render() {
    return (
      <div id="keypad">
        <Digits handleDigit={this.props.handleDigit} />
        <Operators handleOperand={this.props.handleOperand} />
        <Modifiers handleClear={this.props.handleClear} />
      </div>
    );
  }
}

class Digits extends Component {
  render() {
    return (
      <div id="digit-wrapper">
        <button
          className="btn-digits"
          id="seven"
          value="7"
          onClick={this.props.handleDigit}
        >
          7
        </button>
        <button
          className="btn-digits"
          id="eight"
          value="8 "
          onClick={this.props.handleDigit}
        >
          8
        </button>
        <button
          className="btn-digits"
          id="nine"
          value="9"
          onClick={this.props.handleDigit}
        >
          9
        </button>
        <button
          className="btn-digits"
          id="four"
          value="4"
          onClick={this.props.handleDigit}
        >
          4
        </button>
        <button
          className="btn-digits"
          id="five"
          value="5"
          onClick={this.props.handleDigit}
        >
          5
        </button>
        <button
          className="btn-digits"
          id="six"
          value="6"
          onClick={this.props.handleDigit}
        >
          6
        </button>
        <button
          className="btn-digits"
          id="one"
          value="1"
          onClick={this.props.handleDigit}
        >
          1
        </button>
        <button
          className="btn-digits"
          id="two"
          value="2"
          onClick={this.props.handleDigit}
        >
          2
        </button>
        <button
          className="btn-digits"
          id="three"
          value="3"
          onClick={this.props.handleDigit}
        >
          3
        </button>
        <button
          className="btn-digits"
          id="decimal"
          value="."
          onClick={this.props.handleDigit}
        >
          .
        </button>
        <button
          className="btn-digits"
          id="zero"
          value="0"
          onClick={this.props.handleDigit}
        >
          0
        </button>
      </div>
    );
  }
}

class Operators extends Component {
  render() {
    return (
      <div id="op-wrapper">
        <button
          className="btn-operators"
          id="divide"
          onClick={this.props.handleOperand}
        >
          ÷
        </button>
        <button
          className="btn-operators"
          id="multiply"
          onClick={this.props.handleOperand}
        >
          X
        </button>
        <button
          className="btn-operators"
          id="subtract"
          onClick={this.props.handleOperand}
        >
          -
        </button>
        <button
          className="btn-operators"
          id="add"
          onClick={this.props.handleOperand}
        >
          +
        </button>
        <button
          className="btn-operators"
          id="equals"
          onClick={this.props.handleOperand}
        >
          =
        </button>
      </div>
    );
  }
}

class Modifiers extends Component {
  render() {
    return (
      <div id="mod-wrapper">
        <button
          className="btn-modifiers"
          id="clear"
          onClick={this.props.handleClear}
        >
          Clear
        </button>
        <button className="btn-modifiers">blank</button>
        <button className="btn-modifiers">blank</button>
      </div>
    );
  }
}
