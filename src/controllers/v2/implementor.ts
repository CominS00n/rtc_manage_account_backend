import { Request, Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "../../config/connect";
import { implementor } from "../../models/req_acc/implementor";

export const getImplementor = async (req: Request, res: Response) => {
  try {
    const implementors = await db.select().from(implementor).execute();
    res.status(200).json({ data: implementors, status: 200 });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error getting implementors", status: 400 });
  }
};

export const getImplementorById = async (req: Request, res: Response) => {
  try {
    const implementors = await db
      .select()
      .from(implementor)
      .where(eq(implementor.id, req.params.id))
      .execute();
    res.status(200).json({ data: implementors, status: 200 });
  } catch (error) {
    res.status(400).json({ message: "Error getting implementor", status: 400 });
  }
};

export const createImplementor = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    await db.insert(implementor).values({ name, email }).execute();
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating implementor", status: 400 });
  }
};

export const updateImplementor = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    await db
      .update(implementor)
      .set({ name, email })
      .where(eq(implementor.id, req.params.id))
      .execute();
    res.status(200).json({ message: "Implementor updated", status: 200 });
  } catch (error) {
    res.status(400).json({ message: "Error updating implementor", status: 400 });
  }
};

export const deleteImplementor = async (req: Request, res: Response) => {
  try {
    await db
      .delete(implementor)
      .where(eq(implementor.id, req.params.id))
      .execute();
    res.status(200).json({ message: "Implementor deleted", status: 200 });
  } catch (error) {
    res.status(400).json({ message: "Error deleting implementor", status: 400 });
  }
};