import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/database';

interface ErrorResponseType {
  error: string;
}
interface SuccessResponseType {
  _id: string;
  name: string;
  email: string;
  cellFone: string;
  teacher: boolean;
}
export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
): Promise<void> => {
  if (req.method === 'POST') {
    const { name, email, teacher, cellFone } = req.body;
    if (!name || !email || !teacher || !cellFone) {
      //Validação de parâmetros recebidos via request body
      let defineMsg = '';
      if (!name) defineMsg = 'Missing name';
      if (!teacher) defineMsg = 'Missing teacher';
      if (!cellFone) defineMsg = 'Missing cellfone';
      if (!email) defineMsg = 'Missing email';
      if (!name && !email && !cellFone && !teacher)
        defineMsg = 'Missing name,email, teacher and cellFone';

      res.status(400).json({ error: defineMsg });
      return;
    }
    const { db } = await connect();
    const response = await db.collection('users').insertOne({
      name,
      email,
      cellFone,
      teacher,
    });
    res.status(200).json(response.ops[0]);
  } else {
    res.status(400).json({ error: 'Wrong request methods ' });
  }
};
