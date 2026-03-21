import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ single_recruit: string }>;
}) {
  // ✅ Await the params (this satisfies the new rule)
  const { single_recruit } = await params;

  // ✅ Redirect logic
  if (single_recruit === "invalid") {
    redirect("/recruitment");
  }

  redirect(`/recruitment/${single_recruit}/screening?query=personal_info`);
}
