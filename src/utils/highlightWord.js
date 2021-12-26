function highlightWord(word, input) {
    const indexOfText = word?.toLowerCase().indexOf(input?.toLowerCase())
    const lengthOfText = input?.length
    const pieceOfWord = word?.substring(indexOfText, indexOfText + lengthOfText)
    const regex = new RegExp(input, "i")

    return word?.replace(regex, `<span class="highlight">${pieceOfWord}</span>`)
}

export default highlightWord