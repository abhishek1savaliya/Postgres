const db = require('../model/index');

const Users = db.users;

const addUser = async (req, res) => {
    try {
        // Create a new user instance

        // const newUser = await Users.build({
        //     name: "abhishek Savaliya",
        //     email: 'test2@gmail.com',
        //     gender: 'male'
        // });

        // await newUser.save()

        const newUser = await Users.create({
            name: "abhishek Savaliya",
            email: 'test2@gmail.com',
            gender: 'male'
        });

        let response = {
            data: 'ok',
            user: newUser
        };

        res.status(201).json(response);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json(error);
    }
};

module.exports = {
    addUser
};
