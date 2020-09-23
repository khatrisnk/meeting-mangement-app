import fs from 'fs';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'data');

export const validateUser = ({ email, password }) => {
  // Read json file
  const fullPath = path.join(dataDirectory, 'users.json');
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const user = JSON.parse(fileContents).users.find(user => user.email === email && user.pwd === password)
  return user;
}