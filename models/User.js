
//User Schema
const userSchema = ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now
    },
    id: {
        type: Number,
        required: true
    },
    sites: {
        type: String
    }
});