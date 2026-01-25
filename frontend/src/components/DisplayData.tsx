import type React from "react";
import { useSecret } from "../hooks/useSecret"

export const DisplayData = () => {
    const {data, loading, error, getSecret} = useSecret();

    const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await getSecret();
        console.log(data)
    }
  return (
    <div>
        {error && (<div>error</div>)}
        {data && (
            <div>
                <div>
                    <div>Your UserName: {data.username}</div>
                    <div>Your Temporary Email: {data.email}</div>
                    <div>Your Id: {data.id}</div>
                </div>
                <div>
                    Your Secret Code It Will Be Valid For 2Days or Until Next Below Button Click
                    {data.secret.setup}
                    {data.secret.punchline}
                </div>
            </div>
        )}
        <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}>{loading ? "Loading..." : "Get Information"}</button>
    </div>
  )
}
