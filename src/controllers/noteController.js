const database = require('../../models');
const Note = database.Note;

const noteController = {
    index: async (req, res) => {
        try{
            let notes = [] ;

            if (req.query.sort == "asc"){
                notes = await Note.findAll({
                    where: {
                        userId: req.user.id
                    },
                    order: [
                        ['id']
                    ],
                });
            }
            else{
                notes = await Note.findAll({
                    where: {
                        userId: req.user.id
                    },
                    order: [
                        ['id', 'DESC']
                    ],
                });
            }
    
            res.status(200).send(notes);
        } catch (error){
            res.status(500).send(error);
        }
    },
    show: async (req, res) => {
        if (await checkRecord(req.user.id, req.params.id)){
            try{
                const note = await Note.findOne({
                    where: {
                        id: req.params.id
                    }
                });
    
                if (note){
                    res.status(200).send(note);
                }
                else{
                    res.status(404).send({error: "Note tidak ditemukan !"});
                }
                
            } catch (error){
                res.status(500).send(error);
            }
        }
        else{
            res.status(403).send({error: "Anda tidak berhak mengakses Note ini !"});
        }
    },
    create: async (req, res) => {
        if (req.body.title.toString().length > 0 && req.body.body.toString().length > 0){
            try{
                const note = Note.build(req.body);
                note.userId = req.user.id;
                await note.save();

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
        if (await checkRecord(req.user.id, req.params.id)){
            try{
                const update = await Note.update(req.body, {
                    where: {
                        id: req.params.id,
                        userId: req.user.id
                    }
                });
    
                const note = await Note.findOne({
                    where: {
                        id: req.params.id
                    }
                });
                
                
                if (note){
                    res.status(200).send(note);
                }
                else{
                    res.status(200).send({error: 'Note tidak ditemukan !'});
                }
    
            } catch(error){
                res.status(500).send(error);
            }
        }
        else{
            res.status(403).send({error: "Anda tidak berhak mengakses Note ini !"});
        }
    },
    destroy: async (req, res) => {
        if (await checkRecord(req.user.id, req.params.id)){
            try{
                const note = await Note.destroy({
                    where: {
                        id: req.params.id
                    }
                });
    
                if (note){
                    res.status(200).send({message: 'Note berhasil dihapus !'});
                }
                else{
                    res.status(404).send({error: 'Note tidak ditemukan !'});
                }
            } catch(error){
                res.status(500).send(error);
            }
        }
        else{
            res.status(403).send({error: "Anda tidak berhak mengakses Note ini !"});
        }
    }
}

const checkRecord = async (userId, noteId) => {
    const note = await Note.findOne({
        where: {
            id: noteId
        }
    });

    if (note){
        return (userId === note.userId);
    } else{
        return false;
    }
    
}

module.exports = noteController;