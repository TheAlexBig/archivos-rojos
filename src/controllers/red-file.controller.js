import logger from "../config/logger.js";
import db from "../models/index.js";
const RedFile = db.redFile;
const Op = db.Sequelize.Op;

const getRedFiles = async  (req, res) => {
    try {
        const { page = 0, limit = 50, ...queryParams } = req.query;
    
        const searchConditions = {};
        const exactMatchFields = ["institution", "dependency", "document_type", "place_and_date"];
        const likeMatchFields = ["reference_code", "title"];
    
        // Set exact match conditions
        exactMatchFields.forEach((field) => {
          if (queryParams[field]) {
            searchConditions[field] = queryParams[field];
          }
        });
    
        // Set like match conditions
        likeMatchFields.forEach((field) => {
          if (queryParams[field]) {
            searchConditions[field] = { [Op.like]: `%${queryParams[field]}%` };
          }
        });
    
        const offset = page * limit;
        const result = await RedFile.findAndCountAll({
          where: searchConditions,
          offset,
          limit,
        });
    
        res.json({
          data: result.rows,
          page,
          totalCount: result.count,
          totalPages: Math.ceil(result.count / limit),
        });
      } catch (err) {
        logger.info(err);
        res.status(500).send({
          message: "Error occurred while retrieving red files.",
        });
      }
};

export {getRedFiles}