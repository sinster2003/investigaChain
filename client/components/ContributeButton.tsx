"use client"

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const ContributeButton = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push('/dashboard/editor')}>
        Contribute
    </Button>
  );
};

export default ContributeButton
