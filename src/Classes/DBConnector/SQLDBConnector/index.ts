import { v4 } from 'uuid';

class SQLDBConnector {
  generateId(): string {
    return v4();
  }
}

export default SQLDBConnector;
