import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ user_id: string }>;
}) {
  // ✅ Await the params (this satisfies the new rule)
  const { user_id } = await params;

  // ✅ Redirect logic
  if (user_id === "invalid") {
    redirect("/dashboard/application");
  }

  redirect(`/dashboard/application/${user_id}/screening?query=personal_info`);
}
