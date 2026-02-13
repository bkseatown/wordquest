// Simple translation system that uses your existing multilingual word data
window.TRANSLATIONS = {
    getTranslation: function(word, langCode = 'en') {
        const source = (typeof WORDS_DATA !== 'undefined') ? WORDS_DATA : null;
        const wordData = source && source[word.toLowerCase()];
        if (!wordData || !wordData[langCode]) return null;

        return {
            word: wordData[langCode].word || wordData[langCode].label || '',
            definition: wordData[langCode].def || '',
            sentence: wordData[langCode].sentence || ''
        };
    }
};

console.log('✓ Translation system ready');
