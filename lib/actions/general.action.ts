import { db } from "@/firebase/admin";


export async function getInterviewByUserId(
  userId: string
): Promise<Interview[] | null> {
  const Interview = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return Interview.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  const Interview = await db
    .collection("interviews")
    .orderBy("createdAt", "desc")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .limit(limit)
    .get();

  return Interview.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getInterviewById(
  id: string
): Promise<Interview | null> {
  const interview = await db
    .collection("interviews")
    .doc(id)
    .get()

  return interview.data() as Interview | null;
}