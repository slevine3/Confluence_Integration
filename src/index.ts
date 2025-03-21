import express from 'express';
import config from './config';
import pagesRoutes from './routes/pages';
import authRoutes from './routes/authRouter';
import { ensureAuthenticated } from './middleware/ensureAuthenticated';
import session from 'express-session';
import spacesRoutes from './routes/spaces';
const app = express();

app.use(session({
  secret: config.auth.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // set to true in production with HTTPS
    httpOnly: true,
    sameSite: 'lax',
  },
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/oauth', authRoutes);
app.use('/api/spaces', ensureAuthenticated, spacesRoutes);
app.use('/api/pages', ensureAuthenticated, pagesRoutes);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
}); 