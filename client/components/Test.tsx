import { getServerSession } from "next-auth"

const getUser = async () => {
    const session = await getServerSession();
    return session;
}   

const Test = async () => {
  const session = await getUser();

  return (
    <div>{JSON.stringify(session)}</div>
  )
}

export default Test