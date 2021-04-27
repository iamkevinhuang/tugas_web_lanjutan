const database = require('../../models');
const Note = database.Note;

const noteController = {
    index: async (req, res) => {
        try{
            const notes = await Note.findAll({
                where: {
                    userId: req.user.id
                }
            });
    
            res.status(200).send(notes);
        } catch (error){
            res.status(500).send(error);
        }
    },
    show: async (req, res) => {
        try{
            const note = await Note.findOne({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).send(note);
        } catch (error){
            res.status(500).send(error);
        }
    },
    create: async (req, res) => {
        if (req.body.title.toString().length > 0 && req.body.body.toString().length > 0){
            try{
                const note = await Note.build(req.body);
                note.userId = req.user.id;
                note.save();

                res.status(201).send(note);
            } catch(error){
                res.status(500).send(error);
            }
        }
        else{
            return res.status(422).send({error: "Judul dan Isi wajib di isi !"});
        }
    },
    update: async (req, res) => {
        try{
            const note = await Note.update(req.body, {
                where: {
                    id: req.params.id,
                    userId: req.user.id
                }
            });
            
            if (note){
                res.status(204).send(note);
            }
            else{
                res.status(204).send({error: 'Note tidak ditemukan !'});
            }

        } catch(error){
            res.status(500).send(error);
        }
        
    },
    destroy: async (req, res) => {
        try{
            Note.destroy({
                where: {
                    id: req.body.id
                }
            });
            res.status(204).send({message: 'Note berhasil dihapus !'});
        } catch(error){
            res.status(500).send(error);
        }
    }

}

module.exports = noteController;