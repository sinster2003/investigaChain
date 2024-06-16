import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "John Doe"
                },
                password: {
                    label: "Password",
                    type: "password",
                }
            },
            // authorizing the credentials given in the frontend by hitting a request to express
            async authorize(credentials, req) {
                try {
                    const res = await fetch("http://localhost:3001/api/users/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(credentials)                    
                    });

                    const user = await res.json();

                    if(res.ok && user) {
                        return user;
                    }

                    return null;
                }
                catch(error) {
                    console.log(error);
                    return null;
                }
            }
        })
    ],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        // will be called when sign in occurs
        async signIn(credentials: any) {
            try {
                if(credentials.account.provider === "google") {
                    const response = await fetch("http://localhost:3001/api/users/google", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(credentials)
                    });
                    const result = await response.json();
                    credentials.user._doc = result?.user;
                    credentials.user.token = result?.account.access_token;
                }
                return true;
            }
            catch(error) {
                console.log(error);
                return false;
            }
        },

        // will be called when jwt created
        async jwt({ token, user }: any) {

            if(user) {
                // user signed in and jwt token will contain accessToken
                token.user = user._doc;
                token.accessToken = user.token;
            }
            return token;
        },

        // will be when session is accessed and returns to client
        async session({ session, token }: any) {
            if(token) {
                session.user = token.user;
                session.accessToken = token.accessToken;
            }
            return session;
        }
    }
});

export { handler as GET, handler as POST };