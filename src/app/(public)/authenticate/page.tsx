import Authentication from "@/components/Authetication";
import Error from "@/components/Error";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const token = (await searchParams).token as string;

  if (!token) {
    return <Error error="Invalid authentication token" />;
  }

  // const authenticationResponse = await verifyUserEmail(token, "login");

  // if (authenticationResponse?.errorMessage) {
  //   return <Error error={authenticationResponse.errorMessage} />;
  // }

  return <Authentication token={token} />;
};

export default page;
