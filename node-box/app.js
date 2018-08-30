const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Box = require('./box');

mongoose.connect('mongodb://nayan:08kitunayan@ds119651.mlab.com:19651/shop', { useNewUrlParser: true });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Implement JSON body parser
app.use(bodyParser.json());

app.use((req,res, next) => {
    res.header('Access-Control-Access', '*');
    res.header(
        'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.header('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
app.get('/box', (req, res, next)=> {
    Box.find()
        .then(docs => {
        const response = {
          count: docs.length,
          boxes: docs.map(doc => {   
            return { 
                    boxId: doc.boxId,
                    boxTag: doc.boxTag,
                    _id: doc._id,
                };
          })
        };
        res.status(200).json(docs);
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });

})

app.post('/box', (req, res, next) => {
    console.log('vande matram');
    console.log(req.body);
    const box = new Box({
        _id: new mongoose.Types.ObjectId(),
        boxId:req.body.boxId,
        boxTag:req.body.boxTag
    });
    Box.findOne().sort({boxId: -1}).limit(1).then(result => {        
        const box = new Box({
            _id: new mongoose.Types.ObjectId(),
            boxId:Number(result.boxId) + 1,
            boxTag:req.body.boxTag
        });
        box.save().then(result => {
            return res.status(200).json({
                message:'success'
            });
        }).catch(error=> {
            return res.status(500).json({
                error:error
            });
        });
    });  
});

app.patch('/box',(req, res, next) => {
    const id = req.body.boxId;
    const updateOps = {"boxTag":req.body.boxTag};
   Box.updateOne({boxId: id}, {$set:updateOps}).exec().then( result => {
       res.status(200).json(result);
   }).catch(err => { 
       res.status(500).json(err);
    });
});

app.delete('/box/:boxId', (req, res, next) => {
    const boxId = req.params.boxId;
    console.log(`box ${boxId}`);
    Box.deleteOne({ boxId : boxId})
    .then(result => {
        console.log('Inside result'+result);
        res.status(200).json({
            success: 'deleted successfullly'
        });
    }).catch( err => {
        console.log('Inside catch');
        res.status(500).json({error:err})
    });
    res.status(201).json({
        message: 'Deleted Box',
        id:id
    });
});

app.use((req, res, next) => {
    const error = new Error("API not found");
    error.status = 404;
    next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message : error.message
        }
    });

});
module.exports = app;