const { User, Book } = require('../models');
const { userSignIn } = require('../utils/auth')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                return userData
            }
            console.log('user auth failed')
        },
        matchups: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return Matchup.find(params);
        },
    },
    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args)

            const authToken = userSignIn(user)
            return { user, authToken };
        },
        logIn: async (parent, { email, password }) => {
            const user = await User.findOne({ email })
            if (!user) {
                console.log("error: invalid email")
            }
            const checkPassword = await user.isCorrectPassword(password)
            if (!checkPassword) {
                console.log("invalid password")
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
            console.log("user logged in")
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
            console.log("user logged in")
        }

    },
};

module.exports = resolvers;
