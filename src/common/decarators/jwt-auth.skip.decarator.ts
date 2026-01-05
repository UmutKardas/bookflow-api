import { SetMetadata } from "@nestjs/common";
import { SKIP_JWT_GUARD } from "../constants/guard.constants";

export const JWT_AUTH_SKIP = SetMetadata(SKIP_JWT_GUARD, true);