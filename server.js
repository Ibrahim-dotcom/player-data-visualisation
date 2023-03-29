import fs from 'fs/promises'
import express from 'express'
import cors from 'cors'
const app = express()
const port = process.env.port || 1337

const corsOption = {
    origin: 'http://127.0.0.1:5173'
}

app.use(cors(corsOption));
app.get('/',getData)
async function getData(req, res){
    try{
        let data = await fs.readFile('./public/Cleaned FIFA 2021 data.csv')
        data = String(data).split('\n')

        function removeComma(str){
            return str.replace(/[",]/g, '');
        }

        let keys = data[0].split(/,/);
        //console.log(keys)

    data = data.slice(1).map(i =>{
        i = i.replace(/".*"/g, removeComma).split(',')
        let item = {}
        for(let key=0; key < keys.length;key++){
            item[keys[key]] = i[key]
        }
        //console.log(keys)
        return item
    })
        res.json(data)
    }
    catch(e){
        console.error(e)
    }
}
app.listen(port, () =>console.log(`server listening at port ${port}`) )
