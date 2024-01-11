const axios = require("axios")
const stockSchema = require("../databaseSchema/stockModel");


const getStockes=async(req,res)=>{
    try {
        console.log("get stockes is working..");
        const stockApi = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${process.env.API_KEY}`)
        var result = stockApi.data
        // console.log("stockApi",result);
        const dataArray = Object.entries(result['Time Series (Daily)']).map(([time, values]) => ({
            time,
            ...values
          }));
        // console.log(dataArray);
        
        const convertedData = dataArray.map(item => ({
            time: item.time,
            open: item['1. open'],
            high: item['2. high'],
            low: item['3. low'],
            close: item['4. close'],
            volume: item['5. volume']
          }));
          
          console.log(convertedData);
        
          stockSchema.insertMany(convertedData)

    } catch (error) {
        console.log("error",error);
    }
}

const fetchStocksAccToQuery= async(req,res)=>{
    console.log(req.query,"request params")
    let startDate=req.query.startDate
    let startVolume= req.query.startVolume  
    try {
        if(!startDate && !startVolume){
            res.status(200).send("Need to pass startDate and startVolume")
        }
        if(startDate && startVolume){
            const query = {
                time: { $gte: startDate}, 
                volume: { $gte: startVolume}
            };
            let result = await stockSchema.find(query)
            console.log("result-->",result);
            res.status(200).send(result)
        }
    } catch (error) {
        console.log("error in fetching", error);
        res.status(400).send(error)
    }
}

module.exports = {getStockes, fetchStocksAccToQuery};
