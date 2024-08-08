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

//delete thepi 
export const deleteThepi = async (req: Request, res: Response): Promise<void> => {
    const { thepiId } = req.params;

    if (!thepiId) {
        res.status(400).json({ error: 'Bad Request: Missing thepiId' });
        return;
    }

    try {
        const result = await AppDataSource.getRepository(Thesi).createQueryBuilder()
            .delete()
            .from(Thesi)
            .where('"thepiId" = :thepiId', { thepiId })
            .execute();

        if (result.affected === 0) {
            res.status(404).json({ error: 'Thesis with the given thepiId not found' });
            return;
        }

        res.status(200).json({ message: 'Deleted thepi successfully , All sister thesi Will also gets deleted during the thepi deletion! '   });
    } catch (error) {
        console.error('Error deleting thepi:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
