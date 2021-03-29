const animalData = [
    {
        id: '1',
        animalName: 'Frank',
        species: '1',
    },
];

export default {
    Query: {
        animals: (parent, args) => {
            return animalData;
        },
    },
};