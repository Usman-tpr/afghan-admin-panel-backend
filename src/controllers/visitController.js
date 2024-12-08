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
  const updateVisit = async (req, res) => {
    try {
      const visitId = req.params.id; // Get visit ID from the URL parameter
      const updatedData = req.body;  // Get the fields sent by the frontend
  
      // Find the visit by its ID
      const visit = await Visit.findById(visitId);
  
      if (!visit) {
        return res.status(404).json({ message: "Visit not found" });
      }
  
      // Update only the fields provided in the request body
      Object.keys(updatedData).forEach((key) => {
        if (updatedData[key] !== undefined) {
          visit[key] = updatedData[key];
        }
      });
  
      // Save the updated visit
      const updatedVisit = await visit.save();
  
      // Respond with the updated visit
      return createResponse(res , 201 , messages.SUCCESS.DATA_UPDATED , updatedData)
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  

module.exports = {
  create,
  getAll,
  deleteVisit,
  updateVisit
};


 