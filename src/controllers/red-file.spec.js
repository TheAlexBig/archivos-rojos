import { getRedFiles } from './red-file.controller.js';
import db from '../models/index.js';
const RedFile = db.redFile ;

jest.mock('../config/logger.js', () => ({
  info: jest.fn(),
}));

describe('Red File Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      query: {},
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return red files with default values', async () => {
    // Mock findAndCountAll method of RedFile model
    RedFile.findAndCountAll = jest.fn(() => Promise.resolve({
      count: 10,
      rows: [
        {
          dataValues: {
            id: 1,
            reference_code: 'RF001',
            title: 'Red file 1',
            place_and_date: 'Mexico City, 2022-01-01',
            institution: 'Mexican Government',
            dependency: 'Ministry of Health',
            document_type: 'Report',
          }
        },
        {
          dataValues: {
            id: 2,
          reference_code: 'RF002',
          title: 'Red file 2',
          place_and_date: 'New York, 2022-02-02',
          institution: 'United Nations',
          dependency: 'WHO',
          document_type: 'Recommendation',
          }
        }
      ],
    }));

    await getRedFiles(req, res);

    expect(RedFile.findAndCountAll).toHaveBeenCalledWith({
      where: {},
      offset: 0,
      limit: 50,
    });

    const result = {
      data: [
        {
          id: 1,
          reference_code: 'RF001',
          title: 'Red file 1',
          place_and_date: 'Mexico City, 2022-01-01',
          institution: 'Mexican Government',
          dependency: 'Ministry of Health',
          document_type: 'Report',
          year: '2022',
        },
        {
          id: 2,
          reference_code: 'RF002',
          title: 'Red file 2',
          place_and_date: 'New York, 2022-02-02',
          institution: 'United Nations',
          dependency: 'WHO',
          document_type: 'Recommendation',
          year: '2022',
        },
      ],
      page: 0,
      totalCount: 10,
      totalPages: 1,
    };
    expect(res.send).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(result);
    expect(res.status).not.toHaveBeenCalled();
    
  });
});