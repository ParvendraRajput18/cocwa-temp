import "reflect-metadata"
import { Request, Response } from 'express';
import AppDataSource from '../database/dbConnection';
import { Thesi } from '../entity/thesiEntity';  

interface ThesiRequestBody {
    thesiId: string;
    status: string;
}

export const addThesi = async (req: Request<{}, {}, ThesiRequestBody>, res: Response) => {
    const { thesiId, status } = req.body;

    if (!thesiId || !status) {
        return res.status(400).json({ error: 'Bad Request: Missing required fields' });
    }

    try {
        const thesiRepository = AppDataSource.getRepository(Thesi);
        const newThesi = thesiRepository.create({ thesiId, status });
        const result = await thesiRepository.save(newThesi);

        res.status(201).json(result);
    } catch (error) {
        console.error('Error inserting thesi:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


//later 

export const getAllThesis = async (req: Request, res: Response): Promise<void> => {
    try {
        const thesiRepository = AppDataSource.getRepository(Thesi);

       
        const result = await thesiRepository.find();
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching all thesis:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
