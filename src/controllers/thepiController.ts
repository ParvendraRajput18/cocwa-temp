import "reflect-metadata";
import { Request, Response } from 'express';
import AppDataSource from '../database/dbConnection';
import { Thesi } from '../entity/thesiEntity';

export const getThesisByThepiId = async (req: Request, res: Response): Promise<void> => {
    const { thepiId } = req.params;

    if (!thepiId) {
        res.status(400).json({ error: 'Bad Request: Missing thepiId' });
        return;
    }

    try {
        const result = await AppDataSource.getRepository(Thesi).query(
            'SELECT * FROM thesi WHERE "thepiId" = $1',
            [thepiId]
        );

        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching thesis by thepiId:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
