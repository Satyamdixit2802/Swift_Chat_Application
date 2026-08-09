import  mongoose , {Schema} from 'mongoose'

const messageSchema = new Schema({

    username : {
        type : String,
        required : true,

    },
    text : {
        type : String,
        required : true,

    },
},{timestamps : true})

const MessageModel = mongoose.model('MessageModel',messageSchema)
export default MessageModel