const chalk = require('chalk')
const fs = require('fs')

const getNotes = () => 'Your notes...'

const addNote = (title, body) => {
  const notes = loadNotes()

  const duplicateNote = notes.find((note) => note.title === title)

  if (!duplicateNote) {
    notes.push({
      title,
      body
    })
    saveNotes(notes)
    console.log(chalk.bgGreen.black('New note added!'))
  } else {
    console.log(chalk.bgRed('Note title taken!'))
  }
}

const removeNote = (title) => {
  const notes = loadNotes()

  const found = notes.find((note) => {
    return note.title == title
  })

  if (found && notes.length !== 0) {
    const notesToKeep = notes.filter((note) => {
      return note.title !== title
    })
    saveNotes(notesToKeep)
    console.log(chalk.bgGreen.black('Note Removed'))
  } else {
    console.log(chalk.bgRed('No note found!'))
  }
}

const listNotes = () => {
  const notes = loadNotes()
  if(notes.length === 0) {
    console.log(chalk.bgRed('No notes found!'))
  } else {
    console.log(chalk.bgGreen.black('Your notes:'))
    notes.forEach((note, index) => {
      console.log(`${index + 1}. ${note.title}`)
    });
  }
}

const readNote = (title) => {
  const notes = loadNotes()

  const foundNote = notes.find((note) => note.title === title)

  if (foundNote) {
    console.log(chalk.black.bgGreen('Your note:'))
    console.log(`Title: ${foundNote.title}`)
    console.log(`Body: ${foundNote.body}`)
  } else {
    console.log(chalk.bgRed('Your note could not be found'))
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try{
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch(err) {
      return []
  }  
}

module.exports = {
  getNotes,
  addNote,
  removeNote,
  listNotes,
  readNote
}