const { User, Book } = require('../models');
const { userSignIn } = require('../utils/auth')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                return userData
            }
            console.log('Error: User authentication failed.')
        },

    },
    Mutation: {

        getSingleUser: async (parent, args, context) => {

            const user = await User.findOne({ _id: context.user._id })
            if (!user) {
                console.log('Error: Unable to find user.')
            }
            const authToken = userSignIn(user)
            return { user, authToken }
        },

        createUser: async (parent, args) => {
            const user = await User.create(args)

            const authToken = userSignIn(user)
            return { user, authToken };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email })
            if (!user) {
                console.log("Error: Invalid user email.")
            }
            const checkPassword = await user.isCorrectPassword(password)
            if (!checkPassword) {
                console.log("Error: Invalid password.")
            }

            const authToken = userSignIn(user)
            return { user, authToken };
        },
        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const updatedUserInfo = await User.findByIdAndUpdate(
                    { _id: context.user.id },
                    { $push: { savedBooks: bookData } },
                    { new: true }

                )
                return updatedUserInfo
            }
            console.log("Logged in!")
        },

        deleteBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUserInfo = await User.findByIdAndUpdate(
                    { _id: context.user.id },
                    { $pull: { savedBooks: bookId } },
                    { new: true }

                )
                return updatedUserInfo
            }
            console.log("Logged in!")
        }

    },
};

module.exports = resolvers;
