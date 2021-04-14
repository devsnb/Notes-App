const chalk = require('chalk')
// const { command, describe } = require('yargs')
const yargs = require('yargs')
const notes = require('./notes')

// customize yargs version
yargs.version('1.1.0')

// create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      description: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body)
  }
})

// create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.removeNote(argv.title)
  }
})

// create list command
yargs.command({
  command: 'list',
  describe: 'List out all notes',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler() {
    notes.listNotes();
  }
})

// create read command
yargs.command({
  command: 'read',
  describe: 'See a single note',
  handler(argv) {
    notes.readNote(argv.title)
  }
})

yargs.parse()