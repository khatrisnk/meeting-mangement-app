import { validateUser } from '../../lib';

export default (req, res) => {
  const user = validateUser(req.body);
  if (user) {
    res.status(200).json({ message: 'Login Success', status: 200, user: user.email });
  } else {
    res.status(401).json({ message: 'Login Failure', status: 401 });
  }
}
