
const { MongoClient, ObjectId } = require("mongodb")
const uri = "mongodb+srv://kristinkingston32:password321@cluster0.brqqamr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const client = new MongoClient(uri)
const db = 'Myggblomster'
const RARcollection = 'rar'
const usersCollName = "users"

exports.DAL = {
    getRAR: async function () {
        try {
            const client = new MongoClient(uri)
            const database = client.db(db)
            const RARCollection = database.collection(RARcollection)
            const query = {}
            const RAR = await RARCollection.find(query).toArray()
            return RAR
        } finally {
            await client.close()
        }

    },
    getRARById: async function (id) {
        console.log("Get RAR By Id: ", id)
        try {
            const client = new MongoClient(uri)
            const database = client.db(db)
            const RARCollection = database.collection(RARcollection)
            const query = { _id: ObjectId.createFromHexString(id) }
            const RAR = await RARCollection.findOne(query)
            return RAR
        } finally {
            await client.close()
        }


    },


    createRAR: async function (data) {
        try {
            console.log("CREATE REVIEW DATA: ", data)
            const client = new MongoClient(uri)
            const database = client.db(db)
            const RARCollection = database.collection(RARcollection)
            const Data = {
                    movieId: data.movieId,
                    userId: data.userId,
                    starRating: data.starRating,
                    movieReview: data.movieReview                   
                }
            
            
            const result = await RARCollection.insertOne(Data)
            return result
        } finally {
            await client.close()
        }
    },
    updateRAR: async function ( data, id) {
        try {
            console.log("Update Review DATA: ",  data, id)
            const client = new MongoClient(uri)
            const database = client.db(db)
            const RARCollection = database.collection(RARcollection)
            const query = { _id: ObjectId.createFromHexString(id) }
            const updatedData = {
                $set: {
                    movieId: data.movieId,
                    userId: data.userId,
                    starRating: data.starRating,
                    movieReview: data.movieReview   
                }
            }
            
            const result = await RARCollection.updateOne(query, updatedData)
            return result
        } finally {
            await client.close()
        }
    },
    createUser: async function (email, password, isAdmin) {
        console.log('DAL Create User: ', email, password, isAdmin)
        const client = new MongoClient(uri)
        try {
            const database = client.db(db)
            const usersCollection = database.collection(usersCollName)
            let newUser = {
                email: email,
                password: password,
                isAdmin: isAdmin
            }
            const result = await usersCollection.insertOne(newUser)
            return result
        } finally {
            await client.close()
        }
            console.log("Create user: ", result)
    },
    deleteRAR: async function (id) {
        console.log("Delete Recipe with Id: ", id)
        try {
            const client = new MongoClient(uri)
            const database = client.db(db)
            const reviewsCollection = database.collection(RARcollection)
            const query = { _id: ObjectId.createFromHexString(id) }
            const reviews = await reviewsCollection.deleteOne(query)
            console.log(reviews)
            return reviews
        } finally {
            await client.close()
        }
    },
    getUserByUserId: async function (userId) {
        const client = new MongoClient(uri)
        console.log("Get User By UserID: ", userId)
        try {
            const database = client.db(db)
            const usersCollection = database.collection(usersCollName)
            const query = { userId: userId }
            const user = await usersCollection.findOne(query)
            console.log('DAL getUserByUserId: ', user)
            return user
        } finally {
            await client.close()
        }
    },
    getReviewsByUserId: async function (userId) {
        const client = new MongoClient(uri)
        console.log("Get Reviews By UserID: ", userId)
        try {
            const database = client.db(db)
            const reviewsCollection = database.collection(RARcollection)
            const query = { userId: userId }
            
            const user = await reviewsCollection.find(query)
            console.log('DAL getReviewsByUserId: ', user)
            return user
        } finally {
            await client.close()
        }
    },
    getUserByEmail: async function (email) {
        const client = new MongoClient(uri)
        console.log("Get User By Email: ", email)
        try {
            const database = client.db(db)
            const usersCollection = database.collection(usersCollName)
            const query = { email: email }
            const user = await usersCollection.findOne(query)
            console.log('DAL getUserByEmail: ', user)
            return user
        } finally {
            await client.close()
        }
    },
    getMovieByMovieId: async function (movieId) {
        const client = new MongoClient(uri)
        console.log("Get Movie By MovieID: ", movieId)
        try {
            const database = client.db(db)
            const RARCollection = database.collection(RARcollection)
            const query = { movieId: movieId }
            const movie = await RARCollection.find(query)
            console.log('DAL getMovieByMovieId: ', movie)
            return movie
        } finally {
            await client.close()
        }
    },


}