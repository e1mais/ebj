// This are the special characters that we want to remove from the text
export const SPECIAL_CHARACTERS = /(\[\w\])|(\[\w\w\])|([^\w\sáéíóúñü])/gi

// This are the point characters that we want to escape from the text
export const ESCAPED_CHARACTERS = /[\t|\r|\n]/g
