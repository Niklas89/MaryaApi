import express from "express";

declare global {
  namespace Express {
    interface Request {
      userId: Record<number>,
      userRole: Record<string>
    }
  }
}