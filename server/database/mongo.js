var { MongoClient } = require('mongodb');
var db;

connect = function () {
    const uri = process.env.DBURL;
    const client = new MongoClient(uri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    async function run() {
        try {
            db = await client.connect();
            console.log('Connecting to database')
        } finally {
            // close on finish/error
            console.log('Closing database on error or finish')
            await client.close();
        }
    }
    run().catch(console.dir);
}

getConnection = function() {
    console.log('Receiving database connection instance')
    return db
}

module.exports = {
    connect,
    getConnection
}

// other stuff
/*
            const polls = client.db('vote').collection('polls');

            // insert new document
            const newDoc = {
                name: 'New thing 1',
                date: Date.now(),
                owner: 'User 1',
                options: ['op1', 'op2', 'op3']
            }

            const result = await polls.insertOne(newDoc);
            console.log(`${result.insertedCount} doc with id ${result.insertedId}`);

            // 

            // // get listings
            // const listings = database.collection('listingsAndReviews');

            // // make a query and iterate through results
            // const houses = { property_type: 'House' };
            // const houseListings = await listings.find(houses);
            // await houseListings.forEach(doc =>
            //     console.log(doc.name)
            // );
            // console.log('Count: ' + await houseListings.count())
            // await houseListings.close();
*/