const messages = require("../../utills/messages")
const createResponse = require("../../utills/response")
const Visit = require("../models/visitModel");

const create = async (req, res) => {
  try {
      if (req.file) {
          req.body.image = req.file.path; // Get the file path from multer
      }
      
      const visit = new Visit(req.body);
      const data = await visit.save();
      return createResponse(res, 201, messages.SUCCESS.DATA_ADDED, data);
  } catch (err) {
      return createResponse(res, 500, messages.ERROR.SERVER_ERROR, err.message);
  }
};


  const getAll = async (req, res)  => {
    try {
        const data = await Visit.find().sort({createdAt :-1})
        return createResponse(res , 201 , messages.SUCCESS.DATA_RETRIEVED , data)
    } catch (error) {
        return createResponse(res , 404 , messages.ERROR.NOT_FOUND , null)

    }
  }

  const deleteVisit = async (req, res)  => {
    try {
        const data = await Visit.findByIdAndDelete(req.params.id)
        return createResponse(res , 201 , messages.SUCCESS.DATA_DELETED , data)
    } catch (error) {
        return createResponse(res , 404 , messages.ERROR.NOT_FOUND , null)

    }
  }
  

module.exports = {
  create,
  getAll,
  deleteVisit
};


 