import { SetMetadata } from '@nestjs/common';

export const SwFeaturePermission = (featurePermissions: Array<string> | string) => SetMetadata('featurePermission', featurePermissions);

export const SwRole = (roles: Array<number> | number) => SetMetadata('role', roles);
