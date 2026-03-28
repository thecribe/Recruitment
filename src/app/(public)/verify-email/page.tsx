import VerifyEmailPage from "./_ui/VerifyPage";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const token = (await searchParams).token as string;

  return <VerifyEmailPage token={token} />;
};

export default page;
