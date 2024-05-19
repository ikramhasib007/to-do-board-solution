import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';

const getUserId = (request: Request, requireAuth = true) => {
  const header = request.headers.get('authorization');

  if (header) {
    const token = header.replace('Bearer ', '');
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || '');
    return decoded.userId;
  }
  if (requireAuth) throw new GraphQLError('Authentication required');

  return null;
};

export default getUserId;
