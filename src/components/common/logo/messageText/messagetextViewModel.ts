import { useEffect, useRef } from "react";
import { messages } from "./types";

export const MessageTextViewModel = () => {
  const wordRef = useRef<HTMLSpanElement>(null);
  let wordArray: any[] = [];
  let currentWordIndex: number = 0;
  const messages: messages = [
    { style: "wisteria", text: "me" },
    { style: "belize", text: "you" },
    { style: "pomegranate", text: "someone" },
    { style: "green", text: "every one" },
    { style: "midnight", text: "man" },
  ];

  /*function changeWord(wordArray: string[], words: HTMLCollectionOf<any>) {
    let currentWord = wordArray[currentWordIndex];
    let newWord: any = isNewWord();

    for (let i = 0; i < currentWord.length; i++) {
      animateLetterOut(currentWord, i);
    }

    for (let i = 0; i < newWord.length; i++) {
      newWord[i].className = "letter behind";
      newWord[0].parentElement.style.opacity = 1;
      animateLetterIn(newWord, i);
    }

    function isNewWord() {
      return currentWordIndex === words.length - 1
        ? wordArray[0]
        : wordArray[currentWordIndex + 1];
    }

    function isLastWord() {
      return currentWordIndex === wordArray.length - 1
        ? 0
        : currentWordIndex + 1;
    }

    currentWordIndex = isLastWord();
    return currentWordIndex;
  }

  /!*animate the letter rolling in *!/
  function animateLetterIn(nw: any, i: any) {
    const setLetterIn = () => {
      nw[i].className = "letter in";
    };
    setTimeout(setLetterIn, 340 + i * 80);
  }

  /!*animate the letter rolling out *!/
  function animateLetterOut(currentWord: any, i: number) {
    const setLetterOut = () => {
      currentWord[i].className = "letter out";
    };

    setTimeout(setLetterOut, i * 80);
  }

  function splitLetters(word: any) {
    let content = word.innerHTML;
    word.innerHTML = "";
    let letters = [];

    for (let i = 0; i < content.length; i++) {
      let letter = document.createElement("span");
      letter.className = "letter";
      letter.innerHTML = content.charAt(i);
      word.appendChild(letter);
      letters.push(letter);
    }

    wordArray.push(letters);
  }*/

  useEffect(() => {
    let words = document.getElementsByClassName("word");

    //@ts-ignore
    words[currentWordIndex].style.opacity = 1;

    for (let i = 0; i < words.length; i++) {
      splitLetters(words[i]);
    }

    function changeWord() {
      let cw = wordArray[currentWordIndex];
      let nw: any =
        currentWordIndex == words.length - 1
          ? wordArray[0]
          : wordArray[currentWordIndex + 1];
      for (let i = 0; i < cw.length; i++) {
        animateLetterOut(cw, i);
      }

      for (let i = 0; i < nw.length; i++) {
        nw[i].className = "letter behind";
        nw[0].parentElement.style.opacity = 1;
        animateLetterIn(nw, i);
      }

      currentWordIndex =
        currentWordIndex == wordArray.length - 1 ? 0 : currentWordIndex + 1;
      return currentWordIndex;
    }

    function animateLetterOut(cw: any, i: any) {
      setTimeout(function () {
        cw[i].className = "letter out";
      }, i * 80);
    }

    function animateLetterIn(nw: any, i: any) {
      setTimeout(function () {
        nw[i].className = "letter in";
      }, 340 + i * 80);
    }

    function splitLetters(word: any) {
      let content = word.innerHTML;
      word.innerHTML = "";
      let letters = [];
      for (let i = 0; i < content.length; i++) {
        let letter = document.createElement("span");
        letter.className = "letter";
        letter.innerHTML = content.charAt(i);
        word.appendChild(letter);
        letters.push(letter);
      }

      wordArray.push(letters);
    }

    // const interval = changeWord(wordArray, words);
    const interval = setInterval(changeWord, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { messages, wordRef };
};
