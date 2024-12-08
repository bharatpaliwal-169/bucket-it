import { GlobalConstants } from "@/constants/siteData/siteData";

export default function Home() {
  return (
    <div className="flex items-center min-h-screen justify-center">
      <h1 className="text-3xl text-brand font-bold">
        {GlobalConstants.brandName}
      </h1>
    </div>
  );
}
