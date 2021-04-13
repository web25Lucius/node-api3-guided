

module.exports = (format) => {
    return (req, res, next) => {
        const time = new Date().toISOString()
        switch (format) {
            case "short" :
                console.log(`${req.ip} made a ${req.method} request to ${req.url} at ${time}`)
                next()
                break
            case "long": 
            console.log(`${req.ip} made a ${req.method} request to ${req.url} at ${time}`) 
            next()
        
        break
        default:
            return next("Error: need a logger format")
            // console.log(`Error : need a logger format`)
            // return res.status(500).json({
            //     message: "someting is wrong",
            // })
            // next()
}}

}