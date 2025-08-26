import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';
import { HealthRouter } from './routes/health.route';
import { UsersRoute } from '@routes/users.route';
import { AuthRoute } from '@routes/auth.route';
import LotsRoute from '@routes/lots.route';
import DemandsRoute from '@routes/demands.route';
import BidsRoute from '@routes/bids.route';
import OffersRoute from './routes/offers.route';
import DealsRoute from './routes/deals.route';

ValidateEnv();

const app = new App([
  new HealthRouter(),
  new UsersRoute(),
  new AuthRoute(),
  new LotsRoute(),
  new DemandsRoute(),
  new BidsRoute(),
  new OffersRoute(),
  new DealsRoute(),
]);

app.listen();
