const User = require('../model/usersModel');

module.exports.getTasks = async (req , res) => {
    const { task } = req.params;
    const { _id } = req.user;
    
    User.findOne({ _id }, { tasks: 1})
    .then(result => {
        if (result) {
            res.status(200).json(result.tasks.filter(e => task === e.classification))
        }
    })
    .catch(err => console.log(err))
}

module.exports.getAllTasks = async (req , res) => {
    const { _id } = req.user;
    
    User.findOne({ _id }, { tasks: 1})
    .then(result => {
        res.status(200).json(result.tasks)
    })
    .catch(err => console.log(err))
}

module.exports.getAllTasksToday = async (req , res) => {
    const { _id } = req.user;
    
    User.findOne({ _id }, { tasks: 1})
    .then(result => {
        if (result) {
            res.status(200).json(result.tasks.filter(e => new Date().toDateString() === new Date(e.date).toDateString()))
        }
    })
    .catch(err => console.log(err))
}

module.exports.createTask = async (req, res) => {
    const { _id } = req.user;
    const { classification, title, date, state } = req.body;

    User.updateOne({ _id }, {$push: {
        "tasks": {
            classification,
            title,
            state,
            date: new Date(date),
            id: new Date().getTime()
        }}
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))

}

module.exports.deleteTask = async (req, res) => {
    const { _id } = req.user;
    const { taskId } = req.params;

    User.updateOne({ _id }, { $pull: {
        "tasks" : { id: +taskId }
    }})
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))
}

module.exports.updateStateTask = async (req, res) => {
    const { _id } = req.user;
    const { id, state } = req.body;

    User.updateOne({ _id, 'tasks.id': id }, {$set: {"tasks.$.state": state}})
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))
}