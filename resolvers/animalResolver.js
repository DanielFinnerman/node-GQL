import Animal from '../models/animal.js';
import {AuthenticationError} from 'apollo-server-express';

export default {
    Query: {
        animals: (parent, args) => {
            return Animal.find();
        },
        animal: (parent, args) => {
            return Animal.findById(args.id);
        },
    },
    Mutation: {
        addAnimal: (parent, args, {user}) => {
            console.log('animalResolver, addAnimal', args, user);
            if (!user) {
                throw new AuthenticationError('You are not authenticated');
            }
            const newAnimal = new Animal(args);
            return newAnimal.save();
        },
        modifyAnimal: (parent, args) => {
            console.log('animalResolver, modifyAnimal', args);
            return Animal.findByIdAndUpdate(args.id, args);
        },
    },
};