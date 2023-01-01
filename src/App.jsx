import { useEffect, useState } from "react";
import "./App.css";

const braileAlph = {
  a: "100000",
  b: "101000",
  c: "110000",
  d: "110100",
  e: "100100",
  f: "111000",
  g: "111100",
  h: "101100",
  i: "011000",
  j: "011100",
  k: "100010",
  l: "101010",
  m: "110010",
  n: "110110",
  ñ: "111101",
  o: "100110",
  p: "111010",
  q: "111110",
  r: "101110",
  s: "011010",
  t: "011110",
  u: "100011",
  v: "101011",
  w: "011101",
  x: "110011",
  y: "110111",
  z: "100111",
  mayus: "010001",
  number: "010111",
};

const braileCharGenerator = (char) => {
  const botones = braileAlph[char.toLowerCase()]
    .split("")
    .map((number, index) => {
      return (
        <div
          key={`circle-${index}`}
          className={`circulos ${
            char != "mayus"
              ? "active" + number
              : number != "0"
              ? "circleGreen"
              : "active" + number
          }`}
        />
      );
    });

  return <div className="matriz">{botones}</div>;
};

const alphabetBase = "abcdefghijklmnñopqrstuvwxyz";

function App() {
  const [letter, setLetter] = useState("");
  const [alphabet, setAlphabet] = useState(alphabetBase.split(""));
  const [char, setChar] = useState("");
  const [allButtons, setAllButtons] = useState("");
  const [isMayus, setIsMayus] = useState(false);
  const [braileOption, setBraileOption] = useState("");

  const handleClick = (e) => {
    const value = e.target.innerText;
    setLetter(value);
    setChar(braileCharGenerator(value));
  };

  const buttons = () =>
    alphabet.map((item, index) => {
      return (
        <button key={`charButton-${index}`} onClick={handleClick}>
          {item}
        </button>
      );
    });

  const handleMayus = () => {
    setIsMayus((prev) => !prev);
    if (!isMayus) {
      setAlphabet(alphabetBase.toUpperCase().split(""));
      setAllButtons(buttons());
      setBraileOption(braileCharGenerator("mayus"));
      setLetter(letter.toUpperCase());
    } else {
      setAlphabet(alphabetBase.split(""));
      setAllButtons(buttons());
      setBraileOption("");
      setLetter(letter.toLowerCase());
    }
  };

  useEffect(() => {
    setAllButtons(buttons);
  }, [alphabet]);

  return (
    <>
      <h1>Braille</h1>
      <div style={buttonBox}>{allButtons}</div>
      <div>
        <h2>{letter}</h2>
        <div className="braileBoxes">
          {isMayus ? braileOption : null}
          {char}
        </div>
      </div>
      <button onClick={handleMayus}>MAYUS</button>
    </>
  );
}

const buttonBox = {
  width: "20rem",
  display: "flex",
  flexFlow: "row wrap",
  gap: "1rem",
};

export default App;
