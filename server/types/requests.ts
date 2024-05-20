import type { Request } from "express";

export type AuthenticatedRequest = Request & { token?: string };