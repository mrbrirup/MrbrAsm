export class Mrbr_Compression_LZW {
    lzwEncode(text: string) {
        const dictionary = new Map<string, number>(),
            phraseEntries = [],
            eightBitChar = 256,
            textLength = text.length;
        let phrase = text.charAt(0),
            code = eightBitChar;
        for (let textCounter = 1; textCounter < textLength; textCounter++) {
            const currentCharacter = text.charAt(textCounter),
                phraseAndCurrentChar = phrase + currentCharacter;
            if (dictionary.get(phraseAndCurrentChar)) {
                phrase += currentCharacter;
                continue;
            }
            phraseEntries.push(phrase.length > 1 ? dictionary.get(phrase) : phrase.charCodeAt(0));
            dictionary.set(phraseAndCurrentChar, code);
            code++;
            phrase = currentCharacter;
        }
        phraseEntries.push(phrase.length > 1 ? dictionary.get(phrase) : phrase.charCodeAt(0));
        return phraseEntries.map(entry => String.fromCharCode(entry)).reduce((prevous, current) => prevous + current);
    }
    lzwDecode(text: string) {
        const dictionary = new Map<number, string>(),
            eightBitChar = 256,
            textLength = text.length;
        let currentCharacter = text.charAt(0),
            lastPhrase = currentCharacter,
            phraseEntries = [currentCharacter],
            code = eightBitChar,
            phrase;
        for (let textCounter = 1; textCounter < textLength; textCounter++) {
            const currentCode = text.charCodeAt(textCounter);
            let currentDictionaryEntry = dictionary.get(currentCode);
            phrase = (currentCode < eightBitChar) ? text.charAt(textCounter) : currentDictionaryEntry ? currentDictionaryEntry : (lastPhrase + currentCharacter);
            phraseEntries.push(phrase);
            currentCharacter = phrase.charAt(0);
            dictionary.set(code, lastPhrase + currentCharacter);
            code++;
            lastPhrase = phrase;
        }
        return phraseEntries.reduce((prevous, current) => prevous + current);
    }
}