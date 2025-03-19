import express from 'express';
import config from './config';
import pagesRoutes from './routes/pages';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/pages', pagesRoutes);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
}); 