import fs from 'node:fs/promises'
import { SPECIAL_CHARACTERS, ESCAPED_CHARACTERS } from './utils.js'

const args = process.argv.slice(2)

if (args.length === 0) {
  console.error('No arguments provided')
  process.exit(1)
}

const [fileName] = args

/**
 * This functions return the content of the file text named Lucas.txt
 * @returns {Promise<string>} - The content of the file
 */
const readfile = async () => {
  return await fs.readFile(`${fileName}.txt`, 'utf-8')
}
/**
 * This function deletes special characters from a text
 * @param {string} text - The text to delete special characters
 * @returns {string}    - The text without special characters
 */
const deleteSpecialCharacters = (text) => {
  return text.replace(SPECIAL_CHARACTERS, '').replace(ESCAPED_CHARACTERS, ' ')
}
/**
 * This function return an Array of Keywords; keywords are words that are non repeated in the text, just once
 * @param {string} text - The text to get the keywords
 * @returns {Array<string>} - An Array of keywords from the text
 */
const keywords = (text) => {
  const words = text.toLowerCase().split(' ')
  // This are all words in the text, without repeated words
  const allWords = [...new Set(words)]
  // Filter the words that are non repeated
  const nonRepeatedWords = allWords.filter((word) => {
    const isNumber = !isNaN(Number(word))
    return words.filter((w) => w === word && !isNumber).length === 1
  })
  return nonRepeatedWords
}
/**
 * This function writes the keywords in a file named keywords.txt
 * @param {Array<string>} keywords - The Array of keywords to write in a file
 * @returns {void} - This function writes the keywords in a file named keywords.txt
 */
const writeKeywords = async (keywords) => {
  return await fs.writeFile('keywords.txt', generateKeywordsFormat(keywords))
}
/**
 *
 * @param {Array<string>} keywords
 */
const generateKeywordsFormat = (keywords) => {
  const COLUMNS = 5
  let format = '# Palabras clave del Libro de Lucas\n\n\tCantidad de palabras clave: ' + keywords.length + '\n\n'
  keywords.forEach((keyword, index) => {
    if (index % COLUMNS === 0) {
      format += '\n'
    }
    format += keyword + ' '.repeat(20 - keyword.length)
  })
  return format
}

// Self invoking function
;(() => {
  readfile()
    .then((text) =>

      console.log(keywords(deleteSpecialCharacters(text))))
    .catch((err) => console.error(err))
})()
