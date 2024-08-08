"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllThesis = exports.addThesi = void 0;
const dbConnection_1 = __importDefault(require("../database/dbConnection"));
// Controller function for adding a new Thesi
const addThesi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { thesiid, status } = req.body;
    // Check if required fields are present
    if (!thesiid || !status) {
        return res.status(400).json({ error: 'Bad Request: Missing required fields' });
    }
    try {
        // Insert the new Thesi record into the database
        const result = yield dbConnection_1.default.query('INSERT INTO thesi (thesiid, status) VALUES ($1, $2) RETURNING *', [thesiid, status]);
        // Respond with the inserted record
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        // Log and respond with error
        console.error('Error inserting thesi:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.addThesi = addThesi;
const getAllThesis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield dbConnection_1.default.query('SELECT * FROM thesi');
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.error('Error fetching all thesis:', error);
        res.status(500).json({ error: 'Internal Server err' });
    }
});
exports.getAllThesis = getAllThesis;
// app.post('/api/thesis', async (req, res) => {
//   const { thesiid, status } = req.body;
//   try {
//     const result = await client.query(
//       'INSERT INTO thesi (thesiid, status) VALUES ($1, $2) RETURNING *',
//       [thesiid, status]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// // Get Thesi by ID
// app.get('/api/thesis/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await client.query('SELECT * FROM thesi WHERE id = $1', [id]);
//     if (result.rows.length === 0) {
//       res.status(404).json({ error: 'Thesi not found' });
//     } else {
//       res.status(200).json(result.rows[0]);
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// // Update Thesi
// app.put('/api/thesis/:id', async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;
//   try {
//     const result = await client.query(
//       'UPDATE thesi SET status = $1 WHERE id = $2 RETURNING *',
//       [status, id]
//     );
//     if (result.rows.length === 0) {
//       res.status(404).json({ error: 'Thesi not found' });
//     } else {
//       res.status(200).json(result.rows[0]);
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
