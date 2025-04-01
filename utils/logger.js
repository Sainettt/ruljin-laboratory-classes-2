// 🔄 Refactoro the Changer
// Przenieś teraz odpowiednie wywołania logów z routing.js i zastąp tam logowanie bezpośrednie wywołaniem tych funkcji.

const getInfoLog = (url, method) => {
  return `INFO (${new Date().toUTCString()}): ${method} - ${url}`
}

const getErrorLog = (url) => {
  return `ERROR (${new Date().toUTCString()}): requested url ${url} doesn't exist.`
}

const getProcessLog = (message) => {
  return `PROCESS (${new Date().toUTCString()}): ${message}`
}

module.exports = {
  getInfoLog,
  getErrorLog,
  getProcessLog,
}
