const mongoose = require('mongoose');
const { descriptors, places } = require('./seedHelpers');
const cities = require('./cities');
const yelpcamp = require('../models/campground');
main().then(() => {
    console.log('connected');
})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
}
const titlemaker = (array) => {
    return `${array[Math.floor(Math.random() * array.length)]}`;
}
const seedDB = async () => {

    await yelpcamp.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const price =Math.floor(Math.random()*20 +10);
        const random1000 = new yelpcamp({
            author:"617956071eec5786234b6159",
            title: `${titlemaker(descriptors)} ${titlemaker(places)}`,
            location: `${cities[Math.floor(Math.random() * 1000)].city} ${cities[Math.floor(Math.random() * 1000)].state}`,
            image: [
                {
                  url: 'https://res.cloudinary.com/aniket52648/image/upload/v1637066443/op4o6tsjjhdcswhgom8k.jpg',
                  filename: 'op4o6tsjjhdcswhgom8k',
                 
                },
                {
                  url: 'https://res.cloudinary.com/aniket52648/image/upload/v1637066479/vuryyidzx6rqh8ekx8nk.jpg',
                  filename: 'vuryyidzx6rqh8ekx8nk',
                 
                },
                {
                  url: 'https://res.cloudinary.com/aniket52648/image/upload/v1637066500/asclqwjgl33gqk2ut05k.jpg',
                  filename: 'asclqwjgl33gqk2ut05k',
                 
                },
                {
                  url: 'https://res.cloudinary.com/aniket52648/image/upload/v1637066522/nsut3dv58isxo5kvj7l4.jpg',
                  filename: 'nsut3dv58isxo5kvj7l4',
                 
                },
                {
                  url: 'https://res.cloudinary.com/aniket52648/image/upload/v1637066578/ilw7aq2p0256b7pa6fod.jpg',
                  filename: 'ilw7aq2p0256b7pa6fod',
                 
                }
              ],
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus iure delectus cum velit, quam quas reiciendis, ratione perferendis tempore fugit impedit officiis veritatis animi totam nihil minus temporibus reprehenderit facere.',
price

        })
        await random1000.save();

    }


}
seedDB().then(() => {
    mongoose.connection.close();
});

