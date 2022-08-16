import express, {Request, Response} from 'express'
import cors from 'cors'
import { MongoClient } from "mongodb";
import {uri} from "./credentials"


const client = new MongoClient(uri)
const db = client.db("DamianCluster")
const photoCollections = db.collection("photos")

const app = express()

app.use(express.json())
app.use(cors())


app.get("/", async (req: Request, res: Response) => {
    const photos = await photoCollections.find({}).toArray()
res.status(200).json(photos)
})

const PORT = 5001
app.listen(PORT, () => {
    console.log(`Started on port: ${PORT}`)
})