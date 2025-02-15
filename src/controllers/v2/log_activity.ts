import { Request, Response } from "express";

import { ne } from "drizzle-orm";
import { db } from "../../config/connect";
import { log_activity } from "../../models/log_activity";

import { LogActivity } from "../../types";

export const log_activity_get = async (req: Request, res: Response) => {
  try {
    const activities = await db
      .select()
      .from(log_activity)
      .where(ne(log_activity.activityAction, "Login"))
      .execute();
    res
      .status(200)
      .json({ message: "Activities found", data: activities, status: 200 });
  } catch (error) {
    res.status(404).json({ message: "Activities not found", status: 404 });
  }
};

export const log_activity_post = async (req: Request, res: Response) => {
  const { code, name, action, details } = req.body;

  const data: LogActivity = {
    activityCode: code,
    activityUser: name,
    activityAction: action,
    activityDetails: details,
  };
  try {
    await db.insert(log_activity).values(data).execute();
    res.status(200).json({ message: "Activity logged", status: 200 });
  } catch (error) {
    console.error("Error logging activity:", error);
    res.status(500).json({ message: "Error logging activity", status: 500 });
  }
};
