import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';
import { HealthRouter } from './routes/health.route';
import { UsersRoute } from '@routes/users.route';
import { AuthRoute } from '@routes/auth.route';
import { EnquiriesRoute } from '@routes/enquiries.route';
import { MembersRoute } from '@routes/members.route';
import { GymsRoute } from '@routes/gyms.route';
import { StaffRoute } from '@/routes/staff.route';
import { MembershipPlansRoute } from '@routes/membership_plans.route';
import { SubscriptionsRoute } from '@routes/subscriptions.route';
import { PaymentsRoute } from '@routes/payments.route';
import { NotificationsRoute } from '@routes/notifications.route';
import { RolePermissionsRoute } from '@routes/roles_permissions.route';

// Global error handlers to surface crashes during development
process.on('unhandledRejection', reason => {
  // eslint-disable-next-line no-console
  console.error('[UNHANDLED_REJECTION]', reason);
});

process.on('uncaughtException', err => {
  // eslint-disable-next-line no-console
  console.error('[UNCAUGHT_EXCEPTION]', err);
});

ValidateEnv();

const app = new App([
  new HealthRouter(),
  new UsersRoute(),
  new AuthRoute(),
  new EnquiriesRoute(),
  new MembersRoute(),
  new GymsRoute(),
  new StaffRoute(),
  new MembershipPlansRoute(),
  new SubscriptionsRoute(),
  new PaymentsRoute(),
  new NotificationsRoute(),
  new RolePermissionsRoute(),
]);

app.listen();
