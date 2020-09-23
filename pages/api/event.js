import { saveEvent } from '../../lib';

export default (req, res) => {
  const result = saveEvent(req.body);
  res.status(201).json({ message: 'Event Created', status: 201, data: result });
};
