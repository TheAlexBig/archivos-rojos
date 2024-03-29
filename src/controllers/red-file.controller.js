import logger from "../config/logger.js";
import db from "../models/index.js";
const RedFile = db.redFile;
const Op = db.Sequelize.Op;

const getRedFiles = async  (req, res) => {
    try {
        const { page = 0, limit = 50, ...queryParams } = req.query;
        const searchConditions = {};
        const exactMatchFields = [];
        const likeMatchFields = ["reference_code", "title", "place_and_date", 
        "institution", "document_type", "dependency"];
    
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
        const limitToInt = parseInt(limit+'');

        const result = await RedFile.findAndCountAll({
          where: searchConditions,
          offset,
          limit: limitToInt,
        });

        // Extract year from place_and_date field and add to result object
        const processedRows = result.rows.map((row) => ({
          ...row.dataValues,
          year: row.dataValues.place_and_date.match(/\b\d{4}\b/g)?.[0] || "Sin fecha",
        }));

        res.json({
          data: processedRows,
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

const getRedFile = async (req, res) => {
    try {
        const reference_code = req.params.code;

        const redFile = await RedFile.findOne({
            where: { reference_code },
        });

        if (!redFile) {
            return res.status(404).json({
                message: "Red file not found.",
            });
        }

        res.json(redFile);
    } catch (err) {
        logger.info(err);
        res.status(500).send({
            message: "Error occurred while retrieving the red file.",
        });
    }
};
export { getRedFiles, getRedFile };