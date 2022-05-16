import 'dotenv/config';
import * as Sentry from '@sentry/node';

const sentryMonitoring = () => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: process.env.DSN,
      tracesSampleRate: 1.0,
    });
  }
};

export { Sentry, sentryMonitoring };
