import express from "express";

declare global {
  namespace Express {
    interface Request {
      dataUser?: Record<string, any>
    }
  }
}