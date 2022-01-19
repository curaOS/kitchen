import { useNearHooksContainer } from "@cura/hooks";
import { useRouter } from "next/router";

import Head from "next/head";
import { Box, Button, Text } from "theme-ui";

const CONTRACT = "demo.ashen99.testnet";


export default function Layout({ children }: { children: JSX.Element }) {
    
    const router = useRouter();
    const { signIn, signOut, accountId } = useNearHooksContainer();

    const preSignIn = () => {
        signIn(
            CONTRACT,
            window.location.origin + router.asPath,
            window.location.origin + router.asPath
        );
    };

    const preSignOut = () => {
        signOut();
        router.reload();
    };

    return (
        <>
            <Head>
                <title>CURA Demo App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {accountId ? (
                <Box>   
                    <Box
                        sx={{
                            py: 3,
                            px: 4,
                            background: 'lightGray',
                            display:'flex'
                        }}
                    >
                        <Text
                            sx={{
                                fontSize: 4,
                                marginRight:'auto'
                            }}
                        >
                            account: {accountId}
                        </Text>
                        <Button onClick={preSignOut}>disconnect</Button>
                    </Box>
                    {children}
                </Box>
            ) : (
                <Box
                    sx={{
                        py: 3,
                        px: 4,
                        background: 'lightGray',
                        display:'flex'
                    }}
                >
                    <Text
                        sx={{
                            fontSize: 4,
                            marginRight:'auto'
                        }}
                    >
                        Please connect to use App
                    </Text>
                    <Button onClick={preSignIn}>connect NEAR</Button>
                </Box>
            )}
        </>
    );
 }