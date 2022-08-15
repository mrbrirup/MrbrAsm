exports.tokeniseTextBlocks = (stringContents, startIndex = 0) => {
    let log = function (value) { }
    //let log = (value) => console.log(value)
    //return `###${stringContents.substring(31,71)}###`
    const tokens = [];
    const braces = [];
    const
        blockTypes = {
            none: "none",
            quoted: "quoted",
            commented: "commented",
            text: "text",
            error: "error"
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
    function textBlock(position, index) {
        if (position === "start" && currentBlockType === blockTypes.none) {
            tokens.push({ tokenPosition: "start", tokenCharacter: "", level: level, index: index, blockType: "text" })
            currentBlockType = blockTypes.text;
        }
        else if (position === "end" && currentBlockType === blockTypes.text) {
            tokens.push({ tokenPosition: "end", tokenCharacter: "", level: level, index: index, blockType: "text" })
        }
    }
    while (counter < stringLength) {
        currentChar = stringContents.substring(counter, counter + 1);
        if ((currentBlockType === blockTypes.none || currentBlockType === blockTypes.text) && blockValues.quotesTypes.includes(currentChar)) {
            log("Quote Start")
            textBlock("end", counter - 1);
            currentOpeningBlock = currentChar;
            currentBlockType = blockTypes.quoted;
            level++;
            tokens.push({ tokenPosition: "start", tokenCharacter: currentOpeningBlock, level: level, index: counter, blockType: currentBlockType })
        }
        else if (currentBlockType === blockTypes.quoted && currentOpeningBlock === currentChar) {
            log("Quote End")
            const lastOpeningChar = currentOpeningBlock,
                lastBlockType = currentBlockType;

            currentOpeningBlock = "";
            currentBlockType = blockTypes.none;
            tokens.push({ tokenPosition: "end", tokenCharacter: lastOpeningChar, level: level, index: counter, blockType: lastBlockType })
            level--;
        }
        else if ((currentBlockType === blockTypes.none || currentBlockType === blockTypes.text) && currentChar === blockValues.commentStart && stringContents.substring(counter, counter + 2) === blockValues.blockCommentStart) {
            log("Block Comment Start")
            textBlock("end", counter - 1);
            currentOpeningBlock = blockValues.blockCommentStart;
            level++;
            currentBlockType = blockTypes.commented;
            tokens.push({ tokenPosition: "start", tokenCharacter: currentOpeningBlock, level: level, index: counter, blockType: currentBlockType })
            counter++;
            counter++;
        }
        else if (currentBlockType === blockTypes.commented && currentChar === blockValues.blockCommentSecondChar && stringContents.substring(counter, counter + 2) === blockValues.blockCommentEnd && currentOpeningBlock === blockValues.blockCommentStart) {
            log("Block Comment End")

            const lastOpeningChar = currentOpeningBlock,
                lastBlockType = currentBlockType;
            tokens.push({ tokenPosition: "end", tokenCharacter: lastOpeningChar, level: level, index: counter, blockType: lastBlockType })
            level--;
            currentOpeningBlock = blockValues.none
            counter++;
            currentBlockType = blockTypes.none;
        }
        else if ((currentBlockType === blockTypes.none || currentBlockType === blockTypes.text) && currentChar === blockValues.commentStart && stringContents.substring(counter, counter + 2) === blockValues.singleLineComment) {
            log("Single Comment Start")
            textBlock("end", counter - 1);
            level++;
            currentBlockType = blockTypes.commented;
            currentOpeningBlock = blockValues.singleLineComment;
            tokens.push({ tokenPosition: "start", tokenCharacter: currentOpeningBlock, level: level, index: counter, blockType: currentBlockType })
            counter++;
            while (stringContents.substring(counter, counter + 1) === blockValues.commentStart) {
                counter++;
            }
        }
        else if (currentBlockType === blockTypes.commented && (currentOpeningBlock === blockValues.singleLineComment) && (currentChar === blockValues.carriageReturn || currentChar === blockValues.newLine)) {
            log("Single Comment End")
            let increaseIndex = 0;
            if (blockValues.lineEnds.includes(stringContents.substring(counter, counter + 2))) {
                increaseIndex++;
            }


            const lastOpeningChar = currentOpeningBlock,
                lastBlockType = currentBlockType;
            tokens.push({ tokenPosition: "end", tokenCharacter: lastOpeningChar, level: level, index: counter + increaseIndex, blockType: lastBlockType })

            level--;
            currentOpeningBlock = blockValues.none;
            currentBlockType = blockTypes.none
            counter += increaseIndex;
        }

        else if ((currentBlockType === blockTypes.none || currentBlockType === blockTypes.text) && currentChar === blockValues.braceStart) {
            log("Brace Start");
            level++;
            braces.push({ braceType: "start", level: level, position: counter })
            //if (!startFound) { startFoundPosition = counter; }
            //startFound = true;
        }
        else if ((currentBlockType === blockTypes.none || currentBlockType === blockTypes.text) && currentChar == blockValues.braceEnd) {
            braces.push({ braceType: "end", level: level, position: counter })
            level--
            log("Brace End")
        }
        else {
            textBlock("start", counter);
            log("Text Only")
        }
        counter++;
    }
    if (currentBlockType === blockTypes.text) {
        textBlock("end", counter)
    }
    else if (currentBlockType === blockTypes.commented && (currentOpeningBlock === blockValues.singleLineComment)) {
        const lastOpeningChar = currentOpeningBlock,
            lastBlockType = currentBlockType;
        tokens.push({ tokenPosition: "end", tokenCharacter: lastOpeningChar, level: level, index: counter, blockType: lastBlockType })
    }
    else if (currentBlockType !== blockTypes.none) {
        tokens.push({ tokenPosition: "end", tokenCharacter: "", level: level, index: counter, blockType: blockTypes.error })
    }
    return { tokens: tokens, braces: braces }
}