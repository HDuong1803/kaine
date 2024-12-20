"use server";

import { revalidatePath } from "next/cache";

// Function to add or update a Telegram user
export async function addOrUpdateUser(userId: number, username: string) {
  const response = await fetch(`${process.env.API_URL}/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, username }, null, 2),
  });
  const data = await response.json();
  revalidatePath("/");
  return data;
}

// Function to get user info
export async function getUserInfo(userId: number) {
  const response = await fetch(`${process.env.API_URL}/user/${userId}`);
  const data = await response.json();
  return data;
}

// Function to claim daily reward
export async function claimDailyReward(userId: number) {
  const response = await fetch(
    `${process.env.API_URL}/claim-reward/${userId}`,
    {
      method: "POST",
    }
  );
  const data = await response.json();
  revalidatePath("/");
  return data;
}

// Function to set points to user
export async function setPoints(
  userId: number,
  points: {
    points: number;
    multiplier: number;
    multiplierCost: number;
    energy: number;
  }
) {
  const response = await fetch(`${process.env.API_URL}/set-points/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(points, null, 2),
  });
  const data = await response.json();
  revalidatePath("/");
  return data;
}

// Function to get active skin for a user
export async function getActiveSkin(userId: number) {
  const response = await fetch(`${process.env.API_URL}/active-skin/${userId}`);
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data.activeSkin;
}

// Function to set active skin for a user
export async function setActiveSkin(userId: number, skinName: string) {
  const response = await fetch(
    `${process.env.API_URL}/set-active-skin/${userId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skinName }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to set active skin");
  }

  // revalidatePath("/");
  return response.json();
}
