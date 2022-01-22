export class RandomCharacterAnimation {
  options: any;
  kerningSize: any;
  size: any;
  getLettersArray: any;
  getLettersChanges: any;
  currentChange: any;
  char: any;
  charArray: any;
  requestId: any;
  defaults: any;

  constructor(options: any) {
    this.defaults = {
      d_element: "",
      d_type: "char",
      d_min: 10,
      d_max: 100,
      d_kerning: 10,
    };

    this.options = options;
    this.getLettersArray = [];
    this.getLettersChanges = [];
    this.kerningSize = [];
    this.currentChange = 0;
    this.char =
      "abcdefghijklmnopqrstuvwxyz0123456789!?*()@£$%^&_-+=[]{}:;'\"\\|<>,./~`×";
    this.charArray = [];

    // Create options by extending defaults with the passed in arguments
    if (arguments[0] && typeof arguments[0] === "object") {
      this.options = this._extendDefaults(this.defaults, arguments[0]);
    }
  }

  /**
   * @function _extendDefaults
   * @description set defaults parameters if undefined
   * @param source 		| get defaults parameters
   * @param properties | choose & set the defaults
   * @private
   *
   */
  _extendDefaults = (source: any[], properties: any) => {
    let property: any;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  };

  // Private functions

  /**
   * @function _random
   * @description generate a random number
   * @param minNb & maxNb    | allows to generate the number between 20 and 50 for example
   * @param maxNb
   * @private
   */
  _random = (minNb: any, maxNb: any) => {
    return Math.floor(Math.random() * (maxNb - minNb) + minNb);
  };

  /**
   * @function _getElementSize
   * @description get the length of the DOM element and push in an array
   * @private
   */
  _getElementSize = () => {
    let i;
    let thisLetter;
    let element_selected = document.querySelector(
      this.options.d_element
    ).textContent;

    for (i in element_selected) {
      thisLetter = element_selected[i];
      this.getLettersArray.push(thisLetter);
    }
    return this.getLettersArray;
  };

  /**
   * @function _setStructure
   * @description display a span for every letter that will allow the animation
   * @private
   */
  _setStructure = () => {
    let element = document.querySelector(this.options.d_element);
    element.innerHTML = "";

    let i, characterContainer, array;

    for (i in this.getLettersArray) {
      characterContainer = document.createElement("span");
      array = this.getLettersArray[i];

      // display a whitespace
      if (array === " ") {
        characterContainer.innerHTML = "&nbsp";
      }

      characterContainer.classList.add("randomCharacter");
      element.appendChild(characterContainer);

      let letter = document.createTextNode(array);

      characterContainer.appendChild(letter);
      characterContainer.style.opacity = "0";
    }
  };

  /**
   * @function _setKerning
   * @description adapt the letter spacing
   * @description very useful if you're not using a monospace font
   * @description don't try to delete this function
   * @description except if you want new eyes
   * @private
   */
  _setKerning = () => {
    let kerning = this.options.d_kerning;
    let elem = document.querySelector(this.options.d_element);

    let i, j, thisContainer, kerningSize;

    for (i = 0; i < this.getLettersArray.length; i++) {
      j = i + 1; //hack
      thisContainer = elem.querySelector(
        ".randomCharacter:nth-child(" + j + ")"
      );
      thisContainer.style.padding =
        "0" + Math.sqrt(kerning) / thisContainer.offsetWidth + "px";
      kerningSize = thisContainer.offsetWidth;
      this.kerningSize.push(kerningSize);
      thisContainer.style.width = kerningSize + "px";
    }
  };

  /**
   * @function _convertStringToArray
   * @description transform every string to an array
   * @description useful if you want to use your own character to generate the animation
   * @private
   */
  _convertStringToArray = () => {
    let i, thisChar;
    for (i = 0; i < this.char.length; i++) {
      thisChar = this.char[i];
      this.charArray.push(thisChar);
    }
  };

  /**
   * @function _setChange
   * @description set when each letter will change until the end of the animation
   * @private
   */
  _setChange = () => {
    let i;
    let setChange;

    for (i in this.getLettersArray) {
      setChange = this._random(this.options.d_min, this.options.d_max);
      this.getLettersChanges.push(setChange);
    }
  };

  /**
   * @function _generateRandomCharacter
   * @description the core of the animation
   * @description generate a new character randomly
   * @description everytime the function is called
   * @private
   */
  _generateRandomCharacter = (d_type: string) => {
    let charType = d_type;
    let elem = document.querySelector(this.options.d_element);
    this.currentChange++;

    let chooseRandomLetter = this._random(0, this.getLettersArray.length);
    let generateContent;
    let getChar;
    let changesPlaces = elem.querySelector(
      ".randomCharacter:nth-child(" + (chooseRandomLetter + 1) + ")"
    );

    if (charType === "int") {
      generateContent = this._random(0, 9);
    } else if (charType === "char") {
      getChar = this._random(0, this.charArray.length);
      generateContent = this.charArray[getChar];
    } else {
      getChar = this._random(0, charType.length);
      generateContent = charType[getChar];
    }

    changesPlaces.innerHTML = generateContent;
    changesPlaces.style.opacity = "1";
    elem.style.opacity = "1";
  };

  /**
   * @function _checkNbChanges
   * @description check the current number of changes
   * @description everytime the function is called
   * @description and display the original letter asap.
   * @private
   */
  _checkNbChanges = () => {
    let i;
    let j;
    let thisChar;
    let setContent;
    let thisContainer;
    let elem = document.querySelector(this.options.d_element);

    for (i = 0; i < this.getLettersArray.length; i++) {
      j = i + 1;
      thisChar = this.getLettersChanges[i];
      thisContainer = elem.querySelector(
        ".randomCharacter:nth-child(" + j + ")"
      );
      setContent = this.getLettersArray[i];

      if (this.currentChange > thisChar) {
        thisContainer.innerHTML = setContent;
      }
    }
  };

  /**
   * @function _loop
   * @description requestAnimationFrame
   * @private
   */
  _loop = () => {
    this.requestId = requestAnimationFrame(() => {
      this._loop();

      if (this.currentChange > this.options.d_max) {
        this.stop();
      }
    });

    this._generateRandomCharacter(this.options.d_type);
    this._checkNbChanges();
  };

  /* Public functions */

  /**
   * @function restart
   * @description allows to restart the animation.
   * @description useful for hover or else
   * @default        | false
   * @public
   *
   */
  restart = () => {
    this.currentChange = 0;
    this._setChange();
    this._loop();
  };

  /**
   * @function start
   * @description trigger the animation
   * @public
   */
  start = () => {
    this._getElementSize();
    this._setStructure();
    this._setKerning();
    this._setChange();
    this._convertStringToArray();
    this._loop();
  };

  /**
   * @function stop
   * @description stop the requestAnimaionFrame #notEnoughObvious ♫ ♫
   * @public
   */
  stop = () => {
    window.cancelAnimationFrame(this.requestId);
  };
}
