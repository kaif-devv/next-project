import { SetMetadata } from "@nestjs/common";
const Roles = (...roles: string[]) => SetMetadata('roles', roles);