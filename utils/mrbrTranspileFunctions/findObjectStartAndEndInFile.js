exports.findStartAndEndInFile = (stringContents, startIndex = 0) => {
    let log = function (value) { }
    //let log = (value) => console.log(value)

    const
        blockTypes = {
            none: "none",
            quoted: "quoted",
            commented: "commented"
        },
        blockValues = {
            commentStart: "/",
            blockCommentSecondChar: "*",
            blockCommentStart: "/*",
            blockCommentEnd: "*/",
            singleLineComment: "//",
            braceStart: "{",
            braceEnd: "}",
            none: "",
            carriageReturn: "\r",
            newLine: "\n",
            lineEnds: ["\r\n", "\n\r"],
            quotesTypes: ["`", "'", '"']
        };
    let currentBlockType = blockTypes.none,
        stringLength = stringContents.length,
        counter = startIndex,
        currentOpeningBlock = "",
        level = 0,
        currentChar = "",
        startFound = false,
        startFoundPosition = 0;
    while ((counter < stringLength) && (startFound === false || (startFound === true && level > 0))) {
        currentChar = stringContents.substring(counter, counter + 1);
        if (currentBlockType === blockTypes.none && blockValues.quotesTypes.includes(currentChar)) {
            log("Quote Start")
            currentOpeningBlock = currentChar;
            currentBlockType = blockTypes.quoted;
            level++;
        }
        else if (currentBlockType === blockTypes.quoted && currentOpeningBlock === currentChar) {
            log("Quote End")
            currentOpeningBlock = "";
            currentBlockType = blockTypes.none;
            level--;
        }
        else if (currentBlockType === blockTypes.none && currentChar === blockValues.commentStart && stringContents.substring(counter, counter + 2) === blockValues.blockCommentStart) {
            log("Block Comment Start")
            level++;
            currentOpeningBlock = blockValues.blockCommentStart;
            counter++;
            currentBlockType = blockTypes.commented;
        }
        else if (currentBlockType === blockTypes.commented && currentChar === blockValues.blockCommentSecondChar && stringContents.substring(counter, counter + 2) === blockValues.blockCommentEnd && currentOpeningBlock === blockValues.blockCommentStart) {
            log("Block Comment End")
            level--;
            currentOpeningBlock = blockValues.none
            counter++;
            currentBlockType = blockTypes.none;
        }
        else if (currentBlockType === blockTypes.none && currentChar === blockValues.commentStart && stringContents.substring(counter, counter + 2) === blockValues.singleLineComment) {
            log("Single Comment Start")
            level++;
            currentOpeningBlock = blockValues.singleLineComment;
            counter++;
            currentBlockType = blockTypes.commented;
        }
        else if (currentBlockType === blockTypes.commented && (currentOpeningBlock === blockValues.singleLineComment) && (currentChar === blockValues.carriageReturn || currentChar === blockValues.newLine)) {
            log("Single Comment End")
            let increaseIndex = 0;
            if (blockValues.lineEnds.includes(stringContents.substring(counter, counter + 2))) {
                increaseIndex++;
            }
            level--;
            currentOpeningBlock = blockValues.none;
            currentBlockType = blockTypes.none
            counter += increaseIndex;
        }

        else if (currentBlockType === blockTypes.none && currentChar === blockValues.braceStart) {
            log("Brace Start");
            level++;
            if (!startFound) { startFoundPosition = counter; }
            startFound = true;
        }
        else if (currentBlockType === blockTypes.none && currentChar == blockValues.braceEnd) {
            level--
            log("Brace End")
        }
        else {
            log("Text Only")
        }
        counter++;
    }
    return { startFoundPosition: startFoundPosition, endPosition: counter, level: level }
}