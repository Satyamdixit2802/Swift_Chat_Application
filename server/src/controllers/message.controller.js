import MessageModel from '../models/message.model.js'

const getMessage = async (req, res) => {
    try {
        const message = await MessageModel.find().sort({createdAt : -1});
        res.status(200).join(message)
        
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch messages" });
  }
    }


    const createMessage = async (req,res) => {
        try {
            const {username, text} = req.body();
            if(!username || !text){
                return res.status(400).json({
                    error : "Username and text are required"
                })
            }
            const message = await MessageModel.create({username,text});
            res.status(201).json(message);

        }catch(error){
           res.status(500).json({ error: "Failed to save message" });
        }
    }

    export {getMessage, createMessage}