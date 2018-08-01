import React, { Component } from "react";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0",
      historyText: "",
      historyArr: [],
      currentOp: "",
      rollingValue: 0
    };

    this.handleDigit = this.handleDigit.bind(this);
    this.handleOperand = this.handleOperand.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.callEqual = this.callEqual.bind(this);
    this.backSpace = this.backSpace.bind(this);
    this.plusMinus = this.plusMinus.bind(this);
  }

  handleDigit(e) {
    const digit = e.target.value;
    const currentHisArr = [...this.state.historyArr];
    const lastIndex = currentHisArr.length === 0 ? 0 : currentHisArr.length - 1;

    console.log(lastIndex);

    if (
      (digit === "." && this.state.display.indexOf(".") === -1) ||
      digit !== "."
    ) {
      if (this.state.display === "0" || this.state.display === "") {
        this.setState({
          display: digit,
          currentOp: "",
          historyArr: [...currentHisArr, digit]
        });
      } else if (this.state.rollingValue !== 0) {
        console.log("RollingValue not 0");

        this.setState({
          display: digit,
          currentOp: "",
          historyArr: [digit],
          rollingValue: 0
        });
      } else {
        let currentVal = currentHisArr[lastIndex] + digit;
        let newArr = [...currentHisArr];
        newArr[lastIndex] = currentVal;
        console.log("newArr = " + newArr);
        const strToNum = parseFloat(this.state.display + digit).toLocaleString(
          "en",
          { maximumSignificantDigits: 16 }
        );
        console.log(strToNum);
        this.setState({
          display: this.state.display + digit,
          currentOp: "",
          historyArr: newArr
        });
        //this.showHistory();
      }
    }
    setTimeout(() => {
      this.showHistory();
    }, 150);
  }

  backSpace() {
    console.log("BackSpace()");

    if (this.state.rollingValue === 0) {
      const currentBackOne = this.state.display.slice(0, -1);
      console.log(currentBackOne);
      const currentHisArr = [...this.state.historyArr];
      const lastIndex =
        currentHisArr.length === 0 ? 0 : currentHisArr.length - 1;
      const replaceArr = [...this.state.historyArr];
      replaceArr[lastIndex] = currentBackOne;
      this.setState({
        display: currentBackOne,
        historyArr: [...replaceArr]
      });
    }
  }

  plusMinus() {
    console.log("plusMinus");
    const curVal = this.state.display;
    const newVal = parseFloat(curVal) * -1;
    console.log(curVal, newVal);
    const currentHisArr = [...this.state.historyArr];
    const lastIndex = currentHisArr.length === 0 ? 0 : currentHisArr.length - 1;
    const replaceArr = [...currentHisArr];
    replaceArr[lastIndex] = newVal;
    console.log(replaceArr);
    this.setState({
      display: newVal,
      historyArr: [...replaceArr],
      historyText: replaceArr.join(" ")
    });
  }

  swapOp() {
    let currentArr = [...this.state.historyArr];
    currentArr.pop();
    return currentArr;
  }

  showHistory() {
    const showHistory = this.state.historyArr.join(" ");
    this.setState({ historyText: showHistory });
  }

  callEqual() {
    const endOfHistArr = this.state.historyArr[
      this.state.historyArr.length - 1
    ];
    const regEx = RegExp("[÷x+-]$");
    // if (endOfHistArr.match(/[+-÷x]/)) {
    if (regEx.test(endOfHistArr)) {
      console.log("bad end");
      console.log(endOfHistArr);
      console.log(this.swapOp().join(" "));
      const valString = this.swapOp()
        .join(" ")
        .replace(/÷/, "/")
        .replace(/x/, "*");
      console.log(valString);
      const newVal = eval(valString);
      console.log(newVal);
      //this.currentArr.pop();
      this.setState({
        historyText: this.swapOp().join(" "),
        display: newVal,
        rollingValue: newVal,
        historyArr: [newVal]
      });
    } else {
      console.log("else");
      const valString = [...this.state.historyArr]
        .join(" ")
        .replace(/÷/, "/")
        .replace(/x/, "*");
      console.log(valString);
      const newVal = eval(valString);
      console.log(newVal);
      this.setState({
        historyText: valString,
        display: newVal,
        rollingValue: newVal,
        historyArr: [newVal]
      });
    }
  }
  handleOperand(e) {
    const newOp = e.target.value;

    if (this.state.display !== "0") {
      this.state.currentOp === ""
        ? this.setState({
            currentOp: newOp,
            historyArr: [...this.state.historyArr, newOp],
            display: "",
            rollingValue: 0
          })
        : this.setState({
            historyArr: [...this.swapOp(), newOp],
            display: ""
          });

      setTimeout(() => {
        this.showHistory();
      }, 250);
    }
  }

  handleClear() {
    this.setState({
      display: "0",
      historyText: "",
      currentOp: "",
      historyArr: [],
      rollingValue: 0
    });
  }

  handleKeyDown(e) {
    console.log(e.key);
    switch (e.key) {
      // key 7
      case "7":
        return document.getElementById("seven").click();
      case "8":
        return document.getElementById("eight").click();
      case "9":
        return document.getElementById("nine").click();
      case "4":
        return document.getElementById("four").click();
      case "5":
        return document.getElementById("five").click();
      case "6":
        return document.getElementById("six").click();
      case "1":
        return document.getElementById("one").click();
      case "2":
        return document.getElementById("two").click();
      case "3":
        return document.getElementById("three").click();
      case "0":
        return document.getElementById("zero").click();
      case ".":
        return document.getElementById("decimal").click();
      case "/":
        return document.getElementById("divide").click();
      case "*":
        return document.getElementById("multiply").click();
      case "-":
        return document.getElementById("subtract").click();
      case "+":
        return document.getElementById("add").click();
      case "Enter":
        return document.getElementById("equals").click();
      case "Backspace":
        return document.getElementById("backSpace").click();
      case "Clear":
        return document.getElementById("clear").click();
      case "Delete":
        return document.getElementById("clear").click();

      default:
        return console.log("default");
    }
  }

  componentWillMount = () => {
    console.log("mounted");
    document.addEventListener("keydown", this.handleKeyDown);
  };

  render() {
    return (
      <div className="App">
        <div className="calculator">
          <Display
            result={this.state.display}
            historyText={this.state.historyText}
          />
          <Keypad
            handleDigit={this.handleDigit}
            handleClear={this.handleClear}
            handleOperand={this.handleOperand}
            handleEqual={this.callEqual}
            handleBackSpace={this.backSpace}
            handlePlusMinus={this.plusMinus}
          />
        </div>
        <Footer />
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
        <History historyText={this.props.historyText} />
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
    return <div id="history">{this.props.historyText}</div>;
  }
}

class Keypad extends Component {
  render() {
    return (
      <div id="keypad">
        <Modifiers
          handleClear={this.props.handleClear}
          handleBackSpace={this.props.handleBackSpace}
          handlePlusMinus={this.props.handlePlusMinus}
        />
        <Operators
          handleOperand={this.props.handleOperand}
          handleEqual={this.props.handleEqual}
        />
        <Digits handleDigit={this.props.handleDigit} />
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
          value="8"
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
          value="÷"
          onClick={this.props.handleOperand}
        >
          ÷
        </button>
        <button
          className="btn-operators"
          id="multiply"
          value="x"
          onClick={this.props.handleOperand}
        >
          X
        </button>
        <button
          className="btn-operators"
          id="subtract"
          value="-"
          onClick={this.props.handleOperand}
        >
          -
        </button>
        <button
          className="btn-operators"
          id="add"
          value="+"
          onClick={this.props.handleOperand}
        >
          +
        </button>
        <button
          className="btn-operators"
          id="equals"
          value="="
          // onClick={this.props.handleOperand}
          onClick={this.props.handleEqual}
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
        <button
          className="btn-modifiers"
          id="backSpace"
          onClick={this.props.handleBackSpace}
        >
          <span role="img" aria-label="plus or minus">
            🔙
          </span>
        </button>
        <button className="btn-modifiers" onClick={this.props.handlePlusMinus}>
          +/-
        </button>
      </div>
    );
  }
}

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="socialLinks">
          <a href="https://github.com/REAOrlando" target="_blank">
            <i className="fab fa-github" />
          </a>

          <a
            href="https://www.linkedin.com/in/christopheralbanesefl/"
            target="_blank"
          >
            <i className="fab fa-linkedin" />
          </a>

          <a href="https://twitter.com/albanesechris" target="_blank">
            <i className="fab fa-twitter" />
          </a>

          <a href="https://codepen.io/REAOrlando/" target="_blank">
            <i className="fab fa-codepen" />
          </a>
        </div>

        <p>© Christopher Albanese 2018</p>

        <div className="photoCredits">
          <p>
            Background photo by{" "}
            <a href="https://unsplash.com/@rawpixel" target="_blank">
              rawpixel
            </a>{" "}
            on{" "}
            <a href="https://unsplash.com/photos/Dz-lPF200Rg" target="_blank">
              Unsplash
            </a>
          </p>
        </div>
      </div>
    );
  }
}
