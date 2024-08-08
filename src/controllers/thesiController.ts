import "reflect-metadata";
import { Request, Response } from 'express';
import AppDataSource from '../database/dbConnection';
import { Thesi } from '../entity/thesiEntity';  

interface ThesiRequestBody {
    thesiId: string;
    status: string;
    cocAssetClass: string;
    thepiId: string;
    thesisName: string;
  }
  

  export const addThesi = async (req: Request<{}, {}, ThesiRequestBody>, res: Response) => {
    const { thesiId, status, cocAssetClass, thepiId, thesisName } = req.body;
  
   
    if (!thesiId || !status || !cocAssetClass || !thepiId || !thesisName) {
      return res.status(400).json({ error: 'Bad Request: Missing required fields' });
    }
  
    try {
      
      const result = await AppDataSource.getRepository(Thesi).query(
        'INSERT INTO thesi ("thesiId", "status", "cocAssetClass", "thepiId", "thesisName") VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [thesiId, status, cocAssetClass, thepiId, thesisName]
      );
  
      res.status(201).json(result[0]);
    } catch (error) {
      console.error('Error inserting thesi:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

//later 

export const getAllThesis = async (req: Request, res: Response): Promise<void> => {
  try {
    
    const result = await AppDataSource.getRepository(Thesi).query(
      'SELECT * FROM thesi'
    );
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching all thesis:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getThesisByThesiId = async (req: Request, res: Response): Promise<void> => {
  const { thesiId } = req.params;

  if (!thesiId) {
      res.status(400).json({ error: 'Bad Request: Missing thesiId' });
      return;
  }

  try {
      const result = await AppDataSource.getRepository(Thesi).query(
          'SELECT * FROM thesi WHERE "thesiId" = $1',
          [thesiId]
      );

      res.status(200).json(result);
  } catch (error) {
      console.error('Error fetching thesis by thesiId:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};



