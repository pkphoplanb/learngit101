const db = require('../Models/Main')
const Department = db.Department

exports.create = async (req, res) => {
    try {
        const departmentCreate = await Department.create({ ...req.body })
        res.status(201).json(departmentCreate)
    } catch (error) {
        res.status(500).send('Server Error')
        console.error(`Unable to create record : ${error}`);
    }
}
exports.list = async (req, res) => {
    try {
        const departmentList = await Department.findAll()
        res.status(200).json(departmentList)
    } catch (error) {
        res.status(500).send('Server Error')
        console.error(`Unable to findAll record : ${error}`);
    }
}
exports.read = async (req, res) => {
    try {
        const id = req.params.id
        const departmentRead = await Department.findOne({ where: { id: id } })
        res.status(200).json(departmentRead)
    } catch (error) {
        res.status(500).send('Server Error')
        console.error(`Unable to findOne record : ${error}`);
    }
}
exports.update = async (req, res) => {
    try {
        const id = req.params.id
        const departmentUpdate = await Department.update({ ...req.body }, { where: { id: id } })
        res.status(200).json(departmentUpdate)
    } catch (error) {
        res.status(500).send('Server Error')
        console.error(`Unable to update record : ${error}`);
    }
}
exports.remove = async (req, res) => {
    try {
        const id = req.params.id
        const departmentRemove = await Department.destroy({ where: { id: id } })
        res.status(204).json({})
    } catch (error) {
        res.status(500).send('Server Error')
        console.error(`Unable to remove record : ${error}`);
    }
}