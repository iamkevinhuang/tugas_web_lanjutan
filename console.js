// For Development Purpose Only
const database = require('./models');
const Note = database.Note;

const createNote = async () => {
    const note = await Note.build({title: 'Tes', body: 'Tes'});
    note.userId = 1;
    note.save();
    console.log(note);
}

const allNotes = async () => {
    const notes = await Note.findAll();
    console.log(notes);
}

allNotes();