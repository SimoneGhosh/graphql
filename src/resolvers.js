
// Data
const users = [
    { id: '1', email: 'abc@gmail.com', gender: 'FEMALE' },
    { id: '2', email: 'def@gmail.com', gender: 'MALE' }
];

const addresses = [
    {   id: '1', street: '123 Main St', 
        city: 'Anytown', 
        zip: '12345', 
        landmark: 'Near Park',
        __typename: 'HomeAddress' // __typename is used to specify the type of address for the interface
    },
    {   id: '2', 
        street: '456 Elm St', 
        city: 'Othertown', 
        zip: '67890', 
        companyName: 'Tech Corp',
        __typename: 'OfficeAddress' // __typename is used to specify the type of address for the interface
    }
];

let userIdCounter = 3;

//Resolvers
const resolvers = {
    Query: {
        user: (_, args) => {
            return users.find((u) => u.id === args.id);
        },
        users: () => users,
        addresses: () => addresses,
        searchAddresses: () => addresses,
    },

    Mutation: {
        createUser: ( _, { input }) => {

            const { email, password, gender } = input;

            const newUser = { 
                id: userIdCounter++,
                email,
                gender, 
            };
            users.push(newUser);
            return newUser;
        },

        updateUser: ( _, { input }) => {
            const user = users.find((u) => u.id === input.id);
            if (!user) {
                throw new Error('User not found');
            }

            if (input.email) {
                user.email = input.email;
            }

            return user;    
        },

        deleteUser: ( _, { id }) => {
            const index = users.findIndex((u) => u.id === id);
            if (index === -1) {
                throw new Error('User not found');
            }
            users.splice(index, 1);
            return true;
        },
    },
};

module.exports = resolvers;