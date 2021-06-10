import app from './ServerConfig';
import serverErrorLogger from './Logger/ServerErrorLogger';
import typeORMConnector from './Connect/typeORMConnect';
import createErrorMessage from './Helpers/createErrorMessage';

const PORT = process.env.PORT || 4000;

const startServer = async (): Promise<void> => {
  try {
    await typeORMConnector.getConnect();
    app.listen(PORT, () => {
      console.clear();
      console.log('Server is running on PORT:', PORT);
    });
  } catch (err) {
    serverErrorLogger.log({
      level: 'error',
      message: createErrorMessage(err),
    });
  }
};

startServer();
