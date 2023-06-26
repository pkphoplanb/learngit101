const Product = require('../models/product')
const fs = require('fs')

exports.read = async (req, res) => {
    try {
        const id = req.params.id
        const productOneList = await Product.findOne({ _id: id }).exec();
        res.send(productOneList)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
}

exports.list = async (req, res) => {
    try {
        const productList = await Product.find({}).exec();
        res.send(productList)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
}

exports.create = async (req, res) => {
    try {
        var data = req.body
        if (req.file) {
            data.file = req.file.filename
        }
        const productCreate = await Product(data).save()
        res.send(productCreate)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
}

exports.update = async (req, res) => {
    try {
        const id = req.params.id
        const productUpdate = await Product
            .findOneAndUpdate({ _id: id}, req.body, {new: true})
            .exec();
        res.send(productUpdate)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
}

exports.remove = async (req, res) => {
    try {
        const id = req.params.id
        const producRemove = await Product.findOneAndDelete({ _id: id}).exec();

        if (producRemove?.file) {
            await fs.unlink('./uploads/' + producRemove.file, (error) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Remove Success')
                }
            })
        }

        res.send(producRemove)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
}