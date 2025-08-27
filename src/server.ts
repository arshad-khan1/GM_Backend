import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';
import { HealthRouter } from './routes/health.route';
import { UsersRoute } from '@routes/users.route';
import { AuthRoute } from '@routes/auth.route';

ValidateEnv();

const app = new App([new HealthRouter(), new UsersRoute(), new AuthRoute()]);

app.listen();
