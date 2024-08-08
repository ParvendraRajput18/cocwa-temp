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
  mode: string;
  lastUpdatedBy: string;
  reviewRequired: string;
}

interface UpdateThesiStatusRequestBody {
  status: string;
  lastUpdatedBy: string;
  reviewRequired?: string;
}
const validTransitions: { [key: string]: string[] } = {
  'New Trade': ['Checked by PA'],
  'Checked by PA': ['Approved by PA', 'Pending IG Submission'],
  'Pending IG Submission': ['Pending PA Approval'],
  'Pending PA Approval': ['Approved by PA'],
};

type StatusTransition = {
  [key: string]: string[];
};


export const updateThesiStatus = async (req: Request, res: Response): Promise<void> => {
  const { thesiId } = req.params;
  const { status, lastUpdatedBy, reviewRequired }: UpdateThesiStatusRequestBody = req.body;

  if (!thesiId || !status || !lastUpdatedBy) {
    res.status(400).json({ error: 'Bad Request: Missing required fields' });
    return;
  }

  try {
    const [currentThesi] = await AppDataSource.getRepository(Thesi).query(
      'SELECT "status", "lastUpdatedBy", "mode", "reviewRequired" FROM thesi WHERE "thesiId" = $1',
      [thesiId]
    );

    if (!currentThesi) {
      res.status(404).json({ error: 'Thesis not found' });
      return;
    }

    const { status: currentStatus, lastUpdatedBy: currentLastUpdatedBy, mode, reviewRequired: currentReviewRequired } = currentThesi;

    if (lastUpdatedBy === currentLastUpdatedBy) {
      res.status(403).json({ error: 'Forbidden: You cannot update the status. You are the last updater.' });
      return;
    }

    if (!validTransitions[currentStatus]?.includes(status)) {
      res.status(400).json({ error: 'Invalid status transition' });
      return;
    }


    let newMode = mode;
    let newStatus = status;

    if (status === 'Approved by PA') {
      newMode = 'Annual Review';
    }

    if (status === 'Checked by PA' && currentReviewRequired === 'Yes') {
      newStatus = 'Pending IG Submission';
      newMode = 'Annual Review';
    }

    if (reviewRequired !== undefined && reviewRequired !== currentReviewRequired) {
      newStatus = status === 'Approved by PA' ? 'Pending IG Submission' : status;
      newMode = 'Annual Review';
    }

    await AppDataSource.getRepository(Thesi).query(
      'UPDATE thesi SET "status" = $1, "lastUpdatedBy" = $2, "mode" = $3, "reviewRequired" = $4 WHERE "thesiId" = $5',
      [newStatus, lastUpdatedBy, newMode, reviewRequired || currentReviewRequired, thesiId]
    );

    res.status(200).json({ message: 'Thesis status updated successfully' });
  } catch (error) {
    console.error('Error updating thesis status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const addThesi = async (req: Request<{}, {}, ThesiRequestBody>, res: Response) => {
  const { thesiId, status, cocAssetClass, thepiId, thesisName, mode, lastUpdatedBy, reviewRequired } = req.body;


  if (!thesiId || !status || !cocAssetClass || !thepiId || !thesisName || !mode || !lastUpdatedBy || reviewRequired === undefined) {
    return res.status(400).json({ error: 'Bad Request: Missing required fields' });
  }

  try {
    const result = await AppDataSource.getRepository(Thesi).query(
      'INSERT INTO thesi ("thesiId", "status", "cocAssetClass", "thepiId", "thesisName", "mode", "lastUpdatedBy", "reviewRequired") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [thesiId, status, cocAssetClass, thepiId, thesisName, mode, lastUpdatedBy, reviewRequired]
    );

    res.status(201).json(result[0]);
  } catch (error) {
    console.error('Error inserting thesi:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

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

export const deleteThesi = async (req: Request, res: Response): Promise<void> => {
  const { thesiId } = req.params;

  if (!thesiId) {
    res.status(400).json({ error: 'Bad Request: Missing thesiId' });
    return;
  }

  try {
  
    const result = await AppDataSource.getRepository(Thesi).query(
      'DELETE FROM thesi WHERE "thesiId" = $1 RETURNING *',
      [thesiId]
    );

    if (result.length === 0) {
      res.status(404).json({ error: 'Thesis not found' });
      return;
    }

    res.status(200).json({ message: 'Thesis deleted successfully', deletedThesi: result[0] });
  } catch (error) {
    console.error('Error deleting thesis:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
